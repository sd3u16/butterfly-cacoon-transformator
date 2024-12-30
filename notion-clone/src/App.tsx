import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { isCompositeComponent } from 'react-dom/test-utils';

type StageNames = "Caterpillar" | "Cocoon" | "Butterfly";

interface LifeStage{
  component:string;
  clicksNeeded: number;
  nextStage: StageNames | null;
}

const lifeStages: Record<StageNames, LifeStage> = {
  Caterpillar: {
    component: 'Caterpillar',
    clicksNeeded: 10,
    nextStage:"Cocoon"
  },
  Cocoon: {component: 'Cocoon', clicksNeeded:10, nextStage: "Butterfly"},
  Butterfly: {component: 'Butterfly', clicksNeeded:0, nextStage: null},
}

function App() {

  const [stage, setStage] = useState<LifeStage>(lifeStages.Caterpillar)
  const [clickCount, setClickCount] = useState<number>(0)
  const [isPressed, setIsPressed] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseDown = () =>{
    setIsPressed(true);
  }

  const handleMouseUp = () => {
    timeoutRef.current = setTimeout(()=>{
      setIsPressed(false)
      timeoutRef.current = null;
    }, 50)
  }

  const handleClick = () =>{
    if(clickCount < stage.clicksNeeded -1){
      setClickCount(prevCount => prevCount +1)
    } else if (stage.nextStage){
      setStage(lifeStages[stage.nextStage]);
      setClickCount(0)
    }
  }

  const StageComponent = stage.component
  

  return (
    <div className='container' onClick={handleClick} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseLeave={handleMouseUp}>
      <StageComponent style={{scale: isPressed ? "0.95":"1"}} className="clickable" />
    </div>
  )
}

export default App
