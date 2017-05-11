import dashboard from './dashboard.vue';
/**
 * @file insert table
 * @author sunxiaoxu01
 */
export default {
    // can not named table
    // dashboard will add to editor as a child component and named as module name
    // Do not use built-in or reserved HTML elements as component id
    name: 'tabulation',
    icon: 'fa fa-table',
    i18n: 'table',
    show: true,
    dashboard
};
