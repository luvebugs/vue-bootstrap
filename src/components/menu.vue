// app.vue

<template>
    <div class="layout-aside" :class="{'layout-aside-collapse': !aside.action}">
        <aside class="layout-sider">
            <div class="layout-logo">
                <i v-show="!aside.action" class="fa fa-paw" aria-hidden="true" style="color: #666; font-size:22px; line-height: 1;"></i>
                <a v-show="aside.action" class="layout-logo-site" href="#">{{site}}</a></div>
            <ul class="nav-menu nav-menu-inline  nav-menu-dark nav-menu-root" role="menu" aria-activedescendant="" tabindex="0">
                <li v-for="nav in navs"
                :class="{'nav-menu-item': nav.url,
                'nav-menu-submenu-inline nav-menu-submenu': !nav.url,
                'nav-menu-item-selected': nav.name == selectedNav,
                'nav-menu-submenu-open': nav.toggle && aside.action}"
                v-link="{ path: nav.url}">
                    <span v-if="nav.url"><i class="fa fa-{{nav.icon}} nav-icon" aria-hidden="true"></i><span v-show="aside.action">{{nav.name}}</span></span>
                    <div v-if="!nav.url" @click="subToggle(nav)" class="nav-menu-submenu-title" aria-expanded="true" aria-owns="sub1$Menu" aria-haspopup="true" style="padding-left: 24px;">
                        <span><i class="fa fa-{{nav.icon}} nav-icon" aria-hidden="true"></i><span v-show="aside.action">{{nav.name}}</span></span>
                    </div>
                    <ul v-if="!nav.url && nav.toggle && aside.action" class="nav-menu nav-menu-inline nav-menu-sub" role="menu" aria-activedescendant="">
                        <li class="nav-menu-item" role="menuitem" aria-selected="true" style="padding-left: 24px; font-size:12px;"
                        :class="{'nav-menu-item-selected': child.name == selectedNav}"
                        v-link="{ path: child.url, params: {name: child.name, active: true}}"
                        v-for="child in nav.children" @click="selectNav(child, nav)">
                            <span><i class="fa fa-{{child.icon}} nav-icon" aria-hidden="true"></i>{{child.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="aside-action" @click="switchAside(aside.action)">
                <i v-show="aside.action" class="fa fa-angle-right" aria-hidden="true"></i>
                <i v-show="!aside.action" class="fa fa-angle-left" aria-hidden="true"></i>
            </div>
        </aside>
    </div>
</template>

<script>
import {
    site,
    aside
} from '../store/getters'
import {
    setPath,
    setApp,
    switchAside
} from '../store/actions'


export default {
    vuex: {
        getters: {
            aside: aside
        },
        actions: {
            setPath: setPath,
            setApp: setApp,
            switchAside: switchAside
        }
    },
    components: {},
    props: {
        site: String,
        breadcrumbs: Array,
        navs: Array
    },
    data() {
        return {
            'selectedNav': ''
        }
    },
    ready: function() {},
    methods: {
        selectNav: function(nav, parent) {
            this.breadcrumbs = [];
            this.selectedNav = nav.name;
            if (parent) {
                this.breadcrumbs.push({
                    name: parent.name,
                    active: !!parent.url,
                    url: parent.url
                });
            }
            this.breadcrumbs.push({
                name: nav.name,
                active: true,
                url: nav.url
            });
        },
        subToggle: function(nav) {
            if (!this.aside.action) {
                this.$route.router.go({
                    path: nav.children[0].url
                });
            } else {
                if (nav.toggle === undefined) {
                    Vue.set(nav, 'toggle', false);
                }
                if (nav.toggle) {
                    nav.toggle = false;
                } else {
                    nav.toggle = true;
                }
            }
        }
    }
}
</script>
<style lang="less">
.layout-logo-site{
    color: #fff;
    &:hover{
        color: #fff;
        text-decoration: none;
    }

}
.fa-home{
    font-size: 16px;
}
.nav-icon{
    margin-right: 8px;
    text-align: center;
}
.layout-aside-collapse .nav-menu-submenu-inline>.nav-menu-submenu-title:after{
    display: none;
}
.nav-menu-item{
    padding: 24px;
}
.nav-menu-submenu{
    padding: 0px;
    font-size: 12px;
}
.layout-aside {
  min-height: 100%;
}

.layout-aside .layout-logo {
  height: 32px;
  background: #333;
  border-radius: 2px;
  margin: 16px 24px;
  transition: all .3s;
  text-align: center;
  padding: 6px;
}

.layout-aside-collapse .layout-logo {
  margin: 16px;
  transition: all .3s;
}

.layout-aside .layout-sider {
  width: 100%;
  background: #404040;
  position: absolute;
  overflow: visible;
  padding-bottom: 24px;
  height: 100%;
  transition: all .3s;
}

.layout-aside-collapse .layout-sider {
  width: 100%;
  transition: all .3s;
}

.layout-aside .layout-sider > .menu {
  margin-bottom: 20px;
}

.layout-aside .layout-sider > .menu > .menu-item {
  margin: 16px 0;
}

.layout-aside .layout-sider > .menu > .menu-item .nav-text {
  vertical-align: baseline;
  display: inline-block;
}

.layout-aside .layout-sider > .menu > .menu-item > .anticon {
  transition: font-size .3s;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item {
  transition: all 0s ease;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item > .anticon {
  font-size: 16px;
  display: inline-block;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item .nav-text {
  display: none;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item:hover {
  background: #20A0FF;
  color: #fff;
  transition: all 0s ease;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item:hover .nav-text {
  display: inline-block;
  vertical-align: top;
  background: #20A0FF;
  color: #fff;
  padding-right: 16px;
  border-radius: 0 5px 5px 0;
}

/* 实际使用中需要改成 position: fixed */
.layout-aside .aside-action {
  height: 42px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #656565;
  color: #fff;
  text-align: center;
  line-height: 42px;
  cursor: pointer;
  transition: all .3s;
}

.layout-aside-collapse .aside-action {
  transition: all .3s;
}

.layout-aside .layout-header {
  background: #fff;
  height: 64px;
  border-bottom: 1px solid #e9e9e9;
}

.layout-aside .layout-main {
  margin-left: 224px;
  transition: all .3s;
}

.layout-aside-collapse .layout-main {
  margin-left: 64px;
  transition: all .3s;
}

.layout-aside .layout-container {
  margin: 12px 16px 24px;
}

.layout-aside .layout-content {
  background: #fff;
  padding: 24px;
  margin-top: 12px;
  border-radius: 4px;
}

.layout-aside .layout-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
  background: #fff;
  border-top: 1px solid #e9e9e9;
  width: 100%;
}
.nav-menu {
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    z-index: 1050;
    box-shadow: 0 1px 6px hsla(0, 0%, 39%, .2);
    color: #666;
    background: #fff;
    line-height: 46px
}

.nav-menu-hidden {
    display: none
}

.nav-menu-item-group-list {
    margin: 0;
    padding: 0
}

.nav-menu-item-group-title {
    color: #999;
    font-size: 12px;
    line-height: 1.5;
    padding: 8px 16px
}

.nav-menu-item,
.nav-menu-submenu,
.nav-menu-submenu-title {
    cursor: pointer;
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.nav-menu-submenu .nav-menu-sub {
    cursor: auto
}

.nav-menu-item>a {
    display: block;
    color: #666
}

.nav-menu-item>a:hover {
    color: #666
}

.nav-menu-item>a:before {
    position: absolute;
    background-color: transparent;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: ''
}

.nav-menu-item-active,
.nav-menu-item:hover,
.nav-menu-submenu-active,
.nav-menu-submenu-title:hover {
    background-color: #eaf8fe
}

.nav-menu-horizontal .nav-menu-item,
.nav-menu-horizontal .nav-menu-submenu {
    margin-top: -1px
}

.nav-menu-horizontal>.nav-menu-item-active,
.nav-menu-horizontal>.nav-menu-item:hover,
.nav-menu-horizontal>.nav-menu-submenu .nav-menu-submenu-title:hover {
    background-color: transparent
}

.nav-menu-item-selected {
    color: #20A0FF;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
}

.nav-menu-item-selected>a,
.nav-menu-item-selected>a:hover {
    color: #20A0FF
}

.nav-menu-horizontal,
.nav-menu-inline,
.nav-menu-vertical {
    z-index: auto
}

.nav-menu-inline,
.nav-menu-vertical {
    border-right: 1px solid #e9e9e9
}

.nav-menu-inline .nav-menu-item,
.nav-menu-vertical .nav-menu-item {
    border-right: 1px solid #e9e9e9;
    margin-left: -1px;
    left: 1px;
    position: relative;
    z-index: 1
}

.nav-menu-vertical .nav-menu-sub,
.nav-menu-vertical .nav-menu-sub .nav-menu-item {
    border-right: 0
}

.nav-menu-inline .nav-menu-item-selected,
.nav-menu-inline .nav-menu-selected {
    border-right: 2px solid #20A0FF;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
}

.nav-menu-submenu-horizontal>.nav-menu {
    top: 100%;
    left: 0;
    position: absolute;
    min-width: 100%;
    margin-top: 7px;
    z-index: 1050
}

.nav-menu-submenu-vertical {
    z-index: 1
}

.nav-menu-submenu-vertical>.nav-menu {
    top: 0;
    left: 100%;
    position: absolute;
    min-width: 160px;
    margin-left: 4px;
    z-index: 1050
}

.nav-menu-item,
.nav-menu-submenu-title {
    margin: 0;
    padding: 0 20px;
    position: relative;
    display: block;
    white-space: nowrap
}

.nav-menu-item.nav-menu-item-disabled,
.nav-menu-item.nav-menu-submenu-disabled,
.nav-menu-submenu-title.nav-menu-item-disabled,
.nav-menu-submenu-title.nav-menu-submenu-disabled {
    color: #999!important;
    cursor: not-allowed;
    background: none
}

.nav-menu-item.nav-menu-item-disabled>a,
.nav-menu-item.nav-menu-submenu-disabled>a,
.nav-menu-submenu-title.nav-menu-item-disabled>a,
.nav-menu-submenu-title.nav-menu-submenu-disabled>a {
    color: #999!important;
    pointer-events: none
}

.nav-menu-item .anticon,
.nav-menu-submenu-title .anticon {
    min-width: 14px;
    margin-right: 8px
}

.nav-menu>.nav-menu-item-divider {
    height: 1px;
    margin: 1px 0;
    overflow: hidden;
    padding: 0;
    line-height: 0;
    background-color: #e5e5e5
}

.nav-menu-submenu {
    position: relative
}

.nav-menu-submenu>.nav-menu {
    background-color: #fff;
    border-radius: 4px
}

.nav-menu-submenu-vertical>.nav-menu-submenu-title:after {
    -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
    -webkit-transform: rotate(270deg) scale(.75);
    -ms-transform: rotate(270deg) scale(.75);
    transform: rotate(270deg) scale(.75)
}

.nav-menu-submenu-inline>.nav-menu-submenu-title:after,
.nav-menu-submenu-vertical>.nav-menu-submenu-title:after {
    font-family: FontAwesome;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    position: absolute;
    -webkit-transition: -webkit-transform .3s ease;
    transition: -webkit-transform .3s ease;
    transition: transform .3s ease;
    transition: transform .3s ease, -webkit-transform .3s ease;
    content: "\f106";
    right: 16px
}

.nav-menu-submenu-inline>.nav-menu-submenu-title:after {
    top: 0;
    display: inline-block;
    font-size: 12px;
    font-size: 8px\9;
    -webkit-transform: scale(.66666667) rotate(0deg);
    -ms-transform: scale(.66666667) rotate(0deg);
    transform: scale(.66666667) rotate(0deg);
    -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=1, M12=0, M21=0, M22=1)";
    zoom: 1
}

:root .nav-menu-submenu-inline>.nav-menu-submenu-title:after {
    -webkit-filter: none;
    filter: none;
    font-size: 24px
}

.nav-menu-submenu-open.nav-menu-submenu-inline>.nav-menu-submenu-title:after {
    -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
    -webkit-transform: rotate(180deg) scale(.75);
    -ms-transform: rotate(180deg) scale(.75);
    transform: rotate(180deg) scale(.75)
}

.nav-menu-vertical .nav-menu-submenu-selected,
.nav-menu-vertical .nav-menu-submenu-selected>a {
    color: #20A0FF
}

.nav-menu-horizontal {
    border: 0;
    border-bottom: 1px solid #e9e9e9;
    box-shadow: none;
    z-index: 0
}

.nav-menu-horizontal>.nav-menu-item,
.nav-menu-horizontal>.nav-menu-submenu {
    position: relative;
    top: 1px;
    float: left;
    border-bottom: 2px solid transparent;
    z-index: 2
}

.nav-menu-horizontal>.nav-menu-item-active,
.nav-menu-horizontal>.nav-menu-item-selected,
.nav-menu-horizontal>.nav-menu-item:hover,
.nav-menu-horizontal>.nav-menu-submenu-active,
.nav-menu-horizontal>.nav-menu-submenu-selected,
.nav-menu-horizontal>.nav-menu-submenu:hover {
    border-bottom: 2px solid #20A0FF;
    color: #20A0FF;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
}

.nav-menu-horizontal>.nav-menu-item>a,
.nav-menu-horizontal>.nav-menu-submenu>a {
    display: block;
    color: #666
}

.nav-menu-horizontal>.nav-menu-item>a:hover,
.nav-menu-horizontal>.nav-menu-submenu>a:hover {
    color: #20A0FF
}

.nav-menu-horizontal:after {
    content: " ";
    display: block;
    height: 0;
    clear: both
}

.nav-menu-inline>.nav-menu-item,
.nav-menu-inline>.nav-menu-submenu>.nav-menu-submenu-title,
.nav-menu-item-group-list>.nav-menu-item,
.nav-menu-item-group-list>.nav-menu-submenu>.nav-menu-submenu-title,
.nav-menu-vertical>.nav-menu-item,
.nav-menu-vertical>.nav-menu-submenu>.nav-menu-submenu-title {
    padding: 0 16px 0 24px;
    font-size: 14px;
    line-height: 42px;
    height: 42px
}

.nav-menu-vertical.nav-menu-sub {
    padding: 0
}

.nav-menu-vertical.nav-menu-sub,
.nav-menu-vertical.nav-menu-sub>.nav-menu-item,
.nav-menu-vertical.nav-menu-sub>.nav-menu-submenu {
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0
}

.nav-menu-root.nav-menu-inline,
.nav-menu-root.nav-menu-vertical {
    box-shadow: none
}

.nav-menu-sub.nav-menu-inline {
    padding: 0;
    border: 0;
    box-shadow: none;
    border-radius: 0
}

.nav-menu-sub.nav-menu-inline>.nav-menu-item,
.nav-menu-sub.nav-menu-inline>.nav-menu-submenu>.nav-menu-submenu-title {
    line-height: 42px;
    height: 42px;
    list-style-type: disc;
    list-style-position: inside
}

.nav-menu-sub.nav-menu-inline .nav-menu-item-group-title {
    padding-left: 32px
}

.nav-menu-dark,
.nav-menu-dark .nav-menu-sub {
    color: #999;
    background: #404040
}

.nav-menu-dark .nav-menu-inline.nav-menu-sub {
    background: #333
}

.nav-menu-dark.nav-menu-horizontal {
    border-bottom-color: #404040
}

.nav-menu-dark.nav-menu-horizontal>.nav-menu-item,
.nav-menu-dark.nav-menu-horizontal>.nav-menu-submenu {
    border-color: #404040;
    border-bottom: 0;
    top: 0
}

.nav-menu-dark .nav-menu-item,
.nav-menu-dark .nav-menu-item>a {
    color: #999
}

.nav-menu-dark.nav-menu-inline,
.nav-menu-dark.nav-menu-vertical {
    border-right: 0
}

.nav-menu-dark.nav-menu-inline .nav-menu-item,
.nav-menu-dark.nav-menu-vertical .nav-menu-item {
    border-right: 0;
    margin-left: 0;
    left: 0
}

.nav-menu-dark .nav-menu-item-active,
.nav-menu-dark .nav-menu-item:hover,
.nav-menu-dark .nav-menu-submenu-active,
.nav-menu-dark .nav-menu-submenu-selected,
.nav-menu-dark .nav-menu-submenu-title:hover,
.nav-menu-dark .nav-menu-submenu:hover {
    background-color: transparent;
    color: #fff
}

.nav-menu-dark .nav-menu-item-active>a,
.nav-menu-dark .nav-menu-item:hover>a,
.nav-menu-dark .nav-menu-submenu-active>a,
.nav-menu-dark .nav-menu-submenu-selected>a,
.nav-menu-dark .nav-menu-submenu-title:hover>a,
.nav-menu-dark .nav-menu-submenu:hover>a {
    color: #fff
}

.nav-menu-dark .nav-menu-item-selected {
    border-right: 0;
    color: #fff
}

.nav-menu-dark .nav-menu-item-selected>a,
.nav-menu-dark .nav-menu-item-selected>a:hover {
    color: #fff
}

.nav-menu-dark.nav-menu-inline .nav-menu-item-selected {
    background-color: #20A0FF
}

#root,
body,
html {
    height: 100%
}

.nav-layout-aside {
    position: relative;
    min-height: 100%
}

.nav-layout-aside .nav-layout-logo {
    width: 150px;
    height: 32px;
    background: #333;
    border-radius: 6px;
    margin: 16px 24px 16px 28px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    font-size: 22px;
    text-align: center
}

.nav-layout-aside-collapse .nav-layout-logo {
    width: 32px;
    margin: 16px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.nav-layout-aside .nav-layout-sider {
    width: 224px;
    background: #404040;
    position: absolute;
    overflow: visible;
    padding-bottom: 24px;
    height: 100%;
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.nav-layout-aside-collapse .nav-layout-sider {
    width: 64px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.nav-layout-aside .nav-layout-sider>.nav-menu {
    margin-bottom: 20px
}

.nav-layout-aside .nav-layout-sider>.nav-menu>.nav-menu-item {
    margin: 16px 0
}

.nav-layout-aside .nav-layout-sider>.nav-menu>.nav-menu-item .nav-text {
    vertical-align: baseline;
    display: inline-block
}

.nav-layout-aside .nav-layout-sider>.nav-menu>.nav-menu-item>.anticon {
    -webkit-transition: font-size .3s;
    transition: font-size .3s
}

.nav-layout-aside-collapse .nav-layout-sider>.nav-menu>.nav-menu-item {
    -webkit-transition: all 0s ease;
    transition: all 0s ease
}

.nav-layout-aside-collapse .nav-layout-sider>.nav-menu>.nav-menu-item>.anticon {
    font-size: 16px;
    display: inline-block
}

.nav-layout-aside-collapse .nav-layout-sider>.nav-menu>.nav-menu-item .nav-text {
    display: none
}

.nav-layout-aside-collapse .nav-layout-sider>.nav-menu>.nav-menu-item:hover {
    background: #20A0FF;
    color: #fff;
    -webkit-transition: all 0s ease;
    transition: all 0s ease
}

.nav-layout-aside-collapse .nav-layout-sider>.nav-menu>.nav-menu-item:hover .nav-text {
    display: inline-block;
    vertical-align: top;
    background: #20A0FF;
    color: #fff;
    padding-right: 16px;
    border-radius: 0 5px 5px 0
}

.nav-layout-aside .nav-aside-action {
    height: 42px;
    width: 224px;
    position: absolute;
    bottom: 0;
    background: #656565;
    color: #fff;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.nav-layout-aside-collapse .nav-aside-action {
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.nav-layout-aside .nav-layout-header {
    background: #fff;
    height: 64px;
    border-bottom: 1px solid #e9e9e9
}

.nav-layout-aside .nav-layout-breadcrumb {
    margin: 7px 0 -17px 24px
}

.nav-layout-aside .nav-layout-main {
    margin-left: 224px
}

.nav-layout-aside-collapse .nav-layout-main,
.nav-layout-aside .nav-layout-main {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0
}

.nav-layout-aside-collapse .nav-layout-main {
    margin-left: 64px
}

.nav-layout-aside .nav-layout-container {
    padding: 24px 16px;
    position: absolute;
    top: 90px;
    bottom: 64px;
    left: 0;
    right: 0
}

.nav-layout-aside .nav-layout-content {
    background: #fff;
    padding: 24px
}

.nav-layout-aside .nav-layout-footer {
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-size: 12px;
    color: #999;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    width: 100%
}

.nav-layout-footer {
    position: absolute;
    overflow: visible;
    bottom: 0
}

.nav-layout-topaside {
    height: 100%
}

.nav-layout-topaside .nav-layout-wrapper {
    padding: 0 50px
}

.nav-layout-topaside .nav-layout-header {
    background: #404040;
    height: 64px
}

.nav-layout-topaside .nav-layout-logo {
    width: 120px;
    height: 32px;
    background: #333;
    border-radius: 6px;
    margin: 16px 28px 16px 0;
    float: left
}

.nav-layout-topaside .nav-layout-subheader {
    height: 48px;
    border-bottom: 1px solid #e9e9e9;
    background: #fff
}

.nav-layout-topaside .nav-layout-breadcrumb {
    margin: 7px 0 -17px 24px
}

.nav-layout-topaside .nav-layout-container {
    background: #fff;
    margin: 24px 0 0;
    position: relative;
    padding: 24px 0;
    overflow: hidden
}

.nav-layout-topaside .nav-layout-sider {
    width: 224px;
    float: left
}

.nav-layout-topaside .nav-layout-content {
    border-left: 1px solid #e9e9e9;
    padding: 0 24px;
    overflow: auto;
    position: relative;
    left: -1px
}

.nav-layout-topaside .nav-layout-footer {
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-size: 12px;
    color: #999
}

.nav-layout-aside-collapse-sider {
    width: 224px;
    float: left;
    height: 100%;
    overflow-y: scroll
}

.nav-layout-aside-collapse-sider ul {
    height: 100%
}

.nav-layout-aside-collapse-content {
    border-left: 1px solid #e9e9e9;
    padding: 0 24px;
    overflow: auto;
    position: relative;
    left: -1px;
    height: 100%
}

.nav-layout-ceiling-wrapper {
    padding: 0 50px
}

.nav-layout-ceiling-logo {
    width: 32px;
    height: 32px;
    background: #eee;
    border-radius: 16px;
    margin: 16px 28px 16px 0;
    float: right;
    font-size: 22px;
    text-align: center
}

.nav-layout-ceiling-subheader {
    float: right
}

.nav-layout-ceiling-subheader li {
    line-height: 62px
}
</style>
