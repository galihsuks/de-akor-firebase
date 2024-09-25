import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { fetchUser } from "../global/Fetch";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const ambiluser = async () => {
                    try {
                        const res = await fetchUser(user.uid);
                        setCurrentUser({ ...res, id: user.uid });
                    } catch (err) {
                        console.log(err);
                    }
                };
                ambiluser();
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    );
};
