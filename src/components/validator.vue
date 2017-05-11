<style>
.user {
    height: 30px;
    line-height: 30px;
    padding: 10px;
    border-top: 1px solid #eee;
    overflow: hidden;
    transition: all .25s ease;
}

.user:last-child {
    border-bottom: 1px solid #eee;
}

.v-enter,
.v-leave-active {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-top-width: 0;
    border-bottom-width: 0;
}

.errors {
    color: #f00;
}
</style>
<template>
<div>
</div>
</template>

<script>
import Vue from 'vue';

const regExpConfig = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    integer: /^(\d+)$/
}

function reqiuredValid(validation, isValid) {
    if (validation.required) {
        if (validation.value) {
            isValid = true;
        } else {
            isValid = false;
        }
    }
    return isValid;
}

function minAndMaxValid(validation, isValid) {
    if (validation.minNumber && validation.maxNumber) {
        isValid = (parseInt(validation.value) >= parseInt(validation.minNumber))
        && (parseInt(validation.value) <= parseInt(validation.maxNumber))
        ? true : false;
    }
    return isValid;
}

function regExpValid(validation, isValid) {
    if (validation.regExp) {
        isValid = regExpConfig[validation.regExp].test(validation.value) ? true : false;
    }
    return isValid;
}
Vue.directive('validate', {
    bind: function() {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
    },
    update: function(validation) {
        let isValid = false;
        isValid = reqiuredValid(validation, isValid);
        if (!isValid) {
            this.vm.$set(validation.result, isValid);
            return;
        }
        isValid = minAndMaxValid(validation, isValid);
        if (!isValid) {
            this.vm.$set(validation.result, isValid);
            return;
        }
        isValid = regExpValid(validation, isValid);
        if (!isValid) {
            this.vm.$set(validation.result, isValid);
            return;
        }
        this.vm.$set(validation.result, isValid);
    }
});
</script>
