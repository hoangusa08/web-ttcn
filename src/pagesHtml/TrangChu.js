import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../App.css';
export default function MainPage() {

    const [postList, setList] = useState([]);
    let history = useHistory();
    useEffect(() => {
        localStorage.clear();
        Axios.get("https://mysql-server-heroku.herokuapp.com/get").then((data) => {
            console.log(data.data)
            setList(data.data)
        });
    }, []);
    return (
        <div>
            <div className="bar">
                <div className="Link">
                    <h2>TRƯỜNG THPT PHẠM VĂN ĐỒNG</h2>                    
                    <div id='barright'>
                        <a href="https://trankyphong.edu.vn/tin-giao-duc/">Tin giáo dục</a>
                        <a href="https://trankyphong.edu.vn/tuyen-sinh/">Tuyển sinh</a>
                        <a href="https://trankyphong.edu.vn/">Liên hệ</a>
                        <a href="/login">Đăng Nhập</a>
                    </div>
                </div>
            </div>
            <div className="TrangChu">
                <div className="Container">
                    {postList.map((val, key) => {
                        return (
                            <div className="post" key={key} onClick={() => { history.push(`/post/${val.id}`) }}>
                                <p className='post_tieude'>{val.tieude}</p>
                                <p className='post_noidung'>{val.noidung.length > 400 ? val.noidung.substring(0, 400) : val.noidung}</p>
                                <p className='post_comment'>Click để xem chi tiết</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}