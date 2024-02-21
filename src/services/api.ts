import axios , {AxiosError} from 'axios'
import { error } from 'console'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { signOut } from '@/contexts/AuthContext'


export function setupAPIClient(ctx= undefined){
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL:'https://arquivo-pt-api-challenge.onrender.com',
        headers:{
            Authorization:`Bearer ${cookies['@arquivoGPT.token']}`
        }
    })

    api.interceptors.response.use(response=>{
        return response;
    },(error:AxiosError)=>{
        if(error.response?.status === 401){
            if(typeof window !== undefined){
                 signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)
    })

    return api;
}