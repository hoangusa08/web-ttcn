import React, { useState, useEffect } from 'react'
import '../App.css';
import Axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
export default function NhapDiem() {

    const [name, setName] = useState("")
    const [mark, setMark] = useState("")
    const [auth, setAuth] = useState("")
    const [gk, setGK] = useState(0)
    const [ck, setCK] = useState(0)
    const [hs, setHs] = useState([]);
    let { lopID } = useParams();
    let history = useHistory();
    const [diemGK, setDiemGK] = useState([])
    const [diemCK, setDiemCK] = useState([])
    const [vitriGK, setVitriGK] = useState([])
    const [vitriCK, setVitriCK] = useState([])
    const [classList, setClass] = useState([]);
    const updateFieldChanged1 = (index, ma) => (event) => {
        var n = parseFloat(event.target.value);
        if (n < 0 || n > 10) {
            alert('Nhập sai điểm');
            event.target.value = "";
        }
        else {
            let newArr = [...diemGK];
            newArr[index] = event.target.value;
            setDiemGK(newArr);
            let newA = [...vitriGK];
            newA[index] = ma;
            setVitriGK(newA)
        }
    }
    const updateFieldChanged2 = (index, ma) => (event) => {
        var n = parseFloat(event.target.value);
        if (n < 0 || n > 10) {
            alert('Nhập sai điểm');
            event.target.value = "";
        }
        else {
            let newArr = [...diemCK];
            newArr[index] = event.target.value;
            setDiemCK(newArr);
            let newA = [...vitriCK];
            newA[index] = ma;
            setVitriCK(newA)
        }
    }

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
                Axios.put("https://web-ttcn.herokuapp.com/getLop", { MaGV: temp }).then((response2) => {
                    setClass(response2.data)
                });
            }
            Axios.get(`https://web-ttcn.herokuapp.com/LopFromMa/${lopID}`).then((response1) => {
                setHs(response1.data)
            });
            Axios.get("https://web-ttcn.herokuapp.com/layhan").then((response) => {
                setGK(response.data[0].gk)
                setCK(response.data[0].ck)
            });
            Axios.post('https://web-ttcn.herokuapp.com/luudiemGK', { diemHS: diemGK, vitri: vitriGK, malop: lopID, id: localStorage.getItem("user").split('"').join('') }).then((response) => {
                setMark(response.data)
            });
            
            Axios.post('https://web-ttcn.herokuapp.com/luudiemCK', { diemHS: diemCK, vitri: vitriCK, malop: lopID, id: localStorage.getItem("user").split('"').join('') }).then((response) => {
                setMark(response.data)
            });
            document.title = "Nhập Điểm";

        }, [count]);
    }
    const enterMarkGK = () => {
        Axios.post('https://web-ttcn.herokuapp.com/luudiemGK', { diemHS: diemGK, vitri: vitriGK, malop: lopID, id: localStorage.getItem("user").split('"').join('') }).then((response) => {
            setMark(response.data)
        });
    }
    function OutGK(index) {
        for (let i = 0; i < mark.length; i++) {
            if (i === index) {
                return mark[i].DiemGK;
            }
        }
    }
    const enterMarkCK = () => {
        Axios.post('https://web-ttcn.herokuapp.com/luudiemCK', { diemHS: diemCK, vitri: vitriCK, malop: lopID, id: localStorage.getItem("user").split('"').join('') }).then((response) => {
            setMark(response.data)
        });
    }
    function OutCK(index) {
        for (let i = 0; i < mark.length; i++) {
            if (i === index) {
                return mark[i].DiemCK;
            }
        }
    }
    Main()
    if (auth === "OK" & gk === 0 & ck === 0) {
        return (
            <div>
                <div className="bar">
                    <div id='barright'>
                        <a href="/thoikhoabieu">Thời Khóa Biểu</a>
                        <a href="/xemphanhoi">Xem phản hồi</a>
                        <div id='real_name'>Giáo viên: {name}</div>
                        <a href="/trangchu">Đăng Xuất</a>
                    </div>

                    <div className='clear'></div>
                    <div id='nhapdiem'>
                        <p className='nhapdiem_tieude'>Nhập điểm cho lớp: </p>
                        {classList.map((val, key) => {
                            return (
                                <div className="nhapdiem_mon" key={key} onClick={() => { window.location.reload(history.push(`/nhapdiem/${val.MaLH}`)) }}>
                                    {val.TenLop}
                                </div>
                            )
                        })}
                    </div>                      
                </div>

                <div>
                    <div>
                        <center>
                            <table border="1">
                                <tr>
                                    <th>Mã học sinh</th>
                                    <th>Họ và tên</th>
                                    <th>Điểm giữa kỳ</th>
                                    <th>Nhập điểm giữa kỳ</th>
                                    <th>Điểm cuối kỳ</th>
                                    <th>Nhập điểm cuối kỳ</th>
                                </tr>

                                {hs.map((val1, index) => {
                                    return (
                                        <tr key={val1.MaHS}>
                                            <td>{val1.MaHS}</td>
                                            <td>{val1.Hoten}</td>
                                            <td> {OutGK(index)} </td>
                                            <td> <input type="number" min="0" max="10" name="nhapdiemgk" onChange={updateFieldChanged1(index, val1.MaHS)}></input></td>
                                            <td>{OutCK(index)}</td>
                                            <td> <input type="number" min="0" max="10" name="nhapdiemck" onChange={updateFieldChanged2(index, val1.MaHS)}></input></td>
                                        </tr>
                                    )
                                })}
                                
                            </table>
                            <div id='subbutton'>
                                <div style={{ display: "inline-block" }}> <button onClick={enterMarkGK}> Lưu điểm giữa kì </button></div>
                                <div style={{ display: "inline-block" }}> <button onClick={enterMarkCK}> Lưu điểm cuối kì </button></div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
    if (auth === "OK" & gk === 1 & ck === 0) {
        return (
            <div>
                <div className="bar">
                    <div id='barright'>
                        <a href="/thoikhoabieu">Thời Khóa Biểu</a>
                        <a href="/xemphanhoi">Xem phản hồi</a>
                        <div id='real_name'>Giáo viên: {name}</div>
                        <a href="/trangchu">Đăng Xuất</a>
                    </div>

                    <div className='clear'></div>

                    <div id='nhapdiem'>
                        <p className='nhapdiem_tieude'>Nhập điểm cho lớp: </p>
                        {classList.map((val, key) => {
                            return (
                                <div className="nhapdiem_mon" key={key} onClick={() => { window.location.reload(history.push(`/nhapdiem/${val.MaLH}`)) }}>
                                    {val.TenLop}
                                </div>
                            )
                        })}
                    </div>                      
                </div>

                <div>
                    <div>
                        <center>
                            <table border="1">
                                <tr>
                                    <th>Mã học sinh</th>
                                    <th>Họ và tên</th>
                                    <th>Điểm giữa kỳ</th>
                                    <th>Điểm cuối kỳ</th>
                                    <th>Nhập điểm cuối kỳ</th>
                                </tr>

                                {hs.map((val1, index) => {
                                    return (
                                        <tr key={val1.MaHS}>
                                            <td>{val1.MaHS}</td>
                                            <td>{val1.Hoten}</td>
                                            <td> {OutGK(index)} </td>
                                            <td>{OutCK(index)}</td>
                                            <td> <input type="number" min="0" max="10" name="nhapdiemck" onChange={updateFieldChanged2(index, val1.MaHS)}></input></td>
                                        </tr>
                                    )
                                })}
                                
                                
                            </table>
                            <div id='subbutton'>
                                <div style={{ display: "inline-block" }}> <button onClick={enterMarkCK}> Lưu điểm cuối kì </button></div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
    if (auth === "OK" & gk === 0 & ck === 1) {
        return (
            <div>
                <div className="bar">
                    <div id='barright'>
                        <a href="/thoikhoabieu">Thời Khóa Biểu</a>
                        <a href="/xemphanhoi">Xem phản hồi</a>
                        <div id='real_name'>Giáo viên: {name}</div>
                        <a href="/trangchu">Đăng Xuất</a>
                    </div>

                    <div className='clear'></div>

                    <div id='nhapdiem'>
                        <p className='nhapdiem_tieude'>Nhập điểm cho lớp: </p>
                        {classList.map((val, key) => {
                            return (
                                <div className="nhapdiem_mon" key={key} onClick={() => { window.location.reload(history.push(`/nhapdiem/${val.MaLH}`)) }}>
                                    {val.TenLop}
                                </div>
                            )
                        })}
                    </div>                      
                </div>

                <div>
                    <div>
                        <center>
                            <table border="1">
                                <tr>
                                    <th>Mã học sinh</th>
                                    <th>Họ và tên</th>
                                    <th>Điểm giữa kỳ</th>
                                    <th>Nhập điểm giữa kỳ</th>
                                    <th>Điểm cuối kỳ</th>
                                </tr>

                                {hs.map((val1, index) => {
                                    return (
                                        <tr key={val1.MaHS}>
                                            <td>{val1.MaHS}</td>
                                            <td>{val1.Hoten}</td>
                                            <td> {OutGK(index)} </td>
                                            <td> <input type="number" min="0" max="10" name="nhapdiemgk" onChange={updateFieldChanged1(index, val1.MaHS)}></input></td>
                                            <td>{OutCK(index)}</td>
                                        </tr>
                                    )
                                })}
                                
                            </table>
                            <div id='subbutton'>
                                <div style={{ display: "inline-block" }}> <button onClick={enterMarkGK}> Lưu điểm giữa kì </button></div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
    if (auth === "OK" & gk === 1 & ck === 1) {
        return (
            <div>
                <div className="bar">
                    <div id='barright'>
                        <a href="/thoikhoabieu">Thời Khóa Biểu</a>
                        <a href="/xemphanhoi">Xem phản hồi</a>
                        <div id='real_name'>Giáo viên: {name}</div>
                        <a href="/trangchu">Đăng Xuất</a>
                    </div>

                    <div className='clear'></div>

                    <div id='nhapdiem'>
                        <p className='nhapdiem_tieude'>Nhập điểm cho lớp: </p>
                        {classList.map((val, key) => {
                            return (
                                <div className="nhapdiem_mon" key={key} onClick={() => { window.location.reload(history.push(`/nhapdiem/${val.MaLH}`)) }}>
                                    {val.TenLop}
                                </div>
                            )
                        })}
                    </div>                      
                </div>

                <div>
                    <div>
                        <center>
                            <table border="1">
                                <tr>
                                    <th>Mã học sinh</th>
                                    <th>Họ và tên</th>
                                    <th>Điểm giữa kỳ</th>
                                    <th>Điểm cuối kỳ</th>
                                </tr>

                                {hs.map((val1, index) => {
                                    return (
                                        <tr key={val1.MaHS}>
                                            <td>{val1.MaHS}</td>
                                            <td>{val1.Hoten}</td>
                                            <td> {OutGK(index)} </td>
                                            <td>{OutCK(index)}</td>
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
