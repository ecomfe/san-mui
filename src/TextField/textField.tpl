<div class="sm-text-field
    {{focus ? 'focus-state' : ''}}
    {{label ? 'has-label' : ''}}
    {{errorText ? 'error' : ''}}
    {{disabled ? 'disabled' : ''}}
    {{fullWidth ? 'full-width' : ''}}
    {{multiLine ? 'multi-line' : ''}}
    {{icon ? 'has-icon' : ''}}"
    style="{{errorColor ? 'color:' + errorColor : ''}}">
    <sm-icon san-if="{{icon}}" class="sm-text-field-icon">{{icon}}</sm-icon>
    <div on-click="handleLabelClick" class="sm-text-field-content">
        <text-field-label
            san-if="{{label}}"
            float="{{labelFloat|getFloatValue(focus, inputValue)}}"
            focus="{{focus}}"
            normalClass="{{labelClass}}"
            focusClass="{{labelFocusClass}}">
            <span>{{label}}</span>
        </text-field-label>
        <text-field-hint
            san-if="{{hintText}}"
            text="{{hintText}}"
            hintTextClass="{{hintTextClass}}"
            show="{{focus|isHintShow(inputValue)}}">
        </text-field-hint>
            <slot>
                <input
                    san-if="!multiLine"
                    type="{{type}}"
                    value="{= inputValue =}"
                    disabled="{{disabled}}"
                    readonly="{{readOnly}}"
                    on-focus="handleFocus($event)"
                    on-input="handleChange($event)"
                    on-blur="handleBlur($event)"
                    on-keypress="handleKeypress($event)"
                    on-keydown="handleKeydown($event)"
                    class="sm-text-field-input {{inputClass}}"/>
                <enhanced-textarea
                    san-if="multiLine"
                    normalClass="{{inputClass}}"
                    value="{= inputValue =}"
                    disabled="{{disabled}}"
                    readOnly="{{readOnly}}"
                    rows="{{rows}}"
                    rowsMax="{{rowsMax}}"
                    on-change="handleChange($event)"
                    on-focus="handleFocus($event)"
                    on-blur="handleBlur($event)"></enhanced-textarea>
            </slot>
        <underline
            san-if="underlineShow"
            error="{{!!errorText}}"
            disabled="{{disabled}}"
            errorColor="{{errorColor}}"
            focus="{{focus}}"
            normalClass="{{underlineClass}}"
            focusClass="{{underlineFocusClass}}">
        </underline>
        <div
            class="sm-text-field-help {{helpTextClass}}"
            style="{{errorColor ? ('color:' + errorColor) : ''}}"
            san-if="errorText || helpText || maxLength > 0">
            <div>
                {{errorText || helpText}}
            </div>
            <div san-if="maxLength > 0">
                {{charLength}}/{{maxLength}}
            </div>
        </div>
    </div>
</div>
