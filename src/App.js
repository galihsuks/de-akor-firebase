import { useContext, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Acc from "./Components/Acc";
import { Daftar, Masuk } from "./Components/Auth";
import { Beranda } from "./Components/Beranda";
import { Header } from "./Components/Header";
import Latihan1 from "./Components/Langkah1";
import Quiz2 from "./Components/Langkah11";
import Latihan8 from "./Components/Langkah12";
import Quiz3 from "./Components/Langkah13";
import Materi3 from "./Components/Langkah14";
import Latihan9 from "./Components/Langkah15";
import Latihan10 from "./Components/Langkah16";
import Latihan11 from "./Components/Langkah17";
import Latihan2 from "./Components/Langkah2";
import Materi1 from "./Components/Langkah3";
import Latihan3 from "./Components/Langkah4";
import Latihan4 from "./Components/Langkah5";
import Latihan6 from "./Components/Langkah7";
import Quiz1 from "./Components/Langkah8";
import Materi2 from "./Components/Langkah9";
import Latihan7 from "./Components/Langkah10";
import Pjr1 from "./Components/Pgj1";
import Pgj2 from "./Components/Pgj2";
import { Welcome } from "./Components/Welcome";
import { AuthContext } from "./context/AuthContext";
import Quiz4 from "./Components/Langkah18";
import Tentang from "./Components/Tentang";
import Penggunaan from "./Components/CaraPenggunaan1";
import Latihan5 from "./Components/Langkah6";

function App() {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const posisi = useMemo(() => {
        if (currentUser) {
            if (currentUser.hasOwnProperty("kelas")) return "siswa";
            else return "guru";
        }
    }, [currentUser]);

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to="/" />;
    };
    const RequireAuthOut = ({ children }) => {
        return !currentUser ? (
            children
        ) : (
            <Navigate to={posisi === "siswa" ? "/beranda" : "/pgj"} />
        );
    };
    const CekAcc = ({ children }) => {
        return currentUser.acc ? children : <Navigate to="/acc" />;
    };
    const BenarGuru = ({ children }) => {
        return posisi === "guru" ? children : <Navigate to="/beranda" />;
    };
    const BenarSiswa = ({ children }) => {
        return posisi === "siswa" ? children : <Navigate to="/pgj" />;
    };

    // console.log(currentUser);
    // console.log(posisi);

    return (
        <div className="App">
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <RequireAuthOut>
                                <Header />
                                <Welcome />
                            </RequireAuthOut>
                        }
                    />
                    <Route
                        path="masuk"
                        element={
                            <RequireAuthOut>
                                <Header masuk={true} />
                                <Masuk />
                            </RequireAuthOut>
                        }
                    />
                    <Route
                        path="daftar"
                        element={
                            <RequireAuthOut>
                                <Header />
                                <Daftar />
                            </RequireAuthOut>
                        }
                    />
                    <Route
                        path="tentang"
                        element={
                            <RequireAuthOut>
                                <Header />
                                <Tentang />
                            </RequireAuthOut>
                        }
                    />
                    <Route path="pgj">
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <BenarGuru>
                                        <Header beranda={true} />
                                        <Pjr1 />
                                    </BenarGuru>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":kelas"
                            element={
                                <RequireAuth>
                                    <BenarGuru>
                                        <Header noReload={true} />
                                        <Pgj2 />
                                    </BenarGuru>
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route
                        path="acc"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header beranda={true} />
                                    <Acc />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="beranda"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <CekAcc>
                                        <Header beranda={true} />
                                        <Beranda />
                                    </CekAcc>
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="penggunaan"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <CekAcc>
                                        <Header noReload={true} />
                                        <Penggunaan />
                                    </CekAcc>
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah1"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan1 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah2"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan2 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah3"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Materi1 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah4"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan3 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah5"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan4 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah6"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan5 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah7"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan6 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah8"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Quiz1 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah9"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Materi2 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah10"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan7 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah11"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Quiz2 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah12"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan8 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah13"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Quiz3 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah14"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Materi3 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah15"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan9 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah16"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan10 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah17"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Latihan11 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah18"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <Quiz4 />
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="langkah19"
                        element={
                            <RequireAuth>
                                <BenarSiswa>
                                    <Header />
                                    <h3
                                        style={{
                                            textAlign: "center",
                                            marginTop: "30px"
                                        }}
                                    >
                                        Tahap Pengembangan
                                    </h3>
                                </BenarSiswa>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <>
                                <h2>Halaman tidak ditemukan</h2>
                            </>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
