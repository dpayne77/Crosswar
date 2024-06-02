import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'
import MainMenu from './MainMenu'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001"); // Connection to server

export default function Experience()
{

    return <>

        <Environment preset="city" />

        <color args = {['#241a1a']} attach="background" />

        <PresentationControls
            global
            cursor={false}
            polar={ [0,0] }
            azimuth={ [-0.2, 0.2] }
            config={ {mass: 2, tension: 400 } }
            snap = { { mass: 4, tension: 400 } }
        >
            <MainMenu/>
        </PresentationControls>

    </>
}