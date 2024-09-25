import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Acc() {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    return (
        <div className="latihan-instruksi">
            <div style={{ width: "80%" }}>
                <h1>
                    Kamu harus menunggu pengajar {currentUser.idpengajar}{" "}
                    menyetujui!
                </h1>
            </div>
        </div>
    );
}
