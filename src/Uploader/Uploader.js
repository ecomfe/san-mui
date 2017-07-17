/**
 * @file Upload
 * @author nemo <474021406@qq.com>
 */

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
            headers: {},
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

// let FileUploader;
// const method = {
//     repeatSet(obj, fn) {
//         Object.keys(obj).forEach(key => {
//             fn(key, obj[key]);
//         });
//     },
//     initUploader(file) {
//         let uploader = new FileUploader({
//             opt: this.data.get('opt'),
//             file: file,
//             fileList: this.fileList,
//             viewUpdate: () => {
//                 this.data.set('fileList', this.fileList);
//             }
//         });
//         uploader.init();
//         this.fileList.push(uploader);
//         this.data.set('fileList', this.fileList);
//     }
// };
//
// FileUploader = function (params) {
//     this.opt = params.opt;
//     this.file = params.file;
//     this.fileList = params.fileList;
//     this.viewUpdate = params.viewUpdate;
// };
//
// FileUploader.prototype.init = function () {
//     this.xhr = new XMLHttpRequest();
//     this.formData = new FormData();
//     this.opt.data[this.opt.name] = this.file;
//     method.repeatSet(this.opt.data, this.formData.append.bind(this.formData));
//
//     this.opt['on-change'](this.file, this.fileList.map(one => one.file));
//
//     this.xhr.upload.onprogress = e => {
//         let percentage = 0;
//
//         if (e.lengthComputable) {
//             percentage = e.loaded / e.total;
//         }
//         this.opt['on-progress'](e, this.file, this.fileList.map(one => one.file));
//         this.file.progressCss = {width: 100 * percentage + '%'};
//         this.viewUpdate();
//     };
//     this.xhr.onreadystatechange = e => {
//         if (this.xhr.readyState === 4) {
//             if (/20/.test(this.xhr.status)) {
//                 this.file.response = JSON.parse(this.xhr.response);
//                 this.opt['on-success'](JSON.parse(this.xhr.response), this.file, this.fileList.map(one => one.file));
//                 this.file.progressCss = {width: '100%'};
//                 this.viewUpdate();
//             }
//             else {
//                 this.opt['on-error']('error', this.file, this.fileList.map(one => one.file));
//             }
//             this.file.uploaded = true;
//             this.opt['on-change'](this.file, this.fileList.map(one => one.file));
//         }
//     };
//     this.xhr.withCredentials = this.opt['with-credentials'];
// };
// FileUploader.prototype.upload = function () {
//     if (this.opt['before-upload'](this.file) && !this.file.uploaded) {
//         this.xhr.open('POST', this.opt.action);
//         method.repeatSet(Object.assign({
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }, this.opt.headers), this.xhr.setRequestHeader.bind(this.xhr));
//         this.xhr.send(this.formData);
//     }
// };
// FileUploader.prototype.abort = function () {
//     this.xhr.abort();
// };
