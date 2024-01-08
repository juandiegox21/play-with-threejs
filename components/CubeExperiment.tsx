'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei'
import { DirectionalLight, DirectionalLightHelper } from 'three'
import { useHelper } from '@react-three/drei'

const Cube = () => {
    const lightRef = useRef<DirectionalLight>(null!)
    const [hovered, setHovered] = useState(false)

    useHelper(lightRef, DirectionalLightHelper, 0.5, 'yellow')

    return (
        <>
            <directionalLight
                ref={lightRef}
                castShadow
                position={[0, 5, 0]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <Box
                args={[1, 1, 1]} // Size of the cube
                position={[0, 0.5, 0]} // Position of the cube
                castShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshStandardMaterial attach='material' color={hovered ? 'hotpink' : 'royalblue'} />
            </Box>
            <Plane
                args={[10, 10]} // Plane size
                position={[0, 0, 0]} // Plane position
                rotation={[-Math.PI / 2, 0, 0]} // Rotate the plane to be horizontal
                receiveShadow
            >
                <meshStandardMaterial attach='material' color='#aaa' />
            </Plane>
        </>
    )
}

const CubeExperiment = () => {
    return (
        <Canvas style={{ width: '60vw', height: '70vh', border: 'solid 1px' }} shadows>
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 1.6, 5]} />
                <ambientLight intensity={0.5} />
                <Cube />
                {/* Grid Helper */}
                <gridHelper args={[10, 10]} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    )
}

export default CubeExperiment
