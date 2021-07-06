<template>
    <div>
        <span v-if="testing" class="test-primary">Testing</span>
        <div v-else>
            <span v-if="success" class="text-success">Connection Successful!</span>
            <span v-else class="text-danger">A connection error occurred! {{ error }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import PlexService from '../services/plex.service'
import Vue from 'vue'
export default Vue.extend({
    props: {
        url: {
            required: true,
            type: String
        },
        token: {
            required: true,
            type: String
        }
    },

    data() {
        return {
            testing: true,
            error: '',
            success: false
        }
    },

    mounted() {
        const plexService = new PlexService(this.url, this.token);
        plexService.connect().subscribe({
            next: () => {
                this.success = true;
                this.testing = false;
                this.$emit('tested');
            },
            error: message => {
                this.success = false;
                this.error = message;
                this.testing = false;
                this.$emit('tested');
            }
        })
    }
})
</script>
