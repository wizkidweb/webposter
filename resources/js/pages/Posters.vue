<template>
    <div class="posters" @click="slide()">
        <div class="header">
            <h1>Coming Soon</h1>
        </div>

        <div class="d-flex justify-content-center align-items-center vh-100 bg-dark" v-if="loading">
            <loader bg="#212529" color="white"></loader>
        </div>

        <transition-group tag="div" name="fade" class="posters-group" v-else>
            <img :src="posters[current].image" :key="current" class="poster">
        </transition-group>

        <div class="footer">
            <h1>Coming Soon</h1>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Poster from '../models/poster';
import PosterService from '../services/poster.service';
import SettingsService from '../services/settings.service';
import config from '../config';
import Loader from '../components/Loader.vue';

export default Vue.extend({
  components: { Loader },
    name: 'Posters',

    data() {
        return {
            posters: [] as Poster[],
            current: 0,
            loading: true,
            timeout: null as number | null
        }
    },

    mounted(): void {
        if (this.timeout !== null) {
            window.clearInterval(this.timeout);
        }

        const posterService = new PosterService();
        this.loading = true;

        posterService.all().subscribe({
            next: response => {
                this.posters = response;

                const settingsService = new SettingsService();
                settingsService.get('interval', config.settings.defaults.interval.toString()).subscribe({
                    next: interval => {
                        this.timeout = window.setInterval(this.slide, parseInt(interval));
                        this.loading = false;
                    }
                });
            }
        });
    },

    methods: {
        slide() {
            const len = this.posters.length;
            this.current = (this.current + 1) % len;

            console.log('Current:', this.current);
        }
    }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');

// FADE IN
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}

.posters-group {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .poster {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
    }
}

.header,
.footer {
    position: fixed;
    left: 0;
    right: 0;
    height: 7.8%;
    background-color: black;
    color: white;
    z-index: 999;

    > h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 1vw;
        right: 1vw;
        bottom: 1vw;
        left: 1vw;
        text-transform: uppercase;
        font-family: 'Lato', sans-serif;
        font-size: 6vw;
        border: 1vw dotted white;
        margin: 0;
    }
}

.header {
    top: 0;
}

.footer {
    bottom: 0;
}
</style>
