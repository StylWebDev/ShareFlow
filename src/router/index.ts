import {createRouter, createWebHistory} from 'vue-router'
import Timeline from "../views/Timeline.vue";

interface route {
    path: string;
    name?: string;
    component: any;
    children?: any;
    beforeEnter?: (to: any,from: any) => {};
}

const routes: route[] = [
    {
        path: `/`,
        name: 'Timeline',
        component: Timeline,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;