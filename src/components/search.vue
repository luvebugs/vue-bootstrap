<style>
.dropdown-input-group{
    border-right: none;
}
</style>
<template>
    <div class="input-group">
        <span class="input-group-btn" v-if="options">
                    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-input-group" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-text="label">
                    </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" @click="select(option)" v-for="option in options">{{option.name}}</a>
                  </div>
        </span>
        <input type="text" class="form-control" placeholder="关键词" v-model="value">
        <span class="input-group-btn">
            <button class="btn btn-outline-secondary" type="button" @click="search(value)"><i class="fa fa-search" aria-hidden="true"></i>搜索</button>
        </span>
    </div>
</template>

<script>
export default {
    name: 'v-search',
    props: {
        options: {
            type: Array,
            required: true
        },
        selected: {
            type: Object,
            default: '请选择'
        },
        value: {
            type: String,
            required: true
        },
        search: {
          type: Function,
          default (value) {
            return value;
          }
        },
    },
    computed: {
        label: function() {
            return this.selected.name;
        }
    },
    methods: {
        select: function(option) {
            this.selected = option
        }
    }
}
</script>
