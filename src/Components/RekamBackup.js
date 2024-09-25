import { useEffect, useMemo, useRef, useState } from "react";
import { audioBenar, audioSalah, pitches } from "../global/Variables";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
/*
soal
apakahbenar([lanjut, koreksi])
lanjut
*/
export default function Rekam(props) {
    const ambilfft = useRef();
    const intervalId = useRef();
    const note = useRef("Dengar");
    const noteBuff = useRef("");
    const { apakahbenar } = props;
    const [lanjut, setLanjut] = useState(props.lanjut);
    const useEffectRan = useRef([false, false]);
    const barNumber = useRef(0);
    const [bar, setBar] = useState("0");
    const buktiBenar = useRef(false);
    const highestIndex = useRef(0);
    const highestAmp = useRef(0);

    const soal = useMemo(() => {
        return props.soal;
    }, [props.soal]);

    useEffect(() => {
        stopRekam();
        if (useEffectRan.current[0] === true) {
            apakahbenar([lanjut, buktiBenar.current, noteBuff.current]);
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [lanjut]);

    useEffect(() => {
        const p5loc = window.p5;
        const sket = (p) => {
            p.setup = () => {
                p.noCanvas();
                const mic = new p5loc.AudioIn();
                mic.start();
                p.userStartAudio();
                const fft = new p5loc.FFT(0.7, 4096);
                fft.setInput(mic);
                // console.log(fft);
                ambilfft.current = fft;
            };
        };
        new p5loc(sket);
    }, []);

    function getPitch() {
        // let spectrum = ambilfft.current.analyze();
        // for (let i = 0; i < spectrum.length; i++) {
        //     let amp = spectrum[i];
        //     if (amp > highestAmp.current) {
        //         highestAmp.current = amp;
        //         highestIndex.current = i;
        //     }
        // }
        // note.current = `${indexToNote[highestIndex.current]} (${
        //     highestIndex.current
        // })`;
        ambilfft.current.analyze();
        for (let p in pitches) {
            let amp = ambilfft.current.getEnergy(pitches[p]);
            if (amp > highestAmp.current) {
                highestAmp.current = amp;
                note.current = `${p}`;
            }
        }
        noteBuff.current = note.current;
        barNumber.current += 1;
        setBar(`${barNumber.current}%`);
    }

    useEffect(() => {
        if (barNumber.current >= 99) {
            barNumber.current = 0;
            if (note.current.replace(/[0-9]/g, "") === soal) {
                buktiBenar.current = true;
                audioBenar.currentTime = 0;
                audioBenar.play();
            } else {
                buktiBenar.current = false;
                audioSalah.currentTime = 0;
                audioSalah.play();
            }
            highestAmp.current = 0;
            highestIndex.current = 0;
            setLanjut((prev) => !prev);
        }
    }, [bar]);

    function handleRekam() {
        if (!intervalId.current) {
            intervalId.current = setInterval(() => {
                getPitch();
            }, 20);
        }
        // else {
        //     stopRekam();
        // }
        // console.log("props soal rekam js:" + soal);
    }

    function stopRekam() {
        clearInterval(intervalId.current);
        intervalId.current = null;
        barNumber.current = 0;
        note.current = "Dengar";
        setBar(`0`);
    }

    return (
        <>
            <button
                className={
                    intervalId.current
                        ? "tmb-kotak merah merekam"
                        : "tmb-kotak merah"
                }
                onClick={handleRekam}
                data-label={"qwdqwdqwdq"}
            >
                <div className="rekam-teks">
                    <p>{note.current}</p>
                </div>
                <div className="rekam-bar" style={{ width: bar }}></div>
            </button>
        </>
    );
}
