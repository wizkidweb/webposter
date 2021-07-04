<template>
    <div id="admin">
        <div
            class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
            style="width: 280px"
        >
            <router-link
                to="/admin"
                class="
          d-flex
          align-items-center
          mb-3 mb-md-0
          me-md-auto
          text-white text-decoration-none
        "
            >
                <span class="fs-4">Webposter Admin</span>
            </router-link>
            <hr />
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <router-link
                        to="/admin/posters"
                        class="nav-link text-white"
                        aria-current="page"
                    >
                        <i class="fa fa-film bi me-2"></i>
                        Posters
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/admin/settings"
                        class="nav-link text-white"
                    >
                        <i class="fa fa-cog bi me-2"></i>
                        Settings
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="admin-view flex-grow-1">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss">
@import "~bootstrap";

#admin {
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
    height: -webkit-fill-available;
    max-height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;

    .nav-pills {
        .nav-link {
            &.router-link-active {
                color: #fff;
                background-color: $primary;
            }
        }
    }
}
</style>
