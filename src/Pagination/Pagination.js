/**
 * @file Pagination/index.js Pagination component for San
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

import san from 'san';
import cx from 'classnames';

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

    template: `
        <div class="sm-pagination">
            <div class="sm-pagination-inner" san-if="total">
                <div class="sm-pagination-page-selector">
                    <span
                        class="pre-page{{ current === 1 ? ' disable' : '' }}"
                        on-click="setCurrentPage(current - 1)">
                        <label san-if="lastPageText">{{ lastPageText }}</label>
                        <label san-else class="pre-page-icon arrow-icon"></label>
                    </span>

                    <span class="{{firstPageClass}}" on-click="setCurrentPage(1)">1</span>

                    <span
                        san-if="current >= pageGroupLen"
                        class="sm-pagination-pre-group"
                        on-click="setCurrentPage(current - pageGroupLen)">
                        ...
                    </span>
                    <span
                        class="sm-pagination-page-num"
                        san-if="current - 2 >= 2 && current - 2 < totalPage" on-click="setCurrentPage(current - 2)">
                        {{ current - 2 }}
                    </span>
                    <span
                        class="sm-pagination-page-num"
                        san-if="current - 1 >= 2 && current - 1 < totalPage" on-click="setCurrentPage(current - 1)">
                        {{ current - 1 }}
                    </span>
                    <span
                        class="sm-pagination-page-num state-current"
                        san-if="current >= 2 && current < totalPage" on-click="setCurrentPage(current)">
                        {{ current }}
                    </span>
                    <span
                        class="sm-pagination-page-num"
                        san-if="current + 1 >= 2 && current + 1 < totalPage" on-click="setCurrentPage(current + 1)">
                        {{ current + 1 }}
                    </span>
                    <span
                        class="sm-pagination-page-num"
                        san-if="curren©t + 2 >= 3 && current + 2 < totalPage" on-click="setCurrentPage(current + 2)">
                        {{ current + 2 }}
                    </span>
                    <span
                        san-if="totalPage - current - 1 >= pageGroupLen"
                        class="sm-pagination-next-group"
                        on-click="setCurrentPage(current + pageGroupLen)">
                        ...
                    </span>

                    <span
                        san-if="totalPage > 1"
                        class="{{lastPageClass}}"
                        on-click="setCurrentPage(totalPage)">
                        {{totalPage}}
                    </span>

                    <span
                        class="next-page{{ current === totalPage ? ' disable' : '' }}"
                        on-click="setCurrentPage(current + 1)">
                        <label san-if="nextPageText">{{ nextPageText }}</label>
                        <label san-else class="next-page-icon arrow-icon"></label>
                    </span>
                </div>
                <div
                    class="{{pageSizeClass}}"
                    san-if="showSizeChanger">
                    <section
                        class="selector dropdown-selector"
                        on-click="toggleSelectorPopup()">
                        {{pageSize}} / 页<i class="triangle"></i>
                    </section>
                    <section class="selector-popup">
                        <section
                            san-for="pageSizeItem in pageSizeOptions"
                            class="{{pageSizeItemClass}}"
                            on-click="changePageSize(pageSizeItem)">
                            {{ pageSizeItem }} / 页
                        </section>
                    </section>
                </div>
            </div>
        </div>
    `,

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

    computed: {
        firstPageClass() {
            return cx(
                'page-num',
                'first-page',
                {
                    current: this.data.get('current') === 1
                }
            );
        },
        pageSizeClass() {
            return cx(
                'sm-pagination-page-size-selector',
                {
                    'state-open': this.data.get('pageSizePopupOpen')
                }
            );
        },
        lastPageClass() {
            return cx(
                'sm-pagination-page-num',
                'state-last-page',
                {
                    current: this.data.get('currrent') === this.data.get('totalPage')
                }
            );
        },
        pageSizeItemClass() {
            return cx(
                'sm-pagination-page-size-item',
                {
                    active: this.data.get('pageSizeItem') === this.data.get('pageSize')
                }
            );
        },
        [totalPageKey]() {
            return Math.ceil(this.data.get(totalKey) / this.data.get(pageSizeKey)) || 0;
        }
    },

    inited() {
        // 数据容错
        this.transNumber(totalKey);

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
        if (this.data.get(showSizeChangerKey) && !pageSizeOptions.includes(pageSize)) {
            this.setPageSize(pageSizeOptions[0]);
        }
        // 如果给定current不在页码范围内，将设置为默认页码1
        if (current > this.data.get(totalPageKey) || current < defaultCurrent) {
            this.data.set(currentKey, defaultCurrent);
        }

    },

    setPageSize(pageSize) {
        if (this.data.get(pageSizeOptionsKey).includes(pageSize)) {
            this.data.set(pageSizeKey, parseInt(pageSize, 10));
        }
    },

    /**
     * 设置page
     *
     * @param {number} pageNum 页码
     * @param {boolean} silence 是否静默更新，如为true则不触发事件
     */
    setCurrentPage(pageNum, silence) {

        let current = parseInt(pageNum, 10);
        let totalPage = this.data.get(totalPageKey);

        if (current > totalPage) {
            current = totalPage;
        }
        if (current < defaultCurrent) {
            current = defaultCurrent;
        }

        if (
            current >= defaultCurrent
            && current <= totalPage
            && current !== this.data.get(currentKey)
        ) {
            this.data.set(currentKey, current);
            if (!silence) {
                this.fire('pageChange', {
                    pageNum: current,
                    pageSize: this.data.get(pageSizeKey)
                });
            }
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
        me.setCurrentPage(current, true);

        this.fire('pageSizeChange', {
            pageSize,
            pageNum: current
        });

        this.toggleSelectorPopup();
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
