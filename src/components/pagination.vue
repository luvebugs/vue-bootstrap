
<style>
.total-page {
    margin-left: 10px;
}

.all-data {
    margin-left: 10px;
}
</style>

<template>
<div>

    <nav aria-label="Page navigation" class="float-xs-right" v-if="pageTotal > 1">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" aria-label="Previous" @click="setPageNumber(pageNumber-1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item" v-if="pageNumber >= 3"><a class="page-link" @click="setPageNumber(1)">1</a></li>
            <li class="page-item" v-if="pageNumber >= 4"><a class="page-link" disabled>...</a></li>
            <li class="page-item" v-if="pageNumber >= 2"><a class="page-link" @click="setPageNumber(pageNumber-1)">{{pageNumber-1}}</a></li>
            <li class="page-item active"><a class="page-link" disabled>{{pageNumber}}</a></li>
            <li class="page-item" v-if="pageNumber <= total - 1"><a class="page-link" @click="setPageNumber(pageNumber+1)">{{pageNumber+1}}</a></li>
            <li class="page-item" v-if="pageNumber <= total - 3"><a class="page-link" disabled>...</a></li>
            <li class="page-item" v-if="pageNumber <= total - 2"><a class="page-link" @click="setPageNumber(total)">{{total}}</a></li>
            <li class="page-item">
                <a class="page-link" aria-label="Next" @click="setPageNumber(pageNumber+1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
            <div class="btn-group total-page">
                <!-- Example single danger button -->
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{pageSize}}条/页
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" @click="setPageSize(5)">5</a>
                    <a class="dropdown-item" @click="setPageSize(10)">10</a>
                    <a class="dropdown-item" @click="setPageSize(20)">20</a>
                    <a class="dropdown-item" @click="setPageSize(30)">30</a>
                </div>
            </div>
            <span class="all-data">
                共 {{pageTotal}} 条
            </span>
        </ul>
    </nav>

</div>
</template>

<script>


export default {
    props: {
        pageTotal: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        pageNumber: {
            type: Number,
            required: true
        },
        pageChange: {
            type: Function,
            required: true
        },
        sizeChange: {
            type: Function,
            required: true
        }
    },
    computed: {
        total: function () {
            return Math.ceil(this.pageTotal/this.pageSize);
        }
    },
    methods: {
        setPageSize: function(size) {
            this.pageSize = size;
            this.sizeChange();
        },
        setPageNumber: function(number) {
            if (number <= this.total && number > 0) {
                this.pageNumber = number;
                this.pageChange();
            }
        }
    }
}
</script>
