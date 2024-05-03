import {createRouter, createWebHistory} from 'vue-router'
import Timeline from "../views/Timeline.vue";
import Profile from "../views/Profile.vue";

const routes = [
    {
        path: `/`,
        name: 'Timeline',
        component: Timeline,
    },
    {
        path: `/timeline`,
        redirect: `/`
    },
    {
        path: `/profile/:name`,
        name: `Profile`,
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;