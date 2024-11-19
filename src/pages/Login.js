import React,{useEffect, useState} from 'react'
import styles from "./Login.module.css";
import PageNav from './pageNav'
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("sedhu@example.com");
  const [password, setPassword] = useState("test1234");
  const navigate = useNavigate()
  const {Login,isAuthenticate} = useAuth()

   function handleSubmit(e){
    e.preventDefault()
    const obj = {
      email,
      password
    }
    Login(obj)
  }

  useEffect(function(){
      if(isAuthenticate){
        navigate('/app/cities')
      }
      else{
        navigate('/login')
      }
  },[isAuthenticate])

  return (
   
    <main className={styles.login}>
    <PageNav></PageNav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className='cta'>Login</button>
        </div>
      </form>
    </main>
  );
}
