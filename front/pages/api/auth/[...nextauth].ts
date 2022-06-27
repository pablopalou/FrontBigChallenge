import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default NextAuth({
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials:{
                email: { type: 'email'},
                password: {type: 'password'},
            },
            async authorize(credentials){
                let user = null;
                let response = await instance.post('/login',{
                    email: credentials?.email,
                    password: credentials?.password,
                }).then((response) => {
                    console.log("NO hubo ningun error.")
                    let token = response.data.token
                    let role = response.data.role
                    let info = response.data.data
                    user = {token, role, ...info}
                }).catch((error) => {
                    console.log("HAY UN ERROR.")
                    console.log(error);
                });
                return user; 
            }
        })
    ],

    jwt:{},

    pages: {
        signIn: '/login',
        newUser: '/register'
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if ( account ) {
                token.accessToken = account.access_token;
                token.user = user;
            }
            return token;
        },


        async session({ session, token, user }){

            session.accessToken = token.accessToken;
            session.user = token.user as any;
            return session;
        }
    },

    secret: process.env.JWT_SECRET,
});
