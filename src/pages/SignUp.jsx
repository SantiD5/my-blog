import { Link } from "react-router-dom"
import '../Styles/SignUp.css'
export const SignUp = () =>{
  return(
    <div className="body-register">
      <div className="container">
        <h2>Create a new Account!</h2>
      <form action="">
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email"/>
        <input type="password"  placeholder="Password"/>
        <button type="Submit">
          Sign Up
        </button>
      </form>
      <p>already have an account? <Link to='/login'>sign in</Link></p>

      </div>
    
    </div>
)}