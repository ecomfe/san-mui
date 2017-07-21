/**
 * @file Upload
 * @author nemo <474021406@qq.com>
 */

/* globals XMLHttpRequest, FormData */

import {Component, DataTypes} from 'san';
import Button from '../Button';
import {create} from '../common/util/cx';

const cx = create('uploader');

export default class Uploader extends Component {

    static template = `
        <div class="{{className}}">
            <sm-button
                variants="raised info"
                on-click="click">
                选取文件
            </sm-button>
            <input
                class="${cx.getPartClassName('file')}"
                type="file"
                on-change="reciveFile($event)"
                accept="{{accept}}"
                multiple="{{multiple}}" />
        </div>
    `;

    static components = {
        'sm-button': Button
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
        autoUpload: DataTypes.bool.isRequired,
        disabled: DataTypes.bool.isRequired,
        accept: DataTypes.string,
        extentions: DataTypes.arrayOf(DataTypes.string),
        maxSize: DataTypes.number
    };

    initData() {
        return {
            mode: 'xhr',
            headers: {
                // 'Content-Type': 'multipart/form-data'
            },
            multiple: false,
            data: {},
            name: 'file',
            withCredentials: false,
            autoUpload: true,
            disabled: false
        };
    }

    inited() {
        this.files = [];
    }

    click() {
        this.el.lastElementChild.click();
    }

    reciveFile(e) {

        let files = this.files = Array.from(e.target.files);

        if (this.data.get('autoUpload')) {
            for (let file of files) {
                this.upload(file);
            }
        }

    }

    upload(file) {

        let {action, headers, withCredentials, name} = this.data.get();

        let xhr = file.xhr = new XMLHttpRequest();

        xhr.upload.onprogress = e => {
            this.onUploadProgress(file, e);
        };

        xhr.onload = e => {
            file.status = 'success';
            this.onUploadSucceed(file, e);
        };

        xhr.onerror = e => {
            file.status = 'error';
            this.onUploadFailed(file, e);
        };

        xhr.withCredentials = withCredentials;

        xhr.open('POST', action, true);

        if (headers) {
            Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
        }

        let formData = new FormData();

        formData.append(name, file);

        xhr.send(formData);


    }

    validateFile(file) {
        let extError = this.validateExtension(file.name);
        let sizeError = this.validateSize(file.size);
        return !extError && !sizeError;
    }

    validateExtension(name) {
        let exts = this.data.get('extentions');
        if (!exts || !exts.length) {
            return true;
        }
        return exts.some(ext => name.slice(-ext.length - 1) === `.${ext}`);
    }

    validateSize(size) {
        let maxSize = this.data.get('size') || 0;
        return !maxSize || size <= maxSize * 1024 * 1024;
    }

    onUploadProgress(file, e) {
        this.fire('progress', file, e);
    }

    onUploadSucceed(file, data) {
        this.fire('success', file, data);
    }

    onUploadFailed(file, error) {
        this.fire('error', file, error);
    }

}
