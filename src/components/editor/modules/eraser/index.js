/**
 * @file remove format of selection
 * @author sunxiaoxu01
 */
export default {
    name: 'eraser',
    icon: 'fa fa-eraser',
    i18n: 'eraser',
    show: true,
    handler(editor) {
        editor.execCommand('removeFormat');
    }
};
