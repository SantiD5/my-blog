import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
export const Account = () =>{
   const {user} = useAuth()
   const [profile,setProfile] = useState([])
   const [isEditing, setIsEditing] = useState(false);
   useEffect(()=>{
    const getUser = async() =>{
      try{
        const res = await user
        setProfile(res)
        console.log(res)
      }catch(e){
        console.log(e)
      }
     }
     getUser()
   },[])
   const [username, setUsername] = useState(user.username);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleUpdateUsername = () => {
    // Update username logic here
    setIsEditingUsername(false);
  };

  const handleEditFullName = () => {
    setIsEditingFullName(!isEditingFullName);
  };

  return (
    <div className="account-overview">
      <h1>Account Overview</h1>
      
      <div className="field">
        <label>Full Name:</label>
        {isEditingFullName ? (
          <div>
            <input 
              type="text" 
              value={fullName} 
              onChange={handleFullNameChange} 
            />
            <button onClick={handleEditFullName}>Save</button>
          </div>
        ) : (
          <div>
            <span>{fullName}</span>
            <button onClick={handleEditFullName}>Edit</button>
          </div>
        )}
      </div>

      <div className="field">
        <label>Username:</label>
        {isEditingUsername ? (
          <div>
            <input 
              type="text" 
              value={username} 
              onChange={handleUsernameChange} 
            />
            <button onClick={handleUpdateUsername}>Update</button>
            <button onClick={() => setIsEditingUsername(false)}>Close</button>
          </div>
        ) : (
          <div>
            <span>{username}</span>
            <button onClick={() => setIsEditingUsername(true)}>Edit</button>
          </div>
        )}
      </div>

      <div className="field">
        <label>Email:</label>
        <div>
          <span>{user.email}</span>
          <button>Edit</button>
        </div>
      </div>

      <div className="field">
        <label>Password:</label>
        <div>
          <span>********</span>
          <a href="/reset-password">Edit Password</a>
        </div>
      </div>
    </div>
  );
};