import { Link } from "react-router-dom";
import "./Welcome.css";

export function Welcome() {
    return (
        <>
            <div id="welcome">
                <div className="kiri">
                    <div>
                        <p>Ayo belajar musik bersama kami</p>
                        <div className="pemisah" />
                        <h1>
                            Jadikan musik
                            <br />
                            bagian dari
                            <br />
                            rasamu!
                        </h1>
                        <div className="pemisah" />
                        <div className="pemisah" />
                        <span>
                            <Link to="/masuk" className="tmb-lonjong panjang">
                                Masuk
                            </Link>
                            <Link
                                to="/daftar"
                                className="tmb-lonjong panjang ungu"
                            >
                                Daftar
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="kanan">
                    <img
                        src="/img/hiasan1.png"
                        alt="logoAppChord"
                        height="790px"
                    />
                </div>
                <div className="hiasan-versi-hp">
                    <img src="/img/hiasan1kecil.png" alt="logoAppChord" />
                </div>
            </div>
        </>
    );
}
