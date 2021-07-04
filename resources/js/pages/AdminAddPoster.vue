<template>
    <div id="admin-add-poster">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <span class="navbar-brand">Add New Poster</span>
        </nav>

        <breadcrumbs :crumbs="[ { label: 'Posters', to: '/admin/posters' } ]" current="Add New Poster" backTo="/admin/posters"></breadcrumbs>

        <loader class="mt-3" v-if="loading"></loader>

        <div class="container-fluid p-3" v-else>
            <alert :closable="true" color="danger" v-on:close="deleteError(index)" v-for="(error, index) in errors" :key="index">
                {{ error }}
            </alert>

            <div class="row">
                <div class="col-4">
                    <div class="image-preview">
                        <img v-if="imageUrl" :src="imageUrl" />
                    </div>
                </div>

                <div class="col-8">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" name="title" id="title" class="form-control form-control-lg" v-model="title">
                    </div>

                    <div class="mb-3">
                        <label for="title" class="form-label">Image</label>
                        <input type="file" name="title" id="title" class="form-control" @change="onImageChange">
                    </div>

                    <button type="submit" class="btn btn-primary" @click="onSubmit">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PosterService from '../services/poster.service';
import Alert from '../components/Alert.vue';
import Breadcrumbs from '../components/Breadcrumbs.vue';
import Loader from '../components/Loader.vue';

export default Vue.extend({
    components: {
        Alert,
        Breadcrumbs,
        Loader
    },

    data() {
        return {
            loading: false,
            title: '',
            file: null as File | null,
            errors: [] as string[]
        }
    },

    methods: {
        onImageChange(e: Event) {
            const target = e.target as HTMLInputElement;

            if (target.files && target.files.length > 0) {
                this.file = target.files[0];
            }
        },

        onSubmit(e: MouseEvent) {
            e.preventDefault();
            this.errors = [];

            if (this.title && this.file) {
                const posterService = new PosterService();
                this.loading = true;

                posterService.insert(this.title, this.file).subscribe({
                    next: () => {
                        this.$router.push('/admin/posters');
                    }
                });
            } else {
                if (!this.title) {
                    this.errors.push('Name required.');
                }

                if (!this.file) {
                    this.errors.push('Image required.');
                }
            }
        },

        deleteError(errorIndex: number) {
            this.errors.splice(errorIndex, 1);
        }
    },

    computed: {
        imageUrl(): string | null {
            if (this.file !== null) {
                return URL.createObjectURL(this.file);
            }

            return null;
        }
    }
})
</script>

<style lang="scss">
.image-preview {
    position: relative;
    border: 1px solid black;
    overflow: hidden;
    height: 0;
    padding-top: 150%;

    >img {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
    }
}
</style>
