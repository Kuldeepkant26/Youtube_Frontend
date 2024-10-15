import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../Css/ShowChannel.css'
import { MyContext } from '../Context/MyProvider';
import VideoCard from './VideoCard';
function ShowChannel() {
    const naviagate = useNavigate()
    const [videos, setVideos] = useState([]);
    const { curruser } = useContext(MyContext);
    const [channel, setChannel] = useState(null);
    const { id } = useParams();
    async function fetchChannel() {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BURL}/channel/find/${id}`)
            setChannel(res.data.channel);
            console.log(res.data.channel)
            setVideos(res.data.channel.videos)
        } catch (error) {
            alert(error.response.data.message)
            naviagate('/');
        }
    }
    useEffect(() => {
        fetchChannel()
    }, [id])


    return (
        <div className='channel-page'>
            {channel ?
                <>
                    <img className='banner' src={channel.bannerUrl} alt='Banner' />
                    <div className="mid">
                        <img src={channel.logoUrl} alt="" />
                        <div className="right">
                            <p>
                                {channel.name}
                                <i className="ri-check-line"></i>
                            </p>
                            <p>
                                {channel.subscribers.length} subscribers . {channel.videos.length} videos
                            </p>
                            {curruser && channel.subscribers.includes(curruser._id) ? <p> Subscribed</p> : <></>}
                        </div>
                    </div>
                    {channel.videos.length ?
                        <>
                            <p className='text-center m-4'>All Videos</p>
                            <div className='channel-videos flex justify-evenly items-center flex-wrap gap-2'>

                                {videos.length > 0 ? (
                                    videos.map((video, index) => {
                                        return <Link to={`/video/${video._id}`}>
                                            <VideoCard video={video} key={video._id}></VideoCard>
                                        </Link>
                                    })
                                ) : (
                                    <p>No videos available.</p>
                                )}
                            </div>
                        </>
                        : <p className='mt-3 text-center'>No videos available</p>}


                </>
                : <div>
                    Channel not Found
                </div>}

        </div>
    )
}

export default ShowChannel
