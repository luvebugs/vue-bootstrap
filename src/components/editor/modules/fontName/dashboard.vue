<style scoped>
    .font {
        position: relative;
    }
    .dashboard-font {
        min-width: 176px;
        line-height: 36px;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        overflow: auto;
        border: 1px solid #ddd;
        border-bottom: none;
    }

</style>
<template>
    <div class="font">
        <span class="icon" @click="activeDashboard" v-text="value"></span>
        <div class="dashboard dashboard-font" v-show="show">
            <label>
                {{$parent.locale["font name"]}}:
            </label>
            <button v-for="name in nameList" type="button" class="button" @click="setFontName(name)" :class="{'selected': fontFamily == name}">{{name}}</button>
        </div>
    </div>
</template>
<script>
    export default {
        module: {},
        props: {
            value: {
                type: String,
                default: 'Microsoft YaHei'
            },
            actived: String
        },
        computed: {
            show: function () {
                return this.actived === 'fontName';
            }
        },
        data() {
            return {
                fontFamily: this.$parent.commands['fontName'],
                nameList: [
                    "Microsoft YaHei",
                    "Helvetica Neue",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                    "Verdana",
                    "Georgia",
                    "Times New Roman",
                    "Trebuchet MS",
                    "Microsoft JhengHei",
                    "Courier New",
                    "Impact",
                    "Comic Sans MS",
                    "Consolas"
                ]
            }
        },
        methods: {
            activeDashboard() {
                if (this.$parent.activedDashboard === 'fontName') {
                    this.$parent.activedDashboard = '';
                } else {
                    this.$parent.activedDashboard = 'fontName';
                }
            },
            setFontName(name) {
                this.$parent.execCommand("fontName", name)
            }
        }
    }

</script>
