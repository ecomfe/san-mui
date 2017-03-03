<div
    on-click="select"
    class="sm-menu-item
            {{ selected | yesToBe(' selected') }}
            {{ leftIcon | yesToBe('has-left') }}"
    value="{{value}}"
>
    <div class="sm-menu-item-left-icon" san-if="{{ leftIcon }}"><san-icon value="{{ leftIcon }}" /></div>
    <p>{{ title }}</p>
    <div class="sm-menu-item-right-icon" san-if="{{ rightIcon }}"><san-icon value="{{ rightIcon }}" /></div>
</div>