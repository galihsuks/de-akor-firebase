import { Link } from "react-router-dom";
import "./Tentang.css";

export default function Tentang() {
    const handlePerfectEar = () => {
        window.location.replace("https://www.perfectear.app/");
    };
    return (
        <>
            <div className="tentang">
                {/* <h1 style={{ color: "var(--hijau)" }}>DeAkor</h1>
                <p>Dengarkan Akornya</p> */}
                <img src="/logoDeAkorTeks.png" alt="logo" />
                <section>
                    <h2>Development</h2>
                    <p>Nama Pengembang : Galih Sukmamukti Hidayatullah</p>
                    <p>Jurusan Pengembang : Teknik Komputer</p>
                    <p>
                        Institusi Pengembang : Institut Teknologi Sepuluh
                        Nopember
                    </p>
                    <p>Tahun Pengembangan : 2022-2023</p>
                    <p>
                        Tujuan Pengembangan : Sebagai project Tugas Akhir untuk
                        mendapatkan jenjang sarjana Teknik Komputer di Institut
                        Teknologi Sepuluh Nopember
                    </p>
                </section>
                <section>
                    <h2>Pembelajaran</h2>
                    <p style={{ marginBottom: "10px" }}>
                        Tujuan utama dari pembelajaran ini yaitu untuk melatih
                        pendengaran akor. Sehingga hasil dari pembelajaran ini
                        yaitu <i>user</i> pelajar dapat mengetahui atau
                        mengenali suara akor yang mereka dengarkan. Sedangkan
                        pada <i>user</i> pengajar dapat membantu mereka untuk
                        mengajarkan anak didiknya dalam pembelajaran{" "}
                        <i>feeling</i> akor.
                    </p>
                    <h3>Kompetensi Belajar</h3>
                    <table>
                        <tr>
                            <th>No.</th>
                            <th>Pembelajaran</th>
                            <th>Kompetensi Belajar</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                Melatih siswa dalam bersuara atau bernyanyi
                                sesuai dengan nada bunyi yang mereka dengar
                            </td>
                            <td>Siswa mampu bernyanyi tanpa fals</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                Melatih bersuara atau bernyayi tangga nada major
                                dengan menerapkan solmisasi
                            </td>
                            <td>
                                Siswa mampu bernyanyi tangga nada major dengan
                                teratur
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                Memahami tangga nada atau scale, wholetones dan
                                semitone, dan tangga nada major
                            </td>
                            <td>
                                Siswa memahami mengenai scale, jarak antar nada,
                                dan major scale
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                Melatih dalam mencari tinggi nada suara Do dari
                                referensi nada Re / Mi / Fa / Sol / La / Si.
                            </td>
                            <td>
                                Siswa mampu menentukan tinggi nada Do dari
                                referensi nada Re / Mi / Fa / Sol / La / Si.
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>
                                Melatih dalam menentukan interval antar 2 nada
                                dalam satu tangga nada major
                            </td>
                            <td>
                                Siswa mampu menentukan interval antar 2 nada
                                pada tangga nada major
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Memahami tentang interval, triad, dan chord</td>
                            <td>
                                Siswa memahami mengenai interval, triad, dan
                                chord triad
                            </td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>
                                Melatih bersuara atau bernyanyi nada
                                root/inner/outer dari suatu akor yang
                                didengarnya
                            </td>
                            <td>
                                Siswa mampu menentukan suara root/inner/outer
                                dari suatu akor yang didengarnya
                            </td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>
                                Melatih dalam membedakan akor major dan minor
                            </td>
                            <td>
                                Siswa mampu mengenali akor major atau minor
                                sesuai yang didengarnya
                            </td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Memahami arti dari chord major scale</td>
                            <td>Siswa memahami mengenai chord major scale</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>
                                Melatih dalam menentukan akor ke berapa menurut
                                chord major scale, dengan diberikan referensi
                                akor lain
                            </td>
                            <td>
                                Siswa mampu menentukan akor ke berapa menurut
                                chord major scale sesuai yang didengarnya
                            </td>
                        </tr>
                    </table>
                </section>
                <section>
                    <h2>Referensi</h2>
                    <ul style={{ marginLeft: "20px" }}>
                        <li>
                            Takaliuang, Selumiel. (2015). TEORI MUSIK DASAR tone
                            - scale – interval – triad – chord – roman numeral –
                            transposing rev. 1.0.
                        </li>
                        <li>
                            Hidayatullah, Riyan. (2021). SOLFEGIO: Sebuah
                            Pengantar Teori Musik
                        </li>
                    </ul>
                </section>
            </div>
        </>
    );
}
