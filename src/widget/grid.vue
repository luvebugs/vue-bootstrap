// grid.vue
<style>


</style>
<template>
  <div class="row">
    <div class="col-sm-{{24/columns.length}}" v-for="column in columns">
      <div :is="column.type" :title="column.title" :controls="column.controls" :api="column.api" :handler="column.handler" :name="column.name"
        :on-init="column.onInit" :data="data" :vm="vm"></div>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    name: 'v-grid',
    props: {
      columns: Array,
      data: Object,
      vm: Object
    }
  }

</script>
<style>


</style>
