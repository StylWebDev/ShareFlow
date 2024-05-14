import {createRouter, createWebHistory} from 'vue-router'
import Timeline from "../views/Timeline.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Error from "../views/Error.vue";
import {useAuthenticationStore} from "../pinia/authentication.ts";

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
        name: `Error`,
        component: Error
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    const auth = useAuthenticationStore()
    if (auth.isAuthenticated && to.name !== 'Profile' && to.name !== 'Timeline' && to.name !== "Error") return { name: 'Timeline' }
    else {
        if (!auth.isAuthenticated && to.name !== 'Login' && to.name !== 'SignUp' && to.name !== "Profile" && to.name !== "Error" ) return { name: `Login` }
    }
})

export default router;