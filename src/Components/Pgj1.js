import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchAllSiswa } from "../global/Fetch";

export default function Pjr1() {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const useEffectRan = useRef([false]);
    const [siswas, setSiswas] = useState([]);
    const [load, setLoad] = useState(true);
    const itemRef = useRef([]);
    const kelases = useRef();

    const navigate = useNavigate();

    //Items
    const addRef = (el) => {
        if (el && !itemRef.current.includes(el)) itemRef.current.push(el);
    };

    useEffect(() => {
        const ambilAllSiswa = async () => {
            try {
                const res = await fetchAllSiswa(currentUser.idpengajar);
                setSiswas(res);
            } catch (err) {
                console.log(err);
            }
        };
        ambilAllSiswa();
    }, []);

    useEffect(() => {
        if (useEffectRan.current[0] === true) {
            siswas.sort((a, b) => {
                let fa = a.kelas.toLowerCase(),
                    fb = b.kelas.toLowerCase();
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            const ambilkelaskey = siswas.map(({ kelas }) => kelas); //ambil key yang kelas saja
            let kelass = [...new Set(ambilkelaskey)]; //agar tidak dobel
            kelases.current = kelass;
            setLoad(false);
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [siswas]);

    return (
        <div id="beranda-pengajar">
            <div className="pemisah" />
            <div style={{ textAlign: "center" }}>
                <h1>{currentUser.nama}</h1>
                <p>ID : {currentUser.idpengajar}</p>
            </div>
            <div className="pemisah" />
            <div id="container-langkah">
                {load ? (
                    <h2 style={{ textAlign: "center" }}>Memuat...</h2>
                ) : (
                    <>
                        {siswas.length === 0 ? (
                            <p className="eror">Belum ada siswa</p>
                        ) : (
                            <>
                                {kelases.current.map((kelas, index) => {
                                    return (
                                        <div
                                            className="langkah"
                                            key={index}
                                            ref={addRef}
                                            onClick={() => {
                                                navigate(
                                                    "/pgj/" +
                                                        currentUser.idpengajar +
                                                        "+" +
                                                        kelas.replace(
                                                            /\s/g,
                                                            "-"
                                                        )
                                                );
                                            }}
                                        >
                                            <a className="tmb-langkah ditengahkan-baris">
                                                <h2
                                                    style={{
                                                        textAlign: "center",
                                                        width: "100%"
                                                    }}
                                                >
                                                    {kelas}
                                                </h2>
                                            </a>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
