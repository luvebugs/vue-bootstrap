/**
 * @file superscript
 * @author sunxiaoxu01
 */
export default {
    name: 'superscript',
    icon: 'fa-superscript fa',
    show: true,
    i18n: 'superscript',
    handler(editor) {
        editor.execCommand('superscript');
    }
};
