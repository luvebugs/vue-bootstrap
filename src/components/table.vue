/**
 * @file 表格
 * @author sunxiaoxu01@baidu.com
 */
<style lang="less" scoped>
@import "style/loading.less";

label {
    color: red;
}
.table-aprday{
    width: auto;
    min-width: 100%;
}
.table-container{
    overflow-x: scroll;
}
.setting {
    margin-bottom: 8px;
}

.table-bordered thead th.header-check {
    width: 20px;
    vertical-align: middle;
}

.body-check {
    width: 20px;
}
.sort-clear{
    margin-right: 8px;
}

th {
    user-select: none;
}
td {
    overflow: hidden;
}
.table-column{
    font-size: 14px;
    word-break: break-all;
}
.table-title {
    height: 28px;
    line-height: 28px;
    padding-left: 16px;
    font-weight: bold;
    color: #888;
    border-left: 1px solid #eee;
    border-left-width: 4px;
    border-radius: 1px;
    border-left-color: #f0ad4e;
}
</style>
<template>
<div>
    <div class="row">
        <div class="col-sm-4">
            <div class="align-middle table-title" v-if="title">
                {{title}}
            </div>
        </div>
        <div class="setting col-sm-20">
            <div ref="setting" class="dropdown float-sm-right" :class="{'open': open}">
                <button type="button" class="btn btn-secondary dropdown-toggle " @click="toggleMenu(open)">
                    <i class="fa fa-cog" aria-hidden="true" style="padding-right: 8px;"></i>显示列
                </button>
                <div class="dropdown-menu dropdown-menu-right" v-show="open">
                    <a class="dropdown-item" @click="showAll(item)">
                        <span>全选</span>
                        <i class="fa fa-check" v-if="allChecked" style="pointer-events: none;"></i>
                    </a>
                    <a class="dropdown-item" v-for="(column, index) in columns" @click="toggleColumn(column)">
                        <span>{{column.name}}</span>
                        <i class="fa fa-check" v-if="column.visible" style="pointer-events: none;"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="row" :class="{'spinner-loading': loading}">
        <div class="col-sm-24" >
            <div class="table-container loading-filter">
            <table class="table table-bordered table-striped table-aprday" >
                <thead class="thead-inverse">
                    <tr>
                        <th v-show="selectable" @click="checkAll(allSelected)" class="header-check">
                            <v-check :check="allSelected" style="pointer-events: none"></v-check>
                        </th>
                        <th v-for="(column, index) in columns" v-show="column.visible" @click="sortcColumn(column, index)" v-bind:style="{'min-width': column.width}">
                            <span class="table-column" v-html="column.name"></span>
                            <template v-if="column.sortable">
                                <i class="fa fa-sort float-xs-right" aria-hidden="true" v-if="sortOrders.key !== column.name"></i>
                                <i class="fa fa-sort-amount-desc float-xs-right" aria-hidden="true" v-if="sortOrders.key === column.name && sortOrders.value === 'desc'"></i>
                                <i class="fa fa-sort-amount-asc float-xs-right" aria-hidden="true" v-if="sortOrders.key === column.name && sortOrders.value === 'asc'"></i>
                            </template>
                        </th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr v-for="(row, index) in rows" @click="checkRow(row)">
                        <td v-show="selectable" class="body-check">
                            <v-check :check="row.checked" style="pointer-events: none"></v-check>
                        </td>
                        <td v-for="column in columns" v-show="column.visible">
                            <span class="table-column" v-html="getColumn(column, row, index)"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-24">
            <v-pagination :page-number="pageNumber" :page-size="pageSize" :page-total="pageTotal" :size-change="sizeChange" :page-change="pageChange"></v-pagination>
        </div>
    </div>

</div>
</template>
<script>
import vPagination from './pagination'
import vCheck from './check'

export default {
    components: {
        vPagination,
        vCheck
    },
    data() {
        return {
            "sortOrders": {
                key: '',
                value: 'none'
            },
            "allSelected": false,
            open: false
        }
    },
    props: {
        'data': {
            type: Object
        },
        'handler': {
            type: Function,
            default: function () {
            }
        },
        'loading': {
            type: Boolean,
            default: false
        },
        "selectable": {
            type: Boolean,
            default: true
        },
        "sortHandle": {
            type: Function,
            default: function(order, column, rows, index) {
                rows.sort(function(x, y) {
                    if (order === 'desc') {
                        return x[column.field].localeCompare(y[column.field]);
                    } else if (order === 'asc') {
                        return y[column.field].localeCompare(x[column.field]);
                    } else {
                        return;
                    }
                });
            }
        },
        "pageTotal": {
            type: Number,
            default: 10,
            // required: true
        },
        "pageSize": {
            type: Number,
            default: 10,
            // required: true
        },
        "pageNumber": {
            type: Number,
            default: 1,
            // required: true
        },
        'title': {
            type: String
        },
        "header": {
            type: Array,
            // required: true
            default: function () {
                return []
            }
        },
        "body": {
            type: Array,
            // required: true
            default: function () {
                return []
            }
        },
        'selects': {
            type: Array
        },
        'pageChange': {
            type: Function,
            default: function () {
            }
        },
        'sizeChange': {
            type: Function,
            default: function () {
            }
        },
        'checkChange':{
            type: Function
        }


    },
    computed: {
        columns: function () {
                let self = this;
                (self.data ? self.data.header : self.header).forEach(function(item, index) {
                    let visible = window.localStorage? localStorage.getItem(item.field): Cookie.read(item.field);
                    let column = {
                        visible: visible ? visible === 'true' : true,
                        field: item.field,
                        name: item.name,
                        handler: item.handler,
                        sortable: item.sortable,
                        width: item.width || 'auto'
                    }
                    Vue.set(self.header, index, column);
                });
                return self.header;
        },
        rows: function () {
            let self = this;
            (self.data ? self.data.body : self.body).forEach(function(item, index) {
                let row = {
                    checked: false
                };
                for (var key in item) {
                    row[key] = item[key];
                }
                Vue.set(self.body, index, row);
            });
            return self.body;
        },
        allChecked: function () {
            let self = this;
            var isAll = true
            self.columns.forEach(function(item, index) {
                if (!item.visible) {
                    isAll = false;
                    return false;
                }
            });
            return isAll;
        }
    },
    mounted: function () {
        this._closeEvent = document.addEventListener('click', (e) => {
          if (this.$refs && this.$refs.setting && !this.$refs.setting.contains(e.target)) this.open = false;
        });

        this.handler(this);
    },
    beforeDestroy () {
        if (this._closeEvent) this._closeEvent.remove();
    },

    methods: {
        compileRender () {
            let self = this
            self.$nextTick(() => {
                try{
                    self._context.$destory();
                    self._context.$compile(self.$el);
                }catch (error) {
                }
            });
        },
        toggleColumn: function(column) {
            let self = this;
            //存储，IE6~7 cookie 其他浏览器HTML5本地存储
            column.visible = !column.visible;
            if (window.localStorage) {
                localStorage.setItem(column.field, column.visible);
            } else {
                Cookie.write(column.field, column.visible);
            }
        },
        sortcColumn: function(column, index) {
            if (column.sortable) {
                this.sortOrders.key = column.name
                if (this.sortOrders.value === 'none') {
                    this.sortOrders.value = 'asc';
                } else if (this.sortOrders.value === 'desc'){
                    this.sortOrders.value = 'none';
                    this.sortOrders.key = '';
                } else if (this.sortOrders.value === 'asc'){
                    this.sortOrders.value = 'desc';
                }
                if (this.sortHandle) {
                    this.sortHandle(this.sortOrders.value, column, this.rows, index);
                }
            }
        },
        checkAll: function(allSelected) {
            const self = this;
            self.rows.forEach(function(column) {
                if (allSelected) {
                    column.checked = false;
                    self.allSelected = false;
                } else {
                    column.checked = true;
                    self.allSelected = true;
                }
            });
            self.getCheck();
        },
        checkRow: function(row) {
            const self = this;
            if (row.checked) {
                row.checked = false;
            } else {
                row.checked = true;
            }
            let isAllSelected = true;
            self.rows.forEach(function(column) {
                if (!column.checked) {
                    isAllSelected = false;
                    return false;
                }
            });
            if (isAllSelected) {
                self.allSelected = true;
            } else {
                self.allSelected = false;

            };
            self.getCheck(row);
        },
        getColumn: function (column, row, index) {
            let self = this;
            // return column.handler ? self.$interpolate(column.handler(row, index)) : row[column.field];
            var content = column.handler ? column.handler.call(self._context, row, index) : row[column.field];
            self.compileRender();
            return content;
        },
        getCheck: function (row) {
            let self = this;
            self.selects = [];
            self.rows.forEach(function(column) {
                if (column.checked) {
                    self.selects.push(column);
                }
            });
            this.checkChange && this.checkChange(self.selects, row);
        },
        toggleMenu: function (open) {
            this.open = !this.open;
        },
        showAll: function () {
            let self = this;
            if (self.allChecked) {
                self.clearCheck();
            } else {
                self.columns.forEach(function(item, index) {
                    item.visible = true;
                });
            }

        },
        clearCheck: function () {
            let self = this;
            self.columns.forEach(function(item, index) {
                item.visible = false;
            });
        }
    }
}
</script>
