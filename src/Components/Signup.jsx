import React, { useContext, useState } from 'react'

import '../Css/Signup.css'
import { MyContext } from '../Context/MyProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { showsignup, setShowsignup, showlogin, setShowlogin, curruser, setCurruser } = useContext(MyContext);
    const [showpass, setshowpass] = useState(true);
    async function handelSignup() {

        try {
            if (name === '' || email === '' || password === '') {
                return toast.warn("Fillup all fields");
            }
            toast.info("Loading wait");
            const res = await axios.post(`${import.meta.env.VITE_BURL}/auth/signup`, {
                name, email, password
            });
            console.log(res.data);
            setCurruser(res.data.user);
            //empty signup form
            setEmail('')
            setName('')
            setPassword('')
            localStorage.setItem('ytc-auth-token', res.data.token);
            setShowsignup(false);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }
    return (
        <form className='signup-form'>
            <div className="top">
                <p>Welcome to Youtube</p>
                <i className="ri-close-large-line cursor-pointer" onClick={() => setShowsignup(!showsignup)}></i>
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter UserName' />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <div className='password-cont'>
                <input type={showpass ? "text" : 'password'} placeholder='Set password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {showpass ? <i className="ri-eye-fill" onClick={() => setshowpass(!showpass)}></i> : <i className="ri-eye-off-fill" onClick={() => setshowpass(!showpass)}></i>}
            </div>
            <div className='btn' onClick={handelSignup}>SIGNUP</div>
            <div className='btn' onClick={() => { setShowsignup(false), setShowlogin(true) }}>Already a user?</div>
        </form>
    )
}

export default Signup
