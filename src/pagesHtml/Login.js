import React, { useState } from 'react'
import '../App.css';
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
export default function Login() {

    const [username, setName] = useState("");
    const [userpass, setPass] = useState("");
    const [status, setStatus] = useState("");
    localStorage.clear();
    let history = useHistory();
    const login = () => {
        if (username.substring(0, 2) === "AD") {
            Axios.post('https://web-ttcn.herokuapp.com/login/admin', { username: username, userpass: userpass }).then((response) => {
                if (!response.data.auth) {
                    setStatus(response.data.message)
                }
                else {
                    localStorage.setItem("token", JSON.stringify(response.data.token))
                    localStorage.setItem("user", JSON.stringify(response.data.result[0].MaAdmin));
                    history.push("/taothongbao")
                }
            })
        }
        else if (username.substring(0, 2) === "GV") {
            Axios.post('https://web-ttcn.herokuapp.com/login/GV', { username: username, userpass: userpass }).then((response) => {

                if (!response.data.auth) {
                    setStatus(response.data.message)
                }
                else {
                    localStorage.setItem("token", JSON.stringify(response.data.token))
                    localStorage.setItem("user", JSON.stringify(response.data.result[0].MaGV));
                    history.push("/thoikhoabieu")
                }
            })
        }
        else if (username.substring(0, 2) === "HS") {
            Axios.post('https://web-ttcn.herokuapp.com/login/HS', { username: username, userpass: userpass }).then((response) => {

                if (!response.data.auth) {
                    setStatus(response.data.message)
                }
                else {
                    localStorage.setItem("token", JSON.stringify(response.data.token))
                    localStorage.setItem("user", JSON.stringify(response.data.result[0].MaHS));
                    history.push("/xemdiem")
                }
            })
        }
        else {
            setStatus("Bạn cần nhập Username")
        }
        document.title = "Login";
    }
    return (
        <div>
           <div className="bar">
                <div className="Link">
                    <h2>TRƯỜNG THPT PHẠM VĂN ĐỒNG</h2>                    
                    <div id='barright'>
                        <a href="/trangchu">Trang Chủ</a>
                        <a href="https://www.facebook.com/thptphamvandong">fanpages</a>
                    </div>
                </div>
            </div>
            <div className="Loginpage"> 
                <div className="Loginform">
                    <input id='Loginform_username' type="text" placeholder="Tên đăng nhập" onChange={(e) => {
                        setName(e.target.value)
                    }} />
                    <input type="password" placeholder="Mật khẩu" onChange={(e) => {
                        setPass(e.target.value)
                    }} />
                    <div id="subbutton">
                        <button onClick={login}> Đăng nhập </button>
                    </div>                    
                </div>
                <div id='Login_status'> {status}</div>
            </div>
        </div>
    )
}
