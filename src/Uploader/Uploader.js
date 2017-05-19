/**
 * @file Upload
 * @author nemo <luoxincheng@baidu.com>
 */

import san from 'san';

const _method = {
	setHeader: function(xhr, obj) {
		console.log(obj)
		for (let i in obj) {
			xhr.setRequestHeader(i, obj[i])
		}
	}
}

export default san.defineComponent({
    template: `
        <div class="upload sm-button variant-info variant-raised">
        	上传
        	<input san-if="{{ !multiple }}" type="file" on-change="reciveFile($event)"/>
        	<input san-if="{{ multiple }}" type="file" on-change="reciveFile($event)" multiple/>
        </div>
    `,
    components: {
        
    },
    computed: {
    	multiple: function() {
    		return this.data.get('opt').multiple
    	}
    },
    inited() {
    	console.log(this.data.get('opt'))
    },
    reciveFile(event) {
    	let opt = this.data.get('opt')
    	let xhr = new XMLHttpRequest()
    	let formData = new FormData();
    	formData.append('file', event.target.files[0])
    	xhr.onreadystatechange = function(state) {
    		console.log(state)
    	}
    	xhr.open('POST', opt.action)
    	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    	_method.setHeader(xhr, opt.headers)
        xhr.send(formData);
    }
});

