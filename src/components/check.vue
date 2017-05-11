<template>
    <label class="i-checks m-b-none" :class="{'i-radio': type == 'radio'}" @change="change(check)">
        <span v-if="type == 'radio'"><input type="{{type}}" v-model="radio" name="{{name}}" value="{{value}}"/><i></i></span>
        <span v-else><input type="{{type}}" v-model="check"/><i></i></span>
    </label>
</template>

<script>
export default {
    name: 'v-check',
    props: {
        check: {
            type: Boolean,
            default: false
        },
        radio: {
            type: String,
            default: false
        },
        change: {
            type: Function,
            default: function (check) {
            }
        },
        type: {
            type: String,
            default: 'checkbox'
        },
        name: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
.m-b-none {
    margin-bottom: 0!important;
}
.i-checks {
    padding-left: 20px;
    cursor: pointer;
}

.i-checks input {
    opacity: 0;
    position: absolute;
    margin-left: -20px;
}

.i-checks input:checked+i {
    border-color: #1D8CE0;
}
.i-checks i {
    width: 16px;
    height: 16px;
    line-height: 1;
    border: 1px solid #cfdadd;
    background-color: #fff;
    margin-left: -20px;
    margin-top: -2px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    position: relative;
}
.i-checks input:checked+i:before {
    left: 3px;
    top: 3px;
    width: 8px;
    height: 8px;
    background-color: #1D8CE0;
}
.i-checks i:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    background-color: transparent;
    -webkit-transition: all .2s;
    transition: all .2s;
}
.i-radio i{
    border-radius: 8px;
}
.i-radio i:before {
    border-radius: 4px;
}
</style>
