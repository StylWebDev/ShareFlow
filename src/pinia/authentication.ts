import {defineStore} from "pinia";
import {ref, watch} from "vue";
import supabase from "../supabase.ts";
import {useRouter,useRoute} from "vue-router";
import {usePostsStore} from "./posts.ts";


export const useAuthenticationStore = defineStore('authentication', () => {
    const router = useRouter();
    const route = useRoute();
    const isAuthenticated = ref<boolean>(false);
    const user = ref<any>(null);
    const externalUser = ref<any>(null);
    const err = ref<string>("")
    const loading = ref<boolean>(false);
    const starting = ref<boolean>(false);
    const posts = usePostsStore();
    const isProfile = ref(false);
    const confirmEmail = ref(false);



    watch(err, (newVal) => {
        if (newVal.length != 0) loading.value = false;
    })

    watch(isAuthenticated, (newVal) => {
        if (newVal && route.name===`Login`) router.push(`/`)
    })

    const validatePass = (pass:string):any => {
        let success = false;
        (pass.length!==0) ?
            (pass.length>=8) ?
                (pass.search(/(or|and|'|alter|create|select|drop|delete|like|case|index|test|=)/i) === -1) ?
                    (pass.search(/[A-Za-z]/g) >-1) ?
                        (pass.search(/[0-9]/g) >-1) ?
                            (pass.search(/[!@#$%^&*]/g) >-1) ?
                                (pass.search(/([A-Z])/g) >-1) ?
                                    (pass.search(/[a-z]/g)>-1) ? success = true
                                        : err.value += " Your password must contain lowercase characters"
                                    : err.value += " Your password must contain uppercase characters"
                                : err.value += " Your password must contain at least one special character"
                            : err.value += " Your password must contain at least one numerical character 0-9"
                        : err.value += " Your password must contain at least one letter of the alphabet A-Z"
                    : err.value += " Your password must not contain SQL/No SQL keywords"
                : err.value += " Your password must be at least 8 characters"
            : err.value += " Please Fill The Form";

        return success;
    }

    const validateEmail = (email:string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateFullName = (fullname:string) => {
        return String(fullname)
            .toLowerCase()
            .match(
                /^[a-zA-Z'. ]+$/
            );
    };

    const handleSignIn = async (credentials:any ) => {
        confirmEmail.value = false
        err.value = ""
        loading.value = true;
        const {email, password} = credentials;

        (validateEmail(email))
            ? validatePass(password)
            : err.value += "Email is invalid";

        if (err.value.length > 0) return ;


        const {data: userInfo, error} = await supabase.auth.signInWithPassword({email, password});

        if (error) err.value = "Check Your credentials and try again";
        else {
            if (userInfo.user) {
                const {data} = await supabase
                    .from("users")
                    .select("id, email, username , photoProfile")
                    .eq('email', userInfo.user.email)
                    .single();

                user.value = {
                    id: data?.id,
                    username: data?.username,
                    email: data?.email,
                    photoProfile: data?.photoProfile
                }
                loading.value = false;
                isAuthenticated.value = true;
                if(isAuthenticated) router.push("/");
            }
        }
    }


    const handleSignUp = async (credentials:any ) => {
        loading.value = true;
       const {fullName: fullname, email, username, password} = credentials;
            err.value = "";
            (validateFullName(fullname))
                ? (validateEmail(email))
                    ? (username.length > 5)
                        ? validatePass(password)
                        : err.value += "Your username must contain 5 characters"
                    : err.value += "Email is invalid"
                : err.value += " Your full name must not contain numbers or special characters except '"

        if (err.value.length > 0) return ;

        const {data: emailAlreadyExists} = await supabase.from("users").select().eq('email', email).single();

        if (emailAlreadyExists) err.value = "A user with this email already exists";
        else {
            const {error} = await supabase.auth.signUp({
                email,
                password
            })
            if (error) {
                return err.value = error.message;
            }
            await supabase.from("users").insert({
                fullname,
                email,
                username
            })


            const {data} = await supabase
                .from("users")
                .select(`id, email, username, photoProfile`)
                .eq('email', email)
                .single();

            user.value = {
                id: data?.id,
                username: data?.username,
                email: data?.email,
                photoProfile: data?.photoProfile
            }

            confirmEmail.value = true
            loading.value = false
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        isAuthenticated.value = false;
        user.value = null;
        router.push(`/login`)
    }

    const getUser = async () => {
        starting.value = true;
        err.value = "user not found"
        const loggedUser:any = await supabase.auth.getUser();

        if (!loggedUser.data.user) {
            starting.value = false;
            return ;
        }
        else {
            const {data} = await supabase
                .from("users")
                .select(`id, email, username, photoProfile`)
                .eq('email', loggedUser.data.user.email)
                .single();

            user.value = {
                id: data?.id,
                username: data?.username,
                email: data?.email,
                photoProfile: data?.photoProfile
            }
            isAuthenticated.value = !isAuthenticated.value
            starting.value = false;
        }

    }

    const getExternalUser = async (username:string) => {
        err.value = ""
        const {data, error} = await supabase
            .from("users")
            .select("id, email, username, photoProfile")
            .eq('username', username)
            .single();
        if (!error)
        {
            externalUser.value = {
                id: data?.id,
                username: data?.username,
                email: data?.email,
                photoProfile: data?.photoProfile
            };
            (isAuthenticated.value && user.value.username === username)
                ? posts.loadPosts(user.value.id)
                : posts.loadPosts(externalUser.value.id);
        }else err.value = "user not found"

    }

    return {isAuthenticated,isProfile,starting,confirmEmail,loading,user,externalUser,err,handleSignIn,handleSignUp,handleLogout,getUser,getExternalUser};

})