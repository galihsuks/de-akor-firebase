import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    cariChordMajorscale,
    chordmajorscale,
    chords,
    chordsTenan,
    majorscale
} from "../global/Variables";
import Piano from "./Piano";
import { fetchUpdateProgres } from "../global/Fetch";

export default function Materi3() {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [dataSubLatihan, setDataSubLatihan] = useState(
        currentUser.latihan > 14 ? 2 : currentUser.sublatihan
    );
    const [disableNext, setDisableNext] = useState(true);
    const scale = useRef(majorscale[0]);
    const [chordscale, setChordScale] = useState(chordmajorscale[0]);
    const milihMajorScale = useRef([
        "radio_button_checked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked",
        "radio_button_unchecked"
    ]);

    const nextPage = () => {
        if (page < 4) setPage((prev) => prev + 1);
    };
    const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };
    useEffect(() => {
        if (page === 4 && dataSubLatihan <= 1) setDisableNext(true);
        else setDisableNext(false);
    }, [page]);

    const input1ref = chordsTenan[Math.floor(Math.random() * 24)];
    const input2ref = chordsTenan[Math.floor(Math.random() * 24)];
    const input3ref = chordsTenan[Math.floor(Math.random() * 24)];
    const input4ref = chordsTenan[Math.floor(Math.random() * 24)];
    const input5ref = chordsTenan[Math.floor(Math.random() * 24)];
    const input6ref = chordsTenan[Math.floor(Math.random() * 24)];

    const [input1Benar, setInput1Benar] = useState(false);
    const [input2Benar, setInput2Benar] = useState(false);
    const [input3Benar, setInput3Benar] = useState(false);
    const [input4Benar, setInput4Benar] = useState(false);
    const [input5Benar, setInput5Benar] = useState(false);
    const [input6Benar, setInput6Benar] = useState(false);
    const inputTeks = (chord) => {
        let isMinor = false;
        if (chord.includes("m")) isMinor = true;
        const romMa = ["I", "IV", "V"];
        const romMi = ["ii", "iii", "vi"];
        const rom1 = isMinor
            ? romMa[Math.floor(Math.random() * 3)]
            : romMi[Math.floor(Math.random() * 3)];
        const rom2 = isMinor
            ? romMi[Math.floor(Math.random() * 3)]
            : romMa[Math.floor(Math.random() * 3)];
        let x = ["I", "ii", "iii", "IV", "V", "vi"].indexOf(rom2) + 1;
        let ketemu = cariChordMajorscale(chord, x);
        let y = ["I", "ii", "iii", "IV", "V", "vi"].indexOf(rom1);
        return `${rom1} = ${ketemu[y]}, maka ${rom2} =`; //=chord
    };

    const input1 = (e) => {
        if (e.target.value.toUpperCase() === `${input1ref}`.toUpperCase())
            setInput1Benar(true);
    };
    const input2 = (e) => {
        if (e.target.value.toUpperCase() === `${input2ref}`.toUpperCase())
            setInput2Benar(true);
    };
    const input3 = (e) => {
        if (e.target.value.toUpperCase() === `${input3ref}`.toUpperCase())
            setInput3Benar(true);
    };
    const input4 = (e) => {
        if (e.target.value.toUpperCase() === `${input4ref}`.toUpperCase())
            setInput4Benar(true);
    };
    const input5 = (e) => {
        if (e.target.value.toUpperCase() === `${input5ref}`.toUpperCase())
            setInput5Benar(true);
    };
    const input6 = (e) => {
        if (e.target.value.toUpperCase() === `${input6ref}`.toUpperCase())
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
        fetchUpdateProgres(15, 1, true, currentUser.id);
    };

    const handleReloadPage = (e) => {
        window.location.reload(false);
    };

    const handleChange = (e) => {
        scale.current = majorscale[e.target.value];
        milihMajorScale.current[
            milihMajorScale.current.indexOf("radio_button_checked")
        ] = "radio_button_unchecked";
        milihMajorScale.current[e.target.value] = "radio_button_checked";
        setChordScale(chordmajorscale[e.target.value]);
    };

    const Baris = (props) =>
        majorscale[0].map((data, index) => {
            return (
                <div
                    style={{
                        backgroundColor:
                            index === 0 || index === 2 || index === 4
                                ? "#0cca98"
                                : "#5e366a",
                        boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                        width: "40px",
                        textAlign: "center",
                        borderRadius: "7px",
                        display: "inline-block",
                        marginRight: "5px",
                        lineHeight: "30px",
                        fontWeight: "bold"
                    }}
                    key={index}
                >
                    {majorscale[0][(index + props.awal) % 7]}
                </div>
            );
        });

    const Materi = () => {
        if (page === 1)
            return (
                <div>
                    <h2>Chord Major Scale</h2>
                    <p>
                        merupakan sekumpulan akor yang dibentuk dari Major
                        Scale. Akor-akor ini merupakan akor yang paling banyak
                        digunakan. Disini akan lebih berfokus pada chord triad
                        saja yang paling banyak digunakan dan mudah dipahami.
                    </p>
                    <div className="pemisah" />
                    <p>Misalkan pada Major Scale C:</p>
                    {majorscale[0].map((data, index) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: "#5e366a",
                                    boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                                    width: "40px",
                                    textAlign: "center",
                                    borderRadius: "7px",
                                    display: "inline-block",
                                    marginRight: "5px",
                                    lineHeight: "30px",
                                    fontWeight: "bold"
                                }}
                                key={index}
                            >
                                {data}
                            </div>
                        );
                    })}
                    <div className="pemisah" />
                    <p className="margin-a">
                        Kita perlu mengumpulkan tiga not untuk membuat sebuah
                        akor. Jadi ketika memulainya dengan not C dan mengambil
                        not disebelah kanannya dengan melompati satu nada setiap
                        pergeserannya, maka didapatkan akor C Major:
                    </p>
                    <Baris awal={0} />
                </div>
            );
        else if (page === 2)
            return (
                <div>
                    <p className="margin-a">
                        Begitu juga jika dengan permulaan not lainnya, maka
                        didapatkan 6 akor sebagai berikut:
                    </p>
                    <div style={{ marginBottom: "5px" }}>
                        <Baris awal={1} />
                        <span className="hilang">
                            <p
                                style={{
                                    display: "inline-block",
                                    marginLeft: "50px",
                                    fontWeight: "bold"
                                }}
                            >
                                D Minor
                            </p>
                        </span>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                        <Baris awal={2} />
                        <span className="hilang">
                            <p
                                style={{
                                    display: "inline-block",
                                    marginLeft: "50px",
                                    fontWeight: "bold"
                                }}
                            >
                                E Minor
                            </p>
                        </span>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                        <Baris awal={3} />
                        <span className="hilang">
                            <p
                                style={{
                                    display: "inline-block",
                                    marginLeft: "50px",
                                    fontWeight: "bold"
                                }}
                            >
                                F Major
                            </p>
                        </span>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                        <Baris awal={4} />
                        <span className="hilang">
                            <p
                                style={{
                                    display: "inline-block",
                                    marginLeft: "50px",
                                    fontWeight: "bold"
                                }}
                            >
                                G Major
                            </p>
                        </span>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                        <Baris awal={5} />
                        <span className="hilang">
                            <p
                                style={{
                                    display: "inline-block",
                                    marginLeft: "50px",
                                    fontWeight: "bold"
                                }}
                            >
                                A Minor
                            </p>
                        </span>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                        <Baris awal={6} />
                        <span className="hilang">
                            <p
                                style={{
                                    display: "inline-block",
                                    marginLeft: "50px",
                                    fontWeight: "bold"
                                }}
                            >
                                B Diminished
                            </p>
                        </span>
                    </div>
                    <div className="pemisah" />
                    <p>Jadi Chord Major Scale dari C yaitu:</p>
                    <p
                        style={{
                            fontWeight: "bold",
                            backgroundColor: "#0cca98",
                            display: "inline-block",
                            padding: "6px 20px",
                            borderRadius: "10px",
                            marginTop: "5px",
                            boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)"
                        }}
                    >
                        C - Dm - Em - F - G - Am - Bdim
                    </p>
                    <div className="pemisah" />
                    <p>
                        Sebenarnya cukup hafalkan{" "}
                        <b style={{ color: "#0cca98" }}>jenis triad</b> chordnya
                        saja, dan pasangkan dengan <b>major scalenya</b>.
                    </p>
                </div>
            );
        else if (page === 3)
            return (
                <div>
                    <div className="ditengahkan-kolom-hp margin-b">
                        <span>Berikut contohnya pada </span>
                        <div className="pilgan">
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[0]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={0}
                                    onChange={handleChange}
                                />
                                <p>Major Scale C</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[1]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={1}
                                    onChange={handleChange}
                                />
                                <p>Major Scale Db</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[2]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={2}
                                    onChange={handleChange}
                                />
                                <p>Major Scale D</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[3]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={3}
                                    onChange={handleChange}
                                />
                                <p>Major Scale Eb</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[4]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={4}
                                    onChange={handleChange}
                                />
                                <p>Major Scale E</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[5]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={5}
                                    onChange={handleChange}
                                />
                                <p>Major Scale F</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[6]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={6}
                                    onChange={handleChange}
                                />
                                <p>Major Scale Gb</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[7]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={7}
                                    onChange={handleChange}
                                />
                                <p>Major Scale G</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[8]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={8}
                                    onChange={handleChange}
                                />
                                <p>Major Scale Ab</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[9]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={9}
                                    onChange={handleChange}
                                />
                                <p>Major Scale A</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[10]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={10}
                                    onChange={handleChange}
                                />
                                <p>Major Scale Bb</p>
                            </label>
                            <label className="">
                                <div>
                                    <i class="material-icons">
                                        {milihMajorScale.current[11]}
                                    </i>
                                </div>
                                <input
                                    type="radio"
                                    name="CMS"
                                    value={11}
                                    onChange={handleChange}
                                />
                                <p>Major Scale B</p>
                            </label>
                        </div>
                    </div>
                    <div className="flex-row-col margin-a">
                        <p
                            style={{
                                boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                                fontWeight: "bold"
                            }}
                            className="highlight-ungu"
                        >
                            Major - Minor - Minor - Major - Major - Minor - Dim
                        </p>
                        <p
                            style={{
                                display: "inline-block",
                                fontWeight: "bold"
                            }}
                        >
                            Jenis Triad
                        </p>
                    </div>
                    <div className="flex-row-col margin-a">
                        <p
                            style={{
                                boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                                fontWeight: "bold"
                            }}
                            className="highlight-ungu"
                        >
                            {`${scale.current[0]} - ${scale.current[1]} - ${scale.current[2]} - ${scale.current[3]} - ${scale.current[4]} - ${scale.current[5]} - ${scale.current[6]}`}
                        </p>
                        <p
                            style={{
                                display: "inline-block",
                                fontWeight: "bold"
                            }}
                        >
                            Major Scale
                        </p>
                    </div>
                    <div className="flex-row-col">
                        <p
                            style={{
                                boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                                fontWeight: "bold"
                            }}
                            className="highlight"
                        >
                            {`${chordscale[0]} - ${chordscale[1]} - ${chordscale[2]} - ${chordscale[3]} - ${chordscale[4]} - ${chordscale[5]} - ${chordscale[6]}`}
                        </p>
                        <p
                            style={{
                                display: "inline-block",
                                fontWeight: "bold"
                            }}
                        >
                            Chord Major Scale
                        </p>
                    </div>
                </div>
            );
        else if (page === 4)
            return (
                <div className="container-bagi2">
                    <div>
                        <h2>Roman Numeral</h2>
                        <p className="margin-a">
                            Prinsip roman numerals hanya menggantikan chord
                            dalam bentuk abjad dengan angka romawi. Cara
                            penulisannya angka romawi dengan{" "}
                            <b>huruf kapital</b> untuk{" "}
                            <b style={{ color: "#0cca98" }}>akor major</b> dan{" "}
                            <b>huruf kecil</b> untuk{" "}
                            <b style={{ color: "#0cca98" }}>akor minor</b>, dan
                            huruf kecil dengan tanda derajat (°) dibelakang
                            untuk{" "}
                            <b style={{ color: "#0cca98" }}>akor diminished</b>.
                            Maka jika diterapkan pada Chord Major Scale yakni:
                        </p>
                        <p className="highlight margin-a">
                            I - ii - iii - IV - V - vi - vii°
                        </p>
                        <p>
                            Yang mana dimulai dari akor pertama dari Chord Major
                            Scalenya.
                        </p>
                    </div>
                    <div>
                        <p className="margin-b">
                            Karena diminished paling jarang digunakan, maka
                            seterusnya akan lebih berfokus pada akor major dan
                            minor saja.
                        </p>
                        <h2 style={{ color: "#0cca98" }}>Mini Quiz</h2>
                        <p>
                            Isi jawaban berikut ini. Untuk not yang hitam
                            menggunakan b.
                        </p>
                        <div className="input-div">
                            <p>{inputTeks(input1ref)}</p>
                            <input
                                type="text"
                                placeholder="CHORD"
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
                            <p>{inputTeks(input2ref)}</p>
                            <input
                                type="text"
                                placeholder="CHORD"
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
                            <p>{inputTeks(input3ref)}</p>
                            <input
                                type="text"
                                placeholder="CHORD"
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
                            <p>{inputTeks(input4ref)}</p>
                            <input
                                type="text"
                                placeholder="CHORD"
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
                            <p>{inputTeks(input5ref)}</p>
                            <input
                                type="text"
                                placeholder="CHORD"
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
                            <p>{inputTeks(input6ref)}</p>
                            <input
                                type="text"
                                placeholder="CHORD"
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
                        <h1 style={{ textAlign: "center" }}>Materi 3</h1>
                    </div>
                    <div>
                        {page === 4 ? (
                            <>
                                {currentUser.latihan == 14 ? (
                                    <button
                                        onClick={handleUpdate}
                                        style={{ float: "right" }}
                                        className="tmb-lonjong tmb-lulus"
                                        disabled={disableNext}
                                    >
                                        <p>Buka Latihan 9</p>
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
