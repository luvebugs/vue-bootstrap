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
            <label>
                {{$parent.locale["line height"]}}:
            </label>
            <button v-for="lh in lineHeightList" type="button" class="button" @click="setLineHeight(lh)">
                {{lh}}
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        module: {},
        props: {
            value: {
                type: String,
                default: '1.0'
            },
            actived: String
        },
        computed: {
            show: function () {
                return this.actived === 'lineHeight';
            }
        },
        data() {
            return {
                lineHeightList: [
                    "1.0", "1.5", "1.8", "2.0", "2.5", "3.0"
                ]
            }
        },
        methods: {
            activeDashboard() {
                if (this.$parent.activedDashboard === 'lineHeight') {
                    this.$parent.activedDashboard = '';
                } else {
                    this.$parent.activedDashboard = 'lineHeight';
                }
            },
            setLineHeight(lh){
                let range = this.$parent.getCurrentRange()
                if (!range) {
                    return
                }
                if (!range.collapsed) {
                    range.collapse()
                }
                //find parent block element
                let blockNodeNames = ["DIV", "P", "SECTION", "H1", "H2", "H3", "H4", "H5", "H6", "OL", "UL", "LI", "BODY"]
                let container = range.endContainer
                while (container) {
                    if (container.nodeType != 1) {
                        container = container.parentNode
                        continue
                    }

                    if (blockNodeNames.includes(container.nodeName)) {
                        break
                    }
                    container = container.parentNode
                }
                let contentEl = this.$parent.getContentElement()
                if (contentEl.contains(container)) {
                    container.style.lineHeight = lh
                } else {
                    container = range.endContainer
                    let div = document.createElement("div")
                    div.innerText = container.innerText || container.textContent
                    div.style.lineHeight = lh
                    container.parentNode.replaceChild(div, container)
                }
                this.$parent.toggleDashboard("font")
            }
        }
    }

</script>
