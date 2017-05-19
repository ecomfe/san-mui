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

let fileList = [];

export default san.defineComponent({
    template: `
    	<div>
	        <div class="upload sm-button variant-info variant-raised">
	        	上传
	        	<input san-if="!multiple" type="file" on-change="reciveFile($event)"/>
	        	<input san-if="multiple" type="file" on-change="reciveFile($event)" multiple/>
	        </div>
	        <div san-if="showFileList">
		        <span san-for="file in fileList">{{ file.name }}</span>
	        </div>
	    </div>
    `,
    components: {
        
    },
    initData() {
    	return {
    		fileList: fileList
    	}
    },
    computed: {
    	multiple: function() {
    		return this.data.get('opt').multiple
    	},
    	showFileList: function() {
    		return this.data.get('opt')['show-file-list'] === true
    	}
    },
    inited() {
    	console.log(this.data.get('opt'))
    },
    reciveFile(event) {
    	let self = this
    	let opt = this.data.get('opt')
    	Array.prototype.slice.call(event.target.files).forEach(file => {
			let xhr = new XMLHttpRequest()
	    	let formData = new FormData();

	    	opt.data[opt.name || 'file'] = file
			_method.repeatSet(opt.data, formData.append.bind(formData))

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && /20/.test(xhr.status)) {
					fileList.push(file)
					self.data.set('fileList', fileList)
				}
			}
			xhr.open('POST', opt.action)

			_method.repeatSet(Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, opt.headers), xhr.setRequestHeader.bind(xhr))
		    xhr.withCredentials = opt['with-credentials'] || false
		    xhr.send(formData);
    	})
    }
});

