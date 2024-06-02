import { PresentationControls, Environment, } from '@react-three/drei'
import { useState } from 'react';
import io from 'socket.io-client'
import MainMenu from './MainMenu'
import Room from './Room'

const socket = io.connect("http://localhost:3001"); // Connection to server

export default function Experience()
{

    // Player Variables
    const [playerUsername, setPlayerUsername] = useState("")
    const [playerAnimalIndex, setPlayerAnimalIndex] = useState(3)
    const [playerRoom, setPlayerRoom] = useState("")


    // Home Screen Variables
    const [showHomeScreen, setShowHomeScreen] = useState(true)
    const [homeScreenTransitionOut, setHomeScreenTransitionOut] = useState(false)

    /*
     * Socket.io functions 
    */ 

    const joinRoom = (username, room, animalIndex) => { // Called when a user tries to join a room
        if(username !== "" && room !== "") { // if username and room are not empty
            const userData = {
                username: username,
                room: room,
                animalIndex: animalIndex,
                id: socket.id
            }

            setPlayerUsername(username)
            setPlayerAnimalIndex(animalIndex)
            setPlayerRoom(room)

            socket.emit("join_room", userData) // tell server to join user to room, sends a variable with entered username and room to server
        }
    }

    
    socket.off("reject_player").on("reject_player", (data) => { // Room is full
        alert("This room is full! Please try again later or choose a different room.")
    });

    socket.off("accept_player").on("accept_player", (data) => { // Room is good to join!
        console.log("Join the room!")

        setTimeout(() => setShowHomeScreen(false), 1000)

        //setShowHomeScreen(false);
    });

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
            {showHomeScreen ? (
                <MainMenu joinRoom={joinRoom}/>
            ) : (
                <Room playerUsername={playerUsername} playerRoom={playerRoom} playerAnimalIndex={playerAnimalIndex} />
            )}

        </PresentationControls>

    </>
}