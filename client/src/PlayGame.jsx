import { PerspectiveCamera, Hud, Text, Float } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Input, Label, InputText } from "r3f-form";
import { usePlayerAnimations } from "./contexts/playerAnimations"

export default function PlayGame(props)
{
    const { animations, animationIndex, setAnimationIndex } = usePlayerAnimations();

    const { camera, viewport } = useThree()

    const groupRef = useRef();
    const groupRef2 = useRef();
    const camRef = useRef();
    const dogRef = useRef();
    const animalSelectRef = useRef();
    const okSelectRef = useRef();
    const backSelectRef = useRef();
    const goSelectRef = useRef();
    const waitSelectRef = useRef();
    const nameInputRef = useRef();

    const [backSelect, setBackSelect] = useState(false)
    const [okaySelect, setOkaySelect] = useState(false)
    const [okayClick, setOkayClick] = useState(false)
    const [selectedAnimalHover, setSelectedAnimalHover] = useState(3)
    const [selectedAnimalClick, setSelectedAnimalClick] = useState(3)

    const [waitSelect, setWaitSelect] = useState(false)
    const [goSelect, setGoSelect] = useState(false)

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    useFrame(()=> {
        const vec = new THREE.Vector3(0,0,-99999)
        if (!props.playGame) {
            groupRef.current.position.lerp(vec, 0.001)
            groupRef2.current.position.lerp(vec, 0.001)
        }
        else if (!okayClick) {
            vec.set(3.6,0,0)
            groupRef.current.position.lerp(vec, 0.3)

            if (groupRef.current.rotation.x >= 0) {
                groupRef.current.rotation.x -= 0.1
            }
            if (groupRef.current.rotation.y >= -0.3) {
                groupRef.current.rotation.y -= 0.1
            }
            if (groupRef.current.rotation.z >= 0) {
                groupRef.current.rotation.z -= 0.1
            }

            vec.set(0,0,-99999)
            groupRef2.current.position.lerp(vec, 0.001)
        }
        else if (okayClick) {
            vec.set(3.6,4,-5)
            groupRef.current.position.lerp(vec, 0.3)

            if (groupRef.current.rotation.x <= 0.3) {
                groupRef.current.rotation.x += 0.1
            }
            if (groupRef.current.rotation.y <= -0.5) {
                groupRef.current.rotation.y += 0.1
            }
            if (groupRef.current.rotation.z <= 0.5) {
                groupRef.current.rotation.z += 0.1
            }

            vec.set(3.2,-1.5,0)
            groupRef2.current.position.lerp(vec, 0.5)
        }

        if (!backSelect) {
            vec.set(0,0,-5)
            backSelectRef.current.position.lerp(vec, 1)
        }
        else {
            vec.set(-1, -1.3, 0.9)
            backSelectRef.current.position.lerp(vec, 1)
        }

        if (!okaySelect) {
            vec.set(0,0,-5)
            okSelectRef.current.position.lerp(vec,1)
        }
        else {
            vec.set(0.6, -1.4, 0.8)
            okSelectRef.current.position.lerp(vec,1)
        }


        if (!waitSelect) {
            vec.set(0,0,-5)
            waitSelectRef.current.position.lerp(vec, 1)
        }
        else {
            vec.set(-1, -1.3, 0.9)
            waitSelectRef.current.position.lerp(vec, 1)
        }

        if (!goSelect) {
            vec.set(0,0,-5)
            goSelectRef.current.position.lerp(vec,1)
        }
        else {
            vec.set(0.6, -1.45, 0.8)
            goSelectRef.current.position.lerp(vec,1)
        }


        if (selectedAnimalHover == 1 || (selectedAnimalHover == 0 && selectedAnimalClick == 1)) {
            vec.set(-1.48,-0.07,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 2 || (selectedAnimalHover == 0 && selectedAnimalClick == 2)) {
            vec.set(-0.65,-0.07,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 3 || (selectedAnimalHover == 0 && selectedAnimalClick == 3)) {
            vec.set(0.20,-0.07,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 4 || (selectedAnimalHover == 0 && selectedAnimalClick == 4)) {
            vec.set(1.02,-0.07,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 5 || (selectedAnimalHover == 0 && selectedAnimalClick == 5)) {
            vec.set(1.85,-0.07,0.8)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }

    })
    
    const dogHover = () => {
        if (props.playGame) {
            setSelectedAnimalHover(1);
        }
    }

    const dogClick = () => {
        if (props.playGame) {
            props.characterRefs[selectedAnimalClick - 1].current.visible = false;
            props.characterRefs[1 - 1].current. visible = true;
            setSelectedAnimalClick(1);
        }
    }

    const catHover = () => {
        if (props.playGame) {
            setSelectedAnimalHover(2);
        }
    }

    const catClick = () => {
        if (props.playGame) {
            props.characterRefs[selectedAnimalClick - 1].current.visible = false;
            props.characterRefs[2 - 1].current. visible = true;
            setSelectedAnimalClick(2);
        }
    }

    const skunkHover = () => {
        if (props.playGame) {
            setSelectedAnimalHover(3);
        }
    }

    const skunkClick = () => {
        if (props.playGame) {
            props.characterRefs[selectedAnimalClick - 1].current.visible = false;
            props.characterRefs[3 - 1].current.visible = true;
            setSelectedAnimalClick(3);
        }
    }

    const cowHover = () => {
        if (props.playGame) {
            setSelectedAnimalHover(4);
        }
    }

    const cowClick = () => {
        if (props.playGame) {
            props.characterRefs[selectedAnimalClick - 1].current.visible = false;
            props.characterRefs[4 - 1].current.visible = true;
            setSelectedAnimalClick(4);
        }
    }

    const pandaHover = () => {
        if (props.playGame) {
            setSelectedAnimalHover(5);
        }
    }
    
    const pandaClick = () => {
        if (props.playGame) {
            props.characterRefs[selectedAnimalClick - 1].current.visible = false;
            props.characterRefs[5 - 1].current.visible = true;
            setSelectedAnimalClick(5);
        }
    }

    const animalHoverOff = () => {
        if (props.playGame) {
            setSelectedAnimalHover(0);
        }
    }

    const okHover = () => {
        if (props.playGame) {
            setBackSelect(false)
            setOkaySelect(true)
            console.log("Okay is Hovered.")
        }
    }

    const okClick = () => {
        if (props.playGame && okaySelect) {
            setOkayClick(true);
            setAnimationIndex(3)
            nameInputRef.current.focus()
        }
    }

    const backHover = () => {
        if (props.playGame) {
            setBackSelect(true)
            setOkaySelect(false)
            console.log("Back is Hovered.")
        }
    }

    const backClick = () => {
        if (props.playGame && backSelect) {
            setBackSelect(false);
            setOkayClick(false);
            props.terminate()
            console.log("Back is clicked.")
        }
    }

    const waitHover = () => {
        if (props.playGame && okayClick) {
            setWaitSelect(true)
            setGoSelect(false)
        }
    }

    const waitClick = () => {
        if (props.playGame && okayClick) {
            setOkayClick(false);
            setAnimationIndex(1)
        }
    }

    const goHover = () => {
        if (props.playGame && okayClick) {
            setGoSelect(true)
            setWaitSelect(false)
        }
    }

    const goClick = () => {
        if (props.playGame && okayClick) {
            if (name != "" && room != "") {
                console.log("Join room now!")
                
                // socket
                props.joinRoom(name, room, selectedAnimalClick)
            }
        }
    }

    const roomKeyDown = (key) => {
        if (key == "Enter") {
            setGoSelect(true)
            setWaitSelect(false)
            goClick()
        }
    }

    useEffect(() => {
    },[])

    return <>
        <Hud renderPriority={2}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={camRef} />

            <Float
                rotationIntensity={0.3}   
                floatIntensity={0.3}
                speed={1}
            >
                <group position={[0,0,-99999]} rotation={[0,-0.3,0]} ref={groupRef}>

                    {/* Main Square */}

                    <mesh scale={[5, 3, 0]} rotation={[0, -0.3, -0.1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Header Square White */}

                    <mesh position={[-1, 1.5, 1]} scale={[3, 0.6, 0]} rotation={[0, 0.5, 0.1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Pick your animal */}

                    <mesh position={[-1, 1.48, 1.1]} rotation={[0, 0.5, 0.1]}>
                        <Text 
                            fontSize={0.33} 
                            color="black"
                            font='./fonts/Arsenal-Bold.ttf'
                        >
                            Choose your fighter
                        </Text>
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Header Square Black */}

                    <mesh position={[-1, 1.55, 0.7]} scale={[3.3, 0.9, 0]} rotation={[0, 0.5, 0.1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Triangle */}

                    <mesh position={[-2.5, -0.5, -1.5]} scale={[1, 1, 1]} rotation={[0, -0.6, -0.7]}>
                        <tetrahedronGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Characters */}

                    <mesh position={[-1.4, -0.1, 1]} scale={[0.8, 0.8, 0.001]} rotation={[0, 0, 0]} ref={dogRef} onClick={dogClick} onPointerOver={dogHover}>
                        {/* Dog */}
                        <boxGeometry/>
                        <meshLambertMaterial map={props.dog} transparent={true} />
                    </mesh>

                    <mesh position={[-0.6, -0.1, 1]} scale={[0.8, 0.8, 0.001]} rotation={[0, 0, 0]} onClick={catClick} onPointerOver={catHover}>
                        {/* Cat */}
                        <planeGeometry />
                        <meshLambertMaterial map={props.cat} transparent={true}/>
                    </mesh>

                    <mesh position={[0.2, -0.1, 1]} scale={[0.8, 0.8, 0.001]} rotation={[0, 0, 0]} onClick={skunkClick} onPointerOver={skunkHover}>
                        {/* Skunk */}
                        <planeGeometry />
                        <meshLambertMaterial map={props.skunk} transparent={true}/>
                    </mesh>

                    <mesh position={[1.0, -0.1, 1]} scale={[0.8, 0.8, 0.001]} rotation={[0, 0, 0]} onClick={cowClick} onPointerOver={cowHover}>
                        {/* Cow */}
                        <planeGeometry />
                        <meshLambertMaterial map={props.cow} transparent={true}/>
                    </mesh>

                    <mesh position={[1.8, -0.1, 1]} scale={[0.8, 0.8, 0.001]} rotation={[0, 0, 0]} onClick={pandaClick} onPointerOver={pandaHover}>
                        {/* Panda */}
                        <planeGeometry />
                        <meshLambertMaterial map={props.panda} transparent={true}/>
                    </mesh>

                    <mesh position={[0,-0.1,-1]} scale={[4.5,1,1]} rotation={[0,-0.3,0]} visible={false} onPointerLeave={animalHoverOff}>
                        <boxGeometry></boxGeometry>
                        <meshBasicMaterial color="blue"/>
                    </mesh>

                    {/* Red Character Selection Box */}

                    <Float
                        rotationIntensity={0.15}
                        floatIntensity={0.15}
                        speed={40}
                    >
                        <mesh position={[0.13,-0.1,0.6]} scale={[0.8,0.8,0.5]} rotation={[0,0,0]} ref={animalSelectRef}>
                            <planeGeometry/>
                            <meshBasicMaterial color="red"/>
                        </mesh>
                    </Float>

                    {/* White OK Heading */}

                    <mesh position={[0.6, -1.4, 1]} scale={[0.9, 0.6, 0.1]} rotation={[0, -0.3, -0.1]} onPointerOver={okHover} onClick={okClick}>
                        <planeGeometry />
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Black OK Heading */}

                    <mesh position={[0.6, -1.4, 0.75]} scale={[1.1, 0.8, 0.1]} rotation={[0, -0.3, -0.1]} onPointerOver={okHover} onClick={okClick}>
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Red OK Heading */}

                    <Float
                        rotationIntensity={0.15}
                        floatIntensity={0.15}
                        speed={40}
                    >

                        <mesh position={[0.6, -1.4, 0.8]} scale={[1.2, 0.9, 0.1]} rotation={[0, -0.3, -0.1]} ref={okSelectRef} onClick={okClick}>
                            <planeGeometry />
                            <meshBasicMaterial color="red" />
                        </mesh>

                    </Float>

                    {/* OK Text */}

                    <mesh position={[0.58, -1.37, 1.2]} rotation={[0, -0.3, -0.1]} onPointerOver={okHover} onClick={okClick}>
                        <Text 
                            fontSize={0.55} 
                            color="black"
                            font="./fonts/Arsenal-Bold.ttf"
                        >
                            Ok
                        </Text>
                    </mesh>

                    {/* White Back Heading */}

                    <mesh position={[-1, -1.3, 1]} scale={[0.6, 0.4, 0.1]} rotation={[0, -0.3, 0.1]} onPointerOver={backHover} onClick={backClick}>
                        <planeGeometry />
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Black Back Heading */}

                    <mesh position={[-1, -1.3, 0.8]} scale={[0.8, 0.6, 0.1]} rotation={[0, -0.3, 0.1]} onPointerOver={backHover} onClick={backClick}>
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Red Back Heading */}

                    <Float
                        rotationIntensity={0.15}
                        floatIntensity={0.15}
                        speed={40}
                    >

                        <mesh position={[-1, -1.3, 0.9]} scale={[0.9, 0.7, 0.1]} rotation={[0, -0.3, 0.1]} ref={backSelectRef} onClick={backClick}>
                            <planeGeometry />
                            <meshBasicMaterial color="red" />
                        </mesh>

                    </Float>

                    {/* Back Text */}

                    <mesh position={[-1, -1.28, 1.2]} rotation={[0, -0.3, 0.1]} onPointerOver={backHover} onClick={backClick}>
                        <Text 
                            fontSize={0.2} 
                            color="black"
                            font="./fonts/Arsenal-Bold.ttf"
                        >
                            Back
                        </Text>
                    </mesh>

                </group>
            </Float>

            <Float
                rotationIntensity={0.3}   
                floatIntensity={0.3}
                speed={1}
            >
                <group position={[3.2,-1.5,-99999]} rotation={[0,-0.3,-0.1]} ref={groupRef2}>

                    {/* Name and Room Boxes*/}

                    <Label position={[-1.2,0.7,2]} scale={[4.2,4.2,4.2]} rotation={[0, -0.3, -0.1]} font="./fonts/Arsenal-Bold.ttf" color="#ffffff" text="Name:"/>
                    <Input position={[0.4, 0.68, 2]} scale={[4.2,4.2,4.2]} rotation={[0,-0.3,-0.1]} width={0.56} backgroundOpacity={0.1} backgroundColor="#ffffff" selectionColor={"red"} 
                        onChange={(e) => {setName(e.target.value)}}
                        ref={nameInputRef}
                    >
                        <InputText font="./fonts/Arsenal-Bold.ttf" color="white" />
                    </Input>
                    
                    <Label position={[-1.2,0,2]} scale={[4.2,4.2,4.2]} rotation={[0, -0.3, -0.1]} font="./fonts/Arsenal-Bold.ttf" color="white" text="Room:"/>
                    <Input position={[0.38, -0.1, 2]} scale={[4.2,4.2,4.2]} rotation={[0,-0.3,-0.1]} width={0.56} backgroundOpacity={0.1} backgroundColor="#ffffff" selectionColor={"red"} 
                        onChange={(e) => {setRoom(e.target.value)}}
                        onKeyDown={(e) => {roomKeyDown(e.key)}}
                    >
                        <InputText font="./fonts/Arsenal-Bold.ttf" color="white" />
                    </Input>

                    {/* Main Square */}

                    <mesh scale={[5, 3, 0]} rotation={[0, -0.3, -0.1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Header Square White */}

                    <mesh position={[1.4, 1.56, 1]} scale={[3, 0.6, 0]} rotation={[0, -0.5, -0.1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Pick your animal */}

                    <mesh position={[1.4, 1.55, 1.1]} rotation={[0, -0.5, -0.1]}>
                        <Text 
                            fontSize={0.33} 
                            color="black"
                            font='./fonts/Arsenal-Bold.ttf'
                        >
                            Papers, please!
                        </Text>
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Header Square Black */}

                    <mesh position={[1.45, 1.55, 0.7]} scale={[3.3, 0.9, 0]} rotation={[0, -0.5, -0.1]}>
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Triangle */}

                    <mesh position={[-2.5, -0.5, -1.5]} scale={[1, 1, 1]} rotation={[0, -0.6, 1.8]}>
                        <tetrahedronGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* White 'Go!' Heading */}

                    <mesh position={[0.6, -1.4, 1]} scale={[0.9, 0.6, 0.1]} rotation={[0, -0.3, -0.1]} onPointerEnter={goHover} onClick={goClick}>
                        <planeGeometry />
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Black 'Go!' Heading */}

                    <mesh position={[0.62, -1.45, 0.75]} scale={[1.1, 0.8, 0.1]} rotation={[0, -0.3, -0.1]} onPointerEnter={goHover} onClick={goClick}>
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Red 'Go!' Heading */}

                    <Float
                        rotationIntensity={0.15}
                        floatIntensity={0.15}
                        speed={40}
                    >

                        <mesh position={[0.6, -1.45, 0.8]} scale={[1.2, 0.9, 0.1]} rotation={[0, -0.3, -0.1]} ref={goSelectRef}>
                            <planeGeometry />
                            <meshBasicMaterial color="red" />
                        </mesh>

                    </Float>

                    {/* 'Go!' Text */}

                    <mesh position={[0.58, -1.37, 1.2]} rotation={[0, -0.3, -0.1]} onPointerEnter={goHover} onClick={goClick}>
                        <Text 
                            fontSize={0.5} 
                            color="black"
                            font="./fonts/Arsenal-Bold.ttf"
                        >
                            Go!
                        </Text>
                    </mesh>

                    {/* White 'Wait..' Heading */}

                    <mesh position={[-1, -1.27, 1]} scale={[0.7, 0.4, 0.1]} rotation={[0, -0.3, 0.1]} onPointerEnter={waitHover} onClick={waitClick} >
                        <planeGeometry />
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Black 'Wait...' Heading */}

                    <mesh position={[-1, -1.3, 0.8]} scale={[0.9, 0.6, 0.1]} rotation={[0, -0.3, 0.1]} onPointerEnter={waitHover} onClick={waitClick} >
                        <planeGeometry />
                        <meshBasicMaterial color="black" />
                    </mesh>

                    {/* Red 'Wait...' Heading */}

                    <Float
                        rotationIntensity={0.15}
                        floatIntensity={0.15}
                        speed={40}
                    >

                        <mesh position={[-1, -1.3, 0.9]} scale={[0.98, 0.7, 0.1]} rotation={[0, -0.3, 0.1]} ref={waitSelectRef}>
                            <planeGeometry />
                            <meshBasicMaterial color="red" />
                        </mesh>

                    </Float>

                    {/* 'Wait...' Text */}

                    <mesh position={[-1, -1.24, 1.2]} rotation={[0, -0.3, 0.1]} onPointerEnter={waitHover} onClick={waitClick}>
                        <Text 
                            fontSize={0.21} 
                            color="black"
                            font="./fonts/Arsenal-Bold.ttf"
                        >
                            Wait...
                        </Text>
                    </mesh>

                </group>
            </Float>

            <ambientLight intensity={1} />
            <pointLight position={[200, 200, 100]} intensity={0.5} />
        </Hud>
    </>
}