<div class="sm-dialog-wrapper {{open ? 'sm-dialog-show' : 'sm-dialog-hide'}} {{dialogClass}}">
    <div class="sm-dialog">
        <h3 class="sm-dialog-title {{titleClass}}" san-if="showTitle">
            <slot name="title">
                {{title}}
            </slot>
        </h3>

        <div class="sm-dialog-body {{contentClass}}">
            <slot></slot>
        </div>

        <div class="sm-dialog-actions {{footerClass}}" san-if="showFooter">
            <slot name="actions"></slot>
        </div>
    </div>
</div>