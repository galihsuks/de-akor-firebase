import { useEffect, useRef, useState } from "react";
import { fetchKelasSiswa, fetchUpdateAcc } from "../global/Fetch";
import { progresBar, progresSiswa } from "../global/Variables";

export default function Pgj2() {
    const useEffectRan = useRef([false]);
    const [siswas, setSiswas] = useState([]);
    const [load, setLoad] = useState(true);
    const progresTotal = useRef(0);

    useEffect(() => {
        const ambilKelasSiswa = async () => {
            try {
                const res = await fetchKelasSiswa();
                progresTotal.current = res[0];
                setSiswas(res[1]);
            } catch (err) {
                console.log(err);
            }
        };
        ambilKelasSiswa();
    }, []);

    useEffect(() => {
        if (useEffectRan.current[0] === true) {
            siswas.sort((a, b) => {
                return a.absen - b.absen;
            });
            setLoad(false);
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [siswas]);

    const progresnya = (a, b) => {
        const hsl = progresSiswa(a, b);
        return hsl[1] === null ? `${hsl[0]}` : `${hsl[0]} - ${hsl[1]}`;
    };

    const updateAcc = (id, acc, index) => {
        const perbaruiAcc = async () => {
            try {
                const res = await fetchUpdateAcc(id, acc, siswas);
                setSiswas(res);
            } catch (err) {
                console.log(err);
            }
        };
        perbaruiAcc();
    };

    return (
        <div id="beranda-pengajar">
            {load ? (
                <h2 style={{ textAlign: "center" }}>Memuat...</h2>
            ) : (
                <>
                    <div className="pemisah" />
                    <div style={{ textAlign: "center" }}>
                        <h1>{siswas[0].kelas}</h1>
                        <p>
                            Progres keseluruhan :{" "}
                            <b style={{ color: "#0cca98" }}>
                                {progresTotal.current}%
                            </b>
                        </p>
                    </div>
                    <div className="pemisah" />
                    <div id="container-langkah">
                        {siswas.length === 0 ? (
                            <p className="eror">Belum ada siswa</p>
                        ) : (
                            <>
                                {siswas.map((item, index) => {
                                    return (
                                        <div className="langkah" key={index}>
                                            <a className="tmb-langkah ungu">
                                                <div className="ditengahkan-baris">
                                                    <div>
                                                        <h2
                                                            style={{
                                                                color: "#0cca98"
                                                            }}
                                                        >
                                                            {item.nama}
                                                        </h2>
                                                        <p>
                                                            Absen : {item.absen}
                                                        </p>
                                                        <p>
                                                            Progres :{" "}
                                                            {progresnya(
                                                                item.latihan,
                                                                item.sublatihan
                                                            )}
                                                            {` (${progresBar(
                                                                item.latihan,
                                                                item.sublatihan
                                                            )})%`}
                                                        </p>
                                                    </div>
                                                    <span
                                                        onClick={() =>
                                                            updateAcc(
                                                                item.id,
                                                                item.acc,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <i className="material-icons">
                                                            {item.acc
                                                                ? "clear"
                                                                : "check_circle"}
                                                        </i>
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        height: "10px",
                                                        width: `${progresBar(
                                                            item.latihan,
                                                            item.sublatihan
                                                        )}%`,
                                                        backgroundColor:
                                                            "#0cca98",
                                                        marginTop: "10px",
                                                        borderRadius: "10px"
                                                    }}
                                                ></div>
                                            </a>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
