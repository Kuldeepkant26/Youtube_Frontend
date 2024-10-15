import React, { useContext, useState } from 'react';
import '../Css/Navbar.css';
import Signup from './Signup';
import { MyContext } from '../Context/MyProvider';
import Login from './Login';
import Profile from './Profile';
import CreateChannel from './CreateChannel';
import { useNavigate } from 'react-router-dom';
import VideoUpload from './VideoUpload';
import Notification from './Notification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const navigate = useNavigate()
    const { setFilter, filter, showNotification, setshowNotification, showVideoUpload, setShowVideoUpload, showsignup, setShowsignup, showlogin, curruser, showProfile, setShowProfile, showCreateChannel, setShowCreateChannel } = useContext(MyContext);
    const [sidebar, setSidebar] = useState(true);

    const [isFocused, setIsFocused] = useState(false); // State to track input focus
    const [prompt, setPrompt] = useState('');
    function handelSearch() {
        setFilter(prompt);
        toast.info("Searching complete");
    }

    return (
        <>
            <nav>
                <div className="left">
                    <i id='mnubtn' onClick={() => setSidebar(!sidebar)} className="ri-menu-fill cursor-pointer"></i>
                    <h2><i className="ri-youtube-fill yti"></i>Youtube<span>IN</span></h2>
                </div>
                <div className="mid">
                    <div className="search" onClick={() => navigate('/')}>
                        <div className="sbar">
                            {isFocused && ( // Show icon only when input is focused
                                <i id='sio' className="ri-search-line pr-1 pl-2"></i>
                            )}
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Search"
                                onFocus={() => setIsFocused(true)} // Set focus state to true
                                onBlur={() => setIsFocused(false)} // Set focus state to false
                                className='pl-2'
                            />
                            <i
                                className="ri-close-large-line cursor-pointer"
                                onClick={() => setPrompt('')}
                                style={{ display: prompt === '' ? 'none' : 'inline' }}
                            ></i>
                        </div>
                    </div>
                    <i id="sbtn" className="ri-search-line" onClick={handelSearch}></i>
                </div>
                <div className="right">
                    <i id='sec-searchbtn' className="ri-search-line" onClick={() => navigate('/search')}></i>
                    <i id='vid-add' className="ri-video-add-line" onClick={() => setShowVideoUpload(true)}></i>
                    <i className="ri-notification-2-line hidden md:block" onClick={() => setshowNotification(true)}></i>
                    {!localStorage.getItem('ytc-auth-token') ?
                        <div id="signup-btn" onClick={() => setShowsignup(true)}>
                            <i className="ri-account-circle-line"></i>
                            <p>SIGN IN</p>
                        </div> :
                        <>
                            {curruser && curruser.channel ? <>
                                <img className='your-profile cursor-pointer' src={curruser.channel.logoUrl} alt="P" onClick={() => setShowProfile(true)} />
                            </> : <>

                                <p id='profile-btn' className='bg-black text-white h-9 w-9 text-xl ml-7 overflow-hidden rounded-full flex justify-center items-center cursor-pointer ' onClick={() => setShowProfile(true)}>
                                    {curruser ? curruser.name[0] : "A"}
                                </p>
                            </>}
                        </>

                    }
                </div>
                <div className="sidebar " style={{ left: sidebar ? '-100%' : '0px' }}>
                    <div className="left bg-white">
                        <div className="top">
                            <i onClick={() => setSidebar(!sidebar)} className="ri-menu-fill cursor-pointer ml-1"></i>
                            <h2><i className="ri-youtube-fill yti"></i>Youtube<span>IN</span></h2>
                        </div>
                        <div className="first-menu">
                            <div className='options' onClick={() => { navigate('/'), setSidebar(!sidebar) }}>
                                <i className="ri-home-5-fill"></i>
                                <p>Home</p>
                            </div>

                            <div className='options'>
                                <img src="https://i.pinimg.com/originals/17/d2/18/17d21878c22fe49e7e4752eecaa36541.png" alt="icon" />
                                <p>Shorts</p>
                            </div>

                            <div className='options'>
                                <img src="https://cdn.iconscout.com/icon/free/png-512/free-subscription-logo-icon-download-in-svg-png-gif-file-formats--youtube-menu-subs-social-media-pack-logos-icons-3789620.png?f=webp&w=512" alt="Subscriptions" />
                                <p>Subscriptions</p>
                            </div>

                            <div className='options'>
                                <img src="https://cdn.iconscout.com/icon/free/png-512/free-youtube-music-logo-icon-download-in-svg-png-gif-file-formats--social-media-app-pack-logos-icons-3222736.png?f=webp&w=512" alt="Music" />
                                <p>Music</p>
                            </div>
                        </div>
                        <div className="first-menu">
                            <div className='options'>
                                <p>You</p>
                                <i className="ri-arrow-right-wide-fill"></i>
                            </div>
                            <div className='options'>
                                <i className="ri-contacts-book-2-line"></i>
                                <p>Your Channel</p>
                            </div>

                            <div className='options'>
                                <i className="ri-history-fill"></i>
                                <p>History</p>
                            </div>

                            <div className='options'>
                                <i className="ri-play-list-2-fill"></i>
                                <p>Playlist</p>
                            </div>

                            <div className='options'>
                                <i className="ri-movie-line"></i>
                                <p>Your Videos</p>
                            </div>
                            <div className='options'>
                                <i className="ri-lightbulb-line"></i>
                                <p>Your Courses</p>
                            </div>
                            <div className='options'>
                                <i className="ri-time-line"></i>
                                <p>Watch Later</p>
                            </div>
                            <div className='options'>
                                <i className="ri-thumb-up-line"></i>
                                <p>Liked videos</p>
                            </div>
                            <div className='options'>
                                <i className="ri-download-line"></i>
                                <p>Downloads</p>
                            </div>
                            <div className='options'>
                                <i className="ri-scissors-cut-line"></i>
                                <p>Your clips</p>
                            </div>

                        </div>
                    </div>
                    <div onClick={() => setSidebar(!sidebar)} className="right" style={{ opacity: sidebar ? '0' : '1' }}>
                    </div>
                </div>
                <div className="signupPage" style={{ display: showsignup ? 'flex' : 'none' }}>
                    <Signup></Signup>
                </div>
                <div className="signupPage" style={{ display: showlogin ? 'flex' : 'none' }}>
                    <Login></Login>
                </div>
                <div className="profilePage" style={{ display: showProfile ? 'flex' : 'none' }}>
                    <Profile></Profile>
                </div>
                <div className="createChannel" style={{ display: showCreateChannel ? 'flex' : 'none' }}>
                    <CreateChannel></CreateChannel>
                </div>
                <div className='VideoUpload-page' style={{ display: showVideoUpload ? 'flex' : 'none' }} >
                    <VideoUpload></VideoUpload>
                </div>
                <div className="notification-page" style={{ display: showNotification ? 'flex' : 'none' }}>
                    <Notification></Notification>
                </div>
            </nav>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar
            ></ToastContainer>

        </>
    );
}

export default Navbar;
