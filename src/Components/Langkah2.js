import Rekam from "./Rekam";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { cariMajorscale, chordsacak, hitungRata } from "../global/Variables";
import AudioIconNote from "./AudioIcon";
import { fetchUpdateProgres } from "../global/Fetch";
import Piano from "./Piano";

export default function Latihan2() {
    const [lanjut, setLanjut] = useState(false);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 2 ? 2 : currentUser.sublatihan
    );
    const [sublatihan, setSublatihan] = useState(dataSubLatihan);
    const itemSub = ["Naik", "Turun"];
    const itemSubRef = useRef([]);
    const prevsub = useRef(sublatihan);
    const [nomor, setNomor] = useState(0);
    const [nomorDoremi, setNomorDoremi] = useState(0);
    const useEffectRan = useRef([false, false]);
    const [soal, setSoal] = useState(cariMajorscale(chordsacak[nomor % 24], 1));
    const [langkahEnd, setLangkahEnd] = useState(false);
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
                gantiNomorDoremi();
            }
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [lanjut]);

    const gantiNomorDoremi = () => {
        setNomorDoremi((prev) => prev + 1);
        setSoal(cariMajorscale(chordsacak[nomor % 24], 1));
        if (nomorDoremi >= 6) {
            setTimeout(() => {
                setNomor((prev) => prev + 1);
            }, 500);
        }
    };

    useEffect(() => {
        setSoal(cariMajorscale(chordsacak[nomor % 24], 1));
        // console.log(nomor, soal);
        setNomorDoremi(0);
        if (nomor === 5) {
            lanjutSub();
        }
    }, [nomor]);

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
        kesalahan.current[2] = hitungRata(
            kesalahan.current[1],
            skor.current[0]
        );
        setLangkahEnd(true);
    };
    useEffect(() => {
        // console.log("sublatihanprev:" + prevsub.current);
        // console.log("sublatihan:" + sublatihan);
        itemSubRef.current[prevsub.current - 1].classList.add("putih");
        itemSubRef.current[sublatihan - 1].classList.remove("putih", "ungu");
        prevsub.current = sublatihan;
        setNomor(0);
        setSoal(cariMajorscale(chordsacak[nomor % 24], 1));
        setNomorDoremi(0);
        if (dataSubLatihan < sublatihan) {
            setDataSubLatihan(sublatihan);
            updateDataSub();
        }
    }, [sublatihan]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(3, 1, true, currentUser.id);
    };
    const updateDataSub = () => {
        fetchUpdateProgres(2, sublatihan, false, currentUser.id);
        setCurrentUser((data) => ({
            ...data,
            sublatihan: sublatihan
        }));
    };

    return (
        <>
            {langkahEnd ? (
                <div className="latihan-lulus">
                    <div>
                        <h1>Latihan 2 Selesai</h1>
                        <div className="pemisah" />
                        <p>
                            Sehingga kamu sudah mampu menyanyikan Solmisasi
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
                        {currentUser.latihan == 2 ? (
                            <button
                                onClick={handleUpdate}
                                className="tmb-lonjong tmb-lulus"
                            >
                                Buka Materi 1
                            </button>
                        ) : (
                            <Link to="/beranda" className="tmb-lonjong">
                                Beranda
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="latihan">
                        <div className="bungkus-tmb-latihan">
                            <div className="container-tmb-sublatihan">
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
                                    <h1>Latihan 2</h1>
                                    <p>
                                        {sublatihan === 1
                                            ? "Tekan tombol Dengar untuk menyalakan mic dan bernyanyilah Do-nya terlebih dahulu. Indikator Do akan menyala jika jawaban benar. Lakukan hal yang sama untuk Re, Mi, Fa, Sol, La, Si."
                                            : "Tekan tombol Dengar untuk menyalakan mic dan bernyanyilah Si-nya terlebih dahulu. Indikator Si akan menyala jika jawaban benar. Lakukan hal yang sama untuk La, Sol, Fa, Mi, Re, Do."}
                                    </p>
                                </div>
                            </div>
                            <div className="kanan">
                                <div className="ditengahkan-kolom utama">
                                    <AudioIconNote
                                        chord={chordsacak[nomor % 24]}
                                        teks={"Do"}
                                    />
                                    <Rekam
                                        soal={
                                            sublatihan === 1
                                                ? soal[nomorDoremi]
                                                : soal[6 - nomorDoremi]
                                        }
                                        apakahbenar={apakahbenar}
                                        lanjut={false}
                                    />
                                    <div className="pemisah" />
                                    <div className="pemisah" />
                                    <div className="ditengahkan-baris">
                                        <div className="ditengahkan-kolom">
                                            <span
                                                className="dot"
                                                style={{
                                                    backgroundColor:
                                                        nomorDoremi >= 1 &&
                                                        "#0CCA98"
                                                }}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "7px"
                                                }}
                                                className="note"
                                            >
                                                {sublatihan === 1 ? "Do" : "Si"}
                                            </p>
                                        </div>
                                        <div className="ditengahkan-kolom">
                                            <span
                                                className="dot"
                                                style={{
                                                    backgroundColor:
                                                        nomorDoremi >= 2 &&
                                                        "#0CCA98"
                                                }}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "7px"
                                                }}
                                                className="note"
                                            >
                                                {sublatihan === 1 ? "Re" : "La"}
                                            </p>
                                        </div>
                                        <div className="ditengahkan-kolom">
                                            <span
                                                className="dot"
                                                style={{
                                                    backgroundColor:
                                                        nomorDoremi >= 3 &&
                                                        "#0CCA98"
                                                }}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "7px"
                                                }}
                                                className="note"
                                            >
                                                {sublatihan === 1
                                                    ? "Mi"
                                                    : "Sol"}
                                            </p>
                                        </div>
                                        <div className="ditengahkan-kolom">
                                            <span
                                                className="dot"
                                                style={{
                                                    backgroundColor:
                                                        nomorDoremi >= 4 &&
                                                        "#0CCA98"
                                                }}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "7px"
                                                }}
                                                className="note"
                                            >
                                                {sublatihan === 1 ? "Fa" : "Fa"}
                                            </p>
                                        </div>
                                        <div className="ditengahkan-kolom">
                                            <span
                                                className="dot"
                                                style={{
                                                    backgroundColor:
                                                        nomorDoremi >= 5 &&
                                                        "#0CCA98"
                                                }}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "7px"
                                                }}
                                                className="note"
                                            >
                                                {sublatihan === 1
                                                    ? "Sol"
                                                    : "Mi"}
                                            </p>
                                        </div>
                                        <div className="ditengahkan-kolom">
                                            <span
                                                className="dot"
                                                style={{
                                                    backgroundColor:
                                                        nomorDoremi >= 6 &&
                                                        "#0CCA98"
                                                }}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "7px"
                                                }}
                                                className="note"
                                            >
                                                {sublatihan === 1 ? "La" : "Re"}
                                            </p>
                                        </div>
                                        <div className="ditengahkan-kolom">
                                            <span
                                                className="dot"
                                                style={{
                                                    backgroundColor:
                                                        nomorDoremi >= 7 &&
                                                        "#0CCA98"
                                                }}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "7px"
                                                }}
                                                className="note"
                                            >
                                                {sublatihan === 1 ? "Si" : "Do"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ditengahkan-kolom">
                                    <p className="penghitung">{nomor}/5</p>
                                    <div className="border-barpenghitung" />
                                </div>
                                <div
                                    className="barpenghitung"
                                    style={{ width: `${(nomor / 5) * 100}%` }}
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
