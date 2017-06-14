/**
 * @file Upload
 * @author nemo <luoxincheng@baidu.com>
 */

import san from 'san';


const _method = {
	repeatSet: function(obj, fn) {
		for (let i in obj) {
			fn(i, obj[i])
		}
	},
	initUploader: function(file) {
		let uploader = new fileUploader({
			opt: this.data.get('opt'),
			file: file,
			fileList: this.fileList,
			viewUpdate: () => {
				this.data.set('fileList', this.fileList)
			}
		})
		uploader.init()
		this.fileList.push(uploader)
		this.data.set('fileList', this.fileList)
	}
}

let fileUploader = function(params) {
	this.opt = params.opt
	this.file = params.file
	this.fileList = params.fileList
	this.viewUpdate = params.viewUpdate
}
fileUploader.prototype.init = function() {
	this.xhr = new XMLHttpRequest()
	this.formData = new FormData()
	this.opt.data[this.opt.name] = this.file
	_method.repeatSet(this.opt.data, this.formData.append.bind(this.formData))

	this.opt['on-change'](this.file, this.fileList.map(one => one.file))

	this.xhr.upload.onprogress = e => {
	    let percentage = 0;

	    if ( e.lengthComputable ) {
	        percentage = e.loaded / e.total
	    }
	    this.opt['on-progress'](e, this.file, this.fileList.map(one => one.file))
	    this.file.progressCss = {width: 100 * percentage + '%'}
	    this.viewUpdate()
	};
	this.xhr.onreadystatechange = e => {
		if (this.xhr.readyState === 4) {
			if (/20/.test(this.xhr.status)) {
				this.file['response'] = JSON.parse(this.xhr.response)
				this.opt['on-success'](JSON.parse(this.xhr.response), this.file, this.fileList.map(one => one.file))
				this.file.progressCss = {width: '100%'}
				this.viewUpdate()
			} else {
				this.opt['on-error']('error', this.file, this.fileList.map(one => one.file))
			}
			this.file.uploaded = true
			this.opt['on-change'](this.file, this.fileList.map(one => one.file))
		}
	}
	this.xhr.withCredentials = this.opt['with-credentials']
}
fileUploader.prototype.upload = function() {
	if (this.opt['before-upload'](this.file) && !this.file.uploaded) {
		this.xhr.open('POST', this.opt.action)
		_method.repeatSet(Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.opt.headers), this.xhr.setRequestHeader.bind(this.xhr))
		this.xhr.send(this.formData)
	}
}
fileUploader.prototype.abort = function() {
	this.xhr.abort()
}


let initOpts = {
	action: '',
	headers: {},
	multiple: false,
	data: {},
	name: 'file',
	'with-credentials': false,
	'show-file-list': true,
	drag: false,
	accept: '',
	'on-preview': function() {},
	'on-remove': function() {},
	'on-success': function() {},
	'on-error': function() {},
	'on-progress': function() {},
	'on-change': function() {},
	'before-upload': function() { return true },
	'auto-upload': true,
	disabled: false
}


export default san.defineComponent({
    template: `
    	<div>
	        <div san-if="!drag" class="upload sm-button variant-info variant-raised">
	        	<span san-if="autoUpload">上传</span>
	        	<span san-if="!autoUpload">选取文件</span>
	        	<input san-if="!multiple && !disabled" type="file" on-change="reciveFile($event)" accept="{{accept}}"/>
	        	<input san-if="multiple && !disabled" type="file" on-change="reciveFile($event)" accept="{{accept}}" multiple/>
	        </div>
	        <div san-if="!autoUpload && !drag" class="upload sm-button variant-info variant-raised" on-click="excuteUpload()">开始上传</div>
	        <div san-if="drag" class="upload-drag" on-drop="dropFile($event)" on-dragenter="dragEnter($event)" on-dragover="dragOver($event)"></div>
	        <div san-if="showFileList">
	        	<span  class="file-list" san-for="file, index in fileList" on-click="fileListClick(index)">
	        		{{ file.file.name }}
	        		<span class="close" on-click="removeFile(index)">+</span>
					<span class="progress" style="{{ file.file.progressCss }}"></span>
	        	</span>
	        </div>
	    </div>
    `,
    components: {
        
    },
    initData() {
    	return {
    		fileList: []
    	}
    },
    computed: {
    	multiple() {
    		return this.data.get('opt')['multiple']
    	},
    	showFileList() {
    		return this.data.get('opt')['show-file-list']
    	},
    	autoUpload() {
    		return this.data.get('opt')['auto-upload']
    	},
    	accept() {
    		return this.data.get('opt')['accept']
    	},
    	drag() {
    		return this.data.get('opt')['drag']
    	},
    	disabled() {
    		return this.data.get('opt')['disabled']
    	},
    	fileList() {
    		return this.fileList
    	}
    },
    inited() {
		this.fileList = []
    	this.data.set('opt', Object.assign({}, initOpts, this.data.get('opt')))
    },
    fileListClick(index) {
    	this.data.get('opt')['on-preview'](this.fileList[index].file)
    },
    excuteUpload() {
    	this.fileList.forEach(one => one.upload())
    },
    removeFile(index) {
    	this.fileList[index].abort()
    	let file = this.fileList.splice(index, 1)
    	this.data.get('opt')['on-remove'](file[0].file, this.fileList.map(one => one.file))
    	this.data.set('fileList', this.fileList)
    },
    dragEnter(event) {
    	event.preventDefault();
    	event.stopPropagation();
    },
    dragOver(event) {
    	event.preventDefault();
    	event.stopPropagation();
    },
    dropFile(event) {
    	event.preventDefault();
    	event.stopPropagation();
    	!this.data.get('opt').disabled && Array.prototype.slice.call(event.dataTransfer.files).forEach(file => {
			_method.initUploader.call(this, file)
    	})
    	this.fileList.forEach(one => one.upload())
    },
    reciveFile(event) {
    	Array.prototype.slice.call(event.target.files).forEach(file => {
    		_method.initUploader.call(this, file)
    	})
    	event.target.value = ''
    	this.data.get('opt')['auto-upload'] && this.fileList.forEach(one => one.upload())
    }
});

