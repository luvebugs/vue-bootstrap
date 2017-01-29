<style lang="less">
.webuploader-element-invisible {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px);
    /* IE6, IE7 */
    clip: rect(1px,1px,1px,1px);
}
.webuploader-container {
    display: inline-block;
}
.webuploader-pick {
    width: 100%;
    height: 100%;
}
.uploader {
    border: 1px solid #d9d9d9;
    width: 96px;
    height: 96px;
    border-radius: 2px;
    background-color: #fbfbfb;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 8px;
    position: relative;
    vertical-align: top;
    .rounded {
        width: 100%;
    }
    .uploader-operator {
        position: absolute;
        background: #333;
        color: #fff;
        width: 78px;
        bottom: 8px;
        opacity: 0.9;
        display: none;
        padding: 0px 4px;
        .fa {
            cursor: pointer;
            opacity: 10;
            float: right;
        }
        .thumb-name {
            display: inline-block;
            overflow: hidden;
            width: 30px;
            font-size: 8px;
            line-height: 8px;
            padding: 6px 0;
        }
    }
    &:hover {
        .uploader-operator {
            display: block;
        }
    }
}

.uploader-select {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    -webkit-transition: border-color 0.3s ease;
    transition: border-color 0.3s ease;
    padding: 36px 0;
    text-align: center;
}
.uploader-select:hover {
    border-color: #108ee9;
}
.uploader-btn {
    position: relative;
    height: 20px;
}
.uploader-list{
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 8px;
    .uploader-item{
        padding: 8px 8px 0px 8px;
    }
}
.thumb-remove{
    cursor: pointer;
}
</style>
<template>
<div>
    <!--用来存放文件信息-->
    <div class="card" v-if="type == 'card'">
        <div class="card-block">
            <div v-el:upload-select class="uploader" v-for="thumb in thumbs">
                <img v-bind:src="thumb.src" v-bind:alt="thumb.file.name" class="rounded">
                <div class="uploader-operator">
                    <span class="thumb-name">{{thumb.file.name}}</span>
                    <span class="thumb-remove" @click="removeFile(thumb.file)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
                </div>
            </div>
            <div v-el:upload-select class="uploader uploader-select">
                <div>
                    <i class="fa fa-plus" aria-hidden="true" style="font-size: 24px;font-weight: lighter;"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="btn-list" v-else>
        <div class="uploader-btn">
            <button v-el:uploader class="btn btn-secondary" id="picker">
                    <i class="fa fa-upload" aria-hidden="true"></i>选择文件
            </button>
        </div>
        <ul class="uploader-list">
            <li v-for="thumb in thumbs" class="uploader-item">
                <i class="fa fa-paperclip" aria-hidden="true"></i>
                <span class="thumb-name">{{thumb.file.name}}</span>
                <span class="thumb-remove" @click="removeFile(thumb.file)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
            </li>
        </ul>
    </div>
</div>
</template>
<script type="text/babel">
export default {
    props: {
        multiple: {
            type: Boolean
        },
        option: {
            type: Object
        },
        type: {
            type: String
        },
        server: {
            type: String
        },
        fileQueued: {
            type: Function
        },
        uploadSuccess: {
            type: Function
        }
    },
    data: function() {
        let BASE_URL = 'robo:lib/webuploader/';
        // swf文件路径
        // 文件接收服务端。
        this.option.swf = BASE_URL;
        this.option.server = self.server;
        return {
            uploader: {},
            thumbs: [],
            options: self.option
        }
    },
    ready: function() {
        let self = this;



        self.uploader = WebUploader.create(this.options);
        // 当有文件被添加进队列的时候
        self.uploader.on('fileQueued', function(file) {
            self.uploader.makeThumb(file, function(error, src) {
                if (self.multiple) {
                    let files = self.uploader.getFiles();
                    self.fileQueued(file, files);
                } else {
                    self.uploader.removeFile(file);
                    self.thumbs = [];
                    self.fileQueued(file, file);
                }
                self.thumbs.push({
                    file: file,
                    src: src
                });

            });
        });

        self.uploader.on('uploadSuccess', function(file) {
            self.fileQueued(file);
        });

        self.uploader.on('uploadError', function(file) {
            self.fileQueued(file);
        });

        self.uploader.on('uploadComplete', function(file) {
            self.fileQueued(file);
        });
        self.uploader.addButton({
            id: self.$els.uploadSelect
        });
        self.uploader.addButton({
            id: self.$els.uploader
        });
    },
    methods: {
        removeFile: function (file) {
            let self = this;
            this.uploader.removeFile(file);
            this.thumbs.forEach(function (thumb, index) {
                if (thumb.file.id == file.id) {
                    self.thumbs.splice(index, 1);
                }
            });
        }
    }
}
</script>
