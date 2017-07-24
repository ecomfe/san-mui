/**
 * @file upload
 * @author leon <ludafa@outlook.com>
 */

/* globals FormData, XMLHttpRequest */

export default function upload(file, options, {progress, done, fail}) {

    let {action, headers, withCredentials, name, json, data} = options;

    let xhr = file.xhr = new XMLHttpRequest();

    xhr.upload.onprogress = e => {
        let {loaded, total} = e;
        progress(Math.round(loaded / total * 100));
    };

    xhr.onload = e => {

        let data = xhr.responseText;
        let contentType = xhr.getResponseHeader('Content-Type');

        if (json || contentType && contentType.startsWith('application/json')) {
            try {
                data = JSON.parse(data);
            }
            catch (e) {
                fail(new Error('cannot parse response body to json'));
                return;
            }
        }

        done(data);
    };

    xhr.onerror = e => {
        fail(e);
    };

    xhr.withCredentials = withCredentials;

    xhr.open('POST', action, true);

    if (headers) {
        Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
    }

    let formData = new FormData();

    formData.append(name, file);

    if (data) {
        Object.keys(data).forEach(key => {

            let item = data[key];

            if (!Array.isArray(item)) {
                item = [item];
            }

            for (let i of item) {
                formData.append(key, i);
            }

        });
    }

    xhr.send(formData);

}
