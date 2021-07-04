<template>
    <div id="admin-posters">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <span class="navbar-brand">Posters</span>
        </nav>

        <loader class="mt-3" v-if="loading"></loader>

        <div class="container p-4" v-else>
            <modal title="Delete Poster" type="confirm" :show="deleteModalVisible" v-on:yes="deleteActivePoster()" v-on:no="closeModal()" v-on:close="closeModal()">
                Are you sure you want to delete this poster?
            </modal>
            <table class="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="poster in posters" :key="poster.id">
                        <td>
                            <img :src="poster.image" width="50">
                        </td>
                        <td>
                            <router-link :to="'/admin/posters/' + poster.id">{{ poster.title }}</router-link>
                        </td>
                        <td>{{ poster.createdAt.calendar() }}</td>
                        <td>{{ poster.updatedAt.calendar() }}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-danger" @click="showDeleteModal(poster)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-center m-3">
                <h3 class="text-muted mt-2" v-if="posters.length === 0">No Posters Found</h3>
                <router-link to="/admin/posters/add" class="btn btn-primary">
                    <i class="fa fa-plus"></i>
                    Add New Poster
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Poster from "../models/poster";
import PosterService from "../services/poster.service";
import Modal from "../components/Modal.vue";
import Loader from "../components/Loader.vue";

export default Vue.extend({
    components: {
        Modal,
        Loader
    },

    data() {
        return {
            loading: true,
            posters: [] as Poster[],
            active: null as Poster | null,
            deleteModalVisible: false
        };
    },

    mounted() {
        this.loadPosters();
    },

    methods: {
        loadPosters() {
            const posterService = new PosterService();
            this.loading = true;

            posterService.all().subscribe({
                next: response => {
                    this.posters = response;
                    this.loading = false;
                }
            });
        },

        showDeleteModal(poster: Poster) {
            this.active = poster;
            this.deleteModalVisible = true;
        },

        deleteActivePoster() {
            if (this.active !== null) {
                const posterService = new PosterService();
                posterService.delete(this.active).subscribe({
                    next: () => {
                        this.closeModal();
                        this.loadPosters();
                    },
                    error: err => {
                        console.error(err);
                    }
                })
            }
        },

        closeModal() {
            this.active = null;
            this.deleteModalVisible = false;
        }
    }
});
</script>
