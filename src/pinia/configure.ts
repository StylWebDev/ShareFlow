import {ref, watch} from 'vue'
import {defineStore} from 'pinia'
import {useRouter} from "vue-router";

interface themeVars {
    bgColor: string,
    logoColor: string,
    headerColor: string,
    textColor: string,
}

const useConfigureStore = defineStore("configure", () => {
    const transition = ref<string>("transition-all ease-in");
    const router = useRouter();

    const themes = ref<themeVars[]>([
        {
            bgColor: `#373949`,
            logoColor: `text-darkviolet-50 brightness-125`,
            headerColor: `bg-darkviolet-700`,
            textColor: `text-neutral-100`,
        },
        {
            bgColor: `#fafafa`,
            logoColor: `text-neutral-900`,
            textColor: `text-neutral-900`,
            headerColor: `bg-neutral-200`
        }

    ]);

    const theme = ref<number>(0);
    const isAuthenticated = ref<boolean>(true);
    const search = ref("");

    const goToProfile = (): void => {
        if (search.value !== "") router.push(`/profile/${search.value}`);
    }

    watch(isAuthenticated, (newVal:boolean ) => {
        if (!newVal) router.push(`/login`);
    })

    return {
        transition,
        themes,
        theme,
        isAuthenticated,
        search,
        goToProfile,
    }
})

export default useConfigureStore;