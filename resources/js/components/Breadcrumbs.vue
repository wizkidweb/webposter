<template functional>
    <nav class="p-3 d-flex align-items-center">
        <router-link v-if="props.backTo" :to="props.backTo" class="btn btn-secondary d-flex align-items-center me-3">
            <i class="fa fa-arrow-left"></i>
        </router-link>

        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item" v-for="(breadcrumb, index) in props.crumbs" :key="index">
                <router-link :to="breadcrumb.to">{{ breadcrumb.label }}</router-link>
            </li>
            <li class="breadcrumb-item active">{{ props.current }}</li>
        </ol>
    </nav>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type Breadcrumb = {
    label: string,
    to: string | Location
}

export default Vue.extend({
    props: {
        crumbs: {
            required: true,
            type: Array as PropType<Breadcrumb[]>,
            default: () => []
        },
        current: String,
        backTo: String
    }
})
</script>
