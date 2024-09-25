import { useContext, useEffect, useRef, useState } from "react";
import { chordsTenan, cariTriad, hitungRata } from "../global/Variables";
import JwbDoremi from "./JwbDoremi";
import { AuthContext } from "../context/AuthContext";
import { AudioIconChord } from "./AudioIcon";
import { Link } from "react-router-dom";
import { fetchUpdateProgres } from "../global/Fetch";
import Piano from "./Piano";

export default function Latihan8() {
    const [page, setPage] = useState(2);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 12 ? 3 : currentUser.sublatihan
    );
    const [sublatihan, setSublatihan] = useState(dataSubLatihan);
    const itemSub = ["Lambat", "Sedang", "Cepat"];
    const itemSubRef = useRef([]);
    const prevsub = useRef(sublatihan);
    const [nomor, setNomor] = useState(0);
    const [bar, setBar] = useState(0);
    const noteJawaban = useRef(Math.floor(Math.random() * 24));
    const soal = useRef(chordsTenan[noteJawaban.current]);
    const [lanjut, setLanjut] = useState(false);
    const useEffectRan = useRef([false, false]);
    const buktiBenar = useRef(false);
    const [jawaban, setJawaban] = useState(cariTriad(soal.current)[3]);
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
                noteJawaban.current = Math.floor(Math.random() * 24);
                soal.current = chordsTenan[noteJawaban.current];
                setJawaban(cariTriad(soal.current)[3]);
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
        noteJawaban.current = Math.floor(Math.random() * 24);
        soal.current = chordsTenan[noteJawaban.current];
        setJawaban(cariTriad(soal.current)[3]);
        setBar(0);
        if (dataSubLatihan < sublatihan) {
            setDataSubLatihan(sublatihan);
            updateDataSub();
        }
    }, [sublatihan]);

    useEffect(() => {
        if (useEffectRan.current[1] === true) {
            // if (nomor === 0) return setBar(0);
            noteJawaban.current = Math.floor(Math.random() * 24);
            soal.current = chordsTenan[noteJawaban.current];
            setJawaban(cariTriad(soal.current)[3]);
            setBar((prev) => prev + 1);
        }
        return () => {
            useEffectRan.current[1] = true;
        };
    }, [nomor]);

    useEffect(() => {
        if (bar >= 10) {
            lanjutSub();
        }
    }, [bar]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(13, 1, true, currentUser.id);
    };
    const updateDataSub = () => {
        fetchUpdateProgres(12, sublatihan, false, currentUser.id);
        setCurrentUser((data) => ({
            ...data,
            sublatihan: sublatihan
        }));
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Latihan 8</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Major dan Minor
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada tahap ini kamu akan diminta memilih Major atau
                        Minor dari akor yang didengar.
                    </p>
                    <div className="pemisah" />
                    <h2>Tips</h2>
                    <p>
                        Dengarkan pada bagian Inner yang membedakan antara akor
                        major dan minor
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
                                <h1>Latihan 8</h1>
                                <p>
                                    Tekan tombol ikon musik untuk mendengarkan
                                    suara akor dan pilihlah major atau minor
                                    berdasarkan akor yang didengar.
                                </p>
                            </div>
                        </div>
                        <div className="kanan">
                            <div className="ditengahkan-kolom utama">
                                <AudioIconChord
                                    chord={soal.current}
                                    teks={""}
                                    kecepatan={itemSub.length - sublatihan}
                                />
                                <div className="pemisah" />
                                <JwbDoremi
                                    list={["Major", "Minor"]}
                                    jwbn={jawaban}
                                    lanjut={false}
                                    apakahbenar={apakahbenar}
                                />
                            </div>
                            <div className="ditengahkan-kolom">
                                <p className="penghitung">{bar}/10</p>
                                <div className="border-barpenghitung" />
                            </div>
                            <div
                                className="barpenghitung"
                                style={{ width: `${(bar / 10) * 100}%` }}
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
                    <h1>Latihan 8 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mengenali perbedaan akor major
                        dan minor.
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
                    {currentUser.latihan == 12 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Quiz 3
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
