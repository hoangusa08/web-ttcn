import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
export default function Post() {

    const [name, setName] = useState("")
    const [auth, setAuth] = useState("")
    const [feedback, setFeedback] = useState([])
    const [classList, setClass] = useState([]);
    let history = useHistory();
    function Main() {
        const [count, setCount] = useState(0)
        useEffect(() => {
            Axios.get("https://web-ttcn.herokuapp.com/auth/GV", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("token"))
                }
            }).then((data) => {
                setAuth(data.data)
                setCount(1)
            });
            if (auth === "OK") {
                const temp = localStorage.getItem("user").split('"').join('')
                Axios.put("https://web-ttcn.herokuapp.com/GV", { id: temp }).then((response) => {
                    setName(response.data[0].Hoten)
                    Axios.put("https://web-ttcn.herokuapp.com/getFeedback", { MaGV: temp, MaMH: response.data[0].MaMH }).then((response2) => {
                        setFeedback(response2.data)
                    })
                });
                Axios.put("https://web-ttcn.herokuapp.com/getLop", { MaGV: temp }).then((response1) => {
                    setClass(response1.data)
                })
            }
        }, [count]);
    }
    Main()
    if (auth === "OK") {
        return (
            <div>
                <div className="bar">
                    <div id='barright'>
                        <a href="/thoikhoabieu">Thời Khóa Biểu</a>
                        <div id='real_name'>Giáo viên: {name}</div>
                        <a href="/trangchu">Đăng Xuất</a>
                    </div>

                    <div className='clear'></div>

                    <div id='nhapdiem'>
                        <p className='nhapdiem_tieude'>Nhập điểm cho lớp: </p>
                        {classList.map((val, key) => {
                            return (
                                <div className="nhapdiem_mon" key={key} onClick={() => { history.push(`/nhapdiem/${val.MaLH}`) }}>
                                    {val.TenLop}
                                </div>
                            )
                        })}
                    </div>                      
                </div>
                <div>
                    <div className="Container">
                        {feedback.map((val, key) => {
                            return (
                                <div className="post_in_post" key={key}>
                                    <p className='post_noidung'>Mã Học Sinh: <b>{val.MaHS}</b></p>
                                    <p className='post_noidung'>Tên Học Sinh: <b>{val.Hoten}</b></p>
                                    <p className='post_noidung'>Lớp: <b>{val.TenLop}</b></p>
                                    <p className='post_noidung'>Nội dung phản hồi: {val.noidung}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}
