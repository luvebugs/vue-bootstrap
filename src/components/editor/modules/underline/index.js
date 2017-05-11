/**
 * @file underline
 * @author sunxiaoxu01
 */
export default {
    name: 'underline',
    icon: 'fa-underline fa',
    show: true,
    i18n: 'underline',
    handler(editor) {
        editor.execCommand('underline');
    }
};
