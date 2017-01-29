<style lang="less">
.widget-switch(@switchWidth, @switchHeight, @switchMargin) {
    & {
        -webkit-appearance: none;
        appearance: none;
        position: relative;
        width: @switchWidth;
        height: @switchHeight - @switchMargin * 2;
        border: 1px solid #DFDFDF;
        outline: 0;
        border-radius: 16px;
        box-sizing: border-box;
        background: #DFDFDF;
        margin: @switchMargin 0;
        &:before {
            content: " ";
            position: absolute;
            top: 0;
            left: 0;
            width: @switchWidth - 2;
            height: @switchHeight - 2 - @switchMargin * 2;
            border-radius: @switchHeight / 2 - 2;
            background-color: #FDFDFD;
            -webkit-transition: transform 0.3s;
            transition: transform 0.3s;
        }
        &:after {
            content: " ";
            position: absolute;
            top: -@switchMargin;
            left: 0;
            width: @switchHeight - 2;
            height: @switchHeight - 2;
            border-radius: 15px;
            background-color: #FFFFFF;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
            -webkit-transition: transform 0.3s;
            transition: transform 0.3s;

        }
        &:checked {
            border-color: #1D8CE0;
            background-color: #1D8CE0;
            &:before {

                -webkit-transform: scale(0);
            }
            &:after {
                -webkit-transform: translateX(11px);
                transform: translateX(11px);
            }
        }
    }
}
.widget-switch {
    .widget-switch(28px, 18px, 1px);
}
</style>
<template>
<div class="form-group">
    <input class="widget-switch" type="checkbox" :disabled="disabled" v-model="value" />
</div>
</template>
<script>
// define the item component
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            twoWay: true
        }
    }
}
</script>
