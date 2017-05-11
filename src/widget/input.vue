<style>
.total-page {
    margin-left: 10px;
}

.all-data {
    margin-left: 10px;
}

.input-text-hidden {
    text-overflow: ellipsis;
}
</style>

<template>
        <div class="row">
                <div class="col-sm-24" v-if="type == 'hidden'">
                    <label class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9">
                        <input  class="form-control " type="hidden" value="{{value}}">
                    </div>
                </div>
                <div class="col-sm-24" v-if="type == 'v-text'">
                    <label class="col-sm-3 col-form-label">{{label}}</label>
                    <div class="col-sm-6">
                        <input placeholder="{{placeholder}}" class="form-control input-text-hidden" type="text" value="{{value}}" v-model="value">
                    </div>
                    <small class="col-sm-15 form-text text-muted">{{muted}}</small>
                </div>
                <div class="col-sm-24" v-if="type == 'v-password'">
                    <label class="col-sm-3 col-form-label">{{label}}</label>
                    <div class="col-sm-6">
                        <input placeholder="{{placeholder}}" class="form-control  input-text-hidden" type="password" value="{{value}}" v-model="value">
                    </div>
                    <small class="col-sm-15 form-text text-muted">{{muted}}</small>
                </div>
                <div class="col-sm-24" v-if="type == 'v-select'">
                    <label class="col-sm-3 col-form-label">{{label}}</label>
                    <div class="col-sm-6">
                        <select class="form-control" v-model="value">
                            <option v-for="option in options" value="{{option.value}}" >{{option.name}}</option>
                        </select>
                    </div>
                    <small class="col-sm-15 form-text text-muted">{{muted}}</small>
                </div>
                <div class="col-sm-24" v-if="type == 'v-textarea'">
                    <label class="col-sm-3 col-form-label">{{name}}</label>
                    <div class="col-sm-6">
                        <textarea  placeholder="{{placeholder}}"  class="form-control" v-model="value"></textarea>
                    </div>
                    <small class="col-sm-15 form-text text-muted">{{muted}}</small>
                </div>
                <div class="col-sm-24" v-if="type == 'v-editor'">
                    <label class="col-sm-3 col-form-label" >{{name}}</label>
                    <div class="col-sm-9">
                        <v-edit :model.sync="value" placeholder="{{placeholder}}" class="form-control"></v-edit>
                    </div>
                    <small class="col-sm-12 form-text text-muted">{{muted}}</small>
                </div>
        </div>
</template>

<script>
export default {
    name: 'v-input',
    props: {
        type: String,
        name: String,
        value: String,
        placeholder: String,
        options: Array,
        label: String,
        muted: String
    }
}
</script>
