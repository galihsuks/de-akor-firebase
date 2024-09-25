import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { chordsTenan, cariTriad, hitungRata } from "../global/Variables";
import { AudioIconChord } from "./AudioIcon";
import Rekam from "./Rekam";
import { Link } from "react-router-dom";
import { fetchUpdateProgres } from "../global/Fetch";
import Piano from "./Piano";

export default function Latihan7() {
    const useEffectRan = useRef([false, false]);
    const [lanjut, setLanjut] = useState(false);
    const buktiBenar = useRef(false);
    const [page, setPage] = useState(2);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 10 ? 3 : currentUser.sublatihan
    );
    const [sublatihan, setSublatihan] = useState(dataSubLatihan);
    const itemSub = ["Root", "Inner", "Outer"];
    const itemSubRef = useRef([]);
    const prevsub = useRef(sublatihan);
    const [nomor, setNomor] = useState(0);
    const noteJawaban = useRef(Math.floor(Math.random() * 24));
    const soal = useRef(chordsTenan[noteJawaban.current]);
    const [chordJawaban, setChordJawaban] = useState(
        cariTriad(soal.current)[sublatihan - 1]
    );
    const kecepatan = useRef(2);
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
        noteJawaban.current = Math.floor(Math.random() * 24);
        soal.current = chordsTenan[noteJawaban.current];
        if (nomor > 14) kecepatan.current = 0;
        else if (nomor > 9) kecepatan.current = 1;
        setChordJawaban(cariTriad(soal.current)[sublatihan - 1]);
        if (nomor >= 20) {
            lanjutSub();
        }
    }, [nomor]);

    //Sublatihan
    const addRefSub = (el) => {
        if (el && !itemSubRef.current.includes(el)) itemSubRef.current.push(el);
        //console.log(itemSubRef.current)
    };
    const gantiSub = (index) => {
        setSublatihan(index);
    };
    const lanjutSub = () => {
        if (sublatihan < itemSub.length)
            return setSublatihan((prev) => prev + 1);
        skor.current[2] = hitungRata(skor.current[1], skor.current[0]) * 100;
        kesalahan.current[2] = hitungRata(
            kesalahan.current[1],
            skor.current[0]
        );
        setPage(3);
    };
    useEffect(() => {
        // console.log("sublatihanprev:" + prevsub.current);
        // console.log("sublatihan:" + sublatihan);
        itemSubRef.current[prevsub.current - 1].classList.add("putih");
        itemSubRef.current[sublatihan - 1].classList.remove("putih", "ungu");
        prevsub.current = sublatihan;
        setNomor(0);
        noteJawaban.current = Math.floor(Math.random() * 24);
        soal.current = chordsTenan[noteJawaban.current];
        kecepatan.current = 2;
        setChordJawaban(cariTriad(soal.current)[sublatihan - 1]);
        if (dataSubLatihan < sublatihan) {
            setDataSubLatihan(sublatihan);
            updateDataSub();
        }
    }, [sublatihan]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(11, 1, true, currentUser.id);
    };
    const updateDataSub = () => {
        fetchUpdateProgres(10, sublatihan, false, currentUser.id);
        setCurrentUser((data) => ({
            ...data,
            sublatihan: sublatihan
        }));
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Latihan 7</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Root, Inner, Outer
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada tahap ini kamu akan diminta untuk membunyikan nada
                        root / inner / outer dari akor yang didengar.
                    </p>
                    <div className="pemisah" />
                    <h2>Tips</h2>
                    <p>
                        Pada pembelajaran pendengaran root harus benar-benar
                        lancar sehingga inner / outer dari akor tersebut akan
                        lebih mudah didapat. Selain itu, setiap mendengar akor
                        nyanyikan root, inner, dan outernya agar lebih terbiasa.
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
                                <h1>Latihan 7</h1>
                                <p>
                                    Tekan tombol ikon musik untuk mendengarkan
                                    suara akor, dan nyanyikan nada{" "}
                                    <b style={{ color: "#0CCA98" }}>
                                        {sublatihan === 1 ? (
                                            "root"
                                        ) : (
                                            <>
                                                {sublatihan === 2
                                                    ? "inner"
                                                    : "outer"}
                                            </>
                                        )}
                                    </b>{" "}
                                    dari akor yang didengar
                                </p>
                            </div>
                        </div>
                        <div className="kanan">
                            <div className="ditengahkan-kolom utama">
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
                    <h1>Latihan 7 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mengetahui tinggi nada root /
                        inner / outer dari suatu akor.
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
                    {currentUser.latihan == 10 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Quiz 2
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
