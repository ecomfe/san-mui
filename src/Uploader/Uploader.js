/**
 * @file Upload
 * @author nemo <luoxincheng@baidu.com>
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="upload sm-button variant-info variant-raised">
        	上传
        	<input type="file" on-change="reciveFile($event)"/>
        </div>
    `,
    components: {
        
    },
    inited() {
    	console.log(this.data.get('opt'))
    },
    reciveFile(event) {
    	var opt = this.data.get('opt')
    	var xhr = new XMLHttpRequest()
    	var formData = new FormData();
    	formData.append('file', event.target.files[0])
    	xhr.onreadystatechange = function(state) {
    		console.log(state)
    	}
    	xhr.open('POST', opt.action)
    	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(formData);
    }
});

