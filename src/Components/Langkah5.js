import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
    cariMajorscale,
    chords,
    chordsacak,
    hitungRata
} from "../global/Variables";
import JwbDoremi from "./JwbDoremi";
import AudioIconNote from "./AudioIcon";
import { fetchUpdateProgres } from "../global/Fetch";
import Piano from "./Piano";
import CaraPenggunaan from "./CaraPenggunaan";

export default function Latihan4() {
    const [page, setPage] = useState(2);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 5 ? 7 : currentUser.sublatihan
    );
    const [sublatihan, setSublatihan] = useState(dataSubLatihan);
    const itemSub = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];
    const itemSubRef = useRef([]);
    const prevsub = useRef(sublatihan);
    const [nomor, setNomor] = useState(0);
    const [bar, setBar] = useState(0);
    const [soal, setSoal] = useState(
        cariMajorscale(chordsacak[nomor % 24], sublatihan)
    );
    const noteJawaban = useRef(Math.floor(Math.random() * 7));
    const [lanjut, setLanjut] = useState(false);
    const useEffectRan = useRef([false, false]);
    const buktiBenar = useRef(false);
    const skor = useRef([0, 0, 0]); //counter, jumlah benar, hasil

    //Jawaban
    const apakahbenar = (x) => {
        buktiBenar.current = x[1];
        setLanjut(x[0]);
    };
    useEffect(() => {
        if (useEffectRan.current[0] === true) {
            skor.current[0] += 1;
            if (buktiBenar.current) {
                skor.current[1] += 1;
                return setNomor((prev) => prev + 1);
            }
            if (bar > 0) {
                noteJawaban.current = Math.floor(Math.random() * 7);
                setSoal(cariMajorscale(chordsacak[nomor % 24], sublatihan));
                setBar((prev) => prev - 1);
            }
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [lanjut]);

    //Sublatihan
    const addRefSub = (el) => {
        if (el && !itemSubRef.current.includes(el)) itemSubRef.current.push(el);
    };
    const gantiSub = (index) => {
        setSublatihan(index);
    };
    const lanjutSub = () => {
        if (sublatihan < itemSub.length)
            return setSublatihan((prev) => prev + 1);
        skor.current[2] = hitungRata(skor.current[1], skor.current[0]) * 100;
        setPage(3);
    };
    useEffect(() => {
        // console.log("sublatihanprev:" + prevsub.current);
        // console.log("sublatihan:" + sublatihan);
        itemSubRef.current[prevsub.current - 1].classList.add("putih");
        itemSubRef.current[sublatihan - 1].classList.remove("putih", "ungu");
        prevsub.current = sublatihan;
        noteJawaban.current = Math.floor(Math.random() * 7);
        setSoal(cariMajorscale(chordsacak[nomor % 24], sublatihan));
        setBar(0);
        if (dataSubLatihan < sublatihan) {
            setDataSubLatihan(sublatihan);
            updateDataSub();
        }
    }, [sublatihan]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(6, 1, true, currentUser.id);
    };
    const updateDataSub = () => {
        fetchUpdateProgres(5, sublatihan, false, currentUser.id);
        setCurrentUser((data) => ({
            ...data,
            sublatihan: sublatihan
        }));
    };

    useEffect(() => {
        if (useEffectRan.current[1] === true) {
            // if (nomor === 0) return setBar(0);
            noteJawaban.current = Math.floor(Math.random() * 7);
            setSoal(cariMajorscale(chordsacak[nomor % 24], sublatihan));
            setBar((prev) => prev + 1);
        }
        return () => {
            useEffectRan.current[1] = true;
        };
    }, [nomor]);

    useEffect(() => {
        if (bar >= 20) {
            lanjutSub();
        }
    }, [bar]);

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Latihan 4</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Interval
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada tahap ini kamu akan diminta untuk menebak nada yang
                        didengar dengan referensi nada Do(1) / Re(2) / Mi(3) /
                        Fa(4) / Sol(5) / La(6) / Si(7).{" "}
                    </p>
                    <div className="pemisah" />
                    <h2>Tips</h2>
                    <p>
                        Jika referensi bukan Do(1) maka ubahlah ke Do terlebih
                        dahulu. Jika sudah menemukan Do-nya lalu bandingkan
                        dengan note soal. Jika Do-nya lebih rendah maka
                        bernyanyilah Solmisasi kedepan/naik mulai dari Do
                        tersebut sampai menemukan note soal. Jika lebih tinggi
                        maka sebaliknya.
                    </p>
                    <div className="pemisah" />
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
                {dataSubLatihan <= 1 && <CaraPenggunaan cara={false} />}
                <div className="latihan">
                    <div className="bungkus-tmb-latihan">
                        <div className="ditengahkan-baris container-tmb-sublatihan">
                            {itemSub.map((nama, index) => {
                                return (
                                    <a
                                        ref={addRefSub}
                                        onClick={() =>
                                            dataSubLatihan >= index + 1 &&
                                            gantiSub(index + 1)
                                        }
                                        key={index}
                                        className={
                                            dataSubLatihan < index + 1
                                                ? "tmb-kotak tmb-sublatihan ungu"
                                                : "tmb-kotak tmb-sublatihan putih"
                                        }
                                    >
                                        {nama}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className="isi">
                        <div className="kiri">
                            <div>
                                <span className="space-instruksi" />
                                <h1>Latihan 4</h1>
                                <p>
                                    Tebaklah note sebelah kanan, apakah
                                    merupakan nada Do(1) / Re(2) / Mi(3) / Fa(4)
                                    / Sol(5) / La(6) / Si(7), sesuai referensi
                                    nada not sebelah kiri
                                </p>
                            </div>
                        </div>
                        <div className="kanan">
                            <div className="ditengahkan-kolom utama">
                                <div>
                                    <div className="ditengahkan-baris">
                                        <div
                                            style={{ width: "50%" }}
                                            className="ditengahkan-kolom"
                                        >
                                            <AudioIconNote
                                                chord={chordsacak[nomor % 24]}
                                                teks={sublatihan}
                                            />
                                        </div>
                                        <div
                                            style={{ width: "50%" }}
                                            className="ditengahkan-kolom"
                                        >
                                            <AudioIconNote
                                                chord={
                                                    soal[noteJawaban.current]
                                                }
                                                teks={"?"}
                                                oktaf={
                                                    chords.indexOf(
                                                        soal[
                                                            noteJawaban.current
                                                        ]
                                                    ) <
                                                    chords.indexOf(
                                                        chordsacak[nomor % 24]
                                                    )
                                                        ? 1
                                                        : 0
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="pemisah" />
                                    <div className="ditengahkan-kolom">
                                        <JwbDoremi
                                            list={[1, 2, 3, 4, 5, 6, 7]}
                                            jwbn={noteJawaban.current + 1}
                                            lanjut={false}
                                            apakahbenar={apakahbenar}
                                        />
                                    </div>
                                </div>
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
                    <button
                        className="tmb-instruksi tmb-lonjong ungu"
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
                    <h1>Latihan 4 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mengetahui interval antar 2
                        nada.
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
                    {currentUser.latihan == 5 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Latihan 5
                        </button>
                    ) : (
                        <Link to="/beranda" className="tmb-lonjong">
                            Beranda
                        </Link>
                    )}
                </div>
            </div>
        );
}
