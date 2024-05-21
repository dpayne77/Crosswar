import { OrbitControls, PerspectiveCamera, Hud, Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import {TextureLoader } from 'three/src/loaders/TextureLoader'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';


export default function MainMenu() {


    const scene = useGLTF('./models/standFULL.glb')
    const {gl, camera} = useThree();
    const { width, height } = useThree(state => state.viewport);
    const { viewport } = useThree();

    const gradientMap = useLoader(TextureLoader, './gradientMaps/threeTone.jpg')
    
    console.log(gradientMap)
    

    const coords = new THREE.Vector3(-30,5,10)

    camera.position.copy(coords)



    // const look = new THREE.Vector3(-20,10,-9)
    // camera.lookAt(look);

    const stand = useRef();
    const ball = useRef();
    const playGameRef = useRef();

    //camera.add(playGameRef.current)

    useFrame((state, delta) => {

        
        //playGameRef.current.position.z -= 10

        //camera.position.x += 1;
        const look = new THREE.Vector3(-20,10,-9)
        camera.lookAt(look);

        // playGameRef.current.lookAt(camera.position)
        

        ball.current.rotation.y += 0.02;
        ball.current.position.copy(look);

    })

    useEffect(() => {
        console.log(camera.position)
    
        
    }, []);

    return <>
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[1, 1, 1]} />
        <mesh
            ref={ball}
        >
            <torusKnotGeometry/>
            {/* <meshStandardMaterial
            color="red">

            </meshStandardMaterial> */}
            <meshToonMaterial 
                color="red"
            />
        </mesh>
        <primitive 
            object={scene.scene} 
            position-y={ -1.2 }
            ref={stand}
        >
            <meshToonMaterial 
            />
        </primitive>



        <Text
            font="./fonts/earwig_factory_rg.otf"
            fontSize={1}
            position={[viewport.width / 2 - 1, viewport.height/2 - 1, 0]}
            color={'white'}
            outlineOpacity={1}
            ref={playGameRef}
        >
                    Play Game
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
                ref={playGameRef}
            >
                    CrossWar
            </Text>

            <Text
                font="./fonts/Expose-Regular.otf"
                fontSize={0.5}
                position={[ - viewport.width / 2 + 1, -viewport.height / 2 + 2.4, 0]}
                color={'white'}
                outlineOpacity={1}
                ref={playGameRef}
            >
                    Play Game
            </Text>

            <Text
                font="./fonts/Expose-Regular.otf"
                fontSize={0.5}
                position={[ - viewport.width / 2 + 1, -viewport.height / 2 + 1.6, 0]}
                color={'white'}
                outlineOpacity={1}
            >
                    How to Play
            </Text>

            <Text
                font="./fonts/Expose-Regular.otf"
                fontSize={0.5}
                position={[ - viewport.width / 2 + 1, -viewport.height / 2 + 0.8, 0]}
                color={'white'}
                outlineOpacity={1}
            >
                    About Me
            </Text>

            <Text
                font="./fonts/Expose-Regular.otf"
                fontSize={0.5}
                position={[ - viewport.width / 2 + 1, -viewport.height / 2 + 0, 0]}
                color={'white'}
                outlineOpacity={1}
            >
                    Report Bugs
            </Text>
            
            <ambientLight intensity={1} />
            <pointLight position={[200, 200, 100]} intensity={0.5} />
        </Hud>
    </>
}