import React, { useContext, useState } from 'react'
import { MyContext } from '../Context/MyProvider'
import '../Css/CreateChannel.css'
import axios from 'axios';
import { toast } from 'react-toastify';
function CreateChannel() {
    const { showCreateChannel, setShowCreateChannel, fetchCurrUser } = useContext(MyContext);
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [banner, setBanner] = useState('')


    const createChannel = async () => {
        toast.info("Loading wait");
        try {
            if (name === '' || logo === '' || banner === '') {
                return toast.warn("Fillup all fields");
            }
            const token = localStorage.getItem('ytc-auth-token');
            const res = await axios.post(`${import.meta.env.VITE_BURL}/channel/create`, {
                name, logo, banner
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Sending token in the Authorization header
                }
            });
            console.log(res);
            setName('');
            setLogo('');
            setBanner('');
            setShowCreateChannel(false);
            fetchCurrUser();
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='channel-form'>
            <h1>
                Fill Channel details
            </h1>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter channel name' />
            <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder='Paste logo image link ' />
            <input type="text" value={banner} onChange={(e) => setBanner(e.target.value)} placeholder='Paste Banner image link ' />
            <div className='btns'>
                <div className='cancel' onClick={() => setShowCreateChannel(false)}>Cancel</div>
                <div className='create' onClick={() => { createChannel() }}>Create now</div>
            </div>
        </div>
    )
}

export default CreateChannel
