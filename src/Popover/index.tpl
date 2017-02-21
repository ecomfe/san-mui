<div class="sm-popover {{ placement }}{{ !open | yesToBe(' hide') }}{{ open | yesToBe(' show') }}{{ animation | yesToBe(' animation') }}{{ !showArrow | yesToBe(' no-arrow') }}"
    style="left: {{ posLeft }}px; top: {{ posTop }}px;">
    <div san-if="{{ showArrow }}" class="arrow arrow-{{ placement }}"></div>
    <div class="inner">
        <slot></slot>
    </div>
</div>
