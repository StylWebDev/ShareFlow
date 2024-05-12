interface SignUp {
    fullName: string;
    email: string;
    username: string;
    password: string;
}

interface SignIn {
    email: string,
    password: string
}

export {type SignUp, type SignIn};