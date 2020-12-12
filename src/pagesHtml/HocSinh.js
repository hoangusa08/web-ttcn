import React, { useState, useEffect } from 'react'
import '../App.css';
import Axios from 'axios'
export default function XemDiem() {
    const [user, setUser] = useState("")
    const [auth, setAuth] = useState("")
    const [mh, setMH] = useState([]);
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
                Axios.put("https://web-ttcn.herokuapp.com/HS", { id: temp }).then((response) => {
                    setUser(response.data[0].Hoten)
                });
                Axios.get(`https://web-ttcn.herokuapp.com/MonFromMa/${temp}`).then((response1) => {
                    setMH(response1.data)
                });
            }
        }, [count]);
    }
    Main()
    if (auth === "OK") {
        return (
            <div>
                <div className="bar">
                <div className="Link">
                    <h2>TRƯỜNG THPT PHẠM VĂN ĐỒNG</h2>                    
                    <div id='barright'>
                        <a href="/phanhoi">Phản Hồi</a>
                        <div id='real_name'>{user}</div>
                        <a href="/trangchu">Đăng Xuất</a>
                    </div>
                </div>
            </div>
                <div>
                    <div>
                        <center>
                            <table>
                                <tr>
                                    <th>Tên môn học</th>
                                    <th>Điểm giữa kỳ</th>
                                    <th>Điểm cuối kỳ</th>
                                </tr>
                                {mh.map((val1) => {
                                    return (
                                        <tr key={val1.MaMH}>
                                            <td>{val1.TenMH}</td>
                                            <td>{val1.DiemGK}</td>
                                            <td>{val1.DiemCK}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </center>
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
