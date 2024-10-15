import React from 'react'
import '../Css/VideoCard2.css'
import { Link } from 'react-router-dom'
function VideoCard({ video }) {
    return (
        <Link to={`/video/${video._id}`} className='suggested-video-card'>
            <img className="suggested-video-thumb w-7" src={video.thumbnailUrl ? video.thumbnailUrl : "https://img.freepik.com/premium-vector/youtube-thumbnail-background-design-with-text-editable_672856-143.jpg"} alt='' />
            <div className="suggested-video-bottomt">
                <img className='suggested-video-clogo' src={video.channelId.logoUrl} alt="" />
                <div>
                    <h1 className='suggested-video-description'>{video.title.slice(0, 35)}...</h1>
                    <p>{video.channelId.name}</p> {/* Adjust based on the structure of channelId */}
                    <p>{video.views} views</p>
                </div>

            </div>
        </Link>
    )
}

export default VideoCard
