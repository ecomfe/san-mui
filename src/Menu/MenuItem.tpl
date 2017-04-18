<div
    on-click="select($event)"
    class="sm-menuitem
            {{ selected | yesToBe(' selected') }}
            {{ leftIcon | yesToBe('has-left') }}"
    value="{{value}}"
>
    <div class="sm-menuitem-left-icon" san-if="{{ leftIcon }}"><san-icon>{{ leftIcon }}</san-icon></div>
    <p>{{ title }}</p>
    <div class="sm-menuitem-right-icon-group">
        <san-icon san-for="ri in rightIcons">{{ ri }}</san-icon>
    </div>
    <san-touch-ripple />
</div>