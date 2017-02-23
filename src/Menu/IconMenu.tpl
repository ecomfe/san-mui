<div class="sm-iconmenu">
    <san-icon value="{{ icon }}" on-click="toggleMenu" />

    <ul class="sm-menu-list depth-2 {{ position }} {{ isHidden | yesToBe('list-hidden') }}"
        style="opacity:{{ opacity }};height:{{ height }};max-height:{{ maxHeight }}px;">

        <slot name="menuItem"></slot>
    </ul>
</div>