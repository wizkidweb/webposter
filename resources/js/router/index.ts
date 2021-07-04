import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Posters from "../pages/Posters.vue"
import Admin from "../pages/Admin.vue";
import AdminHome from "../pages/AdminHome.vue";
import AdminPosters from "../pages/AdminPosters.vue";
import AdminSettings from "../pages/AdminSettings.vue";
import AdminAddPoster from "../pages/AdminAddPoster.vue";
import AdminEditPoster from "../pages/AdminEditPoster.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "",
        component: Posters
    },
    {
        path: "/admin",
        component: Admin,
        children: [
            { path: '/', component: AdminHome },
            { path: 'posters', component: AdminPosters },
            { path: 'posters/add', component: AdminAddPoster },
            { path: 'posters/:id', component: AdminEditPoster },
            { path: 'settings', component: AdminSettings }
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
