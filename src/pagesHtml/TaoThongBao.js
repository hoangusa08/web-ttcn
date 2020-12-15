import React, { useState, useEffect } from 'react'
import '../App.css';
import Axios from 'axios'
export default function CreatePost() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [user, setUser] = useState("")
    const [auth, setAuth] = useState("")
    function Main() {
        const [count, setCount] = useState(0)
        useEffect(() => {
            Axios.get("https://web-ttcn.herokuapp.com/auth/admin", {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem("token"))
                }
            }).then((data) => {
                setAuth(data.data)
                setCount(1)
            });
            if (auth === "OK") {
                const temp = localStorage.getItem("user").split('"').join('')
                Axios.put("https://web-ttcn.herokuapp.com/admin", { id: temp }).then((response) => {
                    setUser(response.data[0].Username)
                });
            }
            document.title = "Tạo thông báo";
        }, [count]);
    }
    Main()
    const submitpost = () => {
        Axios.post('https://web-ttcn.herokuapp.com/create', { title: title, text: text })
        window.location.reload()
    };

    if (auth === "OK") {
        return (
            <div>
                <div className="bar">
                    <div className="Link">
                        <a href="/taohannhapdiem"> Khóa/Mở khóa Nhập Điểm</a>
                        <div id='barright'>
                            <div id='real_name'>Quản trị viên: {user}</div>
                            <a href="/trangchu">Đăng Xuất</a>
                        </div>                        
                    </div>
                </div>
                <div className="Loginpage">
                    <div className="Loginform">
                        <input type="text" placeholder="Tiêu đề thông báo" onChange={(e) => { setTitle(e.target.value) }} />
                        <input type="textarea" placeholder="Nội dung thông báo" onChange={(e) => { setText(e.target.value) }} />                        
                        <div id="subbutton">
                            <button onClick={submitpost}> Đăng thông báo </button>
                        </div>                        
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
