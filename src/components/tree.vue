<style lang="less">

.tree-level{
    padding: 0 0;
    list-style-type: none;
    .tree-item {
        padding-left: 16px;
        list-style-type: none;
    }
    .node-item{
        cursor: pointer;
        .fa {
            font-size: 12px;
        }
    }
    .node-add{
        padding-left: 16px;
    }
    .node-header {
        display: inline-block;
    }
    .node-blod {
        font-weight: bold;
    }
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
<!-- item template -->
<template>
    <li class="node-item">
        <v-check :check="isChecked" :change="changeCheck" v-if="checkable"></v-check>
        <div class="node-header" :class="{'node-blod': isFolder}" >
            <span v-if="isFolder" @click="toggle" @dblclick="changeType" >
                <i class="fa" :class="{'fa-caret-right': !open, 'fa-caret-down': open}" aria-hidden="true"></i>
            </span>
            <span @click="changeSelect(model)">{{model.name}}</span>

            <span v-if="editable" @click="editChild('')"><i class="fa fa-pencil" aria-hidden="true"></i></span>
            <span v-if="removeable" @click="removeChild(index)"><i class="fa fa-remove" aria-hidden="true"></i></span>
            <span v-if="addable" @click="addChild()"><i class="fa fa-plus" aria-hidden="true"></i></span>
        </div>
        <ul class="tree-level" v-show="open" v-if="isFolder">
            <item class="tree-item" v-for="(index, model) in model.children" :model="model" :index="index" :root="root" :select-change="selectChange" :check-change="checkChange" :key="key" :checkable="checkable" :level="subLevel">
            </item>
                <!-- <div class="node-add" @click="addChild"><i class="fa fa-plus" aria-hidden="true"></i></div> -->
        </ul>
    </li>

</template>

<script>
import vCheck from './check'

// define the item component
export default {
    name: 'item',
    components: {
        vCheck
    },
    props: {
        checkable: Boolean,
        editable: Boolean,
        removeable: Boolean,
        addable: Boolean,
        model: Object,
        index: Number,
        root: Object,
        checkChange: Function,
        selectChange: {
            type: Function,
            default: function () {

            }
        },
        level:{
            type: Number,
            default: 0
        },
        key: String
    },
    data: function() {
        return {
            open: true,
            isChecked: false,
            subLevel: this.level + 1
        }
    },
    computed: {
        isFolder: function() {
            return this.model.children &&
                this.model.children.length
        }
    },
    methods: {
        toggle: function() {
            if (this.isFolder) {
                this.open = !this.open
            }
        },
        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
        },
        editChild: function() {
            this.model.name="new name";
        },
        addChild: function() {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
            }
            this.open = true
            this.model.children.push({
                name: 'new stuff'
            })
        },
        removeChild: function(index) {
            this.root.children.splice(index, 1);
        },
        changeSelect: function (model) {
            this.selectChange(model);
        },
        changeCheck: function (check) {
            let self = this;
            this.isChecked = check;
            this.checkChange && this.checkChange(this.model, check, this.subLevel);
            this.broadCheck(check, this.model);
            this.dispatchCheck(check, this.model);
        },
        broadCheck: function (check, target) {
            this.$broadcast('check-child', check, target);
        },
        dispatchCheck: function (check, target) {
            this.$dispatch('check-parent', check, target);
        }
    },
    events: {
        'check-child': function (check, target) {
            if (target.value !== this.model.value) {
                this.isChecked = check;
                this.checkChange && this.checkChange(this.model, check, this.subLevel);
            }
            return true;
        },
        'check-parent': function (check, target) {
            let children = this.$children;
            let isAllChecked = true;

            children.forEach(function (child, index) {
                if (child.$options.name === 'item' && !child.isChecked) {
                    isAllChecked = false;
                }
            });
            if (children.length === 1) {
                this.isChecked = check;
            } else {
                if (target.value !== this.model.value) {
                    this.isChecked = isAllChecked;
                    this.checkChange && this.checkChange(this.model, isAllChecked, this.subLevel);
                }
                return true;
            }

        }
    }
}
</script>
