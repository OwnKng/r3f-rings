//@ts-nocheck
import { useRef, useEffect, useMemo } from "react"
import { extend, useThree, useFrame } from "@react-three/fiber"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import * as THREE from "three"

extend({ EffectComposer, RenderPass, UnrealBloomPass })

const PostProcessing = () => {
  const { scene, gl, camera, size } = useThree()

  const composer = useRef<EffectComposer>(null!)

  useEffect(
    () => void scene && composer.current.setSize(size.width, size.height),
    [size, scene]
  )

  const effect = useMemo(
    () =>
      new UnrealBloomPass(
        new THREE.Vector2(size.width, size.height),
        2.0,
        0.8,
        0.2
      ),
    [size]
  )

  useFrame(() => scene && composer.current.render(), 1)

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray='passes' scene={scene} camera={camera} />
      <primitive attachArray='passes' object={effect} dispose={null} />
    </effectComposer>
  )
}

export default PostProcessing
