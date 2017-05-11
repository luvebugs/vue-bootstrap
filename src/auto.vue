// app.vue
<style>
    .data-code {
        width: 100%;
        height: 600px;
    }
    .bd-callout {
    padding: 0 8px;
    margin-top: 0;
    margin-bottom: 8px;
    border-left: 4px solid #eee;
    color: #999;
    }
    .bd-callout-warning {
        border-left-color: #f0ad4e;
    }
</style>
<template>
    <div style="">
        <div class="bd-callout bd-callout-warning">
            {{page.title}} {{page.remark}}
        </div>
        <div>
            <div :is="grid.type" :columns="grid.columns" v-for="grid in page.body" :data="data" :vm="vm">
            </div>
        </div>
        <textarea class="data-code" v-model="page | json 4"></textarea>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                table: {},
                data: {},
                vm: {},
                page: {
                    "title": "Form Modes",
                    "remark": "展示各种模式的 Form",
                    "body": [{
                        "type": "v-grid",
                        "columns": [{
                            "type": "v-form",
                            "name": "myform",
                            "api": "/api/mock/saveForm?waitSeconds=2",
                            "title": "表单1",
                            "controls": [{
                                "type": "v-email",
                                "name": "email",
                                "placeholder": "输入邮箱",
                                "muted": "邮箱长度",
                                "label": "邮箱",
                            },{
                                "type": "v-password",
                                "name": "password",
                                "label": "密码",
                                "placeholder": "输入密码",
                                "muted": "密码长度"
                            },{
                                "type": "v-button",
                                "name": "保存",
                                "label": "保存",
                            }],
                            
                        },{
                            "type": "v-form",
                            "name": "myform",
                            "api": "/api/mock/saveForm?waitSeconds=2",
                            "title": "表单2",
                            "controls": [{
                                "type": "v-text",
                                "name": "text",
                                "placeholder": "输入姓名",
                                "muted": "姓名长度",
                                "label": "姓名",
                            },{
                                "type": "v-password",
                                "name": "password",
                                "label": "密码",
                                "placeholder": "输入密码",
                                "muted": "密码长度"
                            },{
                                "type": "v-button",
                                "name": "保存",
                                "label": "保存",
                                "query": "data.myform.data",
                                "onSubmit": "vm.mytable.update",
                            }]
                        }]
                    }, {
                        "type": "v-grid",
                        "columns": [{
                            "type": "v-table",
                            "name": "mytable",
                            "api": '/api/comm-igc/igc/table?table=scenelisten',
                            "title": "数据表格",
                            "onInit": "data.myform.data",
                            "onUpdate": "data.myform.data"
                            
                        }]
                    }]
                }
            }
        },
        ready: function () {}
    }
</script>
<style>

</style>