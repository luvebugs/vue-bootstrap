<style scoped>
    .editor .dashboard .dashboard-font {
        line-height: 36px;
    }
    
</style>
<template>
    <div class="dashboard-font">
        <div>
            <label>{{$parent.locale["heading"]}}:</label>
            <button type="button" class="button" @click="setHeading(0)">P</button>
            <button v-for="h in 6" type="button" class="button" @click="setHeading(h)">H{{h}}</button>
        </div>
        <div>
            <label>
                {{$parent.locale["font name"]}}:
            </label>
            <button v-for="name in nameList" type="button" class="button" @click="setFontName(name)" :class="{'selected': fontFamily == name}">{{name}}</button>
        </div>
        <div>
            <label>
                {{$parent.locale["font size"]}}:
            </label>
            <button v-for="size in 7" type="button" @click="setFontSize(size+1)" class="button" :class="{'selected': size + 1 == fontSize}">{{size+1}}</button>
        </div>
        <div>
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
        data(){
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
                ],
                fontSize: this.$parent.commands['fontSize'],
                lineHeightList: [
                    "1.0", "1.5", "1.8", "2.0", "2.5", "3.0"
                ]
            }
        },
        methods: {
            setFontName(name){
                this.$parent.execCommand("fontName", name)
            },
            setFontSize(size){
                this.$parent.execCommand("fontSize", size)
            },
            setHeading(heading){
                if (heading) {
                    this.$parent.execCommand("formatBlock", "h" + heading)
                } else {
                     this.$parent.execCommand("formatBlock", "p")
                }
            },
            _contains(arr, el){
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == el) {
                        return true
                    }
                }
                return false
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