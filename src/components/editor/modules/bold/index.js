/**
 * @file bold
 * @author sunxiaoxu01
 */
export default {
    name: 'bold',
    icon: 'fa-bold fa',
    show: true,
    i18n: 'bold',
    handler(editor) {
        editor.execCommand('bold');
    }
};
