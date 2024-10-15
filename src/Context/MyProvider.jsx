import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Create a Context 
export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [showsignup, setShowsignup] = useState(false);
    const [showlogin, setShowlogin] = useState(false);
    const [curruser, setCurruser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showCreateChannel, setShowCreateChannel] = useState(false)
    const [showVideoUpload, setShowVideoUpload] = useState(false)
    const [showNotification, setshowNotification] = useState(false)
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState(null);
    const [filter, setFilter] = useState('');

    const logout = () => {
        localStorage.removeItem('ytc-auth-token');
        setCurruser(null);
        toast.info("Logout successfully");
    }
    const fetchCurrUser = async () => {
        const token = localStorage.getItem('ytc-auth-token');
        if (!token) {
            return setCurruser(null);
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BURL}/auth/getuser`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Sending token in the Authorization header
                }
            });
            // Handle the response 
            setCurruser(response.data.user);
        } catch (error) {
            // Handle error
            console.error('Error fetching current user:', error);
            logout();
        }
    };
    const fetchVideos = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BURL}/videos/video`);
            console.log(res.data.videos);
            setVideos(res.data.videos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };
    const fetchVideo = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BURL}/videos/video/${id}`);
            if (res.data) {
                setVideo(res.data.video); // Save the video data in the state
                console.log(res.data.video.comments)
            }

        } catch (err) {

            alert(err.response.data.message)
        }
    };


    useEffect(() => {
        fetchVideos();
        fetchCurrUser();
    }, [])


    return (
        <MyContext.Provider value={{ filter, setFilter, showNotification, setshowNotification, video, fetchVideo, fetchVideos, videos, fetchCurrUser, isDark, setIsDark, showsignup, setShowsignup, showlogin, setShowlogin, curruser, setCurruser, logout, showProfile, setShowProfile, showCreateChannel, setShowCreateChannel, showVideoUpload, setShowVideoUpload }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
