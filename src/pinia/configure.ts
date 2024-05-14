import {ref} from 'vue'
import {defineStore} from 'pinia'


interface themeVars {
    bgColor: string,
    logoColor: string,
    headerColor: string,
    textColor: string,
    signBgColor: string,
    textShadow: string,
    contentBgColor: string,
    descriptionBgColor: string,
    profileBgColor: string,
}

const useConfigureStore = defineStore("configure", () => {
    const transition = ref<string>("transition-all ease-in");

    const themes = ref<themeVars[]>([
        {
            bgColor: `#373949`,
            logoColor: `text-darkviolet-50 brightness-125`,
            headerColor: `bg-darkviolet-700`,
            textColor: `text-neutral-100`,
            signBgColor: `bg-neutral-900/30`,
            textShadow: `text-shadow-sm shadow-white`,
            contentBgColor: `bg-darkviolet-200`,
            descriptionBgColor: `bg-neutral-900/65 `,
            profileBgColor: `bg-neutral-900/60`,
        },
        {
            bgColor: `#fafafa`,
            logoColor: `text-neutral-900`,
            textColor: `text-neutral-900`,
            headerColor: `bg-neutral-300`,
            signBgColor: `bg-neutral-400/35`,
            textShadow: `text-shadow-sm shadow-neutral-900`,
            contentBgColor: `bg-neutral-300`,
            descriptionBgColor: `bg-neutral-400/50`,
            profileBgColor: `bg-neutral-400/40`,
        }

    ]);

    const theme = ref<number>(0);
    const search = ref("");

    const goToProfile = (): void => {
        if (search.value !== "") location.assign(`/profile/${search.value}`);
    }

    return {
        transition,
        themes,
        theme,
        search,
        goToProfile,
    }
})

export default useConfigureStore;