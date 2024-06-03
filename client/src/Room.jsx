import { CameraControls, PresentationControls, PerspectiveCamera, Environment, Hud, Float, Text, useHelper , Html, useTexture} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Skunk } from './models/Skunk';
import { Cow } from './models/Cow'
import { Panda } from './models/Panda'
import { Cat } from './models/Cat'
import { Dog } from './models/Dog'
import { DirectionalLightHelper } from 'three';

export default function Room( props )
{
    const { viewport } = useThree();
    const {gl, camera} = useThree();

    const groupRef = useRef();
    const playerModelRef = useRef();
    const dirLightRef = useRef();
    const cameraControlsRef = useRef();
    const selectionRef= useRef();

    const [startAnim, setStartAnim] = useState(true)

    const [stars] = useTexture([
        './textures/persona5_stars_large.jpg',
    ])

    useHelper(dirLightRef, DirectionalLightHelper, 1, "red")

    const [menuPositions, setMenuPositions] = useState({
        start: [ - viewport.width / 2 + 0.3, -viewport.height / 2.5 + 2.4, 0],
        leave: [ - viewport.width / 2 + 0.9, -viewport.height / 2.5 + 1.2, 0],
        about: [ - viewport.width / 2 + 1.6, -viewport.height / 2.5 + 0.8, 0],
        report: [ - viewport.width / 2 + 2.4, -viewport.height / 2.5 + 0, 0]
    })

    useFrame(() => {
        if (startAnim) {
            groupRef.current.scale.x += 0.05
            groupRef.current.scale.y += 0.05
            groupRef.current.scale.z += 0.05

            if (groupRef.current.scale.x >= 1.10) {
                groupRef.current.scale.x = 1.0
                groupRef.current.scale.y = 1.0
                groupRef.current.scale.z = 1.0
                setStartAnim(false)
            }
        }

        //)

    })

    // useEffect(() => {
    //     if (groupRef.current.scale.x == 1) {
    //         setStartAnim(false)
    //     }
    // }, [groupRef.current.scale.x])

    useEffect(() => {
        cameraControlsRef.current.setPosition(-10,10,-12, true)
        cameraControlsRef.current.setTarget(0,5,0, true)
    }, [])

    const startGameHover = () => {
        const vec = new THREE.Vector3(menuPositions.start[0]-0.3, menuPositions.start[1], menuPositions.start[2] - 0.5)
        selectionRef.current.position.copy(vec)
    }

    const startGameClick = () => {
        //TBD
    }

    const leaveRoomHover = () => {
        const vec = new THREE.Vector3(menuPositions.leave[0]-0.2, menuPositions.leave[1]-0.1, menuPositions.leave[2] - 0.5)
        selectionRef.current.position.copy(vec)
    }

    const leaveRoomClick = () => {

    }

    return <>
        <CameraControls ref={cameraControlsRef}/>
        <directionalLight position={[1, 15, -5]} intensity={2} color={'WhiteSmoke'} ref={dirLightRef}/>
        <group ref={groupRef} scale={[0,0,0]}>
            {
                props.playerAnimalIndex == 1 ? (
                    <mesh position={[-10, 0, 0]} rotation={[0,Math.PI/2,0]} scale={[2,2,2]} ref={playerModelRef}>
                        <Dog />
                    </mesh>
                ) : (
                    props.playerAnimalIndex == 2 ? (
                        <mesh position={[-10, 0, 0]} rotation={[0,Math.PI/2,0]} scale={[2,2,2]} ref={playerModelRef}>
                            <Cat />
                        </mesh>
                    ) : (
                        props.playerAnimalIndex == 3 ? (
                            <mesh position={[-10, 0, 0]} rotation={[0,Math.PI/2,0]} scale={[2,2,2]} ref={playerModelRef}>
                                <Skunk />
                                <Html position={[0.2,5,0.3]} occlude={true}>
                                    <div className='usernameInner'>
                                        {props.playerUsername}
                                    </div>
                                </Html>
                            </mesh>
                        ) : (
                            props.playerAnimalIndex == 4 ? (
                                <mesh position={[-10, 0, 0]} rotation={[0,Math.PI/2,0]} scale={[2,2,2]} ref={playerModelRef}>
                                    <Cow />
                                    <Html position={[0.2,5,0.3]} occlude={true}>
                                        <div className='usernameInner'>
                                            {props.playerUsername}
                                        </div>
                                    </Html>
                                </mesh>
                            ) : (
                                props.playerAnimalIndex == 5 ? (
                                    <mesh position={[-10, 0, 0]} rotation={[0,Math.PI/2,0]} scale={[2,2,2]} ref={playerModelRef}>
                                        <Panda />
                                    </mesh>
                                ) : (
                                    null
                                )
                            )
                        )
                    )
                )
            }
        </group>

        <Hud renderPriority={1}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />

            {/* <Text
                    fontSize={0.4}
                    position={[ - viewport.width / 2, viewport.height / 2 + 0.5, 0]}
                    color={'white'}
                    outlineOpacity={1}
                    rotation={[0,0,0.1]}
                    font="./fonts/Arsenal-Bold.ttf"
                >
                        Room: {props.playerRoom}
            </Text>
            <mesh
                position={[ - viewport.width / 2, viewport.height / 2 + 0.6, 0]}
                scale={[2.4,1,3]}
                rotation={[0,0,0.1]}
            >
                <planeGeometry/>
                <meshBasicMaterial color="black"/>
            </mesh>

            <mesh
                position={[ - viewport.width / 2 - 0.1, viewport.height / 2 + 1.4, -0.1]}
                scale={[2.7, 2.7,3]}
                rotation={[0,0,0.1]}
            >
                <planeGeometry/>
                <meshBasicMaterial map={stars} />
            </mesh> */}


            <Float
                rotationIntensity={0.6}   
                floatIntensity={0.3}
                speed={1}
            >
                <mesh
                    position={[ menuPositions.start[0], menuPositions.start[1], menuPositions.start[2],]}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        color={'white'}
                        rotation-y={Math.PI/4}
                        outlineOpacity={1}
                        onPointerEnter={startGameHover}
                        onClick={startGameClick}
                    >
                            Start Game
                    </Text>
                </mesh>

                <mesh
                    position={[ menuPositions.leave[0], menuPositions.leave[1], menuPositions.leave[2],]}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        rotation-y={Math.PI/4}
                        color={'white'}
                        outlineOpacity={1}
                        onPointerEnter={leaveRoomHover}
                        onClick={leaveRoomClick}
                    >
                            Leave Room
                    </Text>
                </mesh>

                <Float
                    rotationIntensity={0.2}
                    floatIntensity={0.5}
                    speed={40}
                >
                    <mesh
                        position={[ menuPositions.start[0]-0.3, menuPositions.start[1], menuPositions.start[2] - 0.5]}
                        rotation={[0,0.7855,0]}
                        scale={[2.7,1,1]}
                        ref={selectionRef}
                    >
                        <planeGeometry/>
                        <meshBasicMaterial color="red" />
                    </mesh>
                </Float>
            </Float>
        </Hud>


    </>
}