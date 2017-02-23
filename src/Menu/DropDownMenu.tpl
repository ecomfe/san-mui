<div
    class="{{ className }} sm-dropdown-menu {{ disabled | yesToBe('disabled') }}"
    style="{{ style | padStyles }}"
    >

    <div class="sm-dropdown-menu-selected" on-click="toggleMenu" style="width:{{ selectedLabelWidth }}px;">
        <p
            class="sm-dropdown-menu-selected-label"
            style="{{ labelStyle | padStyles }}"
        >{{ value }}</p>
        <slot name="iconButton"></slot>
        <div class="sm-dropdown-menu-underline" style="{{ underlineStyle | padStyles }}"></div>
    </div>

    <ul class="sm-menu-list depth-2 {{ isHidden | yesToBe('list-hidden') }}"
        style="opacity:{{ opacity }};height:{{ height }};max-height:{{ maxHeight }}px;{{ menuStyle | padStyles }}">

        <slot name="menuItem"></slot>
    </ul>
</div>