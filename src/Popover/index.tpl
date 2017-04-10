<div class="sm-popover {{ placement }}{{ !open ? ' hide' : '' }}{{ open ? ' show' : '' }}{{ animation ? ' animation' : '' }}{{ !showArrow ? ' no-arrow' : '' }}"
    style="left: {{ posLeft }}px; top: {{ posTop }}px;">
    <div san-if="{{ showArrow }}" class="arrow arrow-{{ placement }}"></div>
    <div class="inner">
        <slot></slot>
    </div>
</div>
