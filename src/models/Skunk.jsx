import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { DoubleSide, MeshToonMaterial } from 'three'
import { usePlayerAnimations } from '../contexts/playerAnimations'

export function Skunk(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/skunkanim.glb')
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
        actions[names[animationIndex]].fadeOut(0.5);
    }
  }, [animationIndex])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="EarL"
            geometry={nodes.EarL.geometry}
            material={createToonMaterial(materials.DOG)}
            skeleton={nodes.EarL.skeleton}
          />
          <skinnedMesh
            name="EarR"
            geometry={nodes.EarR.geometry}
            material={createToonMaterial(materials.DOG)}
            skeleton={nodes.EarR.skeleton}
          />
          <group name="Hair5">
            <skinnedMesh
              name="Mesh004"
              geometry={nodes.Mesh004.geometry}
              material={createToonMaterial(materials.DOG)}
              skeleton={nodes.Mesh004.skeleton}
            />
            <skinnedMesh
              name="Mesh004_1"
              geometry={nodes.Mesh004_1.geometry}
              material={redToonMaterial}
              skeleton={nodes.Mesh004_1.skeleton}
            />
          </group>
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
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/skunkanim.glb')