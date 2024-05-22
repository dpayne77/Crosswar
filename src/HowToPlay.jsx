import { OrbitControls, CameraControls, PerspectiveCamera, Hud, Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import {TextureLoader } from 'three/src/loaders/TextureLoader'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';

export default function HowToPlay()
{
    const { camera, viewport } = useThree()
  
    const text = useRef();

    // function lerp(from, to, speed) {
    //     const r = (1 - speed) * from + speed * to
    //     return Math.abs(from - to) < 0.001 ? to : r
    // }
  
    useFrame(() => {
    //   if (text) {
    //     text.current.rotation.z += 0.0001;
    //   }
        // text.current.position = lerp(text.current.position, 0, 0.4)
        const vec = new THREE.Vector3(0,0,0);
        text.current.position.lerp(vec, 0.1);
    });

    return <>
    <Hud renderPriority={2}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />

        <mesh position={[5,-5,6]}ref={text}>
            <Html className='content' transform rotation={[0, 0, 0.2]} >
                <div
                style={{
                    backgroundColor: 'black',
                    width: viewport.width * 30,
                    height: '300px',
                    maxWidth: '330px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    color: "white",
                    padding: '5px'
                }}>
                    taiweaweawefawefawe fawe fawe fawe awef awef awef awe awef awef awef awef awef awef awef awef awef awef awef awef ambientLightwaef awef 
                    awef awef awef awef awef aewf awefawe fa wef 
                    awef awef awef awef awef awef awefawef awef awefawef

                    awefawefawef
                    awefawefawefawefawe awefawef aawefawefawefawef
                    awefawef awe
                    awefawef
                    awefawef
                    awefawefawefawefawefawefawef

                </div>
            </Html>
        </mesh>

      <ambientLight intensity={1} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
    </>
}