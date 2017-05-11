// button.vue
<style>


</style>
<template>
  <div>
    <el-table :title="title" :header="header" :body="body" :selects.sync="selects" :check-change="check" :page-change="update"
      :size-change="update" :page-total.sync="pageTotal" :page-size.sync="pageSize" :page-number.sync="pageNumber" :loading="loading"></el-table>
  </div>
</template>
<script>
  import elTable from '../components/table';
  export default {
    name: 'v-table',
    components: {
      elTable
    },
    props: {
      title: String,
      api: String,
      name: String,
      onInit: String,
      onUpdate: String,
      onSave: String,
      vm: Object,
      data: Object
    },
    data: function () {
      // 表格
      return {
        header: [],
        body: [],
        selects: [],
        pageTotal: 10,
        pageSize: 10,
        pageNumber: 1,
        loading: false,
      }
    },
    ready: function () {
      if (this.vm) {
        if (!this.vm[this.name]) {
          this.vm[this.name] = {};
        }
        this.vm[this.name].update = this.update;
      }
      this.init();
    },
    methods: {
      init: function () {
        let self = this;

        let options = {
          emulateJSON: true
        }

        let body = this.onInit;

        // GET /someUrl
        this.$http.post(this.api, body, options).then((response) => {}, (response) => {
          let data = {
            "pageTitle": "机器生成列表",
            "tableHeader": [
              "序号",
              "行业",

              "操作"
            ],
            "tableData": [
              [
                "7",
                "百度指数",
                "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
              ],
              [
                "11",
                "百度指数",
                "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
              ],
              [
                "12",
                "微博热搜",
                "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
              ],
              [
                "17",
                "finance",
                "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
              ],
              [
                "18",
                "知乎",
                "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
              ],
              [
                "27",
                "百度指数",
                "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a>"
              ],
              [
                "32",
                "知乎",
                "<a href=' / api / delivery / igc / adetail ? id = 27 '>修改</a> "
              ]
            ],
            "all": 7,
            "size": 10,
            "now": 1
          };
          data.tableHeader.forEach(function (content, index) {
            self.header.push({
              field: index,
              name: content
            });
          });
          data.tableData.forEach(function (array) {
            let obj = {};
            array.forEach(function (content, index) {
              obj[index] = content;
            });
            self.body.push(obj);
          });

          self.pageTotal = parseInt(data.all);
          self.pageSize = parseInt(data.size);
          self.pageNumber = parseInt(data.now);
        });
      },
      update: function (params) {
        alert("查询用的query是" + params);
        this.init();
      },
      check: function () {

      }
    }
  }

</script>
