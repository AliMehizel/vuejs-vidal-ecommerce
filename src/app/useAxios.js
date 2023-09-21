import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'




const baseURL = 'http://127.0.0.1:8000'
let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
const useAxios = () => {
    
    //request post with current token.access
    const axiosInstance = axios.create({
        baseURL,
        headers:{
            Authorization: `Bearer ${authTokens?.access}`
        }
    });


    axiosInstance.interceptors.request.use(async req => {
        //decode auth token
        const user = jwt_decode(authTokens.access)
        //calculate diff between two time
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        //check if is expired ? return iniale authToken.access else do a post request
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens.refresh
          });
        //get response and store it
        localStorage.setItem('authTokens', JSON.stringify(response.data))
  
        
        //headers autorisation with new authToken.access
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })
    
    return axiosInstance
}

export default useAxios;