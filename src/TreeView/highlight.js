/**
 * @file hightlight.js
 * @author Lu Yuan(luyuan.china@gmail.com)
 */

let getTextNodes = function (node) {
    let textNodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
    }
    else {
        let children = node.childNodes;
        for (let i = 0, len = children.length; i < len; ++i) {
            textNodes.push.apply(textNodes, getTextNodes(children[i]));
        }
    }
    return textNodes;
};

let setSelectionRange = function (el, start, end) {
    if (document.createRange && window.getSelection) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let textNodes = getTextNodes(el);
        let foundStart = false;
        let charCount = 0;
        let endCharCount;

        for (let i = 0, textNode; textNode = textNodes[i++];) {
            endCharCount = charCount + textNode.length;
            if (!foundStart && start >= charCount && (start < endCharCount
                || (start === endCharCount && i <= textNodes.length))) {
                range.setStart(textNode, start - charCount);
                foundStart = true;
            }
            if (foundStart && end <= endCharCount) {
                range.setEnd(textNode, end - charCount);
                break;
            }
            charCount = endCharCount;
        }

        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    else if (document.selection && document.body.createTextRange) {
        let textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(true);
        textRange.moveEnd('character', end);
        textRange.moveStart('character', start);
        textRange.select();
    }
};

let makeEditableAndHighlight = function (backColor, foreColor) {
    let sel = window.getSelection();
    let range;
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = 'on';
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    if (!document.execCommand('HiliteColor', false, backColor)) {
        document.execCommand('BackColor', false, backColor);
    }
    document.execCommand('ForeColor', false, foreColor);
    document.designMode = 'off';
    sel.removeAllRanges();
};

let makeEditableAndUnhighlight = function () {
    let sel = window.getSelection();
    let range;
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = 'on';
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    document.execCommand('removeFormat', false);
    document.designMode = 'off';
    if (range && range.startContainer && (range.startContainer instanceof HTMLElement)) {
        range.startContainer.normalize();
    }
    sel.removeAllRanges();
};

let doHighlight = function (backColor, foreColor) {
    let range;
    if (window.getSelection) {
        try {
            if (!document.execCommand('BackColor', false, backColor)) {
                makeEditableAndHighlight(backColor, foreColor);
            }
        }
        catch (ex) {
            makeEditableAndHighlight(backColor, foreColor);
        }
    }
    else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.execCommand('BackColor', false, backColor);
    }
};

let doUnhighlight = function () {
    let range;
    if (window.getSelection) {
        try {
            if (!document.execCommand('BackColor', false)) {
                makeEditableAndUnhighlight();
            }
        }
        catch (ex) {
            makeEditableAndUnhighlight();
        }
    }
    else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.execCommand('removeFormat', false);
    }
};

let highlightFunc = function (el, keyword, input, backColor, foreColor) {
    if (!el || !el.innerText || !keyword) {
        return;
    }
    let text = el.innerText.toLowerCase();
    keyword = keyword.toLowerCase();

    let len = keyword.length;
    let start = text.indexOf(keyword);
    while (start > -1) {
        let end = start + len;
        setSelectionRange(el, start, end);
        doHighlight(backColor, foreColor);
        start = text.indexOf(keyword, start + 1);
    }
    input && input.focus();
};

let unhighlightFunc = function (el, input) {
    if (!el || !el.innerText) {
        return;
    }
    setSelectionRange(el, 0, el.innerText.length);
    doUnhighlight();
    input && input.focus();
};

export const Highlight = {
    highlight: highlightFunc,
    unhighlight: unhighlightFunc
};
