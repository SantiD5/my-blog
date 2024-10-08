import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


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
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Log Into The Blog!</h2>

        {AuthErrors.length > 0 && (
          <div className="mb-4 bg-red-200 text-red-600 p-2 rounded-lg">
            {AuthErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition ease-in-out duration-150"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
