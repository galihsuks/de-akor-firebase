import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { fetchDaftar } from "../global/Fetch";
import "./Auth.css";

export function Masuk() {
    const [eror, setEror] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teksErr, setTeksErr] = useState();

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/beranda");
            })
            .catch((error) => {
                switch (error.message) {
                    case "Firebase: Error (auth/user-not-found).":
                        setTeksErr("Email tidak ditemukan");
                        break;
                    case "Firebase: Error (auth/wrong-password).":
                        setTeksErr("Sandi salah");
                        break;
                    default:
                        setTeksErr("Terjadi kesalahan");
                        break;
                }
                setEror(true);
            });
    };

    return (
        <>
            <div id="masuk" className="ditengahkan-kolom">
                <h1>Masuk</h1>
                <div className="pemisah" />
                <div className="pemisah" />
                <form onSubmit={handleLogin}>
                    <div className="inputauth">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputauth">
                        <input
                            type="password"
                            name="sandi"
                            id="sandi"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="sandi">Sandi</label>
                    </div>
                    {eror && <p className="eror">{teksErr}</p>}
                    <div className="pemisah" />
                    <div className="pemisah" />
                    <div className="ditengahkan-kolom">
                        <button type="submit" className="tmb-lonjong panjang">
                            Masuk
                        </button>
                    </div>
                </form>
                <div className="pemisah" />
                <p>
                    Belum punya akun?{" "}
                    <Link to="/daftar" className="tekslink">
                        {" "}
                        Daftar disini
                    </Link>
                </p>
            </div>
        </>
    );
}

export function Daftar() {
    const [namaLengkap, setNamaLengkap] = useState("");
    const [kelas, setKelas] = useState("");
    const [absen, setAbsen] = useState("");
    const [email, setEmail] = useState("");
    const [sandi, setSandi] = useState("");
    const [idPengajar, setIdPengajar] = useState("");
    const [eror, setEror] = useState(false);
    const [teksErr, setTeksErr] = useState();

    const handleDaftar = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, sandi)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                fetchDaftar(user.uid, namaLengkap, kelas, absen, idPengajar);
            })
            .catch((error) => {
                switch (error.message) {
                    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                        setTeksErr("Sandi paling sedikit 6 karakter");
                        break;
                    case "Firebase: Error (auth/email-already-in-use).":
                        setTeksErr("Email sudah digunakan");
                        break;
                    default:
                        setTeksErr("Terjadi kesalahan");
                        break;
                }
                setEror(true);
                console.log(error.message);
            });
    };

    return (
        <>
            <div id="daftar" className="ditengahkan-kolom">
                <h1>Daftar</h1>
                <div className="pemisah" />
                <form onSubmit={handleDaftar}>
                    <div className="inputauth">
                        <input
                            type="text"
                            name="namaLengkap"
                            id="namaLengkap"
                            required
                            onChange={(e) => setNamaLengkap(e.target.value)}
                        />
                        <label htmlFor="namaLengkap">Nama Lengkap</label>
                    </div>
                    <div className="inputauth">
                        <input
                            type="text"
                            name="kelas"
                            id="kelas"
                            required
                            onChange={(e) => setKelas(e.target.value)}
                        />
                        <label htmlFor="kelas">Kelas</label>
                    </div>
                    <div className="inputauth">
                        <input
                            type="number"
                            name="absen"
                            id="absen"
                            required
                            onChange={(e) => setAbsen(e.target.value)}
                        />
                        <label htmlFor="absen">Nomor Absen</label>
                    </div>
                    <div className="inputauth">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputauth">
                        <input
                            type="text"
                            name="sandi"
                            id="sandi"
                            required
                            onChange={(e) => setSandi(e.target.value)}
                        />
                        <label htmlFor="sandi">Sandi</label>
                    </div>
                    <div className="inputauth">
                        <input
                            type="text"
                            name="idPengajar"
                            id="idPengajar"
                            required
                            maxLength="6"
                            onChange={(e) => setIdPengajar(e.target.value)}
                        />
                        <label htmlFor="idPengajar">ID Pengajar</label>
                    </div>
                    {eror && <p className="eror">{teksErr}</p>}
                    <div className="pemisah" />
                    <div className="pemisah" />
                    <div className="ditengahkan-kolom">
                        <button type="submit" className="tmb-lonjong panjang">
                            Daftar
                        </button>
                    </div>
                </form>
                <div className="pemisah" />
                <p>
                    Sudah punya akun?{" "}
                    <Link to="/masuk" className="tekslink">
                        Masuk disini
                    </Link>
                </p>
            </div>
        </>
    );
}
