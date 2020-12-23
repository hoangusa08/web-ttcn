import React, { useState, useEffect } from 'react'
import '../App.css';
import Axios from 'axios'
export default function PhanHoi() {
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    const [maHS, setMaHS] = useState("");
    const [user, setUser] = useState("")
    const [auth, setAuth] = useState("")
    function Main() {
        const [count, setCount] = useState(0)
        useEffect(() => {
            Axios.get("https://web-ttcn.herokuapp.com/auth/HS", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("token"))
                }
            }).then((data) => {
                setAuth(data.data)
                setCount(1)
            });
            if (auth === "OK") {
                const temp = localStorage.getItem("user").split('"').join('')
                setMaHS(temp)
                Axios.put("https://web-ttcn.herokuapp.com/HS", { id: temp }).then((response) => {
                    setUser(response.data[0].Hoten)
                });
            }
        }, [count]);
    }
    Main()
    const submitfeedback = () => {
        Axios.post('https://web-ttcn.herokuapp.com/createFeedback', { subject: subject, text: text, maHS: maHS })
        window.location.reload()
    };

    if (auth === "OK") {
        return (
            <div>
                <div className="bar">
                <div className="Link">
                    <h2>TRƯỜNG THPT PHẠM VĂN ĐỒNG</h2>                    
                    <div id='barright'>
                        <a href="/xemdiem">Xem điểm</a>
                        <div id='real_name'>{user}</div>
                        <a href="/trangchu">Đăng Xuất</a>
                    </div>
                </div>
            </div>
                <div className="Loginpage">
                    <div className="Loginform">                        
                        <input type="text" placeholder="Mã môn học" onChange={(e) => { setSubject(e.target.value) }} />
                        <input type="textarea" placeholder="Ý kiến phản hồi" onChange={(e) => { setText(e.target.value) }} />
                        <div id="subbutton">
                            <button onClick={submitfeedback}> Phản hồi </button>
                        </div>                        
                    </div>
                    <br></br>
                    <div className='post_comment'>
                        <p className='post_tieude'>Nhập mã môn tương ứng:</p>
                        <p className='post_noidung'>Toán:MH01; Lý:MH02; Hóa:MH03; Sinh:MH04; Sử:MH05; Địa:MH06; Anh:MH07; Văn:MH08; GDCD:MH09; Công nghệ:MH10; Thể dục:MH11</p>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}
