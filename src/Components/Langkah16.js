import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import JwbDoremi from "./JwbDoremi";
import { AudioIconChord } from "./AudioIcon";
import { Link } from "react-router-dom";
import {
    cariChordMajorscale,
    chordsTenan,
    hitungRata
} from "../global/Variables";
import { fetchUpdateProgres } from "../global/Fetch";
import Piano from "./Piano";

export default function Latihan10() {
    const [page, setPage] = useState(2);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 16 ? 3 : currentUser.sublatihan
    );
    const [sublatihan, setSublatihan] = useState(dataSubLatihan);
    const itemSub = ["ii", "iii", "vi"];
    const itemSubRef = useRef([]);
    const prevsub = useRef(sublatihan);
    const [nomor, setNomor] = useState(0);
    const [bar, setBar] = useState(0);
    const angka12Acak = useRef(Math.floor(Math.random() * 12));
    const soal = useRef([
        itemSub[sublatihan - 1],
        chordsTenan[angka12Acak.current + 12]
    ]);
    const jwbKeSoal = (rom, chord) => {
        //rom = soal teks
        //chord = soal chord
        let x = ["I", "ii", "iii", "IV", "V", "vi"].indexOf(rom) + 1;
        let ketemu = cariChordMajorscale(chord, x);
        let angka3Acak1 = Math.floor(Math.random() * 3) + 1;
        if (angka3Acak1 === sublatihan)
            angka3Acak1 === itemSub.length
                ? (angka3Acak1 = 1)
                : (angka3Acak1 += 1);
        let y = ["I", "ii", "iii", "IV", "V", "vi"].indexOf(
            itemSub[angka3Acak1 - 1]
        );
        return [itemSub[angka3Acak1 - 1], ketemu[y]]; //rom soal dan chord soal
    };
    const jwb = useRef(jwbKeSoal(soal.current[0], soal.current[1]));
    const [jawaban, setJawaban] = useState(jwb.current[0]);
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
                angka12Acak.current = Math.floor(Math.random() * 12);
                soal.current = [
                    itemSub[sublatihan - 1],
                    chordsTenan[angka12Acak.current + 12]
                ];
                jwb.current = jwbKeSoal(soal.current[0], soal.current[1]);
                setJawaban(jwb.current[0]);
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
        //console.log(itemSubRef.current)
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
        angka12Acak.current = Math.floor(Math.random() * 12);
        soal.current = [
            itemSub[sublatihan - 1],
            chordsTenan[angka12Acak.current + 12]
        ];
        jwb.current = jwbKeSoal(soal.current[0], soal.current[1]);
        setJawaban(jwb.current[0]);
        setBar(0);
        if (dataSubLatihan < sublatihan) {
            setDataSubLatihan(sublatihan);
            updateDataSub();
        }
    }, [sublatihan]);

    useEffect(() => {
        if (useEffectRan.current[1] === true) {
            // if (nomor === 0) return setBar(0);
            angka12Acak.current = Math.floor(Math.random() * 12);
            soal.current = [
                itemSub[sublatihan - 1],
                chordsTenan[angka12Acak.current + 12]
            ];
            jwb.current = jwbKeSoal(soal.current[0], soal.current[1]);
            setJawaban(jwb.current[0]);
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

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(17, 1, true, currentUser.id);
    };
    const updateDataSub = () => {
        fetchUpdateProgres(16, sublatihan, false, currentUser.id);
        setCurrentUser((data) => ({
            ...data,
            sublatihan: sublatihan
        }));
    };

    if (page === 1)
        return (
            <div className="latihan-instruksi">
                <div>
                    <h1 style={{ color: "#0CCA98" }}>Latihan 10</h1>
                    <p style={{ fontSize: "30px", marginTop: "-10px" }}>
                        Chord Major Scale - ii iii vi
                    </p>
                    <div className="pemisah" />
                    <p>
                        Pada tahap ini kamu diminta menebak akor ke-2 / ke-3 /
                        ke-6 menurut Chord Major Scale dengan referensi akor
                        ke-2 / ke-3 / ke-6
                    </p>
                    <div className="pemisah" />
                    <h2>Tips</h2>
                    <p>
                        Dengarkan pada bagian Root, jika referensi bukan akor I
                        (ke-1) maka root tersebut diubah terlebih dulu ke akor
                        I, lalu bandingkan dengan root akor soal. Lakukan
                        seperti Latihan 4, maka root soal akan diketahui berada
                        di akor ke berapa.
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
                                <h1>Latihan 10</h1>
                                <p>
                                    Tekan tombol ikon musik untuk mendengarkan
                                    suara akor dan pilihlah akor ke-2 / ke-3 /
                                    ke-6 menurut Chord Major Scale berdasarkan
                                    referensi akor.
                                </p>
                            </div>
                        </div>
                        <div className="kanan">
                            <div className="ditengahkan-kolom utama">
                                <div
                                    className="ditengahkan-baris"
                                    style={{ gap: "60px" }}
                                >
                                    <AudioIconChord
                                        chord={soal.current[1]}
                                        teks={soal.current[0]}
                                        kecepatan={sublatihan === 1 ? 1 : 0}
                                    />
                                    <AudioIconChord
                                        chord={jwb.current[1]}
                                        teks={"?"}
                                        kecepatan={sublatihan === 1 ? 1 : 0}
                                    />
                                </div>
                                <div className="pemisah" />
                                <JwbDoremi
                                    list={["ii", "iii", "vi"]}
                                    jwbn={jawaban}
                                    lanjut={false}
                                    apakahbenar={apakahbenar}
                                />
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
                    <h1>Latihan 10 Selesai</h1>
                    <div className="pemisah" />
                    <p>
                        Sehingga kamu sudah mampu mengenali perbedaan akor ke-2
                        / ke-3 / ke-6 dari Chord Major Scale
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
                    {currentUser.latihan == 16 ? (
                        <button
                            onClick={handleUpdate}
                            className="tmb-lonjong tmb-lulus"
                        >
                            Buka Latihan 11
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
