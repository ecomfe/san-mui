<li
    on-click="select"
    class="sm-menu-item {{ selected | yesToBe('selected') }}"
>
    {{ title | getValue(label) }}
</li>