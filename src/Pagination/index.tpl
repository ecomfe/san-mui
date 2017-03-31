<div class="sm-pagination">
    <div class="sm-pagination-inner" san-if="total">
        <div class="page-selector">
            <span class="pre-page{{ current === 1 | yesToBe(' disable') }}" on-click="setCurrentPage(current - 1)">
                <label san-if="lastPageText">{{ lastPageText }}</label>
                <label san-else class="pre-page-icon arrow-icon"></label>
            </span>

            <span class="page-num first-page{{ current === 1 | yesToBe(' current') }}" on-click="setCurrentPage(1)">1</span>

            <span san-if="current >= pageGroupLen" class="pre-group" on-click="setCurrentPage(current - pageGroupLen, 1)">...</span>

            <span class="page-num" san-if="current - 2 >= 2 && current - 2 < totalPage" on-click="setCurrentPage(current - 2)" da-index="aaa">{{ current - 2 }}</span>
            <span class="page-num" san-if="current - 1 >= 2 && current - 1 < totalPage" on-click="setCurrentPage(current - 1)" da-index="bbb">{{ current - 1 }}</span>
            <span class="page-num current" san-if="current >= 2 && current < totalPage" on-click="setCurrentPage(current)" da-index="ccc">{{ current }}</span>
            <span class="page-num" san-if="current + 1 >= 2 && current + 1 < totalPage" on-click="setCurrentPage(current + 1)" da-index="ddd">{{ current + 1 }}</span>
            <span class="page-num" san-if="current + 2 >= 3 && current + 2 < totalPage" on-click="setCurrentPage(current + 2)" da-index="eee">{{ current + 2 }}</span>

            <span san-if="totalPage - current - 1 >= pageGroupLen" class="next-group" on-click="setCurrentPage(current + pageGroupLen, 1)">...</span>

            <span san-if="totalPage > 1" class="page-num last-page{{ current === totalPage | yesToBe(' current') }}" on-click="setCurrentPage(totalPage)">{{ totalPage }}</span>

            <span class="next-page{{ current === totalPage | yesToBe(' disable') }}" on-click="setCurrentPage(current + 1)">
                <label san-if="nextPageText">{{ nextPageText }}</label>
                <label san-else class="next-page-icon arrow-icon"></label>
            </span>
        </div>
        <div class="page-size-selector{{ pageSizePopupOpen | yesToBe(' open') }}" san-if="showSizeChanger">
            <section class="selector dropdown-selector" on-click="toggleSelectorPopup()">{{ pageSize }} / 页<i class="triangle"></i></section>
            <section class="selector-popup">
                <section san-for="pageSizeItem in pageSizeOptions" class="page-size-item{{ pageSizeItem === pageSize | yesToBe(' active') }}" on-click="changePageSize(pageSizeItem)">{{ pageSizeItem }} / 页</section>
            </section>
        </div>
    </div>
</div>
