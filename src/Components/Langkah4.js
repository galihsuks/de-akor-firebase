import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Rekam from "./Rekam";
import {
    cariMajorscale,
    chordsacak,
    hitungRata,
    solmisasi
} from "../global/Variables";
import AudioIconNote from "./AudioIcon";
import { fetchUpdateProgres } from "../global/Fetch";
import Piano from "./Piano";

export default function Latihan3() {
    const useEffectRan = useRef([false, false]);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [lanjut, setLanjut] = useState(false);
    const [page, setPage] = useState(2);
    const [nomor, setNomor] = useState(0);
    const noteJawaban = useRef(Math.floor(Math.random() * 6) + 1);
    const [soal, setSoal] = useState(
        cariMajorscale(chordsacak[nomor % 24], noteJawaban.current + 1)[0]
    );
    const buktiBenar = useRef(false);
    const skor = useRef([0, 0, 0]); //counter, jumlah benar, hasil
    const kesalahan = useRef([0, 0, 0]); //wadah apakahbenar, jumlah kesalahan, hasil

    //Rekam Merekam
    const apakahbenar = (x) => {
        buktiBenar.current = x[1];
        kesalahan.current[0] = x[3];
        setLanjut(x[0]);
    };
    useEffect(() => {
        if (useEffectRan.current[0] === true) {
            skor.current[0] += 1;
            kesalahan.current[1] += kesalahan.current[0];
            if (buktiBenar.current) {
                skor.current[1] += 1;
                setNomor((prev) => prev + 1);
            }
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [lanjut]);

    useEffect(() => {
        if (useEffectRan.current[1] === true) {
            noteJawaban.current = Math.floor(Math.random() * 6) + 1;
            setSoal(
                cariMajorscale(
                    chordsacak[nomor % 24],
                    noteJawaban.current + 1
                )[0]
            );
            if (nomor >= 20) {
                skor.current[2] =
                    hitungRata(skor.current[1], skor.current[0]) * 100;
                kesalahan.current[2] = hitungRata(
                    kesalahan.current[1],
                    skor.current[0]
                );
                setPage(3);
            }
        }
        return () => {
            useEffectRan.current[1] = true;
        };
    }, [nomor]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(5, 1, true, currentUser.id);
    };

    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Latihan 3</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Ke "Do"
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada tahap ini kamu diminta mencari tinggi nada Do
                        dengan referensi nada selain Do.
                    </p>
                    <div className="pemisah" />
                    <h2>Tips</h2>
                    <div className="overflow-y">
                        <div>
                            <ul
                                style={{
                                    textAlign: "left",
                                    marginLeft: "20px"
                                }}
                            >
                                <li>
                                    Jika referensi Re: Nyanyikan lagu "Ambilkan
                                    Bulan Bu" diawali dengan nada referensi.
                                    Maka "bil" adalah Do-nya
                                </li>
                                <li>
                                    Jika referensi Mi: Nyanyikan lagu "Ambilkan
                                    Bulan Bu" diawali dengan nada referensi.
                                    Maka "kan" adalah Do-nya
                                </li>
                                <li>
                                    Jika referensi Fa: Nyanyikan "Do-Si-La-Sol"
                                    diawali dengan nada referensi. Maka "Sol"
                                    adalah Do-nya.
                                </li>
                                <li>
                                    Jika referensi Sol: Nyanyikan lagu "Naik
                                    Naik Ke Puncak Gunung" diawali dengan nada
                                    referensi. Maka "ik" adalah Do-nya
                                </li>
                                <li>
                                    Jika referensi La: Nyanyikan lagu "Balonku"
                                    diawali dengan nada referensi. Maka "ku"
                                    adalah Do-nya.
                                </li>
                                <li>
                                    Jika referensi Si: Nyanyikan lagu "Balonku"
                                    diawali dengan nada referensi. Maka "lon"
                                    adalah Do-nya
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pemisah" />
                    <button
                        className="tmb-lonjong"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Lanjut
                    </button>
                </div>
            </div>
        );
    else if (page === 2)
        return (
            <>
                <div className="latihan">
                    <div className="isi">
                        <div className="kiri">
                            <div>
                                <span className="space-instruksi" />
                                <h1>Latihan 3</h1>
                                <p>
                                    Nyalakan mic dan nyanyikan suara nada
                                    "Do"-nya dari referensi nada yang didengar
                                </p>
                            </div>
                        </div>
                        <div className="kanan">
                            <div className="ditengahkan-kolom utama">
                                <AudioIconNote
                                    chord={chordsacak[nomor % 24]}
                                    teks={solmisasi[noteJawaban.current]}
                                />
                                <div className="pemisah" />
                                <Rekam
                                    soal={soal}
                                    apakahbenar={apakahbenar}
                                    lanjut={false}
                                />
                            </div>
                            <div className="ditengahkan-kolom">
                                <p className="penghitung">{nomor}/20</p>
                                <div className="border-barpenghitung" />
                            </div>
                            <div
                                className="barpenghitung"
                                style={{ width: `${(nomor / 20) * 100}%` }}
                            />
                        </div>
                    </div>
                    <button
                        className="tmb-instruksi-noSub tmb-lonjong ungu"
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Tips
                    </button>
                </div>
                <div className="piano-div">
                    <Piano />
                </div>
            </>
        );
    else if (page === 3)
        return (
            <div className="latihan-lulus">
                <div>
                    <h1>Latihan 3 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mencari suatu nada dari
                        referensi nada lain yang berada pada satu major scale
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
                    {currentUser.latihan == 4 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Latihan 4
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
