<style>
  .total-page {
    margin-left: 10px;
  }
  
  .all-data {
    margin-left: 10px;
  }
  
  .input-text-hidden {
    text-overflow: ellipsis;
  }

</style>
<template>
  <div>
    <form>
      <div class="bd-callout bd-callout-warning">
        {{title}}
      </div>
      <div class="row">
        <div class="col-sm-24 form-group" v-for="control in controls">
          <div v-if="control.type == 'v-button'" :is="control.type" :type="control.type" :name="control.name" :label="control.label"
            :placeholder="control.placeholder" :muted="control.muted" :data="data" :on-submit="control.onSubmit" :query="control.query"
            :vm="vm"></div>
          <div v-if="control.type != 'v-button'" is="v-input" :type="control.type" :name="control.name" :label="control.label" :placeholder="control.placeholder"
            :muted="control.muted" :data="data"></div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'v-form',
    props: {
      title: String,
      controls: Array,
      api: String,
      data: String,
      name: String,
      data: Object,
      vm: Object
    },
    data: function () {
      return {}
    },
    mounted: function () {
      if (!this.data[this.name]) {
        this.data[this.name] = {};
      }
      this.data[this.name].data = "hello world";
    }
  }

</script>
