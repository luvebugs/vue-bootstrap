<template>
    <div class="datepicker">
        <div class="datepicker-header" v-show="!monthsVisiable && !yearsVisiable">
            <span class="prev-year" @click="changeYear(year - 1)" :class="{'disabled': canChangeYear(year - 1)}"><i class="fa fa-angle-double-left" aria-hidden="true"></i></span>
            <span class="prev-month" @click="changeMonth(month - 1, calendar)" :class="{'disabled': canChangeMonth(month - 1)}"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
            <span class="year" v-text="year" @click="showYears()"></span>
            <span class="month" v-text="month" @click="showMonths()"></span>
            <span class="next-year" @click="changeYear(year + 1)" :class="{'disabled': canChangeYear(year + 1)}"><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
            <span class="next-month" @click="changeMonth(month + 1, calendar)" :class="{'disabled': canChangeMonth(month + 1)}"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </div>
        <div class="datepicker-header" v-show="monthsVisiable || yearsVisiable">
            <a class="year" v-text="year" @click="showYears()"></a>
            <a class="month" v-text="month" @click="showMonths()"></a>
        </div>
        <div class="datepicker-content">
            <table class="datepicker-date" cellspacing="0" cellpadding="0" v-show="!monthsVisiable && !yearsVisiable" @mouseleave="changeRange(this.date, true)">
                <tr>
                    <th v-for="day in days" v-text="day"></th>
                </tr>
                <tr v-for="i in 6">
                    <td v-for="j in 7" @click="selectDate(this.filterDates[i * 7 + j], i * 7 + j, calendar)" @mouseover="changeRange(this.filterDates[i * 7 + j])">
                        <div class="date" v-if="this.filterDates[i * 7 + j]" v-text="this.filterDates[i * 7 + j].day" :class="{'disabled': this.filterDates[i * 7 + j].isDisabled,
                                    'selected': this.filterDates[i * 7 + j].isSelected,
                                    'ranged': this.filterDates[i * 7 + j].isInRang,
                                    'today': this.filterDates[i * 7 + j].isToday}">
                        </div>
                    </td>
                </tr>
            </table>
            <div class="datepicker-year" v-show="yearsVisiable">
                <span class="datepicker-year-prev" @click="changeYearRange(-1)" :class="{'disabled': canChangeYear(year - 1)}"><i class="fa fa-caret-up" aria-hidden="true"></i></span>
                <span class="datepicker-year-item" v-for="item in filterYears" @click="selectYear(item)" :class="{'datepicker-year-selected': item.isSelected, 'disabled': canChangeYear(item.value)}">{{item.value}} 年</span>
                <span class="datepicker-year-next" @click="changeYearRange(1)" :class="{'disabled': canChangeYear(year + 1)}"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
            </div>
            <div class="datepicker-month" v-show="monthsVisiable">
                <span v-for="item in filterMonths" class="datepicker-month-item" @click="selectMonth(item)" :class="{'datepicker-month-selected': item.isSelected, 'disabled': canChangeMonth(item.value)}">{{item.value}} 月</span>
            </div>
        </div>
        <div class="datepicker-footer"></div>
    </div>
</template>
<script>
    export default {
        props: {
            date: Date,
            startDate: Date,
            endDate: Date,
            isRanged: Boolean,
            side: Number,
            value: String,
            lang: Boolean
        },
        data: function () {
            // let dates = this.getDates();
            return {
                year: new Date().getFullYear(),
                month: this.side ? new Date().getMonth() + 2 : new Date().getMonth() + 1,
                days: this.lang ? ['一', '二', '三', '四', '五', '六', '日'] : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                ],
                dates: [],
                years: [],
                months: [],
                yearsVisiable: false,
                monthsVisiable: false,
                firstDay: 0,
                lastDay: 41,
                borderDate: null
            };
        },
        computed: {
            filterValue: function () {
                return this.value = this.format(this.date, 'yyyy-MM-dd');
            },

            filterDates: function () {
                let self = this;

                let dates = [];
                let today = new Date();
                let year = this.year;
                let month = this.month;
                let days = new Date(year, month, 0).getDate();
                let before = new Date(year, month - 1, 0);

                let after = before.getDay() + days;
                for (let i = 0; i < 42; i++) {
                    let day = 0;

                    let isDisabled = true;
                    if (i <= before.getDay()) {
                        day = before.getDate() - before.getDay() + i;
                        month = before.getMonth() || 12;
                    } else if (i > after) {
                        day = i - after;
                        month = before.getMonth() + 2;
                    } else {
                        day = i - before.getDay();
                        month = before.getMonth() + 1;
                        isDisabled = false;
                    }
                    // 时间范围
                    let isInRang = false;
                    let rangeDate = new Date(year, month, day);
                    isInRang = this.startDate && rangeDate > this.startDate && rangeDate < (this.endDate || this.borderDate) ? true : false;

                    // 被选择的时间
                    let isSelected = this.format(rangeDate, 'yyyy-MM-dd') == this.format(this.startDate,
                        'yyyy-MM-dd') || this.format(rangeDate, 'yyyy-MM-dd') == this.format(this.endDate,
                        'yyyy-MM-dd') || this.format(rangeDate, 'yyyy-MM-dd') == this.format(this.date, 'yyyy-MM-dd');

                    // 是否今天
                    let isToday = this.format(rangeDate, 'yyyy-MM-dd') == this.format(today, 'yyyy-MM-dd');

                    dates.push({
                        day: day,
                        month: month,
                        year: year,
                        isInRang: isDisabled ? false : isInRang,
                        isSelected: isDisabled ? false : isSelected,
                        isDisabled: isDisabled,
                        isToday: isToday
                    });
                }
                this.firstDay = before.getDay();
                this.lastDay = after;
                return this.dates = dates;
            },
            filterYears: function () {
                let self = this;
                let start = this.year - Math.floor(new Date().getFullYear() % 10 - 2);
                while (this.years.length < 10) {
                    this.years.$set(this.years.length, {
                        value: start++,
                        isSelected: start - 1 == this.year
                    });
                }
                this.years.forEach(function (year) {
                    year.isSelected = year.value == self.year;
                });
                return this.years;
            },
            filterMonths: function () {
                let self = this;
                while (this.months.length < 12) {
                    this.months.$set(this.months.length, {
                        value: this.months.length + 1,
                        isSelected: this.months.length + 1 == this.month
                    });
                }
                this.months.forEach(function (month) {
                    month.isSelected = month.value == self.month;
                });
                return this.months; 
            }
        },
        methods: {
            canChangeYear: function (year) {
                if (this.isRanged) {
                    if (!this.side) {
                        return year > new Date().getFullYear();
                    } else {
                        return year < new Date().getFullYear();
                    }
                }
            },
            canChangeMonth: function (month) {
                if (this.isRanged) {
                    if (!this.side) {
                        return month > new Date().getMonth() + 1;
                    } else {
                        return month < new Date().getMonth() + 2;
                    }
                }
            },
            changeRange: function (date, last) {
                if (last) {
                    if (!this.side) {
                        date = this.dates[this.lastDay];
                    } else {
                        date = this.dates[this.firstDay];
                    }
                }

                this.borderDate = new Date(date.year, date.month, date.day);
            },
            showYears: function () {
                this.monthsVisiable = false;
                this.yearsVisiable = !this.yearsVisiable;
            },
            showMonths: function () {
                this.yearsVisiable = false;
                this.monthsVisiable = !this.monthsVisiable;
            },
            changeMonth: function (month) {
                let date = new Date(this.year, month, 1);
                this.month = date.getMonth() || 12;
                this.dates = this.getDates();
            },
            changeYear: function (year) {
                let date = new Date(year, this.month, 1);
                this.year = date.getFullYear();
                this.dates = this.getDates();
            },
            changeYearRange: function (rang) {
                this.year = this.year + rang * 10;
                this.years = [];
            },
            selectDate: function (date, index, calendar) {
                let selectedDate = new Date(date.year, date.month, date.day);
                if (this.isRanged) {
                    if (this.endDate) {
                        this.clearDates();
                    }
                    
                    if (this.startDate) {
                        this.endDate = selectedDate;
                    } else {
                        this.startDate = selectedDate;
                    }
                    // 确定范围
                    if (this.endDate && this.startDate) {
                        if (this.endDate < this.startDate) {
                            let d = this.startDate;
                            this.startDate = this.endDate;
                            this.endDate = d;
                        }
                    }
                } else {
                    if (date.isDisabled) {
                        return;
                    }
                    this.clearDates();
                    this.date = selectedDate;
                }

            },
            selectYear: function (year) {
                this.year = year.value;
            },
            selectMonth: function (month) {
                this.month = month.value;
            },
            getDates: function () {
                let dates = [];
                let today = new Date();
                let year = this.year || today.getFullYear();
                let month = this.month || today.getMonth() + 1;
                let days = new Date(year, month, 0).getDate();
                let before = new Date(year, month - 1, 0);

                let after = before.getDay() + days;
                for (let i = 0; i < 42; i++) {
                    let day = 0;
                    let isDisabled = true;
                    if (i <= before.getDay()) {
                        day = before.getDate() - before.getDay() + i;
                        month = before.getMonth() + 1 || 12;
                    } else if (i > after) {
                        day = i - after;
                        month = before.getMonth() + 3;
                    } else {
                        day = i - before.getDay();
                        month = before.getMonth() + 2;
                        isDisabled = false;
                    }
                    dates.push({
                        day: day,
                        month: month,
                        year: year,
                        isInRang: false,
                        isSelected: false,
                        isDisabled: isDisabled,
                        isToday: true
                    });
                }
                this.firstDay = before.getDay();
                this.lastDay = after;
                return dates;
            },
            clearDates: function () {
                let dates = this.dates;
                dates.forEach(function (date, index) {
                    date.isSelected = false;
                    date.isInRang = false;
                });
                this.startDate = this.endDate = null;
            },
            //将Date转化为指定格式的String
            format: function (time, format) {
                if (!time) {
                    return '';
                }
                format = format || this.format;
                var year = time.getYear(), //年份
                    month = time.getMonth() + 1, //月份
                    day = time.getDate(), //日
                    hours24 = time.getHours(), //小时
                    hours = hours24 % 12 === 0 ? 12 : hours24 % 12,
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
            },
        }
    }
</script>
<style lang="less">
    .datepicker {
        float: left;
        width: 196px;
        margin: 0 8px 0 16px;
        
        .datepicker-header {
            text-align: center;
            .year,
            .month, 
            .date-back {
                padding: 0 8px;
                font-size: 14px;
                cursor: pointer;
            }
        }
        .prev-year,
        .prev-month {
            float: left;
            display: block;
            padding: 0 8px;
            cursor: pointer;
        }
        .next-year,
        .next-month {
            float: right;
            display: block;
            padding: 0 8px;
            cursor: pointer;
        }
        
        th,
        td {
            width: 28px;
            height: 28px;
            text-align: center;
            box-sizing: border-box;
            cursor: pointer;
        }
        th {
            font-weight: normal;
        }
        td {
            cursor: pointer;
        }
        td:hover,
        .calendar-inrange {
            background: #afddff;
        }
        .date {
            height: 100%;
            width: 100%;
            line-height: 28px;
        }
        .disabled {
            cursor: not-allowed;
            color: #ddd;
        }
        .selected {
            color: #fff;
            background: #1D8CE0;
        }
        .ranged {
            background: #afddff;
        }
        .today {
            border: 1px solid #1D8CE0;
        }
        .datepicker-year {
            .datepicker-year-prev,
            .datepicker-year-next {
                width: 100%;
                text-align: center;
                display: block;
                padding: 6px 0;
                height: 28px;
                cursor: pointer;
            }
            .datepicker-year-item {
                display: inline-block;
                width: 50%;
                text-align: center;
                height: 28px;
                line-height: 28px;
                cursor: pointer;
                &:hover {
                    background: #afddff
                }
            }
            .datepicker-year-item.datepicker-year-selected {
                background: #1D8CE0;
            }
        }
        .datepicker-month {
            .datepicker-month-item {
                display: inline-block;
                width: 33%;
                text-align: center;
                height: 48px;
                line-height: 48px;
                &:hover {
                    background: #afddff
                }
            }
            .datepicker-month-item.datepicker-month-selected {
                 background: #1D8CE0;
            }
        }

        .disabled {
            color: #ddd;
            pointer-events: none;
        }
    }
</style>