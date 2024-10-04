import { Link } from "react-router-dom"
import '../Styles/login.css'
export const Login = () =>{
  return(
    <div className="body-login">
      <div className="container">
        <h2>Log Into The Blog!</h2>
      <form action="">
        <input type="email" placeholder="Email"/>
        <input type="password"  placeholder="Password"/>
        <button type="Submit">
          Sign In
        </button>
      </form>
      <p>dont have an account? <Link to='/signup'>sign up</Link></p>

      </div>
    
    </div>
)}