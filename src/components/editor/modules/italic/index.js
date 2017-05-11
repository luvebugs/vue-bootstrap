/**
 * @file italic
 * @author sunxiaoxu01
 */
export default {
    name: 'italic',
    icon: 'fa-italic fa',
    show: true,
    i18n: 'italic',
    handler(editor) {
        editor.execCommand('italic');
    }
};
