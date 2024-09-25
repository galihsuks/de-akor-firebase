import { useContext, useEffect, useState } from "react";
import Piano from "./Piano";
import { cariMajorscale, chordsacak } from "../global/Variables";
import { AuthContext } from "../context/AuthContext";
import { fetchUpdateProgres } from "../global/Fetch";
import "./Materi.css";

export default function Materi1() {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 3 ? 2 : currentUser.sublatihan
    );
    const [disableNext, setDisableNext] = useState(true);

    const nextPage = () => {
        if (page < 3) setPage((prev) => prev + 1);
    };
    const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };
    useEffect(() => {
        if (page === 3 && dataSubLatihan <= 1) setDisableNext(true);
        else setDisableNext(false);
    }, [page]);

    const input1ref = cariMajorscale(chordsacak[0], 1);
    const input2ref = cariMajorscale(chordsacak[1], 1);
    const input3ref = cariMajorscale(chordsacak[2], 1);
    const input4ref = cariMajorscale(chordsacak[3], 1);
    const input5ref = cariMajorscale(chordsacak[4], 1);
    const input6ref = cariMajorscale(chordsacak[5], 1);

    const [input1Benar, setInput1Benar] = useState(false);
    const [input2Benar, setInput2Benar] = useState(false);
    const [input3Benar, setInput3Benar] = useState(false);
    const [input4Benar, setInput4Benar] = useState(false);
    const [input5Benar, setInput5Benar] = useState(false);
    const [input6Benar, setInput6Benar] = useState(false);
    const inputTeks = (chord) => {
        let string = "Major Scale " + chord;
        return string;
    };

    const input1 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input1ref[0]} ${input1ref[1]} ${input1ref[2]} ${input1ref[3]} ${input1ref[4]} ${input1ref[5]} ${input1ref[6]}`.toUpperCase()
        )
            setInput1Benar(true);
    };
    const input2 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input2ref[0]} ${input2ref[1]} ${input2ref[2]} ${input2ref[3]} ${input2ref[4]} ${input2ref[5]} ${input2ref[6]}`.toUpperCase()
        )
            setInput2Benar(true);
    };
    const input3 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input3ref[0]} ${input3ref[1]} ${input3ref[2]} ${input3ref[3]} ${input3ref[4]} ${input3ref[5]} ${input3ref[6]}`.toUpperCase()
        )
            setInput3Benar(true);
    };
    const input4 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input4ref[0]} ${input4ref[1]} ${input4ref[2]} ${input4ref[3]} ${input4ref[4]} ${input4ref[5]} ${input4ref[6]}`.toUpperCase()
        )
            setInput4Benar(true);
    };
    const input5 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input5ref[0]} ${input5ref[1]} ${input5ref[2]} ${input5ref[3]} ${input5ref[4]} ${input5ref[5]} ${input5ref[6]}`.toUpperCase()
        )
            setInput5Benar(true);
    };
    const input6 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input6ref[0]} ${input6ref[1]} ${input6ref[2]} ${input6ref[3]} ${input6ref[4]} ${input6ref[5]} ${input6ref[6]}`.toUpperCase()
        )
            setInput6Benar(true);
    };

    useEffect(() => {
        if (
            input1Benar &&
            input2Benar &&
            input3Benar &&
            input4Benar &&
            input5Benar &&
            input6Benar
        ) {
            setDisableNext(false);
        }
    }, [
        input1Benar,
        input2Benar,
        input3Benar,
        input4Benar,
        input5Benar,
        input6Benar
    ]);

    //update data
    const handleUpdate = () => {
        fetchUpdateProgres(4, 1, true, currentUser.id);
    };

    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    const Materi = () => {
        if (page === 1) {
            return (
                <div>
                    <h2>Scale</h2>
                    <p className="margin-a">
                        Scales adalah kumpulan dari beberapa nada yang dipolakan
                        dalam kombinasi wholetones dan semitones.
                    </p>
                    <h3>Wholetones / Tone</h3>
                    <p className="margin-a">
                        merupakan jarak antar 2 not sebesar 1 nada penuh. Coba
                        lihat piano dibawah, yang mempunyai jarak wholetone
                        contohnya pada G-A, C#-D#, B-Db, karena diantara 2 not
                        itu terdapat 1 nada ditengahnya.
                    </p>
                    <h3>Semitones / Halftone</h3>
                    <p className="margin-a">
                        merupakan jarak antar 2 not sebesar setengah nada.
                        Contohnya pada E-F, F#-G, A-Bb, karena diantara 2 not
                        itu tidak terdapat 1 nada ditengahnya.
                    </p>
                </div>
            );
        } else if (page === 2) {
            return (
                <div>
                    <p className="margin-a">
                        Salah satu scale yang sering digunakan yaitu{" "}
                        <b style={{ color: "#0cca98" }}>major scale</b> dengan
                        pola:
                    </p>
                    <h3 className="highlight margin-a">
                        tone - tone - semitone - tone - tone - tone - semitone
                    </h3>
                    <p className="margin-a">
                        Jadi misalkan pada nada pertamanya atau nada dasarnya
                        (tonic) C, maka nada keduanya naik dengan jarak
                        tone/wholetone yaitu D, kemudian E, kemudian dari nada
                        ketiga menuju nada keempat naik dengan jarak hanya
                        semitone/halftone yaitu F, dan berikutnya G, A, B,
                        kemudian kembali ke C lagi.
                    </p>
                    <p className="margin-a">
                        Maka didapatkan scale major dengan nada dasarnya C
                        yaitu: C - D - E - F - G - A - B - C. Coba bunyikan pada
                        papan piano dibawah. Terdengar familiar bukan? ya, scale
                        ini yang sering menjadi dasar Solmisasi (Do, Re, Mi, Fa,
                        Sol, La, Si) yang kerap kita dengarkan. Cobalah sendiri
                        dengan nada dasar selain C.
                    </p>
                </div>
            );
        } else if (page === 3) {
            return (
                <div>
                    <h2 style={{ color: "#0cca98" }}>Mini Quiz</h2>
                    <p>
                        Isi jawaban dengan format “Do Re Mi Fa Sol La Si”. Untuk
                        not yang hitam menggunakan b.
                    </p>
                    <div className="input-div">
                        <p>{inputTeks(chordsacak[0])}</p>
                        <input
                            type="text"
                            placeholder="DO RE MI FA SOL LA SI"
                            onChange={input1}
                        ></input>
                        <i
                            className="material-icons"
                            style={{
                                color: input1Benar ? "#0cca98" : "grey"
                            }}
                        >
                            check
                        </i>
                    </div>
                    <div className="input-div">
                        <p>{inputTeks(chordsacak[1])}</p>
                        <input
                            type="text"
                            placeholder="DO RE MI FA SOL LA SI"
                            onChange={input2}
                        ></input>
                        <i
                            className="material-icons"
                            style={{
                                color: input2Benar ? "#0cca98" : "grey"
                            }}
                        >
                            check
                        </i>
                    </div>
                    <div className="input-div">
                        <p>{inputTeks(chordsacak[2])}</p>
                        <input
                            type="text"
                            placeholder="DO RE MI FA SOL LA SI"
                            onChange={input3}
                        ></input>
                        <i
                            className="material-icons"
                            style={{
                                color: input3Benar ? "#0cca98" : "grey"
                            }}
                        >
                            check
                        </i>
                    </div>
                    <div className="input-div">
                        <p>{inputTeks(chordsacak[3])}</p>
                        <input
                            type="text"
                            placeholder="DO RE MI FA SOL LA SI"
                            onChange={input4}
                        ></input>
                        <i
                            className="material-icons"
                            style={{
                                color: input4Benar ? "#0cca98" : "grey"
                            }}
                        >
                            check
                        </i>
                    </div>
                    <div className="input-div">
                        <p>{inputTeks(chordsacak[4])}</p>
                        <input
                            type="text"
                            placeholder="DO RE MI FA SOL LA SI"
                            onChange={input5}
                        ></input>
                        <i
                            className="material-icons"
                            style={{
                                color: input5Benar ? "#0cca98" : "grey"
                            }}
                        >
                            check
                        </i>
                    </div>
                    <div className="input-div">
                        <p>{inputTeks(chordsacak[5])}</p>
                        <input
                            type="text"
                            placeholder="DO RE MI FA SOL LA SI"
                            onChange={input6}
                        ></input>
                        <i
                            className="material-icons"
                            style={{
                                color: input6Benar ? "#0cca98" : "grey"
                            }}
                        >
                            check
                        </i>
                    </div>
                </div>
            );
        }
    };
    return (
        <>
            <div className="materi">
                <div className="materi-head ditengahkan-baris">
                    <div>
                        <button className="tmb-lonjong" onClick={prevPage}>
                            <p>Kembali</p>
                            <i className="material-icons">chevron_left</i>
                        </button>
                    </div>
                    <div>
                        <h1 style={{ textAlign: "center" }}>Materi 1</h1>
                    </div>
                    <div>
                        {page === 3 ? (
                            <>
                                {currentUser.latihan == 3 ? (
                                    <button
                                        onClick={handleUpdate}
                                        style={{ float: "right" }}
                                        className="tmb-lonjong tmb-lulus"
                                        disabled={disableNext}
                                    >
                                        <p>Buka Latihan 3</p>
                                        <i className="material-icons">
                                            chevron_right
                                        </i>
                                    </button>
                                ) : (
                                    <button
                                        className="tmb-lonjong"
                                        style={{ float: "right" }}
                                        onClick={handleReloadPage}
                                    >
                                        <p>Beranda</p>
                                        <i className="material-icons">
                                            chevron_right
                                        </i>
                                    </button>
                                )}
                            </>
                        ) : (
                            <button
                                className="tmb-lonjong"
                                style={{ float: "right" }}
                                onClick={nextPage}
                                disabled={disableNext}
                            >
                                <p>Berikutnya</p>
                                <i className="material-icons">chevron_right</i>
                            </button>
                        )}
                    </div>
                </div>
                <div className="materi-isi">
                    <div>
                        <Materi />
                    </div>
                    <p>Halaman {page}/3</p>
                </div>
            </div>
            <div className="piano-div">
                <Piano />
            </div>
        </>
    );
}
