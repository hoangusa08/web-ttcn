import React, { useState, useEffect } from 'react'
import '../App.css';
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
export default function GiaoVien() {
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [auth, setAuth] = useState("")
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
                });

                Axios.put("https://web-ttcn.herokuapp.com/tkbGV", { id: temp }).then((response) => {
                    setUser(response.data[0])
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
                        <a href="/xemphanhoi">Xem phản hồi</a>
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

                <div className="see">
                    <center>
                        <table border="1">
                            <tr>
                                <th></th>
                                <th> Tiết 1</th>
                                <th> Tiết 2</th>
                                <th> Tiết 3</th>
                                <th> Tiết 4</th>
                                <th> Tiết 5</th>

                            </tr>

                            <tr>
                                <td> Thứ hai</td>
                                <td>{user.Thu2Tiet1}</td>
                                <td>{user.Thu2Tiet2}</td>
                                <td>{user.Thu2Tiet3}</td>
                                <td>{user.Thu2Tiet4}</td>
                                <td>{user.Thu2Tiet5}</td>
                            </tr>
                            <tr>
                                <td> Thứ ba</td>
                                <td>{user.Thu3Tiet1}</td>
                                <td>{user.Thu3Tiet2}</td>
                                <td>{user.Thu3Tiet3}</td>
                                <td>{user.Thu3Tiet4}</td>
                                <td>{user.Thu3Tiet5}</td>
                            </tr>

                            <tr>
                                <td> Thứ tư</td>
                                <td>{user.Thu4Tiet1}</td>
                                <td>{user.Thu4Tiet2}</td>
                                <td>{user.Thu4Tiet3}</td>
                                <td>{user.Thu4Tiet4}</td>
                                <td>{user.Thu4Tiet5}</td>
                            </tr>

                            <tr>
                                <td> Thứ năm</td>
                                <td>{user.Thu5Tiet1}</td>
                                <td>{user.Thu5Tiet2}</td>
                                <td>{user.Thu5Tiet3}</td>
                                <td>{user.Thu5Tiet4}</td>
                                <td>{user.Thu5Tiet5}</td>
                            </tr>

                            <tr>
                                <td> Thứ sáu</td>
                                <td>{user.Thu6Tiet1}</td>
                                <td>{user.Thu6Tiet2}</td>
                                <td>{user.Thu6Tiet3}</td>
                                <td>{user.Thu6Tiet4}</td>
                                <td>{user.Thu6Tiet5}</td>
                            </tr>

                            <tr>
                                <td> Thứ bảy</td>
                                <td>{user.Thu7Tiet1}</td>
                                <td>{user.Thu7Tiet2}</td>
                                <td>{user.Thu7Tiet3}</td>
                                <td>{user.Thu7Tiet4}</td>
                                <td>{user.Thu7Tiet5}</td>
                            </tr>
                        </table>
                    </center>
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