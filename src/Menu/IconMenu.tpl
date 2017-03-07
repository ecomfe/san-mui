<div class="sm-iconmenu {{ className }}" style="{{ style | padStyles }}">
    <div class="sm-iconmenu-icon" on-touchstart="touchstart">
        <san-icon value="{{ icon }}" on-click="toggleMenu" />
    </div>

    <div class="sm-menu-list depth-2 {{ open | yesOrNoToBe('', 'list-hidden') }}"
        style="transform:{{ transform }};transform-origin:{{ transformOrigin }};left:{{ left }}px;top:{{ top }}px;{{ menuStyle | padStyles }};">

        <slot></slot>
    </div>
    <div san-if="useLayerForClickAway" class="sm-layer-for-click {{ open | yesOrNoToBe('', 'list-hidden') }}"></div>
</div>