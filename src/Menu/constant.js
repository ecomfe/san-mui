/**
 * @file 常量
 * @author leon <ludafa@outlook.com>
 */

const PREFIX = 'UI:menu';

export const MENU_ITEM_INITED = `${PREFIX}-item-inited`;
export const MENU_ITEM_ATTACHED = `${PREFIX}-item-attached`;
export const MENU_ITEM_DETACHED = `${PREFIX}-item-detached`;
export const MENU_ITEM_COLLAPSE = `${PREFIX}-item-collapse`;
export const MENU_ITEM_EXPAND = `${PREFIX}-item-expand`;
export const MENU_ITEM_OPTION_SELECTED = `${PREFIX}-item-option-select`;

export const MENU_INITED = `${PREFIX}-inited`;
export const MENU_DETACH = `${PREFIX}-detached`;

// 当命令类型的 item 被点击，所有上层展开的 menu 都要被关闭
export const MENU_ITEM_CLICK = `${PREFIX}-click`;
