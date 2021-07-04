<template>
    <div id="admin-home">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <span class="navbar-brand">Home</span>
        </nav>

        <div class="container p-4">
            <div class="text-center">
                <router-link to="/admin/posters" class="btn d-block btn-lg btn-primary mb-4">
                    <i class="fa fa-fw fa-film"></i>
                    Edit Posters
                </router-link>
                <router-link to="/admin/settings" class="btn d-block btn-lg btn-secondary mb-4">
                    <i class="fa fa-fw fa-cog"></i>
                    Settings
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>
