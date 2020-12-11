import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
export default function Post() {

    const [post, setPost] = useState({});
    let { postID } = useParams();
    useEffect(() => {
        Axios.get(`https://mysql-server-heroku.herokuapp.com/getFromID/${postID}`).then((data) => {
            setPost({ title: data.data[0].tieude, text: data.data[0].noidung })
        });
    });
    return (
        <div>
            <div className="bar">
                <div className="Link">
                    <h2>TRƯỜNG THPT PHẠM VĂN ĐỒNG</h2>                    
                    <div id='barright'>
                        <a href="/trangchu">Trang Chủ</a>
                        <a href="#">Tin giáo dục</a>
                        <a href="#">Tuyển sinh</a>
                        <a href="#">Liên hệ</a>
                        <a href="/login">Đăng Nhập</a>
                    </div>
                </div>
            </div>
            <div className="Container">
                <div className="post_in_post">
                    <p className='post_tieude'>{post.title}</p>
                    <p className='post_noidung'>{post.text}</p>
                </div>
            </div>
            
        </div>
    );
}