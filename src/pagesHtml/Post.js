import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
export default function Post() {

    const [post, setPost] = useState({});
    let { postID } = useParams();
    useEffect(() => {
        Axios.get(`https://web-ttcn.herokuapp.com/getFromID/${postID}`).then((data) => {
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
                        <a href="https://www.facebook.com/thptphamvandong">fanpages</a>
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
            <div className='tail_f'>
                <div className='tail'>
                    <p className='tail_tieude'>
                        <center> CƠ QUAN CHỦ QUẢN </center> <br></br>
                    TRƯỜNG THPT PHẠM VĂN ĐỒNG (PVĐ)
                </p>
                    <p className='tail_noidung'>
                        <b>Địa chỉ:</b> TT. Mộ Đức, Mộ Đức, Quảng Ngãi <br></br>
                        <b>Điện thoại:</b> +84-12-3456789 <br></br>
                        <b>Email:</b> thpttrankimdong@quangngai.edu.vn<br></br>
                        <b>Website:</b> thptphamvandong.edu.vn
                </p>
                </div>
                <div className='mother_of_tail'>
                    © 2020 - Trường THPT Phạm Văn Đồng - Quảng Ngãi
            </div>
            </div>
        </div>
    );
}
