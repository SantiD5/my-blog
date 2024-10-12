import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

export const Account = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState([]);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false); // New state for editing email
  const [email, setEmail] = useState(user.email); // State to hold email value

  const [isEditingPassword, setIsEditingPassword] = useState(false); // New state for editing password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await user;
        setProfile(res);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(username)
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdateUsername = () => {
    // Add the logic to update username
    setIsEditingUsername(false);
  };

  const handleUpdateEmail = () => {
    // Add the logic to update email
    setIsEditingEmail(false);
  };

  const handleUpdatePassword = () => {
    // Add the logic to update password
    if (newPassword === confirmPassword) {
      console.log("Password updated successfully");
      setIsEditingPassword(false);
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Account Overview</h1>

        {/* Full Name Section */}
        <div className="flex items-center mb-4">
          <label className="w-32 font-medium text-gray-600">Full Name:</label>
          {isEditingFullName ? (
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => setIsEditingFullName(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-gray-700">{fullName}</span>
              <button
                onClick={() => setIsEditingFullName(true)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Username Section */}
        <div className="flex items-center mb-4">
          <label className="w-32 font-medium text-gray-600">Username:</label>
          {isEditingUsername ? (
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleUpdateUsername}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditingUsername(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-gray-700">{username}</span>
              <button
                onClick={() => setIsEditingUsername(true)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Email Section */}
        <div className="flex items-center mb-4">
          <label className="w-32 font-medium text-gray-600">Email:</label>
          {isEditingEmail ? (
            <div className="flex items-center space-x-3">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleUpdateEmail}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditingEmail(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-gray-700">{email}</span>
              <button
                onClick={() => setIsEditingEmail(true)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className="flex items-center mb-4">
          <label className="w-32 font-medium text-gray-600">Password:</label>
          {isEditingPassword ? (
            <div className="flex flex-col items-start space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleUpdatePassword}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Update Password
              </button>
              <button
                onClick={() => setIsEditingPassword(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-gray-700">********</span>
              <button
                onClick={() => setIsEditingPassword(true)}
                className="text-blue-500 hover:underline"
              >
                Edit Password
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
