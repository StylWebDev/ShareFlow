import {defineStore} from "pinia";
import {ref} from "vue";
import supabase from "../supabase.ts";
import {Posts} from "../types.ts";

export const usePostsStore = defineStore("pinia/posts", () => {
    const posts = ref< (Posts|never)[]>([]);
    const noPostsMsg = ref<string>("")

    const loadPosts = async (userid:number):Promise<any> => {
        posts.value = [];
        noPostsMsg.value = "";
        const {data: postsArr, error} = await supabase
            .from('posts')
            .select()
            .eq(`userid`, userid);
        if (!error) {
            postsArr?.forEach((post) => {
                posts.value.unshift({id: post.id, caption: post.caption, date: post.created_at, url: `https://uxxdciyvirkmeotleylq.supabase.co/storage/v1/object/public/images/` + post.url.toString()})
            })
        }else noPostsMsg.value = "This User Does not Posted yet";
    }

    return {posts,noPostsMsg,loadPosts}

})