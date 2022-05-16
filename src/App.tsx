import "./App.css"
import { Canvas } from "@react-three/fiber"
import Sketch from "./Sketch"
import { OrbitControls } from "@react-three/drei"
import PostProcessing from "./PostProcessing"

const App = () => (
  <div className='App'>
    <Canvas>
      <Sketch />
      <PostProcessing />
      <OrbitControls />
    </Canvas>
  </div>
)

export default App
