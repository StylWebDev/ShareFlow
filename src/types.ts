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

interface Posts {
    id: number,
    caption: string
    date: string,
    url: string,
}

export {type SignUp, type SignIn, type Posts};