import { PerspectiveCamera, Hud, Text, Html, Float } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three';

export default function AboutMe(props)
{
    const { camera, viewport } = useThree()
  
    const text = useRef();
    const redBg = useRef();
    const whiteBg = useRef();
    const starsRef = useRef();
    const starsRefBG = useRef();
    const OKref = useRef();
    const whiteRef= useRef();
    const redRef = useRef();
    const linkedInRef = useRef();
    const gitHubRef = useRef();

    const [clickOkay, setClickOkay] = useState(false)


  
    useFrame(() => {
        
        const vec = new THREE.Vector3(0,1.2,0);

        if (!clickOkay) {
            text.current.position.lerp(vec, 0.1);

            vec.set(0,1.2,-0.5)
            redBg.current.position.lerp(vec,0.13)

            vec.set(0,1.2,-1)
            whiteBg.current.position.lerp(vec,0.15)

            vec.set(12, 0, -5)
            starsRef.current.position.lerp(vec,0.15)

            vec.set(11, 0, -6)
            starsRefBG.current.position.lerp(vec,0.16)

            vec.set(1,-0.75,5.1)
            OKref.current.position.lerp(vec, 0.2)

            vec.set(1,-0.8,5)
            whiteRef.current.position.lerp(vec, 0.2)

            vec.set(-0.5, -1.5, 5.1)
            linkedInRef.current.position.lerp(vec, 0.1)

            vec.set(0.5, -1.5, 5.1)
            gitHubRef.current.position.lerp(vec, 0.08)

            starsRef.current.rotation.z += 0.0005
        }
        else {
            vec.set(0,10,0);
            text.current.position.lerp(vec, 0.1);

            vec.set(0,10,-0.5);
            redBg.current.position.lerp(vec,0.13)

            vec.set(0, 10, -1)
            whiteBg.current.position.lerp(vec,0.15)

            vec.set(50,0,-5)
            starsRef.current.position.lerp(vec,0.1)

            vec.set(50,0,-8);
            starsRefBG.current.position.lerp(vec,0.12)

            vec.set(10,-1.75,5.1)
            OKref.current.position.lerp(vec, 0.2)

            vec.set(10,-1.8,5)
            whiteRef.current.position.lerp(vec, 0.2)

            vec.set(10,-1.8, 4.8)
            redRef.current.position.lerp(vec, 0.2)

            vec.set(-0.5, -10, 5.1)
            linkedInRef.current.position.lerp(vec, 0.2)

            vec.set(0.5, -12.5, 5.1)
            gitHubRef.current.position.lerp(vec, 0.1)

            starsRef.current.rotation.z -= 0.0005

            if (starsRef.current.position.x >= 45) {
                props.terminate();
            }
        }

        linkedInRef.current.rotation.y += 0.04
        gitHubRef.current.rotation.y += 0.04

    });

    const okHoverEvent = () => {
        console.log("HOVER")
        const vec = new THREE.Vector3(1,-0.8,4.9)
        redRef.current.position.copy(vec)
    }

    const okOnClick = () => {

        setClickOkay(true);

    }

    const linkedInClick = () => {
        window.open("https://www.linkedin.com/in/paynedavidl/")
    }

    const gitHubClick = () => {
        window.open("https://www.github.com/dpayne77/")
    }

    return <>
    <Hud renderPriority={2}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      

        <mesh position={[5,-5,12]} rotation={[0, 0, 0.2]}ref={text}>
            <Html className='content' transform  occlude="blending">
                <div
                style={{
                    backgroundColor: 'black',
                    width: viewport.width * 25,
                    height: '200px',
                    maxWidth: '330px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    color: "white",
                    padding: '5px',
                    fontFamily: "Arsenal",
                    fontSize: "13px"
                }}>
                    <p style={{margin: "4px 10px"}}>
                        Hey there!
                    </p>
                    <p style={{margin: "4px 10px"}}>
                        Thanks for checking out <a style={{color: "red"}}>CrossWar</a>!!
                    </p>
                    <p style={{margin: "4px 10px"}}>
                        <a style={{color: "red"}}>CrossWar</a> is a passion project that I've been working on for a while. 
                        I wanted to make a website where I could compete with all my friends in solving mini crosswords. 
                        I hope you can have some fun with it too!
                    </p>
                    <p style={{margin: "4px 10px"}}>
                        My name is <a style={{color: "red"}}>David Payne</a>, and I am a computer science major from the University of Florida!
                    </p>
                    <p style={{margin: "4px 10px"}}>
                        You can check out my LinkedIn and GitHub with the icons below.
                    </p>
                    <p style={{margin: "4px 10px"}}>
                        Also, special thanks to <a style={{color: "red"}}>Cecilia Durst</a>, <a style={{color: "red"}}>C.J. Annunziato</a>, and <a style={{color: "red"}}>Nathan Gilman</a> for their help with Crosswar!
                    </p>
                </div>
            </Html>
        </mesh>

        <mesh position={[5,-5,10]}ref={redBg}>
            <Html className='content' transform rotation={[0, 0, 0.3]} occlude="blending">
                <div
                style={{
                    backgroundColor: 'red',
                    width: viewport.width * 25,
                    height: '200px',
                    maxWidth: '330px',
                    padding: '5px'
                }}>
                </div>
            </Html>
        </mesh>

        <mesh position={[5,-5,8]}ref={whiteBg}>
            <Html className='content' transform rotation={[0, 0, 0.4]} occlude="blending">
                <div
                style={{
                    backgroundColor: 'white',
                    width: viewport.width * 25,
                    height: '200px',
                    maxWidth: '330px',
                    padding: '5px'
                }}>
                </div>
            </Html>
        </mesh>

        <mesh position={[50,0,-5]} scale={[15, 15, 0]} ref={starsRef}>
            <circleGeometry/>
            <meshBasicMaterial map={props.stars}/>
        </mesh>

        <mesh position={[50,0,-8]} scale={[15, 15, 0]} ref={starsRefBG}>
            <circleGeometry/>
            <meshBasicMaterial color="black"/>
        </mesh>





        <Float
            rotationIntensity={0.02}
            floatIntensity={0.01}
            speed={40}
        >
            <mesh position={[0.9,-1.42,50]} scale={[1.1, 0.5, 0.1]} rotation={[0,-0.9,0.1]} ref={redRef} onClick={okOnClick}>
                <planeGeometry/>
                <meshBasicMaterial color="red"/>
            </mesh>
        </Float>

        <group onPointerMove={okHoverEvent}>
        <mesh position={[10,-1.8,5]} scale={[0.8, 0.4, 0.1]} rotation={[0,-0.9,0.1]} onClick={okOnClick} onPointerMove={okHoverEvent} ref={whiteRef}>
            <planeGeometry scale={[1, 0.4, 0]}/>
        </mesh>

        <mesh position={[10,-1.75,5.1]} rotation={[0,-0.9,0.1]} onPointerMove={okHoverEvent} onClick={okOnClick} ref={OKref}>
            
            <Text fontWeight={"bold"} color="black" fontSize={0.4} gpuAccelerateSDF={true}>
                ok
            </Text>
        </mesh>
        </group>

        <Float
            rotationIntensity={0.1}
            floatIntensity={0.1}
            speed={10}
        >
            <mesh position={[-0.5, -10.5, 5.1]} scale={[0.4, 0.4, 0.4]} onClick={linkedInClick} ref={linkedInRef}>
                    <boxGeometry/>
                    <meshBasicMaterial map={props.linkedIn}/>
            </mesh>
        </Float>

        <Float
            rotationIntensity={0.12}
            floatIntensity={0.08}
            speed={10}
        >
            <mesh position={[0.5, -12.5, 5.1]} scale={[0.4, 0.4, 0.4]} onClick={gitHubClick} ref={gitHubRef}>
                    <boxGeometry/>
                    <meshBasicMaterial map={props.gitHub}/>
            </mesh>
        </Float>


        

      <ambientLight intensity={1} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
    </>
}