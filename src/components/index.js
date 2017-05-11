/**
 * @file 组件注入
 * @author sunxiaoxu01
 */

import Input from '../widget/input.vue';
import Form from '../widget/form.vue';
import Grid from '../widget/grid.vue';
import Button from '../widget/button.vue';
import Table from '../widget/table.vue';

const components = [
    Table,
    Input,
    Form,
    Grid,
    Button
];

const install = function (Vue) {

    components.map(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    install
};