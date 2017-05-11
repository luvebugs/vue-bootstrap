// button.vue
<style>


</style>
<template>
  <div class="row">
    <div class="col-sm-24">
      <label class="col-sm-3 col-form-label"></label>
      <div class="col-sm-21">
        <button type="button" class="btn btn-primary" @click="submit()">{{label}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'v-button',
    props: {
      name: String,
      value: String,
      label: String,
      query: String,
      onSubmit: String,
      data: Object,
      vm: Object
    },
    methods: {
      submit: function () {
        let params = this.query.split('.');
        let value = this[params[0]];
        for (let i = 1; i < params.length; i++) {
          value = value[params[i]]
        }

        let actions = this.onSubmit.split('.');
        let action = this[actions[0]];
        for (let i = 1; i < actions.length; i++) {
          action = action[actions[i]]
        }
        action(value);
      }
    }
  }

</script>
<style>


</style>
