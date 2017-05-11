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
        <span class="icon" v-text="value" @click="activeDashboard"></span>
        <div class="dashboard dashboard-font" v-show="show">
            <label>{{$parent.locale["heading"]}}:</label>
            <button type="button" class="button" @click="setHeading(0)">P</button>
            <button v-for="h in 6" type="button" class="button" @click="setHeading(h)">H{{h}}</button>
        </div>
    </div>
</template>
<script>
    export default {
        module: {},
        props: {
            value: {
                type: String,
                default: 'P'
            },
            actived: String
        },
        computed: {
            show: function () {
                return this.actived === 'heading';
            }
        },
        methods: {
            activeDashboard() {
                if (this.$parent.activedDashboard === 'heading') {
                    this.$parent.activedDashboard = '';
                } else {
                    this.$parent.activedDashboard = 'heading';
                }
            },
            setHeading(heading) {
                if (heading) {
                    this.$parent.execCommand("formatBlock", "h" + heading)
                } else {
                    this.$parent.execCommand("formatBlock", "p")
                }
            }
        }
    }

</script>
