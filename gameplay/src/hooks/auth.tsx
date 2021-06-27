import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage  from '@react-native-async-storage/async-storage';

const { REDIRECT_URI } = process.env
const { SCOPE } = process.env
const { RESPONSE_TYPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env

import { api } from "../services/api";
import { COLLECTION_USER } from '../config/storage';

type User ={
    id: string;
    username: string;
    firstname: string;
    avatar: string;
    email: string;
    token: string;
};

type AuthContextData = {
    user : User;
    signIn : () => Promise<void>;
    singOut:() => Promise<void>;
    loading: boolean;
}

type AuthProviderProps = {
    children : ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params:{
        access_token?: string;
        error?:string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps){
    const [user, setUser ] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);
    
    async function signIn(){
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            
            console.log(authUrl);
            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;     

            if(type === 'success' && !params.error){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');
                const firstname = userInfo.data.username.split(' ')[0];
             
                userInfo.data.avatar = userInfo.data.avatar !== null ? `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`: userInfo.data.avatar ;
                
                const userData = {
                    ...userInfo.data,
                    firstname,
                    token:params.access_token
                };

                await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
                setUser(userData);
            }
        } catch (error) {
            throw new Error('Não foi possivel autenticar');
        }finally{
            setLoading(false);
        }
    }

    async function loadUserStorageData(){
        const storage = await AsyncStorage.getItem(COLLECTION_USER);  
        
        if(storage){
            const userLogged = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

            setUser(userLogged);
        }
    }

    async function singOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USER);
    }

    useEffect(()=>{
        loadUserStorageData();
    });

    return(
        <AuthContext.Provider value={{ user, signIn, loading, singOut }} >
            { children }
        </AuthContext.Provider>
    )
}

function useAuth( ){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };