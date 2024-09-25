import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { convertLangkah } from "../global/Variables";
import { auth } from "../firebase";

export function Beranda() {
    const [currentUser, setCurrentUser] = useContext(AuthContext);

    return (
        <>
            <div id="beranda">
                <div className="pemisah" />
                <div style={{ textAlign: "center" }}>
                    <h1>{currentUser.nama}</h1>
                    <p>
                        {currentUser.kelas} / {currentUser.absen}
                    </p>
                </div>
                <div className="pemisah" />
                <div id="container-langkah">
                    {convertLangkah.map((nama, index) => {
                        return (
                            <div className="langkah" key={index}>
                                <Link
                                    to={
                                        currentUser.latihan >= index + 1 &&
                                        `/langkah${index + 1}`
                                    }
                                    className={
                                        currentUser.latihan >= index + 1
                                            ? "tmb-langkah ditengahkan-baris"
                                            : "tmb-langkah ungu ditengahkan-baris"
                                    }
                                >
                                    <div
                                        style={
                                            nama.icon
                                                ? {}
                                                : {
                                                      textAlign: "center",
                                                      width: "100%"
                                                  }
                                        }
                                    >
                                        <h2>
                                            {nama.latihan.split(" ")[0]}{" "}
                                            {nama.latihan.split(" ")[1]}
                                        </h2>
                                        <p>
                                            {nama.latihan
                                                .split(" ")
                                                .slice(2)
                                                .join(" ")
                                                .substring(
                                                    1,
                                                    nama.latihan
                                                        .split(" ")
                                                        .slice(2)
                                                        .join(" ").length - 1
                                                )}
                                        </p>
                                    </div>
                                    {nama.icon && (
                                        <i className="material-icons">
                                            {nama.icon}
                                        </i>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
