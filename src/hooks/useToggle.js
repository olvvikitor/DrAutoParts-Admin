import { useState } from "react";

export default function useToggle(value){

    const [active, setActive] = useState(value ?? false);

    const toggleAction = () => {
        setActive(!active);
    }

    return [active, toggleAction];
}