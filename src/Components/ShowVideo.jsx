import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns'; // Import from date-fns
import '../Css/ShowVideo.css';
import '../Css/Comment.css';
import { MyContext } from '../Context/MyProvider';
import VideoCard2 from './VideoCard2';
import Comment from './Comment';
import { toast } from 'react-toastify';


function ShowVideo() {

    const navigate = useNavigate()
    const { id } = useParams();
    const { curruser, videos, video, fetchVideo, fetchVideos } = useContext(MyContext);
    // const [video, setVideo] = useState(null);
    const [error, setError] = useState(null);
    const [cmenu, setcmenu] = useState(false);
    const [shareLink, setShareLInk] = useState(window.location.href)
    const [sharePage, setSharePage] = useState(false);

    const [comment, setComment] = useState('');
    const submitComment = async () => {

        try {

            if (!curruser) {
                return toast.warn("Please login first")
            }
            if (comment === '') {
                return toast.warn('Please enter somthing');
            }
            toast.info("Loading wait");
            const res = await axios.post(`${import.meta.env.VITE_BURL}/videos/comment/${video._id}/${curruser._id}`, {
                comment
            });

            toast.success(res.data.message)
            setComment('');
            fetchVideo(id);
        } catch (error) {

            toast.error(error.response.data.message);
        }
    }
    const handelCopy = () => {

        navigator.clipboard.writeText(shareLink).then(() => {
            toast.success('Link copied to clipboard');
        }).catch(err => {
            toast.error('Failed to copy: ', err);
        });
    };
    const handelLike = async () => {
       
        try {
            console.log('like')
            if (!curruser) {
                return toast.warn("Please login first")
            }
            toast.info('Loading...')
            const res = await axios.put(`${import.meta.env.VITE_BURL}/videos/like/${video._id}/${curruser._id}`);
            toast.success(res.data.message);
            fetchVideo(id);
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }
    const handelSubscribe = async () => {
       
        try {
            if (!curruser) {
                return toast.warn("Please login first")
            }
            toast.info('Loading...')
            const res = await axios.put(`${import.meta.env.VITE_BURL}/channel/subscribe/${video.channelId._id}/${curruser._id}`);
            console.log(res);
            toast.success(res.data.message);
            fetchVideo(id);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const handelUnSubscribe = async () => {
       
        try {
            if (!curruser) {
                return alert("Please login first")
            }
            toast.info('Loading...')
            const res = await axios.put(`${import.meta.env.VITE_BURL}/channel/unsubscribe/${video.channelId._id}/${curruser._id}`);
            console.log(res);
            toast.success(res.data.message);
            fetchVideo(id);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    // const fetchVideo = async () => {
    //     try {
    //         const res = await axios.get(`${import.meta.env.VITE_BURL}/videos/video/${id}`);
    //         if (res.data) {
    //             setVideo(res.data.video); // Save the video data in the state
    //             console.log(res.data.video.comments)
    //         }

    //     } catch (err) {
    //         setError('Failed to fetch video.');
    //         alert(err.response.data.message)
    //     }
    // };

    useEffect(() => {
        fetchVideo(id);
        fetchVideos();
    }, [id]); // Add `id` as a dependency to handle changing route params

    if (error) {
        return <p>{error}</p>;
    }

    if (video) {
        // Calculate time since upload
        const timeAgo = formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true });

        return (
            <div className='video-show-page'>
                <div className="share-box" style={{ display: sharePage ? 'flex' : 'none' }}>
                    <div className="box">
                        <div className="top">
                            <p>Copy the Link</p>
                            <i class="ri-close-large-fill cursor-pointer" onClick={() => setSharePage(false)}></i>
                        </div>
                        <p className='link'>{shareLink}</p>
                        <button onClick={handelCopy}>Copy<i class="ri-file-copy-line"></i></button>
                    </div>
                </div>
                <div className="left">
                    <video src={video.videoUrl} controls></video> {/* Add controls for better UX */}
                    <p className='desc pl-2'>{video.title}</p>
                    <div className="btns pl-1">
                        <img src={video.channelId.logoUrl} alt="" />
                        <Link to={`/channel/${video.channelId._id}`} onClick={() => toast.info('Loading')}>
                            <p className='ch-name font-semibold'>{video.channelId.name} <i className="ri-check-line text-sm text-white bg-gray-400 rounded-full "></i></p>
                            <p>{video.channelId.subscribers.length} subscribers</p>
                        </Link>
                        {curruser && video.channelId.subscribers.includes(curruser._id) ?
                            <div onClick={handelUnSubscribe} className='subscribe'>Subscribed</div> :
                            <div onClick={handelSubscribe} className='subscribe'>Subscribe</div>
                        }
                        <div className="like">
                            {curruser && curruser.likedVideos.includes(video._id) ? <i onClick={handelLike} class="ri-thumb-up-fill llike text-black"><p>{video.likes}</p></i> :
                                <i onClick={handelLike} className="ri-thumb-up-line llike"><p>{video.likes}</p></i>
                            }

                            <i className="ri-thumb-down-line dislike"></i>
                        </div>
                        <div className="share cursor-pointer" onClick={() => setSharePage(true)}>
                            <i className="ri-share-forward-line" ></i> Share
                        </div>

                        <i className="ri-more-2-line menu"></i>
                    </div>
                    <div className="description">
                        <p className='vd'>{video.views} views {timeAgo}</p>
                        <p>{video.description}</p>

                    </div>
                    <div className="comments">
                        <h2>{video.comments.length} Comments</h2>
                        <div className="comment-box">
                            {
                                curruser && curruser.channel ? <>
                                    <img className='' src={curruser.channel.logoUrl} alt="" />
                                </> :
                                    <img src="https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg" alt="P" />
                            }
                            <div className="cright">
                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                                <div className="cbtns">
                                    <div className="cancel-comment" onClick={() => setComment('')}>Cancel</div>
                                    <div className="submit-comment" onClick={submitComment}>Submit</div>
                                </div>
                            </div>
                        </div>
                        <div className="all-comments">
                            {video.comments.length > 0 ?
                                <>
                                    {video.comments.map((comment) => {
                                        return <Comment comment={comment} id={id} key={comment._id}></Comment>

                                    })}
                                </> :
                                <p>No comments yet</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="s-right">
                    {videos.length > 0 ? (
                        videos.map((video, index) => {
                            return <VideoCard2 video={video}></VideoCard2>
                        })
                    ) : (
                        <p>No videos available.</p>
                    )}
                </div>
            </div>
        );
    } else {
        return <p>No video found.</p>;
    }
}

export default ShowVideo;
