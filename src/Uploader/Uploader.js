/**
 * @file Upload
 * @author nemo <474021406@qq.com>
 */

/* globals XMLHttpRequest, FormData */

import {Component, DataTypes} from 'san';
import Button from '../Button';
import {create} from '../common/util/cx';
import FileSelector from './FileSelector';
import FileList from './FileList';
import FileItem from './FileItem';
import DEFAULT_UPLOAD from './upload';
import guid from '../common/util/guid';

const ID_SYMBOL = Symbol();

const cx = create('uploader');

export default class Uploader extends Component {

    static template = `
        <div class="{{className}}">
            <sm-file-selector
                disabled="{{disabled}}"
                accept="{{accept}}"
                multiple="{{multiple}}"
                on-select="addFiles($event)" />
            <sm-file-list>
                <sm-file-item
                    s-for="file in files"
                    disabled="{{disabled}}"
                    name="{{file.name}}"
                    size="{{file.size}}"
                    status="{{file.status}}"
                    url="{{file.url}}"
                    progress="{{file.progress}}"
                    errorMessage="{{file.errorMessage}}"
                    on-remove="removeFile(file)" />
            </sm-file-list>
        </div>
    `;

    static components = {
        'sm-button': Button,
        'sm-file-selector': FileSelector,
        'sm-file-list': FileList,
        'sm-file-item': FileItem
    };

    static computed = {
        className() {
            return cx(this).build();
        }
    };

    static dataTypes = {
        mode: DataTypes.oneOf(['xhr']).isRequired,
        headers: DataTypes.object,
        multiple: DataTypes.bool.isRequired,
        name: DataTypes.string.isRequired,
        withCredentials: DataTypes.bool.isRequired,
        disabled: DataTypes.bool.isRequired,
        accept: DataTypes.string,
        maxSize: DataTypes.number,
        validateFile: DataTypes.func,
        data: DataTypes.object,
        json: DataTypes.bool,
        upload: DataTypes.func
    };

    initData() {
        return {
            mode: 'xhr',
            headers: {},
            multiple: false,
            data: {},
            name: 'file',
            withCredentials: false,
            autoUpload: true,
            disabled: false,
            json: false
        };
    }

    inited() {

        let {files, extentions} = this.data.get();

        this.data.set(
            'files',
            files.map(file => {
                return {
                    ...file,
                    status: 'uploaded',
                    [ID_SYMBOL]: guid()
                };
            })
        );

        if (typeof extentions === 'string') {
            this.data.set('extentions', extentions.split(/\s*,\s*/));
        }

    }

    addFiles(files) {
        for (let file of files) {
            this.uploadFile(file);
        }
    }

    isSameFile(f1, f2) {
        return f1 === f2 || f1[ID_SYMBOL] === f2[ID_SYMBOL];
    }

    uploadFile(rawFile) {

        let plainFile = {
            name: rawFile.name,
            size: rawFile.size,
            status: 'uploading',
            [ID_SYMBOL]: guid()
        };

        let errorMessage = this.validateFile(plainFile);

        if (errorMessage) {
            plainFile = {
                ...plainFile,
                status: 'error',
                errorMessage
            };
            this.data.push('files', plainFile);
            return;
        }

        this.data.push('files', plainFile);

        let {
            upload = DEFAULT_UPLOAD,
            name,
            action,
            headers,
            data,
            withCredentials
        } = this.data.get();

        /**
         * 创建一个保护起来的回调函数
         *
         * 由于在上传过程中，可能会有某个文件被删除或者取消或者整个组件都被干掉了
         * 因此每个回调处理函数都需要进行一次包裹：
         *
         * 如果事件触发时，文件描述对象还在 files 中，那么就执行原有回调处理函数，并添加当前最新的下标和最新的 file
         *
         * @param  {Function} handler 回调处理
         * @return {Function}
         */
        const createProtectedHandler = handler => (...args) => {

            if (!this.data) {
                return;
            }

            let files = this.data.get('files');
            for (let i = 0, len = files.length; i < len; i++) {
                let file = files[i];
                if (this.isSameFile(file, plainFile)) {
                    return handler(i, file, ...args);
                }
            }
        };

        const progressHandler = createProtectedHandler((index, file, progress) => {
            let nextFile = {...file, progress};
            this.data.set(`files.${index}`, {...file, progress});
            this.fire('progress', nextFile);
        });

        const uploadSuccessHandler = createProtectedHandler((index, file, result) => {

            if (typeof result === 'string') {
                result = {
                    url: result
                };
            }

            let nextFile = {
                ...plainFile,
                ...result,
                status: 'uploaded'
            };

            this.data.set(`files.${index}`, nextFile);
            this.fire('success', nextFile);

        });

        const uploadFailedHandler = createProtectedHandler((index, file, error) => {

            let nextFile = {
                ...file,
                status: 'error',
                error
            };

            this.data.set(`files.${index}`, nextFile);
            this.fire('error', nextFile);
        });

        upload(
            rawFile,
            {name, action, headers, withCredentials, data},
            {
                progress: progressHandler,
                done: uploadSuccessHandler,
                fail: uploadFailedHandler
            }
        );

    }

    removeFile(file) {
        this.data.set('files', this.data.get('files').filter(f => (f !== file)));
        this.fire('remove', file);
    }

    validateFile(file) {
        let validateFile = this.data.get('validateFile');
        return validateFile ? validateFile(file) : this.validateSize(file.size);
    }

    validateSize(size) {
        let maxSize = this.data.get('maxSize') || 0;
        return !maxSize || size <= maxSize * 1024 * 1024 ? null : `文件大小不得超过${maxSize}MB`;
    }

}
