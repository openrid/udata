<style lang="less">
.job-item-modal {
    .modal-footer {
        text-align: center !important;
    }
}
</style>

<template>
<modal class="job-item-modal" v-ref:modal
    :class="{
        'modal-success': item.status === 'done',
        'modal-danger': item.status === 'failed',
        'modal-warning': item.status === 'skipped'
    }">
    <div class="modal-body">
        <dl class="clearfix">
            <dt>{{ _('Remote ID') }}</dt>
            <dd>{{ item.remote_id }}</dd>
            <dt>{{ _('Started at') }}</dt>
            <dd>{{ item.started | dt }}</dd>
            <dt>{{ _('Ended at') }}</dt>
            <dd>{{ item.ended | dt }}</dd>
            <dt>{{ _('Status') }}</dt>
            <dd><span class="label label-{{ item.status | statusClass }}">{{ item.status | statusI18n }}</span></dd>
            <dt v-if="item.dataset">{{ _('Dataset') }}</dt>
            <dd v-if="item.dataset">
                <dataset-card class="col-xs-12" clickable
                    v-if="item.dataset.id"
                    :datasetid="item.dataset.id">
                </dataset-card>
                <dataset-card class="col-xs-12" clickable
                    v-if="!item.dataset.id"
                    :dataset="item.dataset">
                </dataset-card>
            </dd>
            <dt v-if="item.dataservice">{{ _('Dataservice') }}</dt>
            <dd v-if="item.dataservice">
                <div class="card">
                    <div class="card-body">
                        <h4>
                            <a :title="item.dataservice.title" :href="item.dataservice.self_web_url">
                                {{ item.dataservice.title | truncate 80 }}
                            </a>
                            <div class="clamp-3">{{{ item.dataservice.description | markdown 180 }}}</div>
                        </h4>
                    </div>
                </div>
            </dd>
            <dt v-if="item.errors.length">{{ _('Errors') }}</dt>
            <dd v-if="item.errors.length">
                <div v-for="error in item.errors">
                    {{{error.message | markdown}}}
                    <pre>{{error.details}}</pre>
                </div>
            </dd>
            <dt v-if="item.logs.length">{{ _('Logs') }}</dt>
            <dd v-if="item.logs.length">
                <div v-for="log in item.logs">
                    {{log.level}}
                    <div>{{log.message}}</div>
                </div>
            </dd>
        </dl>
    </div>
    <footer class="modal-footer">
        <button type="button" class="btn btn-outline btn-flat pointer"
            @click="$refs.modal.close">
            {{ _('Close') }}
        </button>
    </footer>
</modal>
</template>

<script>
import {STATUS_CLASSES, STATUS_I18N} from 'models/harvest/item';

import Modal from 'components/modal.vue';
import DatasetCard from 'components/dataset/card.vue';

export default {
    components: {Modal, DatasetCard},
    props: {
        item: Object,
    },
    events: {
        'dataset:clicked': function(dataset) {
            document.location = dataset.page;
        }
    },
    filters: {
        statusClass(value) {
            return STATUS_CLASSES[value];
        },
        statusI18n(value) {
            return STATUS_I18N[value];
        }
    }
};
</script>
