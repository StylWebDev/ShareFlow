import {defineStore} from "pinia";
import {ref} from "vue";
import supabase from "../supabase.ts";
import {Posts} from "../types.ts";

export const usePostsStore = defineStore("posts", () => {
    const posts = ref< (Posts|never)[]>([]);
    const noPostsMsg = ref<string>("")

    const likePost = async (userid:number,url:string):Promise<any> => {
             await supabase
                .from("likes")
                .insert({
                    userid: userid,
                    liked: url,
                })
    }
    const removeLike = async (userid:number,url:string):Promise<any> => {
         await supabase
            .from("likes")
            .delete()
            .eq("userid", userid)
            .eq("liked", url)
    }


    const loadPosts = async (userid:number):Promise<any> => {
        posts.value = [];
        noPostsMsg.value = "";
        const {data: postsArr, error} = await supabase
            .from('posts')
            .select()
            .eq(`userid`, userid);
        if (!error) {
            postsArr?.forEach((post) => {
                posts.value.unshift({id: post.id, caption: post.caption, date: post.created_at, url: post.url.toString()})
            })
        }else noPostsMsg.value = "This User Does not Posted yet";
    }

    return {posts,noPostsMsg,likePost,loadPosts,removeLike}

})