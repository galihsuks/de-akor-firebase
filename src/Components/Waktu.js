import { useEffect, useRef, useState } from "react";

/*
props = apakahhabis, waktu, terjawab
jika waktu = 0 > toggle lanjut
useeffect terjawab > toggle lanjut
useeffect lanjut > apakahhabis(lanjut)
*/
export default function Waktu(props) {
    const useEffectRan = useRef([false, false]);
    const [waktu, setWaktu] = useState(props.waktu);
    const intervalId = useRef();
    const { apakahhabis } = props;
    const [lanjut, setLanjut] = useState(false);

    useEffect(() => {
        if (useEffectRan.current[1] === true) {
            // console.log("terjawab:" + props.terjawab);
            setLanjut((prev) => !prev);
        }
        return () => {
            useEffectRan.current[1] = true;
        };
    }, [props.terjawab]);

    useEffect(() => {
        stopWaktu();
        jalankanWaktu();
        if (useEffectRan.current[0] === true) {
            apakahhabis(lanjut);
        }
        return () => {
            useEffectRan.current[0] = true;
        };
    }, [lanjut]);

    function kurangiWaktu() {
        setWaktu((prev) => prev - 1);
    }

    useEffect(() => {
        if (waktu === 0) {
            setLanjut((prev) => !prev);
        }
    }, [waktu]);

    function jalankanWaktu() {
        if (!intervalId.current) {
            intervalId.current = setInterval(() => {
                kurangiWaktu();
            }, 1000);
        }
    }

    function stopWaktu() {
        clearInterval(intervalId.current);
        intervalId.current = null;
        setWaktu(props.waktu);
    }

    return (
        <>
            <p className="waktu">00:{waktu > 9 ? waktu : `0${waktu}`}</p>
        </>
    );
}
