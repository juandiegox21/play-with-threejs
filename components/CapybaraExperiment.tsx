'use client'

import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'

export default function CapybaraExperiment() {
    const mountRef = useRef(null)

    useEffect(() => {
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 1.5

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)

        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 0.6

        renderer.outputColorSpace = THREE.SRGBColorSpace

        mountRef.current.appendChild(renderer.domElement)

        const texture = new RGBELoader().load('../images/river.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularRefractionMapping
            scene.background = texture
            scene.environment = texture
        })

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0,
            reflectivity: 1,
            envMap: texture,
        })

        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        })

        new OrbitControls(camera, renderer.domElement)

        const gridHelper = new THREE.GridHelper(30, 30)
        scene.add(gridHelper)

        const stats = new Stats()
        document.body.appendChild(stats.dom)

        const gui = new GUI()

        const cubeFolder = gui.addFolder('Cube')
        cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
        cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
        cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
        cubeFolder.add(cube.material, 'metalness', 0, 1, 0.01)
        cubeFolder.add(cube.material, 'roughness', 0, 1, 0.01)
        cubeFolder.add(cube.material, 'reflectivity', 0, 1, 0.01)
        cubeFolder.open()

        function animate() {
            requestAnimationFrame(animate)

            cube.rotation.y += 0.001

            renderer.render(scene, camera)

            stats.update()
        }

        animate()

        return () => {
            renderer.dispose()
            mountRef.current.removeChild(renderer.domElement)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <div ref={mountRef}></div>
}
