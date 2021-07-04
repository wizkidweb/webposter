<template>
    <div class="loader" :style="{ background: bg }">
        <div class="loader-filmstrip" :style="{ background: color }">
            <div class="loader-strip loader-left-strip" :style="{ 'border-left-color': bg }"></div>
            <div class="loader-strip loader-right-strip" :style="{ 'border-left-color': bg }"></div>
        </div>
        <p class="loader-text" :style="{ color: color }">
            {{ message }}
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        message: {
            type: String,
            default: 'Loading'
        },
        color: {
            type: String,
            default: 'black'
        },
        bg: {
            type: String,
            default: 'white'
        }
    }
})
</script>

<style lang="scss">
$loader-color: black;
$bg-color: white;

.loader {
    padding-top: 15px;
    text-align: center;

    .loader-text {
        margin: 5px auto;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .loader-filmstrip {
        display: inline-block;
        position: relative;
        width: 56px;
        height: 70px;

        .loader-strip {
            content: '';
            position: absolute;
            height: 120%;
            border-left: 5px dashed white;
            animation: roll 20ms infinite;

            &.loader-left-strip {
                left: 5px;
            }

            &.loader-right-strip {
                right: 5px;
            }
        }
    }
}

@keyframes roll {
    0% {
        top: 0px;
    }

    100% {
        top: -15px;
    }
}
</style>
