import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { InstancedMesh } from "three"
import { fragment } from "./shaders/fragment"
import { vertex } from "./shaders/vertex"

const numberOfRings = 500

const createAttribute = (length: number, fn: any) =>
  Float32Array.from({ length: numberOfRings }, fn)

const Sketch = () => {
  const ref = useRef<InstancedMesh>(null!)

  const ring = useMemo(() => {
    const numberOfPoint = 100
    let curvePoints = []
    for (let i = 0; i < numberOfPoint; i++) {
      const theta = (i / numberOfPoint) * Math.PI * 2

      curvePoints.push(
        new THREE.Vector3().setFromSphericalCoords(2, Math.PI / 2, theta)
      )
    }

    const curve = new THREE.CatmullRomCurve3(curvePoints)
    //@ts-ignore
    curve.closed = true
    //@ts-ignore
    curve.tension = 0.7

    const tube = new THREE.TubeBufferGeometry(curve, 100, 0.005, 8, false)

    const geometry = new THREE.InstancedBufferGeometry()
    geometry.index = tube.index
    geometry.attributes = tube.attributes

    const scale = createAttribute(numberOfRings, () => 1 + Math.random() * 0.1)
    const rotation = createAttribute(
      numberOfRings,
      () => (Math.random() - 0.5) * Math.PI * 4
    )
    const offset = createAttribute(numberOfRings, () => Math.random() * 0.5)
    const speed = createAttribute(numberOfRings, () => Math.random() * 0.25)

    geometry.setAttribute("scale", new THREE.InstancedBufferAttribute(scale, 1))
    geometry.setAttribute(
      "rotation",
      new THREE.InstancedBufferAttribute(rotation, 1)
    )

    geometry.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(offset, 1)
    )

    geometry.setAttribute("speed", new THREE.InstancedBufferAttribute(speed, 1))

    return new THREE.InstancedMesh(
      geometry,
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        depthTest: true,
      }),
      numberOfRings
    )
  }, [])

  useFrame(
    ({ clock }) =>
      //@ts-ignore
      (ref.current.material.uniforms.uTime.value = clock.getElapsedTime())
  )

  return <primitive ref={ref} object={ring} />
}

export default Sketch
