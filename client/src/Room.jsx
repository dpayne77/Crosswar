import { PresentationControls, PerspectiveCamera, Environment, Hud, Float, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react';
import { Skunk } from './models/Skunk';
import { Cow } from './models/Cow'
import { Panda } from './models/Panda'
import { Cat } from './models/Cat'
import { Dog } from './models/Dog'

export default function Room( props )
{
    const { viewport } = useThree();

    const groupRef = useRef();
    const playerModelRef = useRef();

    const [startAnim, setStartAnim] = useState(true)

    const [menuPositions, setMenuPositions] = useState({
        play: [ - viewport.width / 2 + 0.2, -viewport.height / 2.5 + 2.4, 0],
        how: [ - viewport.width / 2 + 0.8, -viewport.height / 2.5 + 1.6, 0],
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
    })

    // useEffect(() => {
    //     if (groupRef.current.scale.x == 1) {
    //         setStartAnim(false)
    //     }
    // }, [groupRef.current.scale.x])

    return <>
        <directionalLight position={[1, 1, 1]} intensity={2} color={'WhiteSmoke'}/>
        <group ref={groupRef} scale={[0,0,0]}>
            {
                props.playerAnimalIndex == 1 ? (
                    <mesh scale={[3,3,3]} ref={playerModelRef}>
                        <Dog />
                    </mesh>
                ) : (
                    props.playerAnimalIndex == 2 ? (
                        <mesh scale={[3,3,3]} ref={playerModelRef}>
                            <Cat />
                        </mesh>
                    ) : (
                        props.playerAnimalIndex == 3 ? (
                            <mesh scale={[3,3,3]} ref={playerModelRef}>
                                <Skunk />
                            </mesh>
                        ) : (
                            props.playerAnimalIndex == 4 ? (
                                <mesh scale={[3,3,3]} ref={playerModelRef}>
                                    <Cow />
                                </mesh>
                            ) : (
                                props.playerAnimalIndex == 5 ? (
                                    <mesh scale={[3,3,3]} ref={playerModelRef}>
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

            <Text
                    fontSize={0.5}
                    position={[ - viewport.width / 2 + 1, viewport.height / 2, 0]}
                    color={'white'}
                    outlineOpacity={1}
                >
                        CrossWar
            </Text>


            <Float
                rotationIntensity={0.6}   
                floatIntensity={0.3}
                speed={1}
            >
                <mesh
                    position={[ menuPositions.play[0], menuPositions.play[1], menuPositions.play[2],]}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        color={'white'}
                        rotation-y={Math.PI/4}
                        outlineOpacity={1}
                    >
                            Start Game
                    </Text>
                </mesh>

                <mesh
                    position={[ menuPositions.how[0], menuPositions.how[1], menuPositions.how[2],]}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        rotation-y={Math.PI/4}
                        color={'white'}
                        outlineOpacity={1}
                    >
                            Leave Room
                    </Text>
                </mesh>
            </Float>
        </Hud>


    </>
}