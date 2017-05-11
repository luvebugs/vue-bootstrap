/**
 * @file hr
 * @author sunxiaoxu01
 */
export default {
    name: 'hr',
    icon: 'fa fa-minus',
    show: true,
    i18n: 'hr',
    handler(editor) {
        editor.execCommand('insertHorizontalRule');
    }
};
