import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { cariTriad, chordsTenan, hitungRata } from "../global/Variables";
import { AudioIconChord } from "./AudioIcon";
import JwbDoremi from "./JwbDoremi";
import Waktu from "./Waktu";
import { fetchUpdateProgres } from "../global/Fetch";

export default function Quiz3() {
    const useEffectRan = useRef([false, false, false]);
    const [lanjut, setLanjut] = useState(false);
    const buktiBenar = useRef(false);
    const [lanjutWaktu, setLanjutWaktu] = useState(false);
    const [page, setPage] = useState(1);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [nomor, setNomor] = useState(0);
    const [bar, setBar] = useState(0);
    const jwbbenar = useRef(false);
    const [terjawab, setTerjawab] = useState(false);
    const noteJawaban = useRef(Math.floor(Math.random() * 24));
    const soal = useRef(chordsTenan[noteJawaban.current]);
    const [jawaban, setJawaban] = useState(cariTriad(soal.current)[3]);
    const skor = useRef([0, 0, 0]); //counter, jumlah benar, hasil

    //Waktu
    const apakahhabis = (x) => {
        setLanjutWaktu(x);
    };
    useEffect(() => {
        if (useEffectRan.current[0] === true) {
            if (jwbbenar.current) {
                // console.log("JAWABAN BENAR");
            } else {
                // console.log("WAKTU HABIS!!!");
                if (bar > 0) setBar((prev) => prev - 1);
            }
            jwbbenar.current = false;
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [lanjutWaktu]);
    const jawab = () => {
        jwbbenar.current = true;
        setTerjawab((prev) => !prev);
    };

    //Jawaban
    const apakahbenar = (x) => {
        buktiBenar.current = x[1];
        setLanjut(x[0]);
    };
    useEffect(() => {
        if (useEffectRan.current[1] === true) {
            skor.current[0] += 1;
            if (buktiBenar.current) {
                skor.current[1] += 1;
                return setNomor((prev) => prev + 1);
            }
            if (bar > 0) setBar((prev) => prev - 1);
        }
        return () => {
            useEffectRan.current[1] = true;
        };
    }, [lanjut]);

    useEffect(() => {
        if (useEffectRan.current[2] === true) {
            jawab();
            setBar((prev) => prev + 1);
        }
        return () => {
            useEffectRan.current[2] = true;
        };
    }, [nomor]);

    useEffect(() => {
        noteJawaban.current = Math.floor(Math.random() * 24);
        soal.current = chordsTenan[noteJawaban.current];
        setJawaban(cariTriad(soal.current)[3]);
        if (bar >= 20) {
            skor.current[2] =
                hitungRata(skor.current[1], skor.current[0]) * 100;
            return setPage(3);
        }
    }, [bar]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(14, 1, true, currentUser.id);
    };
    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Quiz 3</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Major dan Minor
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada Quiz ini akan diberikan 20 soal dengan waktu
                        pengerjaan 5 detik setiap soalnya. Materi yang diberikan
                        sama seperti pada latihan 7
                    </p>
                    <div className="pemisah" />
                    <div className="pemisah" />
                    <button
                        className="tmb-lonjong"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Mulai
                    </button>
                </div>
            </div>
        );
    else if (page === 2)
        return (
            <div className="latihan quiz">
                <div className="kanan">
                    <div className="utama">
                        <div style={{ height: "50px" }} />
                        <Waktu
                            apakahhabis={apakahhabis}
                            waktu={5}
                            terjawab={terjawab}
                        />
                        <p id="teks-soal">
                            Tekan tombol ikon musik untuk mendengarkan suara
                            akor, dan tentukan akor tersebut termasuk akor major
                            atau minor.
                        </p>
                        <div style={{ height: "50px" }} />
                        <div className="ditengahkan-kolom">
                            <AudioIconChord
                                chord={soal.current}
                                teks={""}
                                kecepatan={0}
                            />
                            <div className="pemisah" />
                            <JwbDoremi
                                list={["Major", "Minor"]}
                                jwbn={jawaban}
                                lanjut={false}
                                apakahbenar={apakahbenar}
                            />
                        </div>
                        <div className="pemisah" />
                    </div>
                    <div className="ditengahkan-kolom">
                        <p className="penghitung">{bar}/20</p>
                        <div className="border-barpenghitung" />
                    </div>
                    <div
                        className="barpenghitung"
                        style={{ width: `${(bar / 20) * 100}%` }}
                    />
                </div>
            </div>
        );
    else if (page === 3)
        return (
            <div className="latihan-lulus">
                <div>
                    <h1>Quiz 3 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mengetahui perbedaan akor
                        major dan minor dengan baik.
                    </p>
                    <div className="pemisah" />
                    <p
                        style={{
                            color:
                                skor.current[2] >= 70
                                    ? "var(--hijau)"
                                    : "var(--merah)"
                        }}
                    >
                        <b>Skor : {skor.current[2].toFixed(2)}</b>
                    </p>
                    {skor.current[2] < 70 && (
                        <p>
                            Sebaiknya mengulangi latihan ini sampai skor
                            melebihi 70
                        </p>
                    )}
                    <div className="pemisah" />
                    {currentUser.latihan == 13 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Materi 3
                        </button>
                    ) : (
                        <a className="tmb-lonjong" onClick={handleReloadPage}>
                            Beranda
                        </a>
                    )}
                </div>
            </div>
        );
}
