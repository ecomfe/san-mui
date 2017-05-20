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
	'auto-upload': true
}

let fileList = [];
let xhrList = [];
let progressList = [];

export default san.defineComponent({
    template: `
    	<div>
	        <div class="upload sm-button variant-info variant-raised">
	        	<span  san-if="autoUpload">上传</span>
	        	<span  san-if="!autoUpload">选取文件</span>
	        	<input san-if="!multiple" type="file" on-change="reciveFile($event)"/>
	        	<input san-if="multiple" type="file" on-change="reciveFile($event)" multiple/>
	        </div>
	        <div  san-if="!autoUpload" class="upload sm-button variant-info variant-raised" on-click="excuteUpload()">开始上传</div>
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
    		return this.data.get('opt').multiple
    	},
    	showFileList() {
    		return this.data.get('opt')['show-file-list']
    	},
    	autoUpload() {
    		return this.data.get('opt')['auto-upload']
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
    reciveFile(event) {
    	let self = this
    	let opt = this.data.get('opt')
    	Array.prototype.slice.call(event.target.files).forEach(file => {
			let xhr = new XMLHttpRequest()
	    	let formData = new FormData();

	    	let fileIndex = fileList.push(file) - 1
	    	self.data.set('fileList', fileList)

	    	opt.data[opt.name] = file
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
    	})
    	opt['auto-upload'] && xhrList.forEach(one => one())
    }
});

