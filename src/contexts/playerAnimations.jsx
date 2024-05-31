import { createContext, useContext, useState } from "react";

const PlayerAnimationsContext = createContext({})

export const PlayerAnimationsProvider = (props) => {
    const [animationIndex, setAnimationIndex] = useState(1)
    const [animations, setAnimations] = useState([])

    return <PlayerAnimationsContext.Provider value ={{
        animationIndex,
        setAnimationIndex,
        animations,
        setAnimations,
    }}>
        {props.children}
    </PlayerAnimationsContext.Provider>
}


export const usePlayerAnimations = () => {
    return useContext(PlayerAnimationsContext)
}