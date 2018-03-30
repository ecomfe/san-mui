/**
 * @file Pagination/index.js Pagination component for San
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

import {Component, DataTypes} from 'san';
import {create} from '../common/util/cx';

const cx = create('pagination');
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

export default class extends Component {
    /* eslint-disable max-len */
    static template = `
        <div class="{{computedClassName}}">
            <div class="${cx.getPartClassName('inner')}" san-if="total">
                <div class="page-selector">
                    <span class="pre-page{{ current === 1 ? ' disable' : '' }}" on-click="setCurrentPage(current - 1)">
                        <label san-if="lastPageText">{{ lastPageText }}</label>
                        <label san-else class="pre-page-icon arrow-icon"></label>
                    </span>
                    <span class="page-num first-page{{ current === 1 ? ' current' : '' }}" on-click="setCurrentPage(1)">1</span>
                    <span san-if="current >= pageGroupLen" class="pre-group" on-click="setCurrentPage(current - pageGroupLen)">...</span>
                    <span class="page-num" san-if="current - 2 >= 2 && current - 2 < totalPage" on-click="setCurrentPage(current - 2)">{{ current - 2 }}</span>
                    <span class="page-num" san-if="current - 1 >= 2 && current - 1 < totalPage" on-click="setCurrentPage(current - 1)">{{ current - 1 }}</span>
                    <span class="page-num current" san-if="current >= 2 && current < totalPage" on-click="setCurrentPage(current)">{{ current }}</span>
                    <span class="page-num" san-if="current + 1 >= 2 && current + 1 < totalPage" on-click="setCurrentPage(current + 1)">{{ current + 1 }}</span>
                    <span class="page-num" san-if="current + 2 >= 3 && current + 2 < totalPage" on-click="setCurrentPage(current + 2)">{{ current + 2 }}</span>
                    <span san-if="totalPage - current - 1 >= pageGroupLen" class="next-group" on-click="setCurrentPage(current + pageGroupLen)">...</span>
                    <span san-if="totalPage > 1" class="page-num last-page{{ current === totalPage ? ' current' : '' }}" on-click="setCurrentPage(totalPage)">{{ totalPage }}</span>
                    <span class="next-page{{ current === totalPage ? ' disable' : '' }}" on-click="setCurrentPage(current + 1)">
                        <label san-if="nextPageText">{{ nextPageText }}</label>
                        <label san-else class="next-page-icon arrow-icon"></label>
                    </span>
                </div>
                <div class="page-size-selector{{ pageSizePopupOpen ? ' open' : '' }}" san-if="showSizeChanger">
                    <section class="selector dropdown-selector" on-click="toggleSelectorPopup()">{{ pageSize }} / 页<i class="triangle"></i></section>
                    <section class="selector-popup">
                        <section
                            san-for="pageSizeItem in pageSizeOptions"
                            class="page-size-item{{ pageSizeItem === pageSize ? ' active' : '' }}"
                            on-click="changePageSize(pageSizeItem)">
                            {{ pageSizeItem }} / 页
                        </section>
                    </section>
                </div>
            </div>
        </div>
    `;
    /* eslint-enable max-len */
    static computed = {
        computedClassName() {
            return cx(this).build();
        },
        [totalPageKey]() {
            return Math.ceil(this.data.get(totalKey) / this.data.get(pageSizeKey)) || 0;
        }
    };

    static dataTypes = {
        total: DataTypes.number.isRequired,
        pageSize: DataTypes.number.isRequired,
        showSizeChanger: DataTypes.bool,
        pageSizeOptions: DataTypes.arrayOf(DataTypes.number).isRequired,
        nextPageText: DataTypes.string,
        lastPageText: DataTypes.string
    };

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
    }

    inited() {

        // 数据容错
        let current = this.data.get(currentKey);
        let pageSizeOptions = this.data.get(pageSizeOptionsKey);
        let pageSize = this.data.get(pageSizeKey);

        if (this.data.get(showSizeChangerKey) && !pageSizeOptions.includes(pageSize)) {
            this.setPageSize(pageSizeOptions[0]);
        }
        // 如果给定current不在页码范围内，将设置为默认页码1
        if (current > this.data.get(totalPageKey) || current < defaultCurrent) {
            this.data.set(currentKey, defaultCurrent);
        }

    }

    setPageSize(pageSize) {
        if (this.data.get(pageSizeOptionsKey).includes(pageSize)) {
            this.data.set(pageSizeKey, parseInt(pageSize, 10));
        }
    }

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
                    page: current,
                    pageSize: this.data.get(pageSizeKey)
                });
            }
        }
    }

    toggleSelectorPopup() {
        this.data.set(pageSizePopupOpenKey, !this.data.get(pageSizePopupOpenKey));
    }

    changePageSize(pageSize) {

        let oldPageSize = this.data.get(pageSizeKey);
        let oldCurrent = this.data.get(currentKey);
        let current = Math.ceil(((oldCurrent - 1) * oldPageSize + 1) / pageSize);

        this.setPageSize(pageSize);
        this.setCurrentPage(current, true);

        this.fire('pageSizeChange', {
            pageNum: current,
            page: current,
            pageSize
        });

        this.toggleSelectorPopup();
    }

}
