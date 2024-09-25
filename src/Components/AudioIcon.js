/*
props:
- chord = 
- ukuran
- teks
*/
import { audios, audioschord, chords, chordsTenan } from "../global/Variables";
import "./AudioIcon.css";

export default function AudioIconNote(props) {
    /*props.oktaf*/
    function putarAudio() {
        audios[
            chords.indexOf(props.chord) +
                12 +
                12 * (props.oktaf ? props.oktaf : 0)
        ].currentTime = 0;
        audios[
            chords.indexOf(props.chord) +
                12 +
                12 * (props.oktaf ? props.oktaf : 0)
        ].play();
    }
    return (
        <div className="audioicon" onClick={putarAudio}>
            <img src="img/audioicon.png" height="200px" alt="audioicon" />
            <h1>{props.teks}</h1>
        </div>
    );
}
/*
kecepatan = 0, 1, 2 makin lambat
*/
export function AudioIconChord(props) {
    function putarAudio() {
        audioschord[
            chordsTenan.indexOf(props.chord) + 24 * props.kecepatan
        ].currentTime = 0;
        audioschord[
            chordsTenan.indexOf(props.chord) + 24 * props.kecepatan
        ].play();
    }
    return (
        <div
            className="audioicon"
            onClick={putarAudio}
            // style={{ scale: props.ukuran ? props.ukuran.toString() : "1" }}
        >
            <img src="img/audioicon.png" height="200px" alt="audioicon" />
            <h1>{props.teks}</h1>
        </div>
    );
}
