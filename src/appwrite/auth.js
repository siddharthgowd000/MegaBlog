/* eslint-disable no-useless-catch */
import conf from '../conf/conf'

import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client()
    account

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl) 
                .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)      
        
    }

    async createAccount({email, password, name}){
        try {
            
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // call another method
                return this.login({email, password})

            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try{

            return await this.account.createEmailPasswordSession(email, password)

        }catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try {
            
            const user = await this.account.get()
            return user

        } catch (error) {
            console.log("Appwrite Server:: getCurrentUser :: error", error);
            
        }

        return null
    }

    async logout(){
        try {
            
            return await this.account.deleteSessions()

        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService










// const client = new Client()
//     .setEndpoint(conf.appwriteUrl) // Your API Endpoint
//     .setProject(conf.appwriteProjectId);                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(), 
//     'email@example.com', 
//     'password'
// );

