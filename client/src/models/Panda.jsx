import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { DoubleSide, MeshToonMaterial } from 'three'
import { usePlayerAnimations } from '../contexts/playerAnimations'

export function Panda(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('./models/pandaanim.glb')
    const { actions, names } = useAnimations(animations, group)
    const { setAnimations, animationIndex } = usePlayerAnimations(animations, group)
    
    const [ firstRender, setFirstRender ] = useState(true) // Prevent model from having a visible T pose
  
    const redToonMaterial = new MeshToonMaterial({ color: 'red' })
  
    // Helper function to create a toon material with texture maps
    const createToonMaterial = (originalMaterial) => {
      return new MeshToonMaterial({
        map: originalMaterial.map,
        normalMap: originalMaterial.normalMap,
        displacementMap: originalMaterial.displacementMap,
        displacementScale: originalMaterial.displacementScale,
        side: DoubleSide
      })
    }
  
    useEffect(() => {
      // Apply toon material to each skinned mesh
      Object.values(nodes).forEach((node) => {
        if (node.isSkinnedMesh) {
          const originalMaterial = node.material
          const toonMaterial = createToonMaterial(originalMaterial)
          node.material = toonMaterial
        }
      })
    }, [nodes])
  
    useEffect(() => {
      //console.log(actions);
      const currAction = actions.idle1;
      currAction.play();
    }, [])
  
    useEffect(() => {
      setAnimations(names);
    }, [names])
  
    useEffect(() => {
      if (!firstRender) { // Prevent model from having a visible T pose
          actions[names[animationIndex]].reset().fadeIn(0.5).play();
      }
      else {
          setFirstRender(false);
      }
  
      return () => {
        try {
          actions[names[animationIndex]].fadeOut(0.5);
        }
        catch (error) {
        }
      }
    }, [animationIndex])


    return (
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Head">
              <skinnedMesh
                name="Mesh"
                geometry={nodes.Mesh.geometry}
                material={createToonMaterial(materials.DOG)}
                skeleton={nodes.Mesh.skeleton}
              />
              <skinnedMesh
                name="Mesh_1"
                geometry={nodes.Mesh_1.geometry}
                material={redToonMaterial}
                skeleton={nodes.Mesh_1.skeleton}
              />
              <skinnedMesh
                name="Mesh_2"
                geometry={nodes.Mesh_2.geometry}
                material={redToonMaterial}
                skeleton={nodes.Mesh_2.skeleton}
              />
            </group>
            <skinnedMesh
              name="Head001"
              geometry={nodes.Head001.geometry}
              material={createToonMaterial(materials.DOG)}
              skeleton={nodes.Head001.skeleton}
            />
            <skinnedMesh
              name="Head002"
              geometry={nodes.Head002.geometry}
              material={createToonMaterial(materials.DOG)}
              skeleton={nodes.Head002.skeleton}
            />
            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
    )
  }
  
  useGLTF.preload('./models/pandaanim.glb')