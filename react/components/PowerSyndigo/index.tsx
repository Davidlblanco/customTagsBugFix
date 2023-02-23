import React, {useEffect} from "react";

const PowerSyndigo = () => {

    useEffect(() => {
        const script = document.createElement("syndigo-powerpage");
        script.setAttribute("pageid", "adsadasd");
        document.getElementById("siman-syndigo")?.appendChild(script);

    }, []);

    return <div id="siman-syndigo"></div>;
};

export default PowerSyndigo;