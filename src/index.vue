// app.vue

<template>
<div>
    <div class="form-group">
        <label><h5>0.时间选择插件</h5></label>
        <div>
            <div>日期: {{datetimepicker.value}}</div>
            是否范围选择:
            <v-switch :value.sync="datetimepicker.isRanged"></v-switch>
            <v-datetimepicker :value.sync="datetimepicker.value" :is-ranged="datetimepicker.isRanged"></v-datetimepicker>
        </div>
        <br/>
        <br/>
        <label><h5>1.上传插件</h5></label>
        <div>
            <div>单词选择的文件名称: {{upload.file.name}}</div>
            <br/>
            <v-upload :file-queued="uploadFileQueued" :multiple="upload.multiple" :option="upload.option" ></v-upload>
            <br/>
            <v-upload :file-queued="uploadFileQueued" :multiple="upload.multiple" :option="upload.option" type="card"></v-upload>
        </div>
        <br/>
        <br/>
        <label><h5>2.树插件</h5></label>
        <div>
            所有触发check: <div v-for="treeval in tree.values" track-by="$index">name: {{treeval.name}} - id: {{treeval.value}}</div>
            单个触发select: <div>name: {{tree.value.name}} - id: {{tree.value.value}}</div>
            <ul class="tree-level">
                <v-tree v-for="model in tree.selectOptions" :model="model" :root="model" :checkable="true" :check-change="treeChangeCheck" :select-change="treeChangeSelect">
                </v-tree>
            </ul>
        </div>
        <br/>
        <br/>
        <label><h5>3.级联插件</h5></label>
        <div>
            所有触发check: <div v-for="casval in cascader.values" track-by="$index">name: {{casval.name}} - id: {{casval.value}}</div>
            单个触发select: <div>name: {{cascader.value.name}} - id: {{cascader.value.value}}</div>
            <v-cascader :models="cascader.selectOptions" :check-change="cascaderChangeCheck" :select-change="cascaderChangeSelect">
            </v-cascader>
        </div>
        <br/>
        <br/>
        <label><h5>4.级联选择插件</h5></label>
        <div>
            <div>
                是否打开:
                <v-switch :value.sync="cascader.isOpen"></v-switch>
                是否多选:
                <v-switch :value.sync="cascader.multiple"></v-switch>
                类型:
                <v-check :radio.sync="cascader.type" type="radio" name="cascaderType" value="select"></v-check>
                <v-check :radio.sync="cascader.type" type="radio" name="cascaderType" value="input"></v-check>
            </div>
            <v-cascaderselect :values.sync="cascader.selectValues" :options="cascader.selectOptions" :multiple="cascader.multiple" :open.sync="cascader.isOpen" :type="cascader.type" width="200px"></v-cascaderselect>
        </div>
        <br/>
        <br/>
        <label><h5>5.树选择插件</h5></label>
        <div>
            <div>
                是否打开:
                <v-switch :value.sync="tree.isOpen"></v-switch>
                是否多选:
                <v-switch :value.sync="tree.multiple"></v-switch>
                类型:
                <v-check :radio.sync="tree.type" type="radio" name="treeType" value="select"></v-check>
                <v-check :radio.sync="tree.type" type="radio" name="treeType" value="input"></v-check>
            </div>
            <v-treeselect :values.sync="tree.selectValues" :options="tree.selectOptions" :multiple="tree.multiple" :open.sync="tree.isOpen" :type="tree.type" style="width:200px;"></v-treeselect>
        </div>
        <br/>
        <br/>
        <label><h5>6.选择插件</h5></label>
        <div>
            <div>
                是否打开:
                <v-switch :value.sync="select.isOpen"></v-switch>
                是否多选:
                <v-switch :value.sync="select.multiple"></v-switch>
                是否加载中:
                <v-switch :value.sync="select.loading"></v-switch>
                类型:
                <v-check :radio.sync="select.type" type="radio" name="selectType" value="select"></v-check>
                <v-check :radio.sync="select.type" type="radio" name="selectType" value="input"></v-check>
            </div>
            <v-select :values.sync="select.selectValues" :options="select.selectOptions" :multiple="select.multiple" :open.sync="select.isOpen" :loading="select.loading" :loadable="true" :type="select.type" style="width:200px;"></v-select>
        </div>
        <br/>
        <br/>
        <label><h5>7.搜索框插件</h5></label>
        <div>
            <v-search :value.sync="search.searchValue" :options="search.searchOptions" :selected.sync="search.searchSelected" :search="searchKeyValue" style="width:400px;">
            </v-search>
        </div>
        <br/>
        <br/>
        <label><h5>8.表单校验插件</h5></label>
        <div class="form-group row has-danger" :class="{'has-danger': !form.result}">
            <label class="col-sm-2 col-form-label">发送人数</label>
            <div class="col-sm-3">
                <input class="form-control" type="text" v-model="form.number" v-validate:name="{value: form.number, required: true, result: 'form.result', minNumber: 2, maxNumber: 10, regExp: 'integer'}" placeholder="请输入数字">
                <div class="form-control-feedback" v-show="!form.result" style="font-size:12px;">请输入正确的值</div>
            </div>
            <small class="col-sm-3 form-text text-muted">输入的数字应该在2-10之间</small>
        </div>
        <br/>
        <br/>
        <label><h5>9.checkbox</h5></label>
        <div>
            <v-check :check.sync="checkbox.value"></v-check>
            <input type="text" v-model="radio.value"/>
            <v-check :radio.sync="radio.value" type="radio" name="radio" value="a"></v-check>
            <v-check :radio.sync="radio.value" type="radio" name="radio" value="b"></v-check>
        </div>
        <br/>
        <br/>
        <label><h5>10.switch</h5></label>
        <div>
            <v-switch :value.sync="checkbox.value"></v-switch>
        </div>
        <br/>
        <br/>
        <label><h5>11.spinner</h5></label>
        <div>
            <v-spinner v-ref:spinner size="md" fixed text="2秒后关闭"></v-spinner>
            <button type="button" class="btn btn-secondary" @click="showSpinner('spinner')">打开spinner</button>
        </div>
        <br/>
        <br/>
        <label><h5>12.toast</h5></label>
        <div>
            是否打开:
            <v-switch :value.sync="toast.show"></v-switch>
            打开时间: <input v-model="toast.timeout" type="text" />
            打开类型: <v-check :radio.sync="toast.type" type="radio" name="toastType" value="success"></v-check>成功
            <v-check :radio.sync="toast.type" type="radio" name="toastType" value="danger"></v-check>错误
            <v-check :radio.sync="toast.type" type="radio" name="toastType" value="warning"></v-check>警告
            <br/>
            <br/>
            <v-toast v-if="toast.show" :type="toast.type" :timeout="changeToNumber()" :on-closed="onToastClosed">
                提交验证码成功
            </v-toast>
        </div>
        <br/>
        <br/>
        <label><h5>13.tooltip</h5></label>
        <div>
            打开类型: <v-check :radio.sync="tooltip.effect" type="radio" name="tipposition" value="fade"></v-check>fade
            <v-check :radio.sync="tooltip.effect" type="radio" name="tipposition" value="scale"></v-check>scale
            <br/>
            <br/>
            <v-tooltip effect="tooltip.effect" placement="bottom" content="这是我的内容">
                <button class="btn btn-secondary">底部显示</button>
            </v-tooltip>
            <v-tooltip effect="scale" placement="top" content="这是我的内容">
                <button class="btn btn-secondary">底部显示</button>
            </v-tooltip>
            <v-tooltip effect="scale" placement="left" content="这是我的内容">
                <button class="btn btn-secondary">底部显示</button>
            </v-tooltip>
            <v-tooltip effect="scale" placement="right" content="这是我的内容">
                <button class="btn btn-secondary">底部显示</button>
            </v-tooltip>
        </div>
        <br/>
        <br/>
        <label><h5>14.modal</h5></label>
        <div>
            <button class="btn btn-secondary" @click="showModal('basicModal')">模态弹出框</button>

            <v-modal v-ref:basic-modal>
                <div class="modal-header" slot="header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">提示</h4>
                </div>
                <div class="modal-body" slot="body">
                    <p>这里面是一些内容</p>
                </div>
                <div class="modal-footer" slot="footer">
                    <button type="button" class="btn btn-primary" @click="hideModal('basicModal')">确定</button>
                    <button type="button" class="btn btn-secondary" @click="hideModal('basicModal')">取消</button>
                </div>
            </v-modal>
        </div>
        <br/>
        <br/>
        <label><h5>15.表格插件</h5></label>
        <div>
            <div>
                是否加载中:
                <v-switch :value.sync="table.loading"></v-switch>
            </div>
            <v-table :title="table.title" :header="table.tableHeader" :body="table.tableBody" :selects.sync="table.selectIdeas" :check-change="tableCheckRow" :page-change="getTable" :size-change="getTable" :page-total.sync="table.all" :page-size.sync="table.size" :page-number.sync="table.now"
                :loading="table.loading"></v-table>
        </div>
    </div>

    <!-- <div>
        <h3>{{msg}} is {{ demo.count }}</h3>
        <button @click='increment(2)'>Increment +1</button>
    </div> -->




</div>
</template>

<script>
import vSearch from './components/search.vue'
import vModal from './components/modal.vue'
import vSelect from './components/select.vue'
import vTreeselect from './components/treeselect.vue'
import vCascaderselect from './components/cascaderselect.vue'
import vSpinner from './components/spinner.vue'
import vTable from './components/table.vue'
import vTree from './components/tree.vue'
import vCascader from './components/cascader.vue'
import vCheck from './components/check.vue'
import vValidator from './components/validator.vue'
import vSwitch from './components/switch.vue'
import vToast from './components/toast.vue'
import vTooltip from './components/tooltip.vue'
import vUpload from './components/upload.vue'
import vDatetimepicker from './components/datetimepicker.vue'
import vTimepicker from './components/timepicker.vue'
import vDatepicker from './components/datepicker.vue'

// demo data
var treeData = [{
    name: '文件夹0',
    value: '0',
    children: [{
        name: '文档1',
        value: '1'
    }, {
        name: '文档2',
        value: '2'
    }, {
        name: '文件夹3',
        value: '3',
        children: [{
            name: '文件夹4',
            value: '4',
            children: [{
                name: '文档5',
                value: '5'
            }, {
                name: '文档6',
                value: '6'
            }]
        }, {
            name: '文档7',
            value: '7'
        }, {
            name: '文档8',
            value: '8'
        }, {
            name: '文件夹9',
            value: '9',
            children: [{
                name: '文档10',
                value: '10'
            }, {
                name: '文档11',
                value: '11'
            }]
        }]
    }]
}];

// demo data
var cascaderData = [{
    name: '美国',
    value: '0',
    isChecked: false,
    children: [{
        name: '纽约',
        value: '01',
        isChecked: false
    }, {
        name: '阿拉斯加',
        value: '02',
        isChecked: false
    }]
}, {
    name: '中国',
    value: '1',
    isChecked: false,
    children: [{
        name: '北京',
        isChecked: false,
        value: '11'
    }, {
        name: '上海',
        isChecked: false,
        value: '12'
    }, {
        name: '武汉',
        isChecked: false,
        value: '13',
        children: [{
            name: '光谷',
            isChecked: false,
            value: '131'
        }]
    }]
}];


export default {
    components: {
        vSearch,
        vModal,
        vSelect,
        vSpinner,
        vTable,
        vTree,
        vCheck,
        vValidator,
        vTreeselect,
        vCascader,
        vCascaderselect,
        vSwitch,
        vToast,
        vTooltip,
        vUpload,
        vDatetimepicker,
        vTimepicker,
        vDatepicker
    },
    data() {
        return {
            //datetimepicker
            datetimepicker: {
                value: '',
                isRanged: true
            },
            // tooltip
            tooltip: {
                effect: 'fade'
            },
            // cascader
            cascader: {
                values: [],
                value: {},
                selectValues: [],
                selectOptions: cascaderData,
                isOpen: false,
                multiple: false,
                type: 'select'
            },
            // tree
            tree: {
                values: [],
                value: {},
                selectValues: [],
                selectOptions: treeData,
                isOpen: false,
                multiple: false,
                type: 'select'
            },
            // 选择插件
            select: {
                selectValues: [],
                selectOptions: [{
                    name: '类型1',
                    value: '1'
                }, {
                    name: '类型2',
                    value: '2'
                }, {
                    name: '类型3',
                    value: '3'
                }, {
                    name: '类型4',
                    value: '4'
                }],
                isOpen: false,
                multiple: false,
                loading: false,
                type: 'select'
            },
            // form
            form: {
                number: 0,
                result: true
            },
            // 表格
            table: {
                tableHeader: [],
                tableBody: [],
                selectIdeas: [],
                all: 10,
                size: 10,
                now: 1,
                loading: false,
                title: ''
            },
            // 复选框
            checkbox: {
                value: true,
                disabled: false
            },
            radio: {
                value: '',
                disabled: false
            },
            // toast
            toast: {
                show: false,
                timeout: 500,
                type: 'success'
            },
            // search
            search: {
                searchOptions: [{
                    name: '类型1',
                    value: '1'
                }, {
                    name: '类型2',
                    value: '2'
                }, {
                    name: '类型3',
                    value: '3'
                }, {
                    name: '类型4',
                    value: '4'
                }],
                searchValue: '',
                searchKeyValue: '',
                searchSelected: {
                    name: '类型1',
                    value: '1'
                }
            },
            upload: {
                file: {},
                multiple: true,
                option: {}
            },
            data: {
                time: '2016-05-15',
                startTime: new Date('2016-03-31').getTime(),
                endTime: new Date('2016-03-31').getTime()
            }

        }
    },
    ready: function() {
        this.getTable();
    },
    methods: {
        confrim:function(startTime,endTime){
                    console.log(startTime);
                    console.log(endTime);
        },
        changeToNumber: function(){
            return parseInt(this.toast.timeout)
        },
        showModal: function(name) {
            this.$refs[name].showModal();
        },
        hideModal: function(name) {
            this.$refs[name].hideModal();
        },
        onToastClosed: function() {
            this.toast.show = false;
        },
        uploadFileQueued: function (file, ret) {
            this.upload.file = file;
        },
        treeChangeCheck: function(model, check) {
            let self = this;
            if (check) {
                let isHas = true;
                this.tree.values.forEach(function(item, index) {
                    if (model.value == item.value) {
                        isHas = false;
                    }
                });
                if (isHas) {
                    self.tree.values.push(model);
                }
            } else {
                this.tree.values.forEach(function(item, index) {
                    if (model.value == item.value) {
                        self.tree.values.splice(index, 1);
                    }
                });
            }

        },
        treeChangeSelect: function(model) {
            this.tree.value = model;
        },
        searchKeyValue: function (value) {
            alert(value);
        },
        tableCheckRow: function (selects, row) {
            alert(row[0]);
        },
        cascaderChangeCheck: function(model, check, subLevel, checkLevel) {
            let self = this;
            if (check) {
                this.cascader.values.$set(subLevel - 1, model);
            }
            while (this.cascader.values.length > checkLevel) {
                this.cascader.values.pop();
            }
        },
        cascaderChangeSelect: function(model) {
            this.cascader.value = model;
        },
        showSpinner: function(name) {
            var self = this;
            this.$refs[name].show();
            setTimeout(function() {
                self.$refs[name].hide();
            }, 2000);
        },
        getTable: function() {
            let self = this;
            let body = {}
            let options = {
                emulateJSON: true
            }
            // GET /someUrl
            let data = {
                "pageTitle": "机器生成列表",
                "tableHeader": [
                    "序号",
                    "场景|类型",
                    "行业",
                    "标题",
                    "添加时间",
                    "修改时间",
                    "状态",
                    "操作"
                ],
                "tableData": [
                    [
                        "7",
                        "百度指数",
                        "finance",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>朱茵示爱黄贯中</a>",
                        "2016-11-28 15:49:18",
                        "2016-12-07 11:12:14",
                        "待植入广告",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
                    ],
                    [
                        "11",
                        "百度指数",
                        "finance",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>女子落水5男救人</a>",
                        "2016-11-29",
                        "11:11:57",
                        "待植入广告",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
                    ],
                    [
                        "12",
                        "微博热搜",
                        "finance",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>支付宝圈子</a>",
                        "2016-11-29 13:55:47",
                        "2016-12-06 20:34:48",
                        "机器编辑完成",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
                    ],
                    [
                        "17",
                        "|<a href=' / api / delivery / igc / alist ? type = guanshui '>灌水</a>",
                        "finance",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>支付宝圈子</a>",
                        "2016-11-29 16:30:52",
                        "2016-12-06 20:34:42",
                        "机器编辑完成",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
                    ],
                    [
                        "18",
                        "知乎",
                        "finance",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>股市几点开盘收盘</a>",
                        "2016-11-29 17:39:18",
                        "2016-12-06 20:34:36",
                        "机器编辑完成",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
                    ],
                    [
                        "27",
                        "百度指数",
                        "finance",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>6省公务员涨工资</a>",
                        "2016-12-05 15:22:30",
                        "2016-12-07 11:09:29",
                        "待植入广告",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a>"
                    ],
                    [
                        "32",
                        "知乎",
                        "finance",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>姚明的身高体重</a>",
                        "2016-12-06 17:39:33",
                        "2016-12-07 11:10:12",
                        "待植入广告",
                        "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
                    ]
                ],
                "all": 7,
                "size": 10,
                "now": 1
            };
            self.table.tableHeader = [];
            self.table.tableBody = [];
            data.tableHeader.forEach(function(content, index) {
                self.table.tableHeader.push({
                    field: index,
                    name: content
                });
            });
            data.tableData.forEach(function(array) {
                let obj = {};
                array.forEach(function(content, index) {
                    obj[index] = content;
                });
                self.table.tableBody.push(obj);
            });

            this.table.all = parseInt(data.all);
            this.table.size = parseInt(data.size);
            this.table.now = parseInt(data.now);
            this.table.title = '数据表格';
        },
    },
}
</script>
<style>
</style>
