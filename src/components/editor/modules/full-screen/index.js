/**
 * @file toggle full screen mode
 * @author sunxiaoxu01
 */
export default {
    name: 'full-screen',
    icon: 'fa fa-arrows-alt',
    i18n: 'full screen',
    show: true,
    handler(editor) {
        editor.toggleFullScreen();
    }
};
