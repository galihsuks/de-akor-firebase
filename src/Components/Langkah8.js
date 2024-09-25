import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Rekam from "./Rekam";
import Waktu from "./Waktu";
import JwbDoremi from "./JwbDoremi";
import AudioIconNote from "./AudioIcon";
import {
    cariMajorscale,
    chords,
    chordsacak,
    hitungRata
} from "../global/Variables";
import { fetchUpdateProgres } from "../global/Fetch";

export default function Quiz1() {
    const useEffectRan = useRef([false, false, false, false, false, false]);
    const [lanjut, setLanjut] = useState(false);
    const [lanjut1, setLanjut1] = useState(false);
    const [lanjutWaktu, setLanjutWaktu] = useState(false);
    const [page, setPage] = useState(1);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const sublatihan = useRef(Math.floor(Math.random() * 7) + 1);
    const [nomor, setNomor] = useState(0);
    const [bar, setBar] = useState(0);
    const soal = useRef(
        cariMajorscale(chordsacak[nomor % 24], sublatihan.current)
    );
    const noteJawaban = useRef(Math.floor(Math.random() * 7));
    const chordJawaban = useRef(soal.current[noteJawaban.current]);
    const [toggleSoal, setToggleSoal] = useState(false);
    const [terjawab, setTerjawab] = useState(false);
    const jwbbenar = useRef(false);
    const buktiBenar = useRef([false, false]);
    const skor = useRef([0, 0, 0]); //counter, jumlah benar, hasil
    const kesalahan = useRef([0, 0, 0]); //wadah apakahbenar, jumlah kesalahan, hasil

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

    //Rekam Merekam
    const apakahbenar = (x) => {
        buktiBenar.current[0] = x[1];
        kesalahan.current[0] = x[3];
        setLanjut(x[0]);
    };
    useEffect(() => {
        // console.log("lanjutnya lngkah:" + lanjut);
        if (useEffectRan.current[1] === true) {
            // console.log("BENARR ngomongnya!!!");
            skor.current[0] += 1;
            kesalahan.current[1] += kesalahan.current[0];
            if (buktiBenar.current[0] && !toggleSoal) {
                skor.current[1] += 1;
                return setNomor((prev) => prev + 1);
            }
            if (bar > 0) setBar((prev) => prev - 1);
        }
        return () => {
            useEffectRan.current[1] = true;
        };
    }, [lanjut]);

    //Jawaban Teks
    const apakahbenar1 = (x) => {
        buktiBenar.current[1] = x[1];
        setLanjut1(x[0]);
    };
    useEffect(() => {
        if (useEffectRan.current[2] === true) {
            // console.log("BENAR JAWABBNYAA");
            skor.current[0] += 1;
            if (buktiBenar.current[1] && toggleSoal) {
                skor.current[1] += 1;
                return setNomor((prev) => prev + 1);
            }
            if (bar > 0) setBar((prev) => prev - 1);
        }
        return () => {
            useEffectRan.current[2] = true;
        };
    }, [lanjut1]);

    useEffect(() => {
        if (useEffectRan.current[3] === true) {
            jawab();
            setBar((prev) => prev + 1);
            noteJawaban.current = Math.floor(Math.random() * 7);
            sublatihan.current = Math.floor(Math.random() * 7) + 1;
            soal.current = cariMajorscale(
                chordsacak[nomor % 24],
                sublatihan.current
            );
            chordJawaban.current = soal.current[noteJawaban.current];
            setToggleSoal((prev) => !prev);
        }
        return () => {
            useEffectRan.current[3] = true;
        };
    }, [nomor]);

    useEffect(() => {
        if (bar >= 20) {
            skor.current[2] =
                hitungRata(skor.current[1], skor.current[0]) * 100;
            kesalahan.current[2] = hitungRata(
                kesalahan.current[1],
                skor.current[0]
            );
            return setPage(3);
        }
    }, [bar]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(9, 1, true, currentUser.id);
    };

    //Kembali ke beranda
    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Quiz 1</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Interval
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada Quiz ini akan diberikan 20 soal dengan waktu
                        pengerjaan 15 detik setiap soalnya. Materi yang
                        diberikan sama seperti pada latihan 4, 5, dan 6
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
                            waktu={15}
                            terjawab={terjawab}
                        />
                        <p id="teks-soal">
                            Tekan tombol ikon musik untuk mendengarkan suara
                            note, dan jawablah dengan benar
                        </p>
                        <div style={{ height: "50px" }} />
                        <div className="ditengahkan-baris">
                            <div
                                style={{ width: "50%" }}
                                className="ditengahkan-kolom"
                            >
                                <AudioIconNote
                                    chord={chordsacak[nomor % 24]}
                                    teks={sublatihan.current}
                                />
                            </div>
                            {toggleSoal ? (
                                <div
                                    style={{ width: "50%" }}
                                    className="ditengahkan-kolom soal"
                                >
                                    <AudioIconNote
                                        chord={
                                            soal.current[noteJawaban.current]
                                        }
                                        teks={"?"}
                                    />
                                </div>
                            ) : (
                                <div
                                    style={{ width: "50%" }}
                                    className="ditengahkan-kolom soal"
                                >
                                    <h1
                                        style={{
                                            color: "#0CCA98",
                                            fontSize: "100px"
                                        }}
                                        className="notejawaban"
                                    >
                                        {noteJawaban.current + 1}
                                    </h1>
                                </div>
                            )}
                        </div>
                        <div className="pemisah" />
                        {toggleSoal ? (
                            <div className="ditengahkan-kolom jwbn">
                                <JwbDoremi
                                    list={[1, 2, 3, 4, 5, 6, 7]}
                                    jwbn={noteJawaban.current + 1}
                                    lanjut={lanjut1}
                                    apakahbenar={apakahbenar1}
                                />
                            </div>
                        ) : (
                            <div className="ditengahkan-kolom jwbn">
                                <Rekam
                                    soal={chordJawaban.current}
                                    apakahbenar={apakahbenar}
                                    lanjut={lanjut}
                                />
                            </div>
                        )}
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
                    <h1>Quiz 1 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu bernyanyi tanpa fals,
                        mengetahui Solmisasi, dan mengetahui interval antar 2
                        nada dengan baik.
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
                    <p
                        style={{
                            color:
                                kesalahan.current[2] <= 0.5
                                    ? "var(--hijau)"
                                    : "var(--merah)"
                        }}
                    >
                        <b>
                            Rata- rata kesalahan bernyanyi :{" "}
                            {kesalahan.current[2].toFixed(2)}
                        </b>
                    </p>
                    {skor.current[2] < 70 && (
                        <p>
                            Sebaiknya mengulangi latihan ini sampai skor
                            melebihi 70
                        </p>
                    )}
                    {kesalahan.current[2] > 0.5 && (
                        <p>
                            Perbaiki lagi dalam bernyanyi untuk lebih sesuai
                            dengan pitch yang dituju
                        </p>
                    )}
                    <div className="pemisah" />
                    {currentUser.latihan == 8 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Materi 2
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
