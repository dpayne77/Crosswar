import { PerspectiveCamera, Hud, Text, Html, Float } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';

export default function PlayGame(props)
{
    const { camera, viewport } = useThree()

    const groupRef = useRef();
    const camRef = useRef();
    const dogRef = useRef();
    const animalSelectRef = useRef();
    const okSelectRef = useRef();
    const backSelectRef = useRef();

    const [backSelect, setBackSelect] = useState(false)
    const [okaySelect, setOkaySelect] = useState(false)
    const [okayClick, setOkayClick] = useState(false);
    const [selectedAnimalHover, setSelectedAnimalHover] = useState(3)
    const [selectedAnimalClick, setSelectedAnimalClick] = useState(3)

    useFrame(()=> {
        const vec = new THREE.Vector3(0,0,-99999)
        if (!props.playGame) {
            groupRef.current.position.lerp(vec, 0.001)
        }
        else {
            vec.set(3.6,0,0)
            groupRef.current.position.lerp(vec, 0.3)
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


        if (selectedAnimalHover == 1 || (selectedAnimalHover == 0 && selectedAnimalClick == 1)) {
            vec.set(-1.55,-0.1,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 2 || (selectedAnimalHover == 0 && selectedAnimalClick == 2)) {
            vec.set(-0.7,-0.1,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 3 || (selectedAnimalHover == 0 && selectedAnimalClick == 3)) {
            vec.set(0.13,-0.1,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 4 || (selectedAnimalHover == 0 && selectedAnimalClick == 4)) {
            vec.set(0.95,-0.1,0.6)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else if (selectedAnimalHover == 5 || (selectedAnimalHover == 0 && selectedAnimalClick == 5)) {
            vec.set(1.75,-0.1,0.8)
            animalSelectRef.current.position.lerp(vec, 0.8)
        }
        else {

        }

    })
    
    const dogHover = () => {
        if (props.playGame) {
            setSelectedAnimalHover(1);
        }
    }

    const dogClick = () => {
        if (props.playGame) {
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
            props.terminate()
            console.log("Back is clicked.")
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

                <mesh position={[-1.5, -0.1, 1]} scale={[0.6, 0.6, 0.1]} rotation={[0, 0, 0]} ref={dogRef} onClick={dogClick} onPointerOver={dogHover}>
                    {/* Dog */}
                    <boxGeometry/>
                    <meshBasicMaterial color="white" />
                </mesh>

                <mesh position={[-0.7, -0.1, 1]} scale={[0.6, 0.6, 0.1]} rotation={[0, 0, 0]} onClick={catClick} onPointerOver={catHover}>
                    {/* Cat */}
                    <planeGeometry />
                    <meshBasicMaterial color="white" />
                </mesh>

                <mesh position={[0.1, -0.1, 1]} scale={[0.6, 0.6, 0.1]} rotation={[0, 0, 0]} onClick={skunkClick} onPointerOver={skunkHover}>
                    {/* Skunk */}
                    <planeGeometry />
                    <meshBasicMaterial color="white" />
                </mesh>

                <mesh position={[0.9, -0.1, 1]} scale={[0.6, 0.6, 0.1]} rotation={[0, 0, 0]} onClick={cowClick} onPointerOver={cowHover}>
                    {/* Cow */}
                    <planeGeometry />
                    <meshBasicMaterial color="white" />
                </mesh>

                <mesh position={[1.7, -0.1, 1]} scale={[0.6, 0.6, 0.1]} rotation={[0, 0, 0]} onClick={pandaClick} onPointerOver={pandaHover}>
                    {/* Panda */}
                    <planeGeometry />
                    <meshBasicMaterial color="white" />
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

            <ambientLight intensity={1} />
            <pointLight position={[200, 200, 100]} intensity={0.5} />
        </Hud>
    </>
}