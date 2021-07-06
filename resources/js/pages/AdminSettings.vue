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

            <div class="row mb-3">
                <label for="plex_url" class="col-sm-2 col-form-label">Plex Server Credentials</label>
                <div class="col-sm-10">
                    <div class="input-group">
                        <input type="text" class="form-control" id="plex_url" placeholder="Plex Server URL Goes Here" :disabled="plex_testing" v-model="plex_url">
                        <input type="text" class="form-control" id="plex_token" placeholder="Plex Server Token Goes Here" :disabled="plex_testing" v-model="plex_token">
                        <button type="button" class="btn btn-secondary" @click="testPlex" :disabled="!canTestPlex">Test Connection</button>
                    </div>
                    <small>
                        <plex-tester :url="this.plex_url" :token="this.plex_token" v-if="plex_testing"></plex-tester>
                    </small>
                </div>
            </div>

            <button type="submit" class="btn btn-primary" @click="save">Save Settings</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Setting from '../models/setting';
import SettingsService from '../services/settings.service';
import Loader from '../components/Loader.vue';
import config from '../config';
import PlexTester from '../components/PlexTester.vue';

export default Vue.extend({
    components: {
        Loader,
        PlexTester
    },

    data() {
        return {
            loading: true,
            plex_testing: false,
            interval: '' as string | null,
            plex_url: '' as string | null,
            plex_token: '' as string | null,
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
            this.interval = this.getSettingValue('interval', config.settings.defaults.interval.toString());
            this.plex_url = this.getSettingValue('plex_url', '');
            this.plex_token = this.getSettingValue('plex_token', '');
        },

        getSettingValue(key: string, def: string | null = ''): string | null {
            return this.settings.find((setting: Setting) => setting.key === key)?.value || def;
        },

        save(e: MouseEvent) {
            e.preventDefault();

            const settingsService = new SettingsService();
            this.loading = true;

            settingsService.update({
                interval: this.interval || '',
                plex_url: this.plex_url || '',
                plex_token: this.plex_token || ''
            }).subscribe({
                next: () => {
                    this.loadSettings();
                },
                error: message => {
                    console.error(message);
                    this.loading = false;
                }
            });
        },

        testPlex() {
            this.plex_testing = true;
        }
    },

    computed: {
        canTestPlex(): boolean {
            const saved_plex_url = this.getSettingValue('plex_url'),
                  saved_plex_token = this.getSettingValue('plex_token');

            return (
                !this.plex_testing
                && saved_plex_url !== null
                && saved_plex_url !== ''
                && saved_plex_token !== null
                && saved_plex_url !== ''
            );
        }
    }
})
</script>
