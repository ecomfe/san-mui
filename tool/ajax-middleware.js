/**
 * @file ajax handler for dev
 * @author ielgnaw(wuji0223@gmail.com)
 */

import path from 'path';
import fs from 'fs';
import url from 'url';
import queryString from 'querystring';

const requestHandler = (req) => {
    const pathName = req.path || '';

    const mockFilePath = path.join(__dirname, '../mock/ajax', pathName) + '.js';
    if (!fs.existsSync(mockFilePath)) {
        return false;
    }

    console.log('Ajax Request Path: ', pathName);

    delete require.cache[require.resolve(mockFilePath)];
    var mockDataHandler = require(mockFilePath);
    return mockDataHandler;
};

export default function ajaxMiddleWare(req, res, next) {
    let query = url.parse(req.url).query;

    if (query) {
        query = queryString.parse(query);
        if (query.isAjax) {
            const postData = req.body || '';
            const mockDataHandler = requestHandler(req);
            let data = mockDataHandler.response(query, postData, req);
            let contentType = req.headers['Content-Type'];

            // 返回值未指定内容类型，默认按JSON格式处理返回
            if (!contentType) {
                contentType = 'application/json;charset=UTF-8';
                req.headers['Content-Type'] = contentType;
                res.setHeader('Content-Type', contentType);
                data = JSON.stringify(data || {});
            }

            res.end(data);

            return;
        }
    }
    return next();
};
