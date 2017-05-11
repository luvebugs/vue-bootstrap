<style lang="less">
.cascader-panel{
    padding: 0px 0px;
}
.cascader-item, .cascader-level{
    float: left;
    .cascader-item-ul{
        margin: 0 0;
        padding: 0 0;
        list-style: none;
        width: 100%;
        cursor: pointer;
    }
    .node-blod {
        font-weight: bold;
    }
    .node{
        padding: 4px 12px;
    }
    .node-check{
        background-color: #f7f7f7;
    }
}
.cascader-item {
    width: 100px;
}

/* 必需 */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  transform: translateY(0);
}
/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave {
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
    <div class="cascader-panel clearfix" v-if="models&&models.length">
        <div class="cascader-item">
            <ul class="cascader-item-ul">
                <li v-for="(index, model) in models" @click="changeSelect(model)">
                    <div class="node" :class="{'node-blod': !!model.children, 'node-check': checkedModel == model.value}" >
                        <span>{{model.name}}</span>
                        <i v-if="!!model.children" class="fa fa-angle-right float-sm-right" aria-hidden="true"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cascader-level">
            <item :models="cascader" :select-change="selectChange" :check-change="checkChange" :key="key" :level="subLevel">
            </item>
        </div>
    </div>
</template>

<script>
// define the item component
export default {
    name: 'item',
    props: {
        models: Array,
        index: Number,
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
            cascader: [],
            checkedModel: '',
            subLevel: this.level + 1
        }
    },
    methods: {
        changeSelect: function (model) {
            if (this.checkedModel == model.value) {
                this.checkedModel = '';
                this.cascader = [];
                this.changeCheck(model, false);
                return;
            }
            this.checkedModel = model.value;
            this.cascader = model.children;
            this.changeCheck(model, true);
            this.selectChange(model, this.subLevel);
        },
        changeCheck: function (model, check) {
            let self = this;
            this.models.forEach(function (model, index) {
                if (model.value == self.checkedModel) {
                    self.checkChange && self.checkChange(model, check, self.subLevel, self.subLevel);
                }
            });
            this.$dispatch('check-parent', check, model, self.subLevel, self.subLevel);
        }
    },
    events: {
        'check-parent': function (check, target, checkLevel) {
            let self = this;
            if (target.value != this.checkedModel) {
                this.models.forEach(function (model, index) {
                    if (model.value == self.checkedModel) {
                        self.checkChange && self.checkChange(model, check, self.subLevel, checkLevel);
                    }
                });
            }
            return true;
        }
    }
}
</script>
