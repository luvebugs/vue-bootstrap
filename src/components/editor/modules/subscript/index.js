/**
 * @file subscript
 * @author sunxiaoxu01
 */
export default {
    name: 'subscript',
    icon: 'fa-subscript fa',
    show: true,
    i18n: 'subscript',
    handler(editor) {
        editor.execCommand('subscript');
    }
};
