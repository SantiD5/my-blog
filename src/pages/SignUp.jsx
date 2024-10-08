import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";
import { useAuth } from "../context/authContext";
export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();
  const { signUp, isAuthenticated, errors: AuthErrors ,setErrors} = useAuth();
  const Navigate = useNavigate();
  const onSubmit = async (values) => {
    await signUp(values);
    reset();
  };
  useEffect(() => {
    if (isAuthenticated) Navigate("/");
  }, [isAuthenticated]);
  
  useEffect(() => {
    const intervalo = setInterval(() => {
      clearErrors();
    }, 5000);
    return () => clearInterval(intervalo);
  }, [errors, clearErrors]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setErrors([]);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [AuthErrors]);

  return (
    <div className="body-register">
      <div className="container">
        <h2>Create a new Account!</h2>
        {AuthErrors.map((error, i) => (
          <div style={{color:"black"}} key={i}>{error}</div>
        ))}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
            className="text-black"
          />
          {errors.username && <p>Username is required</p>}
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="text-black"

          />
          {errors.email && <p>Email is required</p>}
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="text-black"

          />
          {errors.password && <p>Password is required</p>}
          <button type="Submit">Sign Up</button>
        </form>
        <p>
          already have an account? <Link to="/login">sign in</Link>
        </p>
      </div>
    </div>
  );
};
