/**
 * @file editor index
 * @author sunxiaoxu01
 */

import editor from './editor.vue';
import Text from './modules/text/index';
import Divider from './modules/divider/index';
import Bold from './modules/bold/index';
import Italic from './modules/italic/index';
import Underline from './modules/underline/index';
import Strikethrough from './modules/strikethrough/index';
import Subscript from './modules/subscript/index';
import Superscript from './modules/superscript/index';
import Font from './modules/font/index';
import FontSize from './modules/fontSize/index';
import FontName from './modules/fontName/index';
import Heading from './modules/heading/index';
import LineHeight from './modules/lineHeight/index';
import Color from './modules/color/index';
import Align from './modules/align/index';
import List from './modules/list/index';
import Link from './modules/link/index';
import Unlink from './modules/unlink/index';
import Table from './modules/table/index';
import Image from './modules/image/index';
import Hr from './modules/hr';
import Eraser from './modules/eraser/index';
import Undo from './modules/undo/index';
import Redo from './modules/redo/index';
import FullScreen from './modules/full-screen/index';
import Info from './modules/info/index';
import i18nZhCn from './i18n/zh-cn';
import i18nEnUs from './i18n/en-us';
import arrayFill from './array-polyfill';

/**
 * install
 * @param {Vue} Vue vue
 * @param {Object} options 配置项
 */

export  default {
    install(Vue, options) {

        arrayFill();

        options = options || {};

        // modules
        let modules = [
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Subscript,
            Superscript,
            Text,
            Color,
            FontSize,
            FontName,
            Heading,
            LineHeight,
            Font,
            Align,
            List,
            Link,
            Unlink,
            Table,
            Image,
            Hr,
            Eraser,
            Undo,
            FullScreen,
            Info,
            Redo,
            Divider
        ];

        // extended modules
        if (Array.isArray(options.modules)) {
            let arr = [];
            options.modules.forEach(function (module) {
                if (module.name) {
                    arr.push(module);
                }
            });
            modules = modules.concat(arr);
        }

        // hidden modules
        if (Array.isArray(options.hiddenModules)) {
            modules = (()=> {
                let arr = [];
                modules.forEach(function (m) {
                    if (!options.hiddenModules.includes(m.name)) {
                        arr.push(m);
                    }
                });
                return arr;
            })();
        }

        // visible modules
        if (Array.isArray(options.toolbar)) {
            modules = (()=> {
                let arr = [];
                options.toolbar.forEach(function (name) {
                    modules.forEach(function (module) {
                        if (module.name === name) {
                            arr.push(module);
                        }
                    });
                });
                return arr;
            })();
        }


        let components = {};
        modules.forEach(module => {

            let config = options[module.name];
            module.config = Vue.util.extend(module.config || {}, config || {});
            if (module.dashboard) {
                // 初始化 $options.module
                module.dashboard.module.config = module.config;
                components['dashboard-' + module.name] = module.dashboard;
            } else if (module.model) {
                components[module.name] = module.model;
            }
            if (options.icons && options.icons[module.name]) {
                module.icon = options.icons[module.name];
            }

            module.hasDashboard = !!module.dashboard;
            // prevent vue sync
            module.dashboard = null;
        });

        // 国际化
        let i18n = {'zh-cn': i18nZhCn, 'en-us': i18nEnUs};
        let customI18n = options.i18n || {};
        Object.keys(customI18n).forEach(key => {
            i18n[key] = i18n[key] ? Vue.util.extend(i18n[key], customI18n[key]) : customI18n[key];
        });
        let language = options.language || 'en-us';
        let locale = i18n[language] || i18n['en-us'];

        let component = Vue.extend(editor).extend({
            data() {
                return {modules, locale};
            },
            components
        });

        Vue.component(options.name || 'v-editor', component);
    }
}