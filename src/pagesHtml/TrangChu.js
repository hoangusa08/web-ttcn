import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../App.css';
export default function MainPage() {

    const [postList, setList] = useState([]);
    let history = useHistory();
    useEffect(() => {
        localStorage.clear();
        Axios.get("https://web-ttcn.herokuapp.com/get").then((data) => {
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
                        <a href="https://www.facebook.com/thptphamvandong">fanpages</a>
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
            <div className='tail'>
                <p className='tail_tieude'>
                    <center> CƠ QUAN CHỦ QUẢN </center> <br></br>
                    TRƯỜNG THPT PHẠM VĂN ĐỒNG (PVĐ)
                </p>                
                <p className='tail_noidung'>
                    <b>Địa chỉ:</b> TT. Mộ Đức, Mộ Đức, Quảng Ngãi <br></br>
                    <b>Điện thoại:</b> +84-12-3456789 <br></br>
                    <b>Email:</b> thpttrankimdong@quangngai.edu.vn<br></br>
                    <b>Website:</b> thpttrankimdong.edu.vn
                </p>                
            </div>
            <div className='mother_of_tail'>
                    © 2020 - Trường THPT Phạm Văn Đồng - Quảng Ngãi
            </div>
        </div>
    )
}
