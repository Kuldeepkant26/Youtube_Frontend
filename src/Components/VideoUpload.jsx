import React, { useContext, useState } from 'react';
import '../Css/VideoUpload.css';
import { MyContext } from '../Context/MyProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function VideoUpload() {
    const navigate = useNavigate();
    const { showVideoUpload, setShowCreateChannel, setShowVideoUpload, curruser, setShowsignup, fetchVideos } = useContext(MyContext);
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleUpload = async () => {
        toast.info("Loading wait");
        try {
            if (videoUrl === '' || thumbnailUrl === '' || title === '' || description === '' || category === '') {
                return toast.warn("Fillup all fields");
            }
            const token = localStorage.getItem('ytc-auth-token');
            const res = await axios.post(`${import.meta.env.VITE_BURL}/videos/video`, {
                title,
                videoUrl,
                thumbnailUrl,
                description,
                category,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Sending token in the Authorization header
                }
            });
            console.log(res)
            setCategory('')
            setDescription('')
            setTitle('')
            setThumbnailUrl('')
            setVideoUrl('')
            toast.success(res.data.message);
            fetchVideos()
            setShowVideoUpload(false)
        } catch (error) {
            toast.error(error.resposne.data.message);
        }
        // Here you can add your logic to upload the video data to the server or API.


    };
    const handelCreateNow = () => {
        setShowVideoUpload(false)
        setShowCreateChannel(true)
    }
    return (
        <>
            {curruser && localStorage.getItem('ytc-auth-token') ? (
                <>
                    {curruser.channel ? <>
                        <form className='video-upload-form'>
                            <h1>Fill Video Details</h1>
                            <input
                                type="text"
                                placeholder='Video title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Video Url'
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Thumbnail Url'
                                value={thumbnailUrl}
                                onChange={(e) => setThumbnailUrl(e.target.value)}
                            />
                            <textarea
                                placeholder='Video Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Video Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <div className="btns">
                                <div className="cancel" onClick={() => setShowVideoUpload(false)}>Cancel</div>
                                <div className="upload" onClick={handleUpload} >Upload</div>
                            </div>
                        </form>
                    </> : <div className='flex flex-col items-center gap-4'>
                        <p>Create channel to upload videos</p>
                        <br></br>
                        <button className='p-3 bg-black rounded-lg h-fit text-white' onClick={handelCreateNow}>Create now</button>
                    </div>}
                </>
            ) : (
                <div>
                    <p>Signup to Upload Videos</p>
                    <div id="signup-btn" className='p-3 mt-3' onClick={() => { setShowsignup(true), setShowVideoUpload(false) }}>
                        <i className="ri-account-circle-line text-4xl"></i>
                        <p>SIGN IN</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default VideoUpload;
