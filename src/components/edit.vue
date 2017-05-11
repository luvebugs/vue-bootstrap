<template>
    <textarea class='form-control' :name='name' id="summernote"></textarea>
</template>
<script>

export default {
    replace: true,
    inherit: false,
    props: {
        model: {
            required: true
        },
        language: {
            type: String,
            required: false,
            default: "en-US"
        },
        height: {
            type: Number,
            required: false,
            default: 480
        },
        minHeight: {
            type: Number,
            required: false,
            default: 160
        },
        maxHeight: {
            type: Number,
            required: false,
            default: 800
        },
        name: {
            type: String,
            required: false,
            default: ""
        },
        toolbar: {
            type: Array,
            required: false,
            default: function() {
                return [
                    ["font", ["bold", "italic", "underline", "clear"]],
                    ["fontsize", ["fontsize"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["color", ["color"]],
                    ["insert", ["link", "picture", "hr"]]
                ];
            }
        }
    },
    created: function() {
        this.isChanging = false;
        this.control = null;
    },
    mounted: function() {
        //  initialize the summernote
        if (this.minHeight > this.height) {
            this.minHeight = this.height;
        }
        if (this.maxHeight < this.height) {
            this.maxHeight = this.height;
        }
        var self = this;
        self.control = $(this.$el);
        self.control.summernote({
            lang: this.language,
            height: this.height,
            minHeight: this.minHeight,
            toolbar: this.toolbar,
            callbacks: {
                onInit: function() {
                    self.control.summernote("code", self.model);
                }
            }
        }).on("summernote.change", function() {
            // Note that we do not use the "onChange" options of the summernote
            // constructor. Instead, we use a event handler of "summernote.change"
            // event because that I don't know how to trigger the "onChange" event
            // handler after changing the code of summernote via ".summernote('code')" function.
            if (!self.isChanging) {
                self.isChanging = true;
                var code = self.control.summernote("code");
                self.model = (code === null || code.length === 0 ? null : code);
                self.$nextTick(function() {
                    self.isChanging = false;
                });
            }
        });
    },
    watch: {
        "model": function(val, oldVal) {
            if (!this.isChanging) {
                this.isChanging = true;
                var code = (val === null ? "" : val);
                this.control.summernote("code", code);
                this.isChanging = false;
            }
        }
    }
};
</script>
