<style lang="less" Scoped>
    @import './reset.less';
    @import './style.less';
</style>
<template>
    <div class="editor" :class="{'full-screen':fullScreen}">
        <div class="toolbar" :style="{'z-index':zIndex+1}" ref="toolbar">
            <ul>
                <template v-for="model in modules">
                    <template v-if="model.show">
                        <li class="divider" v-if="model.name == '|'" v-html="model.template">
                        </li>
                        <li v-else :title="locale[model.i18n]">
                            <span v-if="model.model" :is="model.name" :value="commands[model.name]" :actived="activedDashboard"></span>
                            <span v-else class="icon" :class="model.icon" @click="activeModule(model)"></span>
                        </li>
                    </template>
                 </template>
                <slot></slot>
            </ul>
            
            <div class="dashboard" v-show="dashboard" :style="dashboardStyle">
                <keep-alive v-if="dashboard" :is="dashboard"></keep-alive>
            </div>
            

        </div>
        <!-- <div class="content" ref="content" contenteditable="true" @click="toggleDashboard(dashboard)"
             :style="contentStyle">
        </div> -->
        <div class="content" ref="content" contenteditable="true" @click="toggleDashboard(dashboard)"
             :style="contentStyle">
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            content: {
                type: String,
                required: true,
            },
            height: {
                type: Number,
                default: 300,
                validator (val) {
                    return val >= 100
                }
            },
            zIndex: {
                type: Number,
                default: 1000
            },
            autoHeight: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                //locale: {},
                fullScreen: false,
                dashboard: null,
                dashboardStyle: {},
                commands: {},
                range: {},
                activedDashboard: ''
            }
        },
        watch: {
            content(val) {
                let content = this.$refs.content.innerHTML
                if (val != content) {
                    this.$refs.content.innerHTML = val
                }
            },
            dashboard(val){
                if (val) {
                    this.computeDashboardStyle()
                }
            },
            fullScreen(val){
                let component = this
                component.$nextTick(function () {
                    component.computeDashboardStyle()
                })
                if (val) {
                    component.parentEl = component.$el.parentNode
                    component.nextEl = component.$el.nextSibling
                    document.body.appendChild(component.$el)
                    return
                }
                if (component.nextEl) {
                    component.nextEl.parentNode.insertBefore(component.$el, component.nextEl)
                    return
                }
                component.parentEl.appendChild(component.$el)
            }
        }
        ,
        computed: {
            contentStyle(){
                let style = {}
                if (this.fullScreen) {
                    style.height = window.innerHeight - (this.$refs.toolbar.clientHeight + 1) + "px"
                    return style
                }
                if (!this.autoHeight) {
                    style.height = this.height + 'px'
                    return style
                }
                style["min-height"] = this.height + 'px'
                return style
            }
        },
        methods: {
            computeDashboardStyle(){
                this.dashboardStyle = {'max-height': this.$refs.content.clientHeight + 'px'}
            },
            getContentElement(){
                return this.$refs.content
            },
            toggleFullScreen(){
                this.fullScreen = !this.fullScreen
            },
            toggleDashboard(dashboard){
                this.dashboard == dashboard ? this.dashboard = null : this.dashboard = dashboard
            },
            execCommand(command, arg){
                this.restoreSelection()
                document.execCommand(command, false, arg)
                this.$parent.content = this.$refs.content.innerHTML
                this.dashboard = null
                this.commands[command] = arg;
                this.saveCurrentRange();
            },
            getCurrentRange(){
                return this.range
            },
            saveCurrentRange(){
                let selection = window.getSelection ? window.getSelection() : document.getSelection()
                let range = selection.rangeCount ? selection.getRangeAt(0) : null
                if (!range) {
                    return
                }
                if (this.$refs.content.contains(range.startContainer) &&
                        this.$refs.content.contains(range.endContainer)) {
                    this.range = range
                }
            },
            restoreSelection(){
                let selection = window.getSelection ? window.getSelection() : document.getSelection()
                selection.removeAllRanges()
                
                if (this.range) {
                    try {
                        selection.addRange(this.range)
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    let content = this.$refs.content
                    let div = document.createElement("div")
                    let range = document.createRange()
                    content.appendChild(div)
                    range.setStart(div, 0)
                    range.setEnd(div, 0)
                    selection.addRange(range)
                }
            },
            activeModule(model){
               
                if (typeof model.handler == "function") {
                    model.handler(this)
                    return
                }
                if (model.hasDashboard) {
                    this.toggleDashboard('dashboard-' + model.name)
                }
            }
        },
        mounted(){
            let editor = this
            editor.modules.forEach(function (module) {
                if (typeof module.init == "function") {
                    module.init(editor)
                }
            })
        },
        mounted(){
            let component = this
            let content = component.$refs.content
            content.innerHTML = component.content
            content.addEventListener("mouseup", component.saveCurrentRange, false)
            content.addEventListener("keyup", component.saveCurrentRange, false)
            content.addEventListener("mouseout", component.saveCurrentRange, false)
            content.addEventListener("keyup", function () {
                component.$parent.content = component.$refs.content.innerHTML
            }, false)

            component.touchHandler = function (e) {
                if (component.$refs.content.contains(e.target)) {
                    component.saveCurrentRange()
                }
            }

            window.addEventListener("touchend", component.touchHandler, false)
        },
        beforeDestroy(){
            let editor = this
            window.removeEventListener("touchend", editor.touchHandler)
            editor.modules.forEach(function (module) {
                if (typeof module.destroyed == "function") {
                    module.destroyed(editor)
                }
            })
        }
    }
</script>
