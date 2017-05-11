<style>
.select-main {
    width: 100%;
}

.select-close {
    float: none;
    line-height: 12px;
    vertical-align: initial;
}

.select-button {
    width: 100%;
}

.select-button .select-info {
    position: absolute;
    top: 6px;
    right: 36px;
}

.select-button .select-close {
    position: absolute;
    top: 8px;
    right: 20px;
}
.select-button::after {
    position: absolute;
    top: 14px;
    right: 8px;
}

.select-name {
    width: 100%;
    padding-right: 46px;
    text-align: left;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
}
.select-name-item{
    padding-right: 4px;
}

.select-input{
    width: 100%;
    position: relative;
    display: inline-block;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.125rem;
    color: #373a3c;
    background-color: #fff;
    border-color: #ccc;
    .select-name{
        padding-right: 0px;
        padding-right: 16px;
        .select-name-cursor{
            cursor: text;
            border: none;
            height: 20px;
        }
        .select-name-item{
            background-color: #f3f3f3;
            border-radius: 4px;
            float: left;
            overflow: hidden;
            -webkit-transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            padding: 2px 10px 2px 8px;
            font-size: 8px;
            font-weight: lighter;
            line-height: 14px;
            margin-left: 2px;
            .fa:before{
                line-height: 8px;
            }
        }
    }
    .select-close{
        position: absolute;
        top: 8px;
        right: 8px;
    }
}
.search-box {
    width: 100%;
    border: none;
    padding: 0px 10px;
    outline: none;
}

.dropdown-select {
    display: none;
}
.dropdown-searchbox {
    position: relative;
    border-bottom: 1px solid #ccc;
}
.dropdown-scroll{
    max-height: 400px;
    overflow-y: scroll;
}
.dropdown-loadmore{
    position: relative;
    text-align: center;
    cursor: pointer;
}
.dropdown-loadmore-link.btn.focus, .dropdown-loadmore-link.btn:focus, .dropdown-loadmore-link.btn:active:focus{
    width: 100%;
    outline: none;
}
.dropdown-loadmore-link{
    width: 100%;
    outline: none;
}
.search-close{
    position: absolute;
    top: 0px;
    right: 8px;
}

/* 必需 */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  transform: translateY(0);
}
/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave-active {
  opacity: 0;
}

.spinner-loading-icon {
    animation: antRotate 3.2s infinite linear;
}
@keyframes antRotate {
  to {
    -webkit-transform: rotate(405deg);
            transform: rotate(405deg);
  }
}
</style>
<template>
<div class="dropdown select-main" :class="{'open': open}">
    <button type="button" class="btn btn-secondary dropdown-toggle select-button" v-bind:data-toggle="dropdown" @click="show(open)" v-if="type=='select'">
                <div class="select-name">
                    <span class="select-name-item" v-for="value in values" v-text="value.name"></span>
                    <span v-if="!values.length" v-text="plaseholder"></span>
                </div>
                <span class="close select-close" @click.stop="clear()">&times;</span>
                <span class="tag tag-pill tag-default select-info" v-if="multiple" v-text="values.length">Info</span>
    </button>
    <div class="select-input" v-bind:data-toggle="dropdown" @click="show(open)" :style="{'width': width}" v-else>
        <div class="select-name">
            <span v-if="!focus && !values.length" v-text="plaseholder"></span>
            <span class="select-name-item" v-for="value in values" v-bind:key="value.index">
                {{value.name}}
                <i class="fa fa-close" aria-hidden="true" @click.stop="clearSelect()"></i>
            </span>
            <input type="text" class="select-name-cursor" @focus="focusSelect(true)" @blur="blurSelect(false)" v-model="key" @keyup.enter="search(key, options)" autocomplete="off">
        </div>
        <span class="close select-close" @click.stop="clear()">&times;</span>
    </div>
    <transition class="dropdown-menu" v-show="open" name="expand">
        <div class="dropdown-searchbox" v-if="type=='select'">
            <input type="text" class="search-box" placeholder="输入enter查询" autocomplete="off" v-model="key" @keyup.enter="search(key, options)">
            <span v-show="key" class="close search-close" @click="clearKey()">&times;</span>
        </div>

        <div ref="scroll" class="dropdown-scroll">
        <template v-if="options && options.length" >
            <a class="dropdown-item" v-if="multiple" @click="selectAll(item)">
                <span>全选</span>
                <i class="fa fa-check" v-if="allChecked" style="pointer-events: none;"></i>
            </a>
            <a class="dropdown-item" v-for="(index, item) in selects" @click="select(item)" >
                <span>{{item.name}}</span>
                <i class="fa fa-check" v-if="item.selected" style="pointer-events: none;"></i>
            </a>
        </template>
    </div>
        <div class="dropdown-loadmore" v-if="loadable">
            <!-- <button type="button" class="btn btn-link dropdown-loadmore-link" @click="load()"><i class="fa fa-spinner spinner-loading-icon" aria-hidden="true" v-if="loading" style="pointer-events: none;"></i><i class="fa fa-refresh" aria-hidden="true" v-if="!loading" style="pointer-events: none;"></i></button> -->
            <i class="fa fa-spinner spinner-loading-icon" aria-hidden="true" v-show="loading"></i>
        </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue';
import vTip from './tooltip.vue';
export default {
    name: 'v-select',
    components: {
        vTip
    },
    data: function () {
        return {
            key: '',
            names: '',
            focus: false
        }
    },
    props: {
        type: {
            type: String,
            default: 'select'
        },
        'open': {
            type: Boolean,
            default: false
        },
        'dropdown': {
            type: Boolean,
            default: false
        },
        'multiple': {
            type: Boolean,
            default: true
        },
        'position': {
            type: String
        },
        'plaseholder': {
            type: String,
            default: '请选择'
        },
        'options': {
            type: Array,
            default: function () {
                return [];
            }
        },
        'search': {
            type: Function,
            default: function (key, options) {
                this.key = key;
            }
        },
        'values': {
            type: Array,
            default: ''
        },
        'change': {
            type: Function,
            default: function (select) {
            }
        },
        'visibleChange': {
            type: Function,
            default: function (visible) {
            }
        },
        'loadable': {
            type: Boolean,
            default: false
        },
        'load': {
            type: Function,
            default: function () {
                return false;
            }
        },
        'loading': {
            type: Boolean,
            default: false
        }
    },
    computed: {
        selects: function () {
            let self = this;
            self.options.forEach(function(content, index) {
                let item = {
                    selected: content.selected ? content.selected : false,
                    name: content.name,
                    value: content.value
                }
                Vue.set(self.options, index, item);
            });
            return self.options;
        },
        allChecked: function () {
            let self = this;
            if (self.values.length === self.selects.length) {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted: function () {
        this._closeEvent = document.addEventListener('click', (e) => {
          if (this.$el && !this.$el.contains(e.target)) this.open = false;
        });
        this.$refs.scroll.addEventListener('scroll', (e) => {
            let scrollTop = this.$refs.scroll.scrollTop;
            let scrollHeight = this.$refs.scroll.scrollHeight;
            let clientHeight = this.$refs.scroll.clientHeight;
            if ((scrollHeight - scrollTop) == (clientHeight + 10)) {
                this.load();
            } else if ((scrollHeight - scrollTop) < (clientHeight + 8)) {
                this.$refs.scroll.scrollTop = scrollHeight - (clientHeight + 10);
            }
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
    },
    beforeDestroy () {
        if (this._closeEvent) this._closeEvent.remove();
    },
    methods: {
        clearSelect: function () {
            this.clear();
        },
        focusSelect: function (focus) {
            this.focus = focus;
        },
        blurSelect: function (focus) {
            this.focus = focus;
            this.key = '';
        },
        select: function (select) {
            let self = this;
            self.values = [];
            if (self.multiple) {
                select.selected = !select.selected;
                self.selects.forEach(function(item, index) {
                    if (item.selected) {
                        self.values.push(item);
                        self.change(item, index);
                    }
                });
            } else {
                select.selected = !select.selected;
                self.selects.forEach(function(item, index) {
                    if (select.value !== item.value) {
                        item.selected = false;
                    }
                    if (item.selected) {
                        self.values.push(item);
                        self.change(item, index);
                    }
                });
                self.open = false;
            }
        },
        selectAll: function () {
            let self = this;
            if (self.allChecked) {
                self.clear();
            } else {
                self.selects.forEach(function(item, index) {
                    item.selected = true;
                    self.values.push(item);
                });
            }

        },
        clear: function () {
            let self = this;
            if (self.values.length) {
                self.values = [];
                self.selects.forEach(function(item, index) {
                    item.selected = false;
                });
            }
        },
        clearKey: function () {
            let self = this;
            self.key = '';
        },
        show: function (open) {
            this.open = !this.open;
        }
    }
}
</script>
