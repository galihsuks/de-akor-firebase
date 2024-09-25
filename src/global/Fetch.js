import {
    and,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { db, siswasCollectionRef } from "../firebase";
import { progresBar } from "./Variables";

//=============== SISWA ==================//
export const fetchDaftar = async (id, nama, kelas, absen, idPengajar) => {
    //siswa = {isi}
    const user = {
        nama: nama,
        kelas: kelas,
        absen: parseInt(absen),
        latihan: 1,
        sublatihan: 1,
        idpengajar: idPengajar,
        acc: false
    };
    await setDoc(doc(db, "siswas", id), user);
};
export const fetchAllSiswa = async (idpengajar) => {
    //idPengajar itu currentUser.idpengajar
    //setSiswas(hasil);
    const q = query(siswasCollectionRef, where("idpengajar", "==", idpengajar));
    const data = await getDocs(q);
    const hasil = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return hasil;
};
export const fetchUpdateProgres = async (lat, sub, isLat, userId) => {
    //currentUserId itu currentUser.id
    const siswaDoc = doc(db, "siswas", userId);
    const newField = { latihan: lat, sublatihan: sub };
    await updateDoc(siswaDoc, newField);
    if (isLat) window.location.reload(false);
};
export const fetchUpdateAcc = async (id, acc, siswas) => {
    //siswas = [siswas berdasrkan kelas]
    //setSiswas(j);
    const siswaDoc = doc(db, "siswas", id);
    const newField = { acc: !acc };
    await updateDoc(siswaDoc, newField);
    const j = siswas.map((siswa) => {
        if (siswa.id === id) {
            return {
                ...siswa,
                acc: !acc
            };
        } else {
            return siswa;
        }
    });
    return j;
};

//=============== PENGAJAR ==================//
export const fetchKelasSiswa = async () => {
    /*
    progresTotal.current = k.toFixed(1);
    setSiswas(res.data);
    */
    const path = window.location.pathname.slice(5);
    const idpengajar = path.split("+")[0];
    const kelas = path.split("+")[1].replace(/-/g, " ");
    const q = query(
        siswasCollectionRef,
        and(where("idpengajar", "==", idpengajar), where("kelas", "==", kelas))
    );
    const data = await getDocs(q);
    const hasil = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let k = 0;
    for (let i = 0; i < hasil.length; i++) {
        k += progresBar(hasil[i].latihan, hasil[i].sublatihan);
    }
    k = k / hasil.length;
    return [k.toFixed(1), hasil]; //progresTotal.current, setSiswas
};

//=============== KEDUA =============//
export const fetchUser = async (userId) => {
    //userUid itu user.uid
    //setCurrentUser()
    const docRef = doc(db, "siswas", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else {
        const docRef = doc(db, "gurus", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }
};
