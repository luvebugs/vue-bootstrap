/**
 * @file strikethrough
 * @author sunxiaoxu01
 */
export default {
    name: 'strikethrough',
    icon: 'fa-strikethrough fa',
    show: true,
    i18n: 'strikethrough',
    handler(editor) {
        editor.execCommand('strikethrough');
    }
};
