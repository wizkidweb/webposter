<template>
    <div id="admin-settings">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <span class="navbar-brand">Settings</span>
        </nav>

        <loader class="mt-3" v-if="loading"></loader>

        <div class="container-fluid my-3" v-else>
            <div class="row mb-3">
                <label for="interval" class="col-sm-2 col-form-label">Slideshow Interval (ms)</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="interval" v-model="interval">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Setting from '../models/setting';
import SettingsService from '../services/settings.service';
import Loader from '../components/Loader.vue';

export default Vue.extend({
    components: {
        Loader
    },

    data() {
        return {
            loading: true,
            interval: null as string | null,
            settings: [] as Setting[]
        }
    },

    mounted() {
        this.loadSettings();
    },

    methods: {
        loadSettings() {
            const settingsService = new SettingsService();
            this.loading = true;

            settingsService.all().subscribe({
                next: settings => {
                    this.settings = settings;
                    this.parseSettings();
                    this.loading = false;
                }
            });
        },

        parseSettings() {
            this.interval = this.getSettingValue('interval', '5000');
        },

        getSettingValue(key: string, def = ''): string {
            return this.settings.find((setting: Setting) => setting.key === key)?.value || def;
        }
    }
})
</script>
