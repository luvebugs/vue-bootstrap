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
        <span class="icon" @click="activeDashboard">{{value}}px</span>
        <div v-show="show" class="dashboard dashboard-font">
            <label>
                {{$parent.locale["font size"]}}:
            </label>
            <button v-for="size in 7" type="button" @click="setFontSize(size+1)" class="button" :class="{'selected': size + 1 == fontSize}">{{size+1}}</button>
        </div>
    </div>
</template>
<script>
    export default {
        module: {},
        props: {
            value: {
                type: Number,
                default: 8
            },
            actived: String
        },
        data() {
            return {
                fontSize: this.$parent.commands['fontSize']
            }
        },
        computed: {
            show: function () {
                return this.actived === 'fontSize';
            }
        },
        methods: {
            activeDashboard() {
                if (this.$parent.activedDashboard === 'fontSize') {
                    this.$parent.activedDashboard = '';
                } else {
                    this.$parent.activedDashboard = 'fontSize';
                }
            },
            setFontSize(size) {
                this.$parent.execCommand("fontSize", size);
            }
        }
    }

</script>
