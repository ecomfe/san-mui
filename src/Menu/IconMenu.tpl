<div class="sm-iconmenu {{ className }}">
    <div class="sm-iconmenu-icon">
        <san-icon value="{{ icon }}" on-click="toggleMenu" />
    </div>

    <div class="sm-menu-list depth-2 {{ open | yesOrNoToBe('', 'list-hidden') }}"
        style="max-height:{{ maxHeightS }}px;opacity:{{ opacity }};left:{{ left }}px;top:{{ top }}px;">

        <slot></slot>
    </div>
</div>