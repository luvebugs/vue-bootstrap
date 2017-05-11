<template>
    <div class="timepicker">
        <div class="timepicker-warp">
            <div class="timepicker-header">时</div>
            <div class="timepicker-scrollbar" ref="hour" v-scroll:scroll="'hour'">
                <ul class="timepicker-list">
                    <li class="timepicker-item" v-for="n in 24" v-text="n" @click="selectHour('hour', n, $event)" :class="{'active': n == hour}"></li>
                </ul>
            </div>
        </div>
        <div class="timepicker-warp">
            <div class="timepicker-header">分</div>
            <div class="timepicker-scrollbar" ref="minute" v-scroll:scroll="'minute'">
                <ul class="timepicker-list">
                    <li class="timepicker-item" v-for="n in 60" v-text="n" @click="selectMinute('minute', n, $event)" :class="{'active': n == minute}"></li>
                </ul>
            </div>
        </div>
        <div class="timepicker-warp">
            <div class="timepicker-header">秒</div>
            <div class="timepicker-scrollbar" ref="second" v-scroll:scroll="'second'">
                <ul class="timepicker-list" >
                    <li class="timepicker-item" v-for="n in 60" v-text="n" @click="selectSecond('second', n, $event)" :class="{'active': n == second}"></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';

    Vue.directive('scroll', function (value) {
        this.el.addEventListener('scroll', (e) => {
            this.vm[this.name](value, e);
        });
    })
    export default {
        name: 'v-timepicker',
        props: {
            time: Date,
            value: String
        },
        data: function () {
            return {
                hour: 0,
                minute: 0,
                second: 0,
                itemTarget: {}
            }
        },
        computed: {
            hour: {
                get: function () {
                    return this.time ? (this.time.getHours() == 12 ? 0 : this.time.getHours()) : 0;
                },
                set: function (hour) {
                    let date = new Date();
                    date.setHours(hour, this.minute, this.second);
                    this.time = date;
                }
            },
            minute: {
                get: function () {
                    return this.time ? this.time.getMinutes() : 0;
                },
                set: function (minute) {
                    let date = new Date();
                    date.setHours(this.hour, minute, this.second);
                    this.time = date;
                }
            },
            second: {
                get: function () {
                    return this.time ? this.time.getSeconds() : 0;
                },
                set: function (second) {
                    let date = new Date();
                    date.setHours(this.hour, this.minute, second);
                    this.time = date;
                }
            },
        },
        methods: {
            scroll: function (type, event) {
                var number = this.$refs[type].scrollTop / 24 - 0.5;
                this[type] = Math.ceil(number);

            },
            selectHour: function (type, number, event) {
                this.hour = number;
                this.itemTarget = event.target;
                this.$refs[type].scrollTop = number * event.target.clientHeight;
            },
            selectMinute: function (type, number, event) {
                this.minute = number;
                this.$refs[type].scrollTop = number * event.target.clientHeight;
            },
            selectSecond: function (type, number, event) {
                this.second = number;
                this.$refs[type].scrollTop = number * event.target.clientHeight;
            }
        },
    }
</script>
<style lang="less">
    .timepicker {
        position: relative;
        float: left;
        width: 148px;
        font-size: 14px;
        margin: 0 16px 0 0;
        &:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden
        }
        &:before {
            content: "";
            position: absolute;
            width: 1px;
            height: 198px;
            background: rgba(0, 0, 0, 0.15);
            left: 0;
            top: 46%;
            margin-top: -90px;
            padding: 16px 0;
            z-index: 1;
        }
        .timepicker-warp {
            position: relative;
            float: left;
            width: 33%;
            overflow: hidden;
            .timepicker-header {
                position: absolute;
                text-align: center;
                background: #fff;
                width: 100%;
                height: 28px;
                line-height: 24px;
            }
            &:not(:nth-child(1)):after,
            &:nth-child(1):after {
                content: "";
                top: 96px;
                color: #fff;
                position: absolute;
                line-height: 10px;
                background-color: #1D8CE0;
                height: 24px;
                z-index: -1;
                left: 0;
                right: 0;
                box-sizing: border-box;
                padding-top: 6px;
                text-align: left;
            }
            &:not(:nth-child(1)):after {
                content: ":";
            }
        }
        .timepicker-warp:nth-child(2) {
            padding-left: 1%;
        }
        .timepicker-scrollbar {
            overflow: scroll;
            max-height: 216px;
            // &::-webkit-scrollbar {
            //     display: none
            // }
            width: 200%;
            padding-right: 100%;
            .timepicker-list {
                list-style: none;
                margin: 0;
                padding: 0;
                &:before,
                &:after {
                    content: "";
                    height: 96px;
                    display: block;
                }
                .timepicker-item {
                    text-align: center;
                    height: 24px;
                    line-height: 24px;
                    cursor: pointer;
                    &:hover {
                        // background: #f7f7f7;
                    }
                }
            }
        }
        .active {
            color: #fff;
        }
    }
</style>