import { useEffect, useRef, useState } from "react";
import { audioBenar, audioSalah } from "../global/Variables";

/*
list
jwbn
lanjut
apakahbenar([lanjut, koreksi])
*/
export default function JwbDoremi(props) {
    const list = props.list;
    const { apakahbenar } = props;
    const [lanjut, setLanjut] = useState(props.lanjut);
    const useEffectRan = useRef([false, false]);
    const buktiBenar = useRef(false);

    useEffect(() => {
        if (useEffectRan.current[0] === true) {
            apakahbenar([lanjut, buktiBenar.current]);
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [lanjut]);

    const handleList = (data, index) => {
        if (data === props.jwbn) {
            buktiBenar.current = true;
            audioBenar.currentTime = 0;
            audioBenar.play();
        } else {
            buktiBenar.current = false;
            audioSalah.currentTime = 0;
            audioSalah.play();
        }
        setLanjut((prev) => !prev);
    };

    return (
        <div
            style={{
                display: "flex",
                width: "80%",
                flexFlow: "wrap",
                justifyContent: "center",
                gap: "2px"
            }}
        >
            {list.map((data, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => handleList(data, index)}
                        className={"tmb-kotak-jwb"}
                    >
                        {data}
                    </button>
                );
            })}
        </div>
    );
}
