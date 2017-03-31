/**
 * @file Pagination/index.js Pagination component for San
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

import './index.styl';
import san from 'san';
import template from './index.tpl';

const currentKey = 'current';
const pageSizeKey = 'pageSize';
const showSizeChangerKey = 'showSizeChanger';
const totalKey = 'total';
const pageSizeOptionsKey = 'pageSizeOptions';
const totalPageKey = 'totalPage';
const pageSizePopupOpenKey = 'pageSizePopupOpen';
const defaultPageSize = 10;
const defaultCurrent = 1;
const defaultPageSizeOption = [5, 10, 20, 50];
const pageGroupLen = 5;

export default san.defineComponent({

    template,

    initData() {
        // default data
        return {
            [pageSizeKey]: defaultPageSize,
            [currentKey]: defaultCurrent,
            [showSizeChangerKey]: true,
            [pageSizeOptionsKey]: defaultPageSizeOption,
            // 除去页首和页尾以多少个为一组，五个为一组则最多展示五个页码
            pageGroupLen
        };
    },

    inited() {
        // 数据容错
        this.transNumber(totalKey);
        let total = this.data.get(totalKey);

        if (!total) {
            console.error('Please provide total');
            return;
        }

        this.transBoolean(showSizeChangerKey);
        this.transNumber(currentKey, defaultCurrent);
        this.transNumber(pageSizeKey, defaultPageSize);

        let current = this.data.get(currentKey);
        let pageSizeOptions = this.data.get(pageSizeOptionsKey);
        let pageSize = this.data.get(pageSizeKey);
        // 如果给的pageSizeOptions不是数组类型，做数据转换
        if (!Array.isArray(pageSizeOptions)) {
            try {
                pageSizeOptions = JSON.parse(pageSizeOptions);
            }
            catch (err) {
                pageSizeOptions = defaultPageSizeOption;
            }
            finally {
                if (!Array.isArray(pageSizeOptions)) {
                    pageSizeOptions = defaultPageSizeOption;
                }
                this.data.set(pageSizeOptionsKey, pageSizeOptions);
            }
        }
        // 如果给定pageSize不在可选范围内，将设置为可选范围的第一个数据，若数据格式不符合要求，将设置为默认页码10
        if (!pageSizeOptions.includes(pageSize)) {
            this.setPageSize(pageSizeOptions[0]);
        }
        let totalPage = this.getTotalPage();
        this.data.set(totalPageKey, totalPage);
        // 如果给定current不在页码范围内，将设置为默认页码1
        if (current > totalPage || current < defaultCurrent) {
            this.data.set(currentKey, defaultCurrent);
        }

    },

    setPageSize(pageSize) {
        if (this.data.get(pageSizeOptionsKey).includes(pageSize)) {
            this.data.set(pageSizeKey, parseInt(pageSize, 10));
        }
    },

    setCurrentPage(pageNum, canOverflow) {

        let current = parseInt(pageNum, 10);
        let totalPage = this.data.get(totalPageKey);

        if (canOverflow) {
            if (current > totalPage) {
                current = totalPage;
            }
            if (current < defaultCurrent) {
                current = defaultCurrent;
            }
        }

        if (
            current >= defaultCurrent
            && current <= totalPage
            && current !== this.data.get(currentKey)
        ) {
            this.data.set(currentKey, current);
            this.fire('pageChange', {
                pageNum: current,
                pageSize: this.data.get(pageSizeKey)
            });
        }
    },

    toggleSelectorPopup() {
        this.data.set(pageSizePopupOpenKey, !this.data.get(pageSizePopupOpenKey));
    },

    changePageSize(pageSize) {

        let me = this;
        let oldPageSize = this.data.get(pageSizeKey);
        let oldCurrent = this.data.get(currentKey);
        let current = Math.ceil(((oldCurrent - 1) * oldPageSize + 1) / pageSize);

        this.setPageSize(pageSize);
        this.data.set(totalPageKey, this.getTotalPage());
        // 这里不能直接setCurrentPage，有一个莫名的bug
        setTimeout(() => {
            me.setCurrentPage(current);
        }, 0);

        this.fire('pageSizeChange', {
            pageSize,
            pageNum: current
        });

        this.toggleSelectorPopup();
    },

    getTotalPage() {
        return Math.ceil(this.data.get(totalKey) / this.data.get(pageSizeKey));
    },

    /**
     * 布尔值转换，字符串false转换为布尔值false，其他则按正常转换进行转换
     *
     * @param  {string} key 要转换的数据key
     */
    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    },

    transNumber(key, defaultVal) {
        let value = parseInt(this.data.get(key), 10);
        this.data.set(key, value || defaultVal);
    }
});
