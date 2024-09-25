import { useEffect, useRef } from "react";
import { audios } from "../global/Variables";

export default function Piano() {
    const tutRef = useRef();

    useEffect(() => {
        tutRef.current = document.querySelectorAll(".tut");
        tutRef.current.forEach((data, index) => {
            data.addEventListener("click", () => {
                audios[index].currentTime = 0;
                audios[index].play();
            });
        });
    }, []);

    return (
        <div className="container-piano">
            <span className="tut piano-putih">
                <span />C
            </span>
            <span className="tut piano-hitam">
                <span />
                C#
                <br />
                /Db
            </span>
            <span className="tut piano-putih">
                <span />D
            </span>
            <span className="tut piano-hitam">
                <span />
                D#
                <br />
                /Eb
            </span>
            <span className="tut piano-putih">
                <span />E
            </span>
            <span className="tut piano-putih">
                <span />F
            </span>
            <span className="tut piano-hitam">
                <span />
                F#
                <br />
                /Gb
            </span>
            <span className="tut piano-putih">
                <span />G
            </span>
            <span className="tut piano-hitam">
                <span />
                G#
                <br />
                /Ab
            </span>
            <span className="tut piano-putih">
                <span />A
            </span>
            <span className="tut piano-hitam">
                <span />
                A#
                <br />
                /Bb
            </span>
            <span className="tut piano-putih">
                <span />B
            </span>
            <span className="tut piano-putih">
                <span />C
            </span>
            <span className="tut piano-hitam">
                <span />
                C#
                <br />
                /Db
            </span>
            <span className="tut piano-putih">
                <span />D
            </span>
            <span className="tut piano-hitam">
                <span />
                D#
                <br />
                /Eb
            </span>
            <span className="tut piano-putih">
                <span />E
            </span>
            <span className="tut piano-putih">
                <span />F
            </span>
            <span className="tut piano-hitam">
                <span />
                F#
                <br />
                /Gb
            </span>
            <span className="tut piano-putih">
                <span />G
            </span>
            <span className="tut piano-hitam">
                <span />
                G#
                <br />
                /Ab
            </span>
            <span className="tut piano-putih">
                <span />A
            </span>
            <span className="tut piano-hitam">
                <span />
                A#
                <br />
                /Bb
            </span>
            <span className="tut piano-putih">
                <span />B
            </span>
            <span className="tut piano-putih">
                <span />C
            </span>
            <span className="tut piano-hitam">
                <span />
                C#
                <br />
                /Db
            </span>
            <span className="tut piano-putih">
                <span />D
            </span>
            <span className="tut piano-hitam">
                <span />
                D#
                <br />
                /Eb
            </span>
            <span className="tut piano-putih">
                <span />E
            </span>
            <span className="tut piano-putih">
                <span />F
            </span>
            <span className="tut piano-hitam">
                <span />
                F#
                <br />
                /Gb
            </span>
            <span className="tut piano-putih">
                <span />G
            </span>
            <span className="tut piano-hitam">
                <span />
                G#
                <br />
                /Ab
            </span>
            <span className="tut piano-putih">
                <span />A
            </span>
            <span className="tut piano-hitam">
                <span />
                A#
                <br />
                /Bb
            </span>
            <span className="tut piano-putih">
                <span />B
            </span>
            <span className="tut piano-putih">
                <span />C
            </span>
        </div>
    );
}
