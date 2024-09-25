import { useState } from "react";
import "./CaraPenggunaan.css";
/* props.cara = true(dengar), false(pilihan) */
export default function CaraPenggunaan(props) {
    const [toggle, setToggle] = useState(true);
    return (
        <>
            {toggle && (
                <div className="cara-main">
                    <div className="ditengahkan-kolom">
                        <h1>Cara Penggunaan</h1>
                        {props.cara ? (
                            <>
                                <div>
                                    <p>
                                        1. Tekan tombol{" "}
                                        <img
                                            src="img/audioicon.png"
                                            height="20px"
                                            alt="audioicon"
                                            className="icon-inline"
                                        />{" "}
                                        untuk mendengarkan suara note / akor
                                    </p>
                                    <p>
                                        2. Tekan tombol
                                        <button className="tmb-kotak merah icon-inline">
                                            <div className="rekam-teks no-absolute">
                                                <p>Dengar</p>
                                            </div>
                                            <div
                                                className="rekam-bar"
                                                style={{ width: 0 }}
                                            ></div>
                                        </button>
                                        untuk menyalakan microphone
                                    </p>
                                    <p>
                                        3. Jika Ikon "Dengar" sudah berwarna
                                        hijau berarti mic sudah menyala
                                    </p>
                                    <p>
                                        4. Bersuaralah sesuai nada yang
                                        diinginkan oleh soal
                                    </p>
                                    <p>
                                        5. Teks pada Ikon "Dengar" berubah
                                        menjadi note yang terbaca berdasarkan
                                        nada suaramu
                                    </p>
                                    <p>
                                        6. Microphone akan berhenti otomatis
                                        sekitar 2 detik setelah mic dinyalakan
                                    </p>
                                </div>
                                <h1>Tips</h1>
                                <div>
                                    <p>
                                        1. Jika fitur "Dengar" sulit mendeteksi,
                                        bersuaralah dengan cara humming dan
                                        hindari noise yang berlebihan
                                    </p>
                                    <p>
                                        2. Bersuaralah terlebih dahulu sebelum
                                        menekan tombol{" "}
                                        <button className="tmb-kotak merah icon-inline">
                                            <div className="rekam-teks no-absolute">
                                                <p>Dengar</p>
                                            </div>
                                            <div
                                                className="rekam-bar"
                                                style={{ width: 0 }}
                                            ></div>
                                        </button>{" "}
                                        dan tahan suaramu sampai mic berhenti
                                        agar sistem lebih akurat dalam
                                        mendeteksi pitch
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div>
                                <p>
                                    <p>
                                        1. Tekan tombol{" "}
                                        <img
                                            src="img/audioicon.png"
                                            height="20px"
                                            alt="audioicon"
                                            className="icon-inline"
                                        />{" "}
                                        untuk mendengarkan suara note / akor
                                    </p>
                                    2. Pilih salah satu tombol{" "}
                                    <button
                                        className={"tmb-kotak-jwb"}
                                        style={{
                                            display: "inline",
                                            marginInline: "10px",
                                            border: "1px solid white"
                                        }}
                                    >
                                        isi
                                    </button>
                                    dan tekan untuk menjawab
                                </p>
                            </div>
                        )}
                        <button
                            className="tmb-lonjong"
                            onClick={() => {
                                setToggle(false);
                            }}
                        >
                            Ok
                        </button>
                        <p
                            style={{
                                fontSize: "12px",
                                textAlign: "center",
                                color: "gray"
                            }}
                        >
                            Informasi ini tidak akan muncul lagi ketika sudah
                            lanjut ke latihan / sublatihan selanjutnya
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
