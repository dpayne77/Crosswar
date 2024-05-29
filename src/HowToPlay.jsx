import { PerspectiveCamera, Hud, Text, Html, Float } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three';

export default function HowToPlay(props)
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

    const [clickOkay, setClickOkay] = useState(false)


  
    useFrame(() => {
        
        const vec = new THREE.Vector3(0,0.5,0);

        if (!clickOkay) {
            text.current.position.lerp(vec, 0.1);

            vec.set(0,0.5,-0.5)
            redBg.current.position.lerp(vec,0.13)

            vec.set(0,0.5,-1)
            whiteBg.current.position.lerp(vec,0.15)

            vec.set(12, 0, -5)
            starsRef.current.position.lerp(vec,0.15)

            vec.set(11, 0, -6)
            starsRefBG.current.position.lerp(vec,0.16)

            vec.set(1,-1.75,5.1)
            OKref.current.position.lerp(vec, 0.2)

            vec.set(1,-1.8,5)
            whiteRef.current.position.lerp(vec, 0.2)

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

            starsRef.current.rotation.z -= 0.0005

            if (starsRef.current.position.x >= 45) {
                props.terminate();
            }
        }

    });

    const okHoverEvent = () => {
        console.log("HOVER")
        const vec = new THREE.Vector3(1,-1.85,4.9)
        redRef.current.position.copy(vec)
    }

    const okOnClick = () => {

        setClickOkay(true);

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
                    height: '250px',
                    maxWidth: '330px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    color: "white",
                    padding: '5px',
                    fontFamily: "Arsenal",
                    fontSize: "13px"
                }}>
                    <p style={{margin: "4px 10px"}}>
                        How to Play: WIP
                        eaf
                        aef
                        awfe
                        awef
                        awef
                        awef
                        awef
                        awef
                        awfeawef
                        awef
                        awfewaef
                        wefa
                        fawe
                        awfe
                        aw
                        eaw
                        faw
                        ef
                        awe
                        faw
                        ef
                        awe
                        Lorem ipsum dolor sit amet. Et rerum dicta ut porro Quis est excepturi quibusdam et aperiam delectus ab doloribus atque qui impedit iure. Sed odit nobis sit soluta quaerat aut fuga vero non corporis cumque! Hic voluptatem facere hic minus iusto et quos quasi ut iusto vero qui esse eveniet!

Nam perferendis reiciendis in pariatur vitae non rerum tenetur ut obcaecati necessitatibus ut sunt assumenda et possimus Quis? Ut nisi similique nam illum neque ut officia quasi est facere sint nam enim minima. Hic illo deserunt id rerum porro et reprehenderit pariatur qui beatae sint sed fuga praesentium.

Et quisquam pariatur non eius odio ut aperiam dolorem ad animi galisum! Sit dignissimos nihil est minima laboriosam ut totam laudantium. Eos iure eius et repellendus fugiat id temporibus voluptates et explicabo voluptatem aut dolores dolor. Sit voluptatem eaque non galisum nulla et vitae voluptatem eum quam officiis quo molestiae quibusdam.
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
                    height: '250px',
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
                    height: '250px',
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
        

      <ambientLight intensity={1} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
    </>
}