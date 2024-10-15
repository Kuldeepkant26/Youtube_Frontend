import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/Home.css';
import VideoCard from './VideoCard';
import { MyContext } from '../Context/MyProvider';

function Home() {
    const { videos, filter, setFilter } = useContext(MyContext)

    return (
        <div className="home">
            <div className="home-top">
                <div className="filter" onClick={() => { setFilter('') }}>All</div>
                <div className="filter">News</div>
                <div className="filter">Gaming</div>
                <div className="filter">Javascript</div>
                <div className="filter">Job</div>
                <div className="filter">Live</div>
                <div className="filter">Music</div>
                <div className="filter">Education</div>
                <div className="filter">Software</div>
                <div className="filter">Development</div>
                <div className="filter">World Affairs</div>
                <div className="filter">Comedy</div>
                <div className="filter">Stocks</div>
                <div className="filter">Watched</div>
                <div className="filter">Java</div>

            </div>

            <div className="home-side">
                <div className='side-btn'>
                    <i className="ri-home-5-fill"></i>
                    <p>Home</p>
                </div>

                <div className='side-btn'>
                    <img src="https://i.pinimg.com/originals/17/d2/18/17d21878c22fe49e7e4752eecaa36541.png" alt="icon" />
                    <p>Shorts</p>
                </div>

                <div className='side-btn'>
                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-subscription-logo-icon-download-in-svg-png-gif-file-formats--youtube-menu-subs-social-media-pack-logos-icons-3789620.png?f=webp&w=512" alt="Subscriptions" />
                    <p>Subscriptions</p>
                </div>

                <div className='side-btn'>
                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-youtube-music-logo-icon-download-in-svg-png-gif-file-formats--social-media-app-pack-logos-icons-3222736.png?f=webp&w=512" alt="Music" />
                    <p>Music</p>
                </div>

                <div className='side-btn'>
                    <i className="ri-download-line"></i>
                    <p>Downloads</p>
                </div>
            </div>

            <div className="home-bottom">
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
    );
}

export default Home;
