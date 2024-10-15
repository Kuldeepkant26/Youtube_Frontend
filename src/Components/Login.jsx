import React, { useContext, useState } from 'react'

import '../Css/Signup.css'
import { MyContext } from '../Context/MyProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {
    const { showsignup, setShowsignup, showlogin, setShowlogin, setCurruser, fetchCurrUser } = useContext(MyContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handelLogin() {
       
        try {
            if (email === '' || password === '') {
                return toast.warn("Fillup all fields");
            }
            toast.info("Loading wait");
            const res = await axios.post(`${import.meta.env.VITE_BURL}/auth/login`, {
                email, password
            });
            localStorage.setItem('ytc-auth-token', res.data.token);
            setCurruser(res.data.user);
            setEmail('')
            setPassword('')
            setShowlogin(false);
            toast.success(res.data.message)

            fetchCurrUser();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    const [showpass, setshowpass] = useState(true);
    return (
        <form className='signup-form'>
            <div className="top">
                <p>Welcome back to youtube</p>
                <i className="ri-close-large-line cursor-pointer" onClick={() => setShowlogin(false)}></i>
            </div>
            <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className='password-cont'>
                <input type={showpass ? "text" : 'password'} placeholder='Set password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {showpass ? <i className="ri-eye-fill" onClick={() => setshowpass(!showpass)}></i> : <i className="ri-eye-off-fill" onClick={() => setshowpass(!showpass)}></i>}
            </div>
            <div className='btn' onClick={handelLogin}>Login</div>
            <div className='btn' onClick={() => { setShowlogin(false), setShowsignup(true) }}>New user?</div>
        </form>
    )
}

export default Login
