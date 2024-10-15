import React, { useContext } from 'react';
import '../Css/Profile.css';
import { MyContext } from '../Context/MyProvider';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function Profile() {
    const { curruser, logout, showProfile, setShowProfile, setShowCreateChannel } = useContext(MyContext);

    // Check if the user is logged in
    if (curruser && localStorage.getItem('ytc-auth-token')) {
        return (
            <div className='profile-card'>
                <p className='close'><i className="ri-close-line" onClick={() => setShowProfile(false)}></i></p>
                <p className='profile-pic'>{curruser.name[0]}</p>
                <p>{curruser.name}</p>
                <p>{curruser.email}</p>
                <div className="profile-menu">
                    {!curruser.channel ?
                        <div className='btn' onClick={() => { setShowProfile(false), setShowCreateChannel(true) }}>Create channel</div> :
                        <Link to={`/channel/${curruser.channel._id}`} className='btn' onClick={() => { setShowProfile(false),toast.info('Loading') }}>View Channel</Link>

                    }
                    <div className='btn' onClick={() => { logout(), setShowProfile(false) }}><i className="ri-logout-box-r-line"></i>Logout</div>

                </div>

            </div>
        );
    } else {
        return <p>User not found</p>; // Renders nothing if the user is not logged in
    }
}

export default Profile;
