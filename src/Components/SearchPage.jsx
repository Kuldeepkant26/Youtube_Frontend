import React, { useContext, useEffect, useState } from 'react'
import '../Css/SearchPage.css'
import { MyContext } from '../Context/MyProvider'
import VideoCard from './VideoCard';
import { useNavigate } from 'react-router-dom';
function SearchPage() {
    const navigate = useNavigate()
    const { videos, filter, setFilter } = useContext(MyContext)
    const [prompt, setPrompt] = useState('');
    function handelSearch() {
        setFilter(prompt)
    }
    useEffect(() => {
        setFilter('+*%!@')
    }, [])

    return (
        <div className='Search-page'>
            <div className="top">
                <i class="ri-arrow-left-s-line" onClick={() => { navigate(-1), setFilter('') }}></i>
                <input type="text" placeholder='Search' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <i class="ri-search-line" onClick={handelSearch}></i>
            </div>
            <div className="btm">
                {videos.length > 0 ? (
                    videos
                        .filter((video) =>
                            video.title.toLowerCase().includes(filter.toLowerCase()) ||
                            video.description.toLowerCase().includes(filter.toLowerCase()) ||
                            video.channelId.name.toLowerCase().includes(filter.toLowerCase()) ||
                            video.category.toLowerCase().includes(filter.toLowerCase())
                        )
                        .map((video, index) => {
                            return <VideoCard key={video._id} video={video}></VideoCard>
                        })
                ) : (
                    <p>No videos available.</p>
                )}
            </div>

        </div>
    )
}

export default SearchPage
