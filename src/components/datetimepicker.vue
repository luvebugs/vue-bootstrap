<template>
    <div class="calendar">
        <div class="calendar-input">
            <input type="text" class="form-control" v-model="datetime" @click="show">
        </div>
        <div class="calendar-pannel" v-if="visiable">
            <div class="calendar-item" v-for="calendar in calendars">
                <v-datepicker :side="calendar" :is-ranged="isRanged" :date.sync="date" :start-date.sync="dates[0]" :end-date.sync="dates[1]" :lang="true" :year.sync="year" :month.sync="month"></v-datepicker>
                <v-timepicker :time.sync="times[calendar]"></v-timepicker>
            </div>
        </div>
    </div>
</template>
<script>
    import vTimepicker from './timepicker.vue'
    import vDatepicker from './datepicker.vue'
    export default {
        components: {
            vTimepicker,
            vDatepicker
        },
        props: {
            value: String,
            isRanged: Boolean
        },
        data: function () {
            return {
                visiable: true,
                date: new Date(),
                dates: [null, null],
                times: [null, null],
            };
        },
        computed: {
            calendars: function () {
                return this.isRanged ? 2 : 1;
            },
            datetime: function () {
                if (this.isRanged) {
                    this.value = this.format(this.dates[0], 'yyyy-MM-dd') + ' ' + (this.format(this.times[0], 'hh:mm:ss') || '00:00:00') + '  ' + this.format(this.dates[1], 'yyyy-MM-dd') + ' ' + (this.format(this.times[1], 'hh:mm:ss') || '00:00:00');
                } else {
                    this.value = this.format(this.date, 'yyyy-MM-dd') + ' ' + (this.format(this.times[0], 'hh:mm:ss') || '00:00:00');
                }
                this.change(this.value);
                return this.value;
                
            }
        },
        ready: function () {},
        methods: {
            change: function (value) {
                console.log(value);
            },
            show: function () {
                this.visiable = !this.visiable;
            },
            format: function (time, format) {
                if (!time) {
                    return '';
                }
                format = format || this.format;
                var year = time.getFullYear(), //年份
                    month = time.getMonth() + 1, //月份
                    day = time.getDate(), //日
                    hours24 = time.getHours(), //小时
                    hours = hours24,
                    minutes = time.getMinutes(), //分
                    seconds = time.getSeconds(), //秒
                    milliseconds = time.getMilliseconds(); //毫秒
                var map = {
                    yyyy: year,
                    MM: ('0' + month).slice(-2),
                    M: month,
                    dd: ('0' + day).slice(-2),
                    d: day,
                    HH: ('0' + hours24).slice(-2),
                    H: hours24,
                    hh: ('0' + hours).slice(-2),
                    h: hours,
                    mm: ('0' + minutes).slice(-2),
                    m: minutes,
                    ss: ('0' + seconds).slice(-2),
                    s: seconds,
                    S: milliseconds
                };
                return format.replace(/y+|M+|d+|H+|h+|m+|s+|S+/g, function (str) {
                    return map[str];
                });
            }
        }
    }
</script>
<style lang="less">
    .calendar-input {
        width: 600px;
    }
    .calendar {
        width: 100%;
        position: relative;
        .calendar-pannel {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            float: left;
            min-width: 10rem;
            padding: .5rem 0;
            margin: .125rem 0 0;
            font-size: 1rem;
            color: #292b2c;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, .15);
            border-radius: 2px;
            .calendar-item {
                display: inline-block;
            }
            .calendar-item:nth-child(2):before {
                content: "";
                position: absolute;
                width: 1px;
                height: 230px;
                background: rgba(0, 0, 0, 0.15);
                left: 50%;
                top: 39%;
                margin-top: -90px;
            }
            .calendar-item:nth-child(2):after {
                content: "TO";
                position: absolute;
                width: 24px;
                height: 28px;
                left: 50%;
                top: 82%;
                margin-top: -90px;
                margin-left: -10px;
                font-size: 16px;
                color: #888;
                line-height: 28px;
                background-color: #fff;
            }
        }
    }
</style>