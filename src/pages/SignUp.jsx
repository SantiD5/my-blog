import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();
  const { signUp, isAuthenticated, errors: AuthErrors, setErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await signUp(values);
    reset();
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    const interval = setInterval(() => {
      clearErrors();
    }, 5000);
    return () => clearInterval(interval);
  }, [errors, clearErrors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setErrors([]);
    }, 5000);
    return () => clearInterval(interval);
  }, [AuthErrors]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Create a new Account!
        </h2>

        {AuthErrors.length > 0 && (
          <div className="mb-4 bg-red-200 text-red-600 p-2 rounded-lg">
            {AuthErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          {/* Email */}
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition ease-in-out duration-150"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
