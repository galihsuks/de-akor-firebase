import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Rekam from "./Rekam";
import { chordsacak, hitungRata } from "../global/Variables";
import AudioIconNote from "./AudioIcon";
import { fetchUpdateProgres } from "../global/Fetch";
import "./Latihan.css";
import Piano from "./Piano";
import CaraPenggunaan from "./CaraPenggunaan";

export default function Latihan1() {
    const useEffectRan = useRef([false, false]);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [lanjut, setLanjut] = useState(false);
    const [page, setPage] = useState(1);
    const [nomor, setNomor] = useState(0);
    const [soal, setSoal] = useState(chordsacak[nomor % 24]);
    const buktiBenar = useRef(false);
    const skor = useRef([0, 0, 0]); //counter, jumlah benar
    const kesalahan = useRef([0, 0, 0]); //wadah apakahbenar, jumlah kesalahan

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
        setSoal(chordsacak[nomor % 24]);
        if (nomor === 10) {
            skor.current[2] =
                hitungRata(skor.current[1], skor.current[0]) * 100;
            kesalahan.current[2] = hitungRata(
                kesalahan.current[1],
                skor.current[0]
            );
            setPage(2);
        }
    }, [nomor]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(2, 1, true, currentUser.id);
    };

    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    return (
        <>
            {page == 2 ? (
                <div className="latihan-lulus">
                    <div>
                        <h1>Latihan 1 Selesai</h1>
                        <div className="pemisah" />
                        <p>
                            Sehingga kamu sudah mampu bernyanyi sesuai dengan
                            pitch (tidak fals)
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
                        {currentUser.latihan == 1 ? (
                            <button
                                onClick={handleUpdate}
                                className="tmb-lonjong tmb-lulus"
                            >
                                Buka Latihan 2
                            </button>
                        ) : (
                            <a
                                className="tmb-lonjong"
                                onClick={handleReloadPage}
                            >
                                Beranda
                            </a>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {currentUser.latihan == 1 && <CaraPenggunaan cara={true} />}
                    <div className="latihan">
                        <div className="isi">
                            <div className="kiri ditengahkan-kolom">
                                <div>
                                    <h1>Latihan 1</h1>
                                    <p>
                                        Tekan tombol ikon music untuk
                                        mendengarkan suara note, dan kemudian
                                        tekan tombol Dengar untuk menyalakan
                                        mikrofon dan bernyanyilah sesuai tinggi
                                        nada yang didengar pada ikon music
                                    </p>
                                </div>
                            </div>
                            <div className="kanan">
                                <div className="ditengahkan-kolom utama">
                                    <AudioIconNote chord={soal} teks={soal} />
                                    <div className="pemisah" />
                                    <Rekam
                                        soal={soal}
                                        apakahbenar={apakahbenar}
                                        lanjut={false}
                                    />
                                </div>
                                <div className="ditengahkan-kolom">
                                    <p className="penghitung">{nomor}/10</p>
                                    <div className="border-barpenghitung" />
                                </div>
                                <div
                                    className="barpenghitung"
                                    style={{ width: `${(nomor / 10) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="piano-div">
                        <Piano />
                    </div>
                </>
            )}
        </>
    );
}
