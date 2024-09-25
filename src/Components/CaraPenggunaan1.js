import "./CaraPenggunaan.css";

export default function Penggunaan() {
    return (
        <>
            <div className="cara-guna">
                <div>
                    <h1>Cara Penggunaan</h1>
                    <div>
                        <ul style={{ marginLeft: "10px" }}>
                            <li>
                                Tekan tombol{" "}
                                <img
                                    src="img/audioicon.png"
                                    height="20px"
                                    alt="audioicon"
                                    className="icon-inline"
                                />{" "}
                                (ikon music) untuk mendengarkan suara note/akor
                                pada soal
                            </li>
                            <li>
                                Piano pada bagian bawah layar di setiap Materi
                                dan Latihan hanya sebagai alat bantu dalam
                                memahami materi / menjawab soal-soal yang ada
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Fitur Dengar</h2>
                        <ul style={{ marginLeft: "10px" }}>
                            <li>
                                Tekan tombol
                                <button className="tmb-kotak merah icon-inline">
                                    <div className="rekam-teks no-absolute">
                                        <p>Dengar</p>
                                    </div>
                                    <div
                                        className="rekam-bar"
                                        style={{ width: 0 }}
                                    ></div>
                                </button>
                                (ikon dengar) untuk menyalakan microphone
                            </li>
                            <li>
                                Microphone akan berhenti otomatis sekitar 2
                                detik setelah mic dinyalakan
                            </li>
                            <li>
                                Jika fitur "Dengar" sulit mendeteksi,
                                bersuaralah dengan cara humming agar pitch lebih
                                stabil dan hindari noise yang berlebihan
                            </li>
                            <li>
                                Bersuaralah terlebih dahulu sebelum menekan
                                tombol{" "}
                                <button className="tmb-kotak merah icon-inline">
                                    <div className="rekam-teks no-absolute">
                                        <p>Dengar</p>
                                    </div>
                                    <div
                                        className="rekam-bar"
                                        style={{ width: 0 }}
                                    ></div>
                                </button>{" "}
                                dan tahan suaramu sampai mic berhenti agar
                                sistem lebih akurat dalam mendeteksi pitch
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Fitur Jawaban Pilihan</h2>
                        <ul style={{ marginLeft: "10px" }}>
                            <li>
                                Pilih salah satu tombol{" "}
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
                            </li>
                        </ul>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}
