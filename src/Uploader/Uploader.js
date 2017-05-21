/**
 * @file Upload
 * @author nemo <luoxincheng@baidu.com>
 */

import san from 'san';


let fileList = [];
let xhrList = [];
let progressList = [];

const _method = {
	repeatSet: function(obj, fn) {
		for (let i in obj) {
			fn(i, obj[i])
		}
	},
	initXHR: function(file) {
		let self = this
		let xhr = new XMLHttpRequest()
    	let formData = new FormData()

    	let fileIndex = fileList.push(file) - 1
    	self.data.set('fileList', fileList)

		let opt = self.data.get('opt')
    	opt.data[opt.name] = file
    	opt['on-change'](file, fileList)
		_method.repeatSet(opt.data, formData.append.bind(formData))

		xhr.upload.onprogress = function(e) {
		    let percentage = 0;

		    if ( e.lengthComputable ) {
		        percentage = e.loaded / e.total
		    }
		    opt['on-progress'](e, file, fileList)
		    file.progressCss = {width: 100 * percentage + '%'}
		    self.data.set('fileList', fileList)
	
		};
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (/20/.test(xhr.status)) {
					fileList[fileIndex]['response'] = JSON.parse(xhr.response)
					opt['on-success'](JSON.parse(xhr.response), file, fileList)
					file.progressCss = {width: '100%'}
					self.data.set('fileList', fileList)
				} else {
					opt['on-error']('error', file, fileList)
				}
				opt['on-change'](file, fileList)
			}
		}

		xhr.withCredentials = opt['with-credentials']
	    xhrList.push(function() {
	    	if (opt['before-upload'](file)) {
				xhr.open('POST', opt.action)
				_method.repeatSet(Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, opt.headers), xhr.setRequestHeader.bind(xhr))
	    		xhr.send(formData)
	    	}
	    })
	}
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
	'list-type': 'text',
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
	        		{{ file.name }}
	        		<span class="close" on-click="removeFile(index)">+</span>
					<span class="progress" style="{{ file.progressCss }}"></span>
	        	</span>
	        </div>
	    </div>
    `,
    components: {
        
    },
    initData() {
    	return {
    		fileList: fileList,

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
    	}
    },
    inited() {
    	this.data.set('opt', Object.assign(initOpts, this.data.get('opt')))
    },
    fileListClick(index) {
    	this.data.get('opt')['on-preview'](fileList[index])
    },
    excuteUpload() {
    	xhrList.forEach(one => one())
    },
    removeFile(index) {
    	let file = fileList.splice(index, 1)
    	this.data.get('opt')['on-remove'](file, fileList)
    	this.data.set('fileList', fileList)
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
			_method.initXHR.call(this, file)
    	})
    	xhrList.forEach(one => one())
    },
    reciveFile(event) {
    	Array.prototype.slice.call(event.target.files).forEach(file => {
			_method.initXHR.call(this, file)
    	})
    	this.data.get('opt')['auto-upload'] && xhrList.forEach(one => one())
    }
});

