<label
    class="sm-switch {{labelLeft ? 'label-left' : '')}} {{disabled ? 'disabled' : ''}} {{!label ? 'no-label' : ''}}">
    <input type="checkbox"
        disabled="{{disabled}}"
        value="{{value}}"
        on-change="handleChange($event)"
        checked="{= inputValue =}">
    <div class="sm-switch-wrapper">
        <div class="sm-switch-label {{labelClass}}" san-if="label && labelLeft">{{label}}</div>
        <div class="sm-switch-container">
            <div class="sm-switch-track {{trackClass}}"></div>
            <div class="sm-switch-thumb {{thumbClass}}"></div>
        </div>
        <div class="sm-switch-label {{labelClass}}" san-if="label && !labelLeft">{{label}}</div>
    </div>
</label>
