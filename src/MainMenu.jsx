import { OrbitControls, CameraControls, PerspectiveCamera, useTexture, Hud, Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import {TextureLoader } from 'three/src/loaders/TextureLoader'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import HowToPlay from './HowToPlay';
import AboutMe from './AboutMe';
import PlayGame from './PlayGame';
import { Skunk } from './models/Skunk';
import { Cow } from './models/Cow'
import { Panda } from './models/Panda'
import { Cat } from './models/Cat'
import { Dog } from './models/Dog'


export default function MainMenu() {


    const scene = useGLTF('./models/standFULL.glb')
    const {gl, camera} = useThree();
    const { width, height } = useThree(state => state.viewport);
    const { viewport } = useThree();

    const [stars, linkedIn, gitHub, dog, cat, skunk, cow, panda] = useTexture([
        './textures/persona5_stars_large.jpg',
        './textures/linkedIn.jpg',
        './textures/GitHub.jpg',
        './textures/icons/ICON_Dog.png',
        './textures/icons/ICON_Cat.png',
        './textures/icons/ICON_Skunk.png',
        './textures/icons/ICON_Cow.png',
        './textures/icons/ICON_Panda.png',
    ])

    const coords = new THREE.Vector3(-30,5,10)

    const [menuPositions, setMenuPositions] = useState({
        play: [ - viewport.width / 2 + 0.2, -viewport.height / 2.5 + 2.4, 0],
        how: [ - viewport.width / 2 + 0.8, -viewport.height / 2.5 + 1.6, 0],
        about: [ - viewport.width / 2 + 1.6, -viewport.height / 2.5 + 0.8, 0],
        report: [ - viewport.width / 2 + 2.4, -viewport.height / 2.5 + 0, 0]
    });
    const [cameraStart, setCameraStart] = useState(false);

    // Menu Refs
    const playGameRef = useRef();
    const selectionRef= useRef();
    const cameraControlsRef = useRef();

    // Model Refs
    const stand = useRef();
    const dogRef = useRef();
    const catRef = useRef();
    const skunkRef = useRef();
    const cowRef = useRef();
    const pandaRef = useRef();

    const characterRefs = [dogRef, catRef, skunkRef, cowRef, pandaRef]

    // State
    const [playGameClick, setPlayGameClick] = useState(false);
    const [howToPlayClick, setHowToPlayClick] = useState(false);
    const [aboutMeClick, setAboutMeClick] = useState(false);

    useFrame((state, delta) => {
        const look = new THREE.Vector3(-20,10,-9)
        

    })

    useEffect(() => {
        const handleResize = () => {
            const {viewport} = useThree();
            setMenuPositions( {
                play: [ - viewport.width / 2 + 0.2, -viewport.height / 2.5 + 2.4, 0],
                how: [ - viewport.width / 2 + 0.8, -viewport.height / 2.5 + 1.6, 0],
                about: [ - viewport.width / 2 + 1.6, -viewport.height / 2.5 + 0.8, 0],
                report: [ - viewport.width / 2 + 2.4, -viewport.height / 2.5 + 0, 0],
            })
        };
 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    useEffect(() => {
        cameraControlsRef.current.setPosition(-20,5,10, true)
        cameraControlsRef.current.setTarget(-10,10,-9, true)
    }, []);



    const playGameHover = () => {
        if (!playGameClick && !howToPlayClick && !aboutMeClick) {
            const pos = new THREE.Vector3(- viewport.width / 2 - 1, -viewport.height / 2.5 + 2.4, -1.6);
            selectionRef.current.position.copy(pos);
            //selectionRef.current.position.lerp(pos, 0.2);

            cameraControlsRef.current.setTarget(-8,9,-3, true)
            cameraControlsRef.current.setPosition(-2.7,11,2, true)
        }
        
    }

    const playGameClickEvent = () => {
        console.log("TEST")
        if (!playGameClick && !howToPlayClick && !aboutMeClick) {
            setPlayGameClick(true);

            cameraControlsRef.current.setPosition(-24,10,-8, true)
            cameraControlsRef.current.setTarget(-8,10,-12, true)
        }
    }
    
    const playGameClickOff = () => {
        setPlayGameClick(false);
        cameraControlsRef.current.setTarget(-8,9,-3, true)
        cameraControlsRef.current.setPosition(-2.7,11,2, true)
    }

    const howToPlayHover = () => {
        if (!playGameClick && !howToPlayClick && !aboutMeClick) {
            const pos = new THREE.Vector3(menuPositions.how[0] - 1, menuPositions.how[1]-0.2, -1.6);
            selectionRef.current.position.copy(pos);
            //selectionRef.current.position.lerp(pos, 0.2);

            cameraControlsRef.current.setTarget(4,13.8,-7.2, true)
            cameraControlsRef.current.setPosition(6,13.8,0, true)
        }
    }
    const aboutMeHover = () => {
        if (!playGameClick && !howToPlayClick && !aboutMeClick) {
            const pos = new THREE.Vector3(menuPositions.about[0] - 0.8, menuPositions.about[1]-0.2, -1.6);
            selectionRef.current.position.copy(pos);
            //selectionRef.current.position.lerp(pos, 0.2);

            cameraControlsRef.current.setTarget(10,8,-5, true)
            cameraControlsRef.current.setPosition(10,14,2, true)
        }
    }
    const reportBugsHover = () => {
        if (!playGameClick && !howToPlayClick && !aboutMeClick) {
            const pos = new THREE.Vector3(menuPositions.report[0] - 0.6, menuPositions.report[1]-0.5, -1.6);
            selectionRef.current.position.copy(pos);
            //selectionRef.current.position.lerp(pos, 0.2);

            cameraControlsRef.current.setTarget(12,10.5,-11, true)
            cameraControlsRef.current.setPosition(21,10.5,-8, true)
        }
    }

    const howToPlayClickEvent = () => {
        if (!playGameClick && !howToPlayClick && !aboutMeClick) {
            setHowToPlayClick(true);
        }
    }

    const howToPlayClickOff = () => {
        setHowToPlayClick(false);
    }

    const aboutMeClickEvent = () => {
        if (!playGameClick && !howToPlayClick && !aboutMeClick) {
            setAboutMeClick(true);
        }
    }

    const aboutMeClickOff = () => {
        setAboutMeClick(false);
    }

    const selectClick = () => {
        console.log("RED GUY")
    }

    const reportBugsClick = () => {
        window.open("https://github.com/dpayne77/Crosswar/issues")
    }

    return <>

        <mesh position={[-16,-1,-12]} scale={[3,3,3]} rotation={[0,-1,0]} ref={dogRef} visible={false}>
            <Dog />
        </mesh>

        <mesh position={[-16,-1,-12]} scale={[3,3,3]} rotation={[0,-1,0]} ref={catRef} visible={false}>
            <Cat />
        </mesh>

        <mesh position={[-16,-1,-12]} scale={[3,3,3]} rotation={[0,-1,0]} ref={skunkRef} visible={true}>
            <Skunk />
        </mesh>

        <mesh position={[-16,-1,-12]} scale={[3,3,3]} rotation={[0,-1,0]} ref={cowRef} visible={false}>
            <Cow />
        </mesh>

        <mesh position={[-16,-1,-12]} scale={[3,3,3]} rotation={[0,-1,0]} ref={pandaRef} visible={false}>
            <Panda />
        </mesh>
        

        <CameraControls ref={cameraControlsRef}/>


        <directionalLight position={[1, 1, 1]} intensity={2} color={'WhiteSmoke'}/>

        <primitive 
            object={scene.scene} 
            position-y={ -1.2 }
            ref={stand}
        >
            <meshToonMaterial 
            />
        </primitive>


        <Text
            fontSize={0.3}
            position={[-8.3,9.5,-2.48]}
            rotation={[0, Math.PI / 6.5 ,0]}
            font='./fonts/powerpuff.ttf'
            color={'white'}
            outlineOpacity={1}
        >
                Play Game
        </Text>

        <Text
            fontSize={0.8}
            position={[6,13.8,-6.4]}
            rotation={[0, 0 ,0.2]}
            font='./fonts/powerpuff.ttf'
            color={'white'}
            outlineOpacity={1}
            maxWidth={1}
        >
                How To Play
        </Text>

        <Text
            fontSize={0.5}
            position={[10.6,11.0,-4]}
            rotation={[-0.7, -0.25 , -0.27]}
            font='./fonts/powerpuff.ttf'
            color={'black'}
            outlineOpacity={1}
        >
                About Me
        </Text>
        <Text
            fontSize={0.5}
            position={[11.85,14,-15]}
            rotation={[-0.4, Math.PI/2 , 0]}
            font='./fonts/powerpuff.ttf'
            color={'black'}
            outlineOpacity={1}
        >
                Report Bugs
        </Text>


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
                    onPointerMove={playGameHover}
                    onClick={playGameClickEvent}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        color={'white'}
                        rotation-y={Math.PI/4}
                        outlineOpacity={1}
                        ref={playGameRef}
                    >
                            Play Game
                    </Text>
                </mesh>

                <mesh
                    position={[ menuPositions.how[0], menuPositions.how[1], menuPositions.how[2],]}
                    onPointerMove={howToPlayHover}
                    onClick={howToPlayClickEvent}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        rotation-y={Math.PI/4}
                        color={'white'}
                        outlineOpacity={1}
                    >
                            How to Play
                    </Text>
                </mesh>

                <mesh
                    position={[ menuPositions.about[0], menuPositions.about[1], menuPositions.about[2],]}
                    onPointerMove={aboutMeHover}
                    onClick={aboutMeClickEvent}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        rotation-y={Math.PI/4}
                        color={'white'}
                        outlineOpacity={1}
                    >
                            About Me
                    </Text>
                </mesh>

                <mesh
                    position={[ menuPositions.report[0], menuPositions.report[1], menuPositions.report[2],]}
                    onPointerMove={reportBugsHover}
                    onClick={reportBugsClick}
                >
                    <Text
                        font="./fonts/Expose-Regular.otf"
                        fontSize={0.5}
                        rotation-y={Math.PI/4}
                        color={'white'}
                        outlineOpacity={1}
                    >
                            Report Bugs
                    </Text>
                </mesh>

                <Float
                    rotationIntensity={0.2}
                    floatIntensity={0.5}
                    speed={40}
                >
                    <mesh 
                        position={[ - viewport.width / 2 - 0.6, -viewport.height / 2.5 + 2.4, -1.6]}
                        scale={[1,1,3]}
                        rotation-y={Math.PI - 1}
                        ref={selectionRef}
                        onPointerMove={selectClick}
                    >
                        <boxGeometry></boxGeometry>
                        <meshBasicMaterial
                            color="red"
                        />
                    </mesh>
                </Float>
            </Float>

            

            <ambientLight intensity={1} />
            <pointLight position={[200, 200, 100]} intensity={0.5} />
        </Hud>

            
        {howToPlayClick ? (
                <HowToPlay stars={stars} terminate={howToPlayClickOff}/>
            ) : (
                null
            )
        }

        {aboutMeClick ? (
                <AboutMe stars={stars} terminate={aboutMeClickOff} linkedIn={linkedIn} gitHub={gitHub}/>
            ) : (
                null
            )
        }

        <PlayGame 
            playGame={playGameClick} 
            terminate={playGameClickOff} 
            dog={dog} 
            cat={cat} 
            skunk={skunk} 
            cow={cow} 
            panda={panda}
            characterRefs={characterRefs}
        />
        
    </>
}