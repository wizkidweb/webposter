<template>
    <div>
        <div class="modal fade" :class="{ 'show d-block': show }" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')"></button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" :class=" 'btn-'+ button.color" v-for="(button, index) in computedButtons" :key="index" @click="onButtonClick(button)">{{ button.label }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-backdrop fade" :class="{ 'show d-block': show, 'd-none': !show }"></div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BootstrapColor } from '../types/bootstrap-color';

type ModalType = 'alert' | 'confirm' | 'custom';

type ButtonType = {
    label: string,
    color: BootstrapColor,
    disabled?: boolean,
    action: 'ok' | 'yes' | 'no' | Function
}

export default Vue.extend({
    props: {
        title: {
            type: String,
            required: true
        },
        show: {
            type: Boolean,
            default: false
        },
        type: {
            type: String as PropType<ModalType>,
            default: 'alert'
        },
        buttons: {
            type: Array as PropType<Array<ButtonType>>,
            default: () => []
        }
    },

    computed: {
        computedButtons() {
            switch (this.type) {
                case 'alert':
                    return [
                        { label: 'OK', color: 'primary', disabled: false, action: 'ok' }
                    ];
                case 'confirm':
                    return [
                        { label: 'No', color: 'secondary', disabled: false, action: 'no' },
                        { label: 'Yes', color: 'primary', disabled: false, action: 'yes' }
                    ];
                default:
                    return this.buttons;
            }
        }
    },

    methods: {
        onButtonClick(button: ButtonType): void {
            if (typeof button.action === 'string') {
                this.$emit(button.action);
            } else {
                button.action();
            }
        }
    }
})
</script>
