import cookie from 'js-cookie';
import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, signUpRequest, verifyTokenRequest } from "../Api/Auth";
export const AuthContext = createContext()

export const useAuth = () =>{
  const context = useContext(AuthContext);
  if(!context){ 
    throw new Error('useAuth must be used within authprovider')
  } 
  return context
}

export const AuthProvider = ({children}) =>{
  const [user,setUser] = useState(null)
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [errors,setErrors] = useState([])
  const [loading,setLoading] = useState(true)
  const signUp = async (user) => {
    try {
      const res = await signUpRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([])
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  
  const login = async(user) =>{
    try{
      const res = await loginRequest(user)
      setIsAuthenticated(true)
      setUser(res.data)
    }catch(e){
      if(Array.isArray(e.response.data)){ 
      setErrors(e.response.data)
    }
    setErrors([e.response.data.message])
    }
  }

  useEffect(()=>{
    async function checkLogin (){
      const cookies = cookie.get()
      if(!cookies.token){
        console.log(cookies)
        console.log("no hay token")
        setLoading(false)
        setIsAuthenticated(false)
        return setUser(null)
      }
        try{
          const res = await verifyTokenRequest(cookies.token)
          if(!res.data){
            setIsAuthenticated(false)
            setLoading(false)
          }
            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false)
            console.log(res)
        }catch(e){
          console.log(e)
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false)

        }
      }
      checkLogin();
    },[])
  return(
    <AuthContext.Provider value = {{loading,signUp,user,useAuth,isAuthenticated,errors,setErrors,login}}>
    {children}
    </AuthContext.Provider>
  )
}