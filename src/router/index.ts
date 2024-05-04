import {createRouter, createWebHistory} from 'vue-router'
import Timeline from "../views/Timeline.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Error from "../views/Error.vue";
import useConfigureStore from "../pinia/configure.ts";

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
    },
    {
        path: `/login`,
        name: `Login`,
        component: Login,
    },
    {
        path: `/signup`,
        name: `SignUp`,
        component: SignUp,
    },
    {
        path: `/:catchAll(.*)*`,
        name: `404`,
        component: Error
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    const store = useConfigureStore()
    if (store.isAuthenticated && to.name !== 'Profile' && to.name !== 'Timeline') return { name: 'Timeline' }
    else {
        if (!store.isAuthenticated && to.name !== 'Login' && to.name !== 'SignUp' ) return { name: `Login` }
    }
})

export default router;