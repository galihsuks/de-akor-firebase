import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    cariChordMajorscale,
    chordsTenan,
    hitungRata
} from "../global/Variables";
import { fetchUpdateProgres } from "../global/Fetch";
import Waktu from "./Waktu";
import { AudioIconChord } from "./AudioIcon";
import JwbDoremi from "./JwbDoremi";

export default function Quiz4() {
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
    const angka12Acak = useRef(Math.floor(Math.random() * 12));
    const soal = useRef(chordsTenan[angka12Acak.current]);
    const jwbKeSoal = (chord) => {
        //rom = soal teks
        //chord = soal chord
        let ketemu = cariChordMajorscale(chord, 1);
        let angka3Acak1 = Math.floor(Math.random() * 6);
        return [
            ["I", "ii", "iii", "IV", "V", "vi"][angka3Acak1],
            ketemu[angka3Acak1]
        ]; //jawaban dr jwbdoremi dan chord dr audioiconchord jwbn
    };
    const jwb = useRef(jwbKeSoal(soal.current));
    const [jawaban, setJawaban] = useState(jwb.current[0]);
    const penghitung10Soal = useRef(0);
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
            setBar((prev) => prev + 1);
        }
        return () => {
            useEffectRan.current[2] = true;
        };
    }, [nomor]);

    useEffect(() => {
        jawab();
        penghitung10Soal.current += 1;
        if (penghitung10Soal.current % 10 === 0) {
            angka12Acak.current = Math.floor(Math.random() * 12);
            soal.current = chordsTenan[angka12Acak.current];
        }
        jwb.current = jwbKeSoal(soal.current);
        setJawaban(jwb.current[0]);
        if (bar >= 30) {
            skor.current[2] =
                hitungRata(skor.current[1], skor.current[0]) * 100;
            return setPage(3);
        }
        // console.log(penghitung10Soal.current);
    }, [bar]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(19, 1, true, currentUser.id);
    };
    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Quiz 4</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Chord Major Scale
                    </p>
                    <div className="pemisah" />
                    <p style={{ marginBottom: "10px" }}>
                        Pada Quiz ini harus menjawab 30 soal dengan benar dalam
                        waktu pengerjaan 10 detik setiap soalnya. Materi yang
                        diberikan sama seperti pada latihan 10
                    </p>
                    <p>
                        Namun hanya dengan 1 referensi yaitu chord I. Nada dasar
                        akan berganti setiap sudah 10 soal. Setiap pergantiannya
                        terdapat tambahan waktu 5 detik
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
                        <Waktu
                            apakahhabis={apakahhabis}
                            waktu={
                                penghitung10Soal.current % 10 === 0 ? 15 : 10
                            }
                            terjawab={terjawab}
                        />
                        <p id="teks-soal">
                            Tekan tombol ikon musik untuk mendengarkan suara
                            akor, dan tentukan akor tersebut termasuk akor ke-1
                            / ke-2 / ke-3 / ke-4 / ke-5 / ke-6 menurut akor
                            referensi yaitu akor ke-1.
                        </p>
                        <p>
                            <b style={{ color: "var(--hijau)" }}>
                                Soal ke: {penghitung10Soal.current}
                            </b>
                        </p>
                        <div style={{ height: "50px" }} />
                        <div className="ditengahkan-kolom">
                            <div
                                className="ditengahkan-baris"
                                style={{ gap: "60px" }}
                            >
                                <AudioIconChord
                                    chord={soal.current}
                                    teks={soal.current}
                                    kecepatan={0}
                                />
                                <AudioIconChord
                                    chord={jwb.current[1]}
                                    teks={"?"}
                                    kecepatan={0}
                                />
                            </div>
                            <div className="pemisah" />
                            <JwbDoremi
                                list={["I", "ii", "iii", "IV", "V", "vi"]}
                                jwbn={jawaban}
                                lanjut={false}
                                apakahbenar={apakahbenar}
                            />
                        </div>
                        <div className="pemisah" />
                    </div>
                    <div className="ditengahkan-kolom">
                        <p className="penghitung">{bar}/30</p>
                        <div className="border-barpenghitung" />
                    </div>
                    <div
                        className="barpenghitung"
                        style={{ width: `${(bar / 30) * 100}%` }}
                    />
                </div>
            </div>
        );
    else if (page === 3)
        return (
            <div className="latihan-lulus">
                <div>
                    <h1>Quiz 4 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mengenali Chord Major Scale
                        dengan baik.
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
                    {currentUser.latihan == 18 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Materi 4 (Tahap Pengembangan)
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
