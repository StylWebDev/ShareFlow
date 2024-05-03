import {ref} from 'vue'
import {defineStore} from 'pinia'

const useConfigureStore = defineStore("configure", () => {
    const test = ref<number>(10);
    const transition = ref<string>("transition-all ease-in");

    return {test,transition}
})

export default useConfigureStore;