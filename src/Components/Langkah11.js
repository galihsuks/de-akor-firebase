import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AudioIconChord } from "./AudioIcon";
import { cariTriad, chordsTenan, hitungRata } from "../global/Variables";
import Waktu from "./Waktu";
import Rekam from "./Rekam";
import { fetchUpdateProgres } from "../global/Fetch";

export default function Quiz2() {
    const useEffectRan = useRef([false, false, false, false, false, false]);
    const [lanjut, setLanjut] = useState(false);
    const buktiBenar = useRef(false);
    const [lanjutWaktu, setLanjutWaktu] = useState(false);
    const [page, setPage] = useState(1);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const sublatihan = useRef(Math.floor(Math.random() * 3) + 1); //root, inner, outer
    const [nomor, setNomor] = useState(0);
    const [bar, setBar] = useState(0);
    const jwbbenar = useRef(false);
    const [terjawab, setTerjawab] = useState(false);
    const noteJawaban = useRef(Math.floor(Math.random() * 24));
    const soal = useRef(chordsTenan[noteJawaban.current]);
    const [chordJawaban, setChordJawaban] = useState(
        cariTriad(soal.current)[sublatihan.current - 1]
    );
    const kecepatan = useRef(2);
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
        buktiBenar.current = x[1];
        kesalahan.current[0] = x[3];
        setLanjut(x[0]);
    };
    useEffect(() => {
        // console.log("lanjutnya lngkah:" + lanjut);
        if (useEffectRan.current[1] === true) {
            // console.log("BENARR ngomongnya!!!");
            skor.current[0] += 1;
            kesalahan.current[1] += kesalahan.current[0];
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
        if (useEffectRan.current[3] === true) {
            jawab();
            sublatihan.current = Math.floor(Math.random() * 3) + 1;
            noteJawaban.current = Math.floor(Math.random() * 24);
            soal.current = chordsTenan[noteJawaban.current];
            setChordJawaban(cariTriad(soal.current)[sublatihan.current - 1]);
            setBar((prev) => prev + 1);
        }
        return () => {
            useEffectRan.current[3] = true;
        };
    }, [nomor]);

    useEffect(() => {
        if (bar > 14) kecepatan.current = 0;
        else if (bar > 9) kecepatan.current = 1;
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
        fetchUpdateProgres(12, 1, true, currentUser.id);
    };
    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Quiz 2</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Root, Inner, Outer
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada Quiz ini akan diberikan 20 soal dengan waktu
                        pengerjaan 15 detik setiap soalnya. Materi yang
                        diberikan sama seperti pada latihan 6
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
                            akor, dan bunyikan nada{" "}
                            <b style={{ color: "#0CCA98" }}>
                                {sublatihan.current === 1 ? (
                                    "root"
                                ) : (
                                    <>
                                        {sublatihan.current === 2
                                            ? "inner"
                                            : "outer"}
                                    </>
                                )}
                            </b>{" "}
                            dari akor yang didengar
                        </p>
                        <div style={{ height: "50px" }} />
                        <div className="ditengahkan-kolom">
                            <AudioIconChord
                                chord={soal.current}
                                teks={soal.current}
                                kecepatan={kecepatan.current}
                            />
                            <div className="pemisah" />
                            <Rekam
                                soal={chordJawaban}
                                apakahbenar={apakahbenar}
                                lanjut={false}
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
                    <h1>Quiz 2 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mengenali tinggi nada root /
                        inner / outer dari suatu akor yang didengar.
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
                    {currentUser.latihan == 11 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Latihan 8
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
