import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import "../Styles/login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, errors: AuthErrors, setErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await login(values);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    // Clear errors on successful navigation
    setErrors([]);
  }, [isAuthenticated, navigate, setErrors]);

  useEffect(() => {
    const interval = setInterval(() => {
      clearErrors();
    }, 5000);
    return () => clearInterval(interval);
  }, [clearErrors]);

  return (
    <div className="body-login">
      <div className="container">
        <h2>Log Into The Blog!</h2>
        {AuthErrors.length > 0 && (
          <div className="error-messages" style={{ color: "red" }}>
            {AuthErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="text-black"

          />
          {errors.email && <p style={{ color: "red" }}>Email is required</p>}

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
       
            className="text-black"
/>
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

          <button type="submit">Sign In</button>
        </form>
        <p>
          Dont have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
