<template>
    <div class="alert" :class="alertClass" role="alert">
        <slot></slot>
        <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')" v-if="closable"></button>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BootstrapColor } from '../types/bootstrap-color'

export default Vue.extend({
    props: {
        closable: {
            type: Boolean,
            default: false
        },
        color: {
            type: String as PropType<BootstrapColor>,
            default: 'info'
        }
    },

    computed: {
        alertClass() {
            let className = 'alert-' + this.color

            if (this.closable) {
                className += ' alert-dismissible';
            }

            return className;
        }
    }
})
</script>
