import cookie from 'js-cookie';
import { createContext, useContext, useEffect, useState } from "react";
import { isAdminRequest, loginRequest, LogoutRequest, signUpRequest, verifyTokenRequest } from "../Api/Auth";
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
  const [isAdmin, setIsAdmin] = useState(false)
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
      setIsAdmin(res.data.role == 'admin'); 
    }catch(e){
      if(Array.isArray(e.response.data)){ 
      setErrors(e.response.data)
    }
    setErrors([e.response.data.message])
    }
  }
  const logOut = async(user)=>{
    try{
      const res = await LogoutRequest(user)
      console.log(JSON.stringify(res))
      setIsAuthenticated(false)
      setUser(null)
      setIsAdmin(false)
    }catch(e){
      console.log(e)
    }
  }

  const Admin = async (token) => {
    try {
      const res = await isAdminRequest(token); // Pass the token
      if (res.data.isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log(error);
      setIsAdmin(false); // Default to false in case of error
    }
  };

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
            console.log(res.data)
            console.log(res.data.role)
            setIsAdmin(res.data.role === 'admin'); 
            setLoading(false)
            console.log(`ES ADMIN? ${isAdmin}`)

        }catch(e){
          console.log(e)
          setIsAuthenticated(false);
          setUser(null);
          setIsAdmin(false);
          setLoading(false)

        }
      }
      checkLogin();
    },[])
  return(
    <AuthContext.Provider value = {{isAdmin,logOut,loading,signUp,user,useAuth,isAuthenticated,errors,setErrors,login}}>
    {children}
    </AuthContext.Provider>
  )
}