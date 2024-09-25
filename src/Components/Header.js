import { signOut } from "firebase/auth";
import { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import "./Header.css";
/*
props:
noReload
beranda
masuk
*/
export function Header(props) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [toggleNav, setToggleNav] = useState(false);
    const posisi = useMemo(() => {
        if (currentUser) {
            if (currentUser.hasOwnProperty("kelas")) return "siswa";
            else return "guru";
        }
    }, [currentUser]);

    const handlelogout = (e) => {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleReloadPage = (e) => {
        if (props.noReload) {
            return navigate("/");
        }
        window.location.reload(false);
    };

    return (
        <header>
            <div>
                <Link to="/">
                    <img src="/logoDeAkorTeks.png" alt="logo" height="60px" />
                </Link>
                <div
                    className="ditengahkan-baris"
                    style={{ marginRight: "-10px" }}
                >
                    {currentUser ? (
                        <>
                            {props.beranda ? (
                                <>
                                    {posisi === "siswa" && (
                                        <Link
                                            to="/penggunaan"
                                            className="expand-item"
                                        >
                                            Cara Penggunaan
                                        </Link>
                                    )}
                                    <a
                                        className="tekslink tmb-keluar expand-item"
                                        onClick={handlelogout}
                                    >
                                        Keluar
                                    </a>
                                    <label className="expand">
                                        <input
                                            type="checkbox"
                                            onChange={() => {
                                                setToggleNav((prev) => !prev);
                                            }}
                                        />
                                        <i className="large material-icons">
                                            dehaze
                                        </i>
                                    </label>
                                </>
                            ) : (
                                <a
                                    className="tekslink tmb-beranda"
                                    onClick={handleReloadPage}
                                >
                                    Beranda
                                </a>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/tentang">Tentang</Link>
                            {props.masuk ? (
                                <Link to="/daftar" className="tekslink">
                                    Daftar
                                </Link>
                            ) : (
                                <Link to="/masuk" className="tekslink">
                                    Masuk
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
            {props.beranda && (
                <div
                    className={
                        toggleNav ? "expand-item-bar" : "expand-item-bar hide"
                    }
                >
                    {posisi === "siswa" && (
                        <Link to="/penggunaan">Cara Penggunaan</Link>
                    )}
                    <a className="tekslink tmb-keluar" onClick={handlelogout}>
                        Keluar
                    </a>
                </div>
            )}
        </header>
    );
}
