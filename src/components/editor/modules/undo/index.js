/**
 * @file undo
 * @author sunxiaoxu01
 */
export default {
    name: 'undo',
    icon: 'fa-undo fa',
    show: true,
    i18n: 'undo',
    handler(editor) {
        editor.execCommand('undo');
    }
};
