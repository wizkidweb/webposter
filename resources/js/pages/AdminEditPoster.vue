<template>
    <div id="admin-add-poster">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <span class="navbar-brand">Edit Poster</span>
        </nav>

        <breadcrumbs :crumbs="[ { label: 'Posters', to: '/admin/posters' } ]" current="Edit Poster" backTo="/admin/posters"></breadcrumbs>

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
            loading: true,
            title: '',
            file: '' as File | string,
            errors: [] as string[]
        }
    },

    mounted() {
        this.loadPoster();
    },

    methods: {
        loadPoster() {
            const posterService = new PosterService();
            this.loading = true;

            posterService.get(this.posterId).subscribe({
                next: poster => {
                    this.title = poster.title;
                    this.file = poster.image;
                    this.loading = false;
                }
            })
        },

        getImageFile(url: string): Promise<File> {
            const parts = url.split('/');
            const fileName = parts[parts.length - 1];
            const mimeType = 'image/jpg';

            return fetch(url)
                .then(res => res.arrayBuffer())
                .then(buf => new File([buf], fileName, { type: mimeType }));
        },

        onImageChange(e: Event) {
            const target = e.target as HTMLInputElement;

            if (target.files && target.files.length > 0) {
                this.file = target.files[0];
            }
        },

        onSubmit(e: MouseEvent) {
            e.preventDefault();
            this.errors = [];

            const title = this.title ?? undefined;
            const file = (typeof this.file === 'string') ? undefined : this.file;

            if (this.title && this.file) {
                const posterService = new PosterService();
                const file = (typeof this.file === 'string') ? undefined : this.file;
                this.loading = true;

                posterService.update(this.posterId, this.title, file).subscribe({
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
        posterId(): number {
            return parseInt(this.$route.params.id);
        },

        imageUrl(): string | null {
            if (typeof this.file !== 'string') {
                return URL.createObjectURL(this.file);
            }

            return this.file;
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
