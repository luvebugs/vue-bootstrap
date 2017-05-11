/**
 * @file undo
 * @author sunxiaoxu01
 */
export default {
    name: 'redo',
    icon: 'fa-redo fa',
    show: true,
    i18n: 'redo',
    handler(editor) {
        editor.execCommand('redo');
    }
};
