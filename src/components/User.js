import { useAuth } from "../contexts/authContext";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";



function User() {
  const navigate = useNavigate()
  const {userData,LogOut} = useAuth();

  function handleClick() {
    LogOut()
    navigate('/')
  }

  return (
    <div className={styles.user}>
      <img src={userData.avatar} alt={userData.name} className={styles.img}/>
      <span>Welcome, {userData.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
