import React, { useContext, useState } from 'react'
import { MyContext } from '../Context/MyProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
function Comment({ comment, id }) {
    const { curruser, video, fetchVideo } = useContext(MyContext);
    const [showmenu, setShowmenu] = useState(false);
    async function DeleteComment() {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BURL}/videos/comment/delete/${video._id}/${comment._id}`);
            console.log(res)
            toast.success(res.data.message);
            fetchVideo(id);
        } catch (error) {
            toast.error('Error in deleting comment')
        }
    }


    return (
        <div className='flex w-full  gap-1 justify-between items-center cmnt'>
            <div className='flex gap-1 left-comment' >
                {comment.user && comment.user.channel ?
                    <img className='your-profile' src={comment.user.channel.logoUrl}></img> :
                    <div className="profile text-2xl h-12 w-12 rounded-full text-white bg-slate-500 flex items-center justify-center">
                        {comment.user.name[0]}
                    </div>
                }

                <div>
                    <p className='text-lg font-semibold'>{comment.user.name}</p>
                    <p>{comment.text}</p>
                </div>
            </div>
            <div className='right-comment flex items-center'>
                <div className="commnent-menu flex-col " style={{ display: showmenu ? 'flex' : 'none' }}>
                    {curruser && curruser._id == comment.user._id ?
                        <>
                            <span className='options'>Edit</span>
                            <span onClick={DeleteComment} className='options'>Delete</span>
                        </> :
                        <>
                            <span>
                                <i class="ri-flag-line"></i> Report
                            </span>
                        </>
                    }

                </div>
                <i className="ri-more-2-line cursor-pointer" onClick={() => setShowmenu(!showmenu)}></i>
            </div>
        </div>
    )
}

export default Comment
