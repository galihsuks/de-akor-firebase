import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Piano from "./Piano";
import { cariTriad, chordsacak } from "../global/Variables";
import { fetchUpdateProgres } from "../global/Fetch";

export default function Materi2() {
    const useEffectRan = useRef([false, false]);
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 9 ? 3 : currentUser.sublatihan
    );
    const [disableNext, setDisableNext] = useState(false);

    const input1ref = cariTriad(chordsacak[0]);
    const input2ref = cariTriad(chordsacak[1] + "m");
    const input3ref = cariTriad(chordsacak[2] + "dim");
    const input4ref = cariTriad(chordsacak[3]);
    const input5ref = cariTriad(chordsacak[4] + "m");
    const input6ref = cariTriad(chordsacak[5] + "dim");
    const input7ref = cariTriad(chordsacak[6] + "m");
    const input8ref = cariTriad(chordsacak[7] + "dim");

    const [input1Benar, setInput1Benar] = useState(false);
    const [input2Benar, setInput2Benar] = useState(false);
    const [input3Benar, setInput3Benar] = useState(false);
    const [input4Benar, setInput4Benar] = useState(false);
    const [input5Benar, setInput5Benar] = useState(false);
    const [input6Benar, setInput6Benar] = useState(false);
    const [input7Benar, setInput7Benar] = useState(false);
    const [input8Benar, setInput8Benar] = useState(false);
    const inputTeks = (chord) => {
        //chord : ex. "Dbm"
        // console.log(chord);
        let hasilCari = cariTriad(chord);
        let string = hasilCari[3] + " Triad " + hasilCari[0];
        return string;
    };

    const nextPage = () => {
        if (page < 4) setPage((prev) => prev + 1);
    };
    const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    useEffect(() => {
        if (page === 4 && dataSubLatihan <= 1) setDataSubLatihan(2);
        if (page === 3 && dataSubLatihan <= 1) setDisableNext(true);
        else if (page === 4 && dataSubLatihan <= 2) setDisableNext(true);
        else setDisableNext(false);
    }, [page]);

    const input1 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input1ref[0]} ${input1ref[1]} ${input1ref[2]}`.toUpperCase()
        )
            setInput1Benar(true);
    };
    const input2 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input2ref[0]} ${input2ref[1]} ${input2ref[2]}`.toUpperCase()
        )
            setInput2Benar(true);
    };
    const input3 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input3ref[0]} ${input3ref[1]} ${input3ref[2]}`.toUpperCase()
        )
            setInput3Benar(true);
    };
    const input4 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input4ref[0]} ${input4ref[1]} ${input4ref[2]}`.toUpperCase()
        )
            setInput4Benar(true);
    };
    const input5 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input5ref[0]} ${input5ref[1]} ${input5ref[2]}`.toUpperCase()
        )
            setInput5Benar(true);
    };
    const input6 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input6ref[0]} ${input6ref[1]} ${input6ref[2]}`.toUpperCase()
        )
            setInput6Benar(true);
    };
    const input7 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input7ref[0]} ${input7ref[1]} ${input7ref[2]}`.toUpperCase()
        )
            setInput7Benar(true);
    };
    const input8 = (e) => {
        if (
            e.target.value.toUpperCase() ===
            `${input8ref[0]} ${input8ref[1]} ${input8ref[2]}`.toUpperCase()
        )
            setInput8Benar(true);
    };

    useEffect(() => {
        if (
            (input1Benar &&
                input2Benar &&
                input3Benar &&
                input4Benar &&
                input5Benar &&
                input6Benar) ||
            (input7Benar && input8Benar)
        ) {
            setDisableNext(false);
        }
    }, [
        input1Benar,
        input2Benar,
        input3Benar,
        input4Benar,
        input5Benar,
        input6Benar,
        input7Benar,
        input8Benar
    ]);

    useEffect(() => {
        if (useEffectRan.current[0]) {
            updateDataSub(dataSubLatihan);
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [dataSubLatihan]);

    //update data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetchUpdateProgres(10, 1, true, currentUser.id);
    };
    const updateDataSub = (sublatihan) => {
        fetchUpdateProgres(9, sublatihan, false, currentUser.id);
        setCurrentUser((data) => ({
            ...data,
            sublatihan: sublatihan
        }));
    };
    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    const Materi = () => {
        if (page === 1) {
            return (
                <div>
                    <h2 className="margin-a">Interval</h2>
                    <p className="margin-a">
                        Secara sederhananya, Interval adalah jarak antara 2 nada
                        yang dihutung dengan wholenote dan seminote. Contohnya,
                        salah satu interval yaitu Perfect 4th, dimana memiliki
                        interval 2 wholenote + 1 seminote (2 W + 1 S), misal
                        pada not C, maka memiliki interval perfect 4th dengan F
                        karena dari C ke F naik sebanyak 2 wholenote dan 1
                        seminote.
                    </p>
                    <p className="margin-a">
                        Terdapat 2 interval yang akan kita gunakan pada materi
                        beikutnya, yaitu:
                    </p>
                    <div className="flex-row-col">
                        <div
                            style={{
                                backgroundColor: "#462653",
                                borderRadius: "7px",
                                display: "flex",
                                width: "fit-content",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)"
                            }}
                        >
                            <h3 className="highlight">Minor 3rd</h3>
                            <h3
                                style={{
                                    width: "100px",
                                    paddingInline: "10px",
                                    textAlign: "center"
                                }}
                            >
                                1 W + 1 S
                            </h3>
                        </div>
                        <div
                            style={{
                                backgroundColor: "#462653",
                                borderRadius: "7px",
                                display: "flex",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
                                width: "fit-content"
                            }}
                        >
                            <h3 className="highlight">Major 3rd</h3>
                            <h3
                                style={{
                                    width: "100px",
                                    paddingInline: "10px",
                                    textAlign: "center"
                                }}
                            >
                                2 W
                            </h3>
                        </div>
                    </div>
                </div>
            );
        } else if (page === 2) {
            return (
                <div>
                    <h2 className="margin-a">Triad</h2>
                    <p className="margin-a">
                        Chord berasal dari triad dimana triad disusun dari 3 not
                        yaitu root (not pertamanya), inner (not keduanya), outer
                        (not ketiganya), dengan interval minor 3rd atau major
                        3rd. Ada 3 jenis Triad yang sering digunakan yaitu{" "}
                        <b>Major Triad, Minor Triad, Diminished Triad</b>.
                    </p>
                    <h3 className="margin-a">Major Triad</h3>
                    <p className="margin-a">
                        Memiliki rumus <b>{"Root -> Major 3rd -> Minor 3rd"}</b>
                        . Jadi pertama tentukan not pertamanya/rootnya dulu,
                        misal rootnya C, maka not keduanya/innernya ada di E
                        karena yang berjarak major 3rd (2 W) dari rootnya. Lalu
                        not ketiganya/outernya berarti ada di G karena yang
                        berjarak minor 3rd (1 W + 1 S) dari innernya. Maka major
                        triad dari C yaitu C - E - G.
                    </p>
                </div>
            );
        } else if (page === 3) {
            return (
                <div className="container-bagi2">
                    <div>
                        <h3 className="margin-a">Diminished Triad</h3>
                        <p className="margin-b">
                            Memiliki rumus{" "}
                            <b>{"Root -> Minor 3rd -> Minor 3rd"}</b>. Jadi
                            misalkan rootnya C, maka innernya ada di D# dan
                            outernya ada di F#. Jadi Diminished dari C yaitu C -
                            D# - F#.
                        </p>
                        <h3 className="margin-a">Minor Triad</h3>
                        <p className="margin-a">
                            Memiliki rumus{" "}
                            <b>{"Root -> Minor 3rd -> Major 3rd"}</b>. Jadi
                            misalkan rootnya C, maka innernya ada di D# dan
                            outernya ada di G. Maka Minor Triad dari C yaitu C -
                            D# - G.
                        </p>
                    </div>
                    <div>
                        <h2 style={{ color: "#0cca98" }}>Mini Quiz</h2>
                        <p>
                            Isi jawaban dengan format “root inner outer”. Untuk
                            not yang hitam menggunakan b.
                        </p>
                        <div className="input-div">
                            <p>{inputTeks(chordsacak[0])}</p>
                            <input
                                type="text"
                                placeholder="Root Inner Outer"
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
                            <p>{inputTeks(chordsacak[1] + "m")}</p>
                            <input
                                type="text"
                                placeholder="Root Inner Outer"
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
                            <p>{inputTeks(chordsacak[2] + "dim")}</p>
                            <input
                                type="text"
                                placeholder="Root Inner Outer"
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
                                placeholder="Root Inner Outer"
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
                            <p>{inputTeks(chordsacak[4] + "m")}</p>
                            <input
                                type="text"
                                placeholder="Root Inner Outer"
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
                            <p>{inputTeks(chordsacak[5] + "dim")}</p>
                            <input
                                type="text"
                                placeholder="Root Inner Outer"
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
                </div>
            );
        } else if (page === 4) {
            return (
                <div className="container-bagi2">
                    <div>
                        <h2 className="margin-a">Chord</h2>
                        <p className="margin-b">
                            Sederhananya sebuah chord merupakan sebuah kombinasi
                            dari tiga atau lebih note yang berbeda dengan
                            interval yang sesuai. Chord yang paling sederhana
                            yaitu chord yang dibentuk dari triad (sebut saja
                            chord triad) dengan rumus:
                        </p>
                        <h2 className="highlight">root + jenis triad</h2>
                    </div>
                    <div>
                        <p>
                            Misalkan pada <b>minor triad D (D - F - A)</b>, maka
                            nama chordnya yaitu <b>D minor</b> yang biasa
                            disingkat menjadi <b>Dm</b>. Contoh lain:
                        </p>
                        <p className="margin-b">
                            <b>
                                {
                                    "Minor triad A# (A# - C# - F) -> A# minor (A#m)"
                                }
                                <br />
                                {
                                    "Major triad C# (C# - F - G#) -> C# major (C#)"
                                }
                                <br />
                                {
                                    "Diminished triad G (G - A# - C#) -> G diminished (Gdim)"
                                }
                            </b>
                        </p>
                        <h2 style={{ color: "#0cca98" }}>Mini Quiz</h2>
                        <p>
                            Isi jawaban dengan format “root inner outer”. Untuk
                            not yang hitam menggunakan b.
                        </p>
                        <div className="input-div">
                            <p>{chordsacak[6] + "m"}</p>
                            <input
                                type="text"
                                placeholder="Root Inner Outer"
                                onChange={input7}
                            ></input>
                            <i
                                className="material-icons"
                                style={{
                                    color: input7Benar ? "#0cca98" : "grey"
                                }}
                            >
                                check
                            </i>
                        </div>
                        <div className="input-div">
                            <p>{chordsacak[7] + "dim"}</p>
                            <input
                                type="text"
                                placeholder="Root Inner Outer"
                                onChange={input8}
                            ></input>
                            <i
                                className="material-icons"
                                style={{
                                    color: input8Benar ? "#0cca98" : "grey"
                                }}
                            >
                                check
                            </i>
                        </div>
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
                        <h1 style={{ textAlign: "center" }}>Materi 2</h1>
                    </div>
                    <div>
                        {page === 4 ? (
                            <>
                                {currentUser.latihan == 9 ? (
                                    <button
                                        onClick={handleUpdate}
                                        style={{ float: "right" }}
                                        className="tmb-lonjong tmb-lulus"
                                        disabled={disableNext}
                                    >
                                        <p>Buka Latihan 7</p>
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
                    <p>Halaman {page}/4</p>
                </div>
            </div>
            <div className="piano-div">
                <Piano />
            </div>
        </>
    );
}
