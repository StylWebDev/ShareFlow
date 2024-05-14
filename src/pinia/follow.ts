import {defineStore} from "pinia";
import {ref} from "vue";
import supabase from "../supabase.ts";

export const useFollowStore = defineStore("follow", () => {

    const isFollowing = ref(false);
    const followers = ref<number|null>(0);
    const following = ref<number|null>(0);

    const getFollowers = async(userId:number) => {
         const {count: followersCount} = await supabase.from("followTable").select(`*`, {count: `exact`}).eq('followingId', userId);
         followers.value = followersCount;

         const {count: followingCount} = await supabase.from("followTable").select(`*`, {count: `exact`}).eq('followerId', userId);
         following.value = followingCount;
    }

    const checkIfFollowing = async (authUserID:number, externalUserId:number) => {
        const {data} = await supabase
            .from("followTable")
            .select()
            .eq('followerId', authUserID)
            .eq('followingId', externalUserId)
            .single();
        (data) ? isFollowing.value = true : isFollowing.value = false;
    }


    const handleFollow = async (authUserID:number, externalUserId:number) => {
        await supabase
            .from("followTable")
            .insert({followerId: authUserID, followingId:externalUserId })
        await checkIfFollowing(authUserID,externalUserId);

        await getFollowers(externalUserId)
    }

    const handleUnfollow = async (authUserID:number, externalUserId:number) => {
        await supabase
            .from("followTable")
            .delete()
            .eq('followerId', authUserID)
            .eq('followingId', externalUserId)

        await checkIfFollowing(authUserID,externalUserId);
        await getFollowers(externalUserId);
    }

    return {isFollowing,followers,following,checkIfFollowing,getFollowers,handleFollow,handleUnfollow}

})