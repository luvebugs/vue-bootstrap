<style lang="less">
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
    position: relative;
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

.select-name-item {
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
            padding: 2px 8px 2px 8px;
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
    padding: 0 10px;
    outline: none;
}

.dropdown-select {
    display: none;
}

.dropdown-searchbox {
    position: relative;
    border-bottom: 1px solid #ccc;
}

.dropdown-scroll {
    max-height: 400px;
    overflow-y: scroll;
}

.dropdown-loadmore {
    position: relative;
    text-align: center;
    cursor: pointer;
}
.dropdown-loadmore-link.btn.focus,
.dropdown-loadmore-link.btn:active:focus,
.dropdown-loadmore-link.btn:focus {
    width: 100%;
    outline: none;
}

.dropdown-loadmore-link {
    width: 100%;
    outline: none;
}

.search-close {
    position: absolute;
    top: 0;
    right: 8px;
}

/* 必需 */

.expand-enter-active, .expand-leave-active {
    transition: all 0.3s ease;
    transform: translateY(0);
}

/* .expand-enter 定义进入的开始状态 */

/* .expand-leave-active 定义离开的结束状态 */

.expand-enter,
.expand-leave-active {
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
.dropdown-menu-cascader {
    padding-bottom: 0;
}
.dropdown-cascader-item {
    padding: 0;
    .cascader-item {
        border-right: 1px solid #cfdadd;
        height: 100px;
    }
}
</style>
<template>
<div>
    <button type="button" class="btn btn-secondary dropdown-toggle select-button" v-bind:data-toggle="dropdown" @click="show(open)" :style="{'width': width}" v-if="type=='select'">
        <div class="select-name">
            <span class="select-name-item" v-for="value in values" v-bind:key="value.index" >{{value.name}}/</span>
            <span v-if="!values.length" v-text="plaseholder"></span>
        </div>
        <span class="close select-close" @click.stop="clear()">&times;</span>
        <span class="tag tag-pill tag-default select-info" v-if="multiple" v-text="values.length"></span>
    </button>
    <div class="select-input" v-bind:data-toggle="dropdown" @click="show(open)" :style="{'width': width}" v-else>
        <div class="select-name">
            <span v-if="!focus && !values.length" v-text="plaseholder"></span>
            <span class="select-name-item" v-for="value in values" v-bind:key="value.index">
                {{value.name}}/
            </span>
            <input type="text" class="select-name-cursor" @focus="focusSelect(true)" @blur="blurSelect(false)" v-model="key" @keyup.enter="search(key, options)" autocomplete="off">
        </div>
        <span class="close select-close" @click.stop="clear()">&times;</span>
    </div>
    <div class="dropdown select-main" :class="{'open': open}">
        <transition class="dropdown-menu dropdown-menu-cascader" v-show="open" name="expand">
            <div class="dropdown-searchbox" v-if="type=='select'">
                <input type="text" class="search-box" placeholder="输入enter查询" autocomplete="off" v-model="key" @keyup.enter="search(key, options)">
                <span v-show="key" class="close search-close" @click="clearKey()">&times;</span>
            </div>

            <div ref="scroll" class="dropdown-scroll">
                <template v-if="options">
                    <div class="dropdown-cascader-item">
                        <!-- <ul class="cascader-root cascader-item">
                            <v-cascader v-for="(index, model) in options | filterBy key" :model="model" :root="model" :checkable="true" :select-change="changeSelect" :check-change="changeCheck" :key="key">
                            </v-cascader>
                        </ul>-->
                        <v-cascader ref:cascader :models="options" :select-change="changeSelect" :check-change="changeCheck" :key="key" :level="level">
                        </v-cascader>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</div>
</template>

<script>
import vTip from './tooltip.vue'
import vCascader from './cascader.vue'
export default {
    name: 'v-cascaderselect',
    components: {
        vTip,
        vCascader
    },
    data: function() {
        return {
            key: '',
            names: '',
            level: 0,
            focus: false
        }
    },
    props: {
        type: {
            type: String,
            default: 'select'
        },
        'width': String,
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
            default: function() {
                return [];
            }
        },
        'search': {
            type: Function,
            default: function(key, options) {
                this.key = key;
            }
        },
        'values': {
            type: Array,
            default: ''
        },
        'change': {
            type: Function,
            default: function(select) {}
        },
        'visibleChange': {
            type: Function,
            default: function(visible) {}
        }
    },
    computed: {},
    mounted: function() {
        this._closeEvent = document.addEventListener('click', (e) => {
            if (this.$el && !this.$el.contains(e.target)) this.open = false;
        });
    },
    beforeDestroy() {
        if (this._closeEvent) this._closeEvent.remove();
    },
    methods: {
        focusSelect: function (focus) {
            this.focus = focus;
        },
        blurSelect: function (focus) {
            this.focus = focus;
            this.key = '';
        },
        changeSelect: function(node) {
            if (!this.multiple) {
                this.values = [];
                this.values.push(node);
            }
        },
        changeCheck: function(node, check, subLevel, checkLevel) {
            if (this.multiple) {
                if (check) {
                    this.values.$set(subLevel - 1, node);
                }
                while (this.values.length > checkLevel) {
                    this.values.pop();
                }
            }
        },
        clear: function() {
            let self = this;
            this.values = [];
        },
        clearKey: function() {
            let self = this;
            self.key = '';
        },
        show: function(open) {
            this.open = !this.open;
        }
    },
    route: {
        beforeRouteEnter: function(transition) {
            transition.next()
        },
        beforeDestroy: function(transition) {
            transition.next()
        }
    }
}
</script>
