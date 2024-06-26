import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { PlayerAnimationsProvider } from './contexts/playerAnimations.jsx'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render( <>
        <Canvas
            dpr={[1,2]}
            // camera={ {
            //     fov: 45,
            //     near: 0.1,
            //     far: 2000,
            //     position: [ -2, 17, 26 ]
            // } }
            className='r3f'
        >
            <PlayerAnimationsProvider>
                <Suspense fallback={null}>
                    <Experience />
                </Suspense>
            </PlayerAnimationsProvider>
        </Canvas>
        <Loader />
    </>
)