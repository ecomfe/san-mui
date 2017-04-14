<label class="sm-radio {{labelLeft ? 'label-left' : '')}} {{disabled ? 'disabled' : ''}} {{!label ? 'no-label' : ''}}">
    <input type="radio"
        disabled="{{disabled}}"
        name="{{name}}"
        value="{{nativeValue}}"
        on-change="handleChange"
        checked="{= inputValue =}">
    <div class="sm-radio-wrapper">
        <div class="sm-radio-label {{labelClass}}" san-if="label && labelLeft">{{label}}</div>
        <div class="sm-radio-icon">
            <svg class="sm-radio-icon-uncheck sm-radio-svg-icon {{iconClass}}" san-if="!checkedIcon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
            <svg class="sm-radio-icon-checked sm-radio-svg-icon {{iconClass}}" san-if="!uncheckIcon" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
            <sm-icon san-if="uncheckIcon" class="sm-radio-icon-uncheck {{iconClass}}">{{uncheckIcon}}</sm-icon>
            <sm-icon san-if="checkedIcon" class="sm-radio-icon-checked {{iconClass}}">{{checkedIcon}}</sm-icon>
        </div>
        <div class="sm-radio-label {{labelClass}}" san-if="label && !labelLeft">{{label}}</div>
    </div>
</label>
