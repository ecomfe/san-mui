<div class="sm-iconmenu {{ className }}" style="{{ style | padStyles }}">
    <div class="sm-iconmenu-icon">
        <san-icon on-click="toggleMenu($event)">{{ icon }}</san-icon>
    </div>

    <div class="sm-menu-list {{ open | notOpen('list-hidden') }}"
        style="z-index:{{ zIndex }};transform:{{ transform }};transform-origin:{{ transformOrigin }};left:{{ left }}px;top:{{ top }}px;{{ menuStyle | padStyles }};">

        <slot></slot>
    </div>
    <div san-if="useLayerForClickAway" class="sm-layer-for-click {{ open | notOpen('list-hidden') }}" style="z-index:{{zIndex-1}}"></div>
</div>