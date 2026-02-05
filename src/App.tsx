import './App.css'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [clicked, setClicked] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const imageYes = 'gat.webp' 

  const handleClickYes = () => {
    setClicked(true)
  }

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    
    const cardRect = cardRef.current.getBoundingClientRect()
    const cardWidth = cardRect.width
    const cardHeight = cardRect.height
    
    let randomX = Math.random() * (cardWidth - 150)
    let randomY = Math.random() * (cardHeight - 50)
    
    // Asegurar que está lo suficientemente lejos de la posición anterior
    if (position) {
      const distance = Math.sqrt(Math.pow(randomX - position.x, 2) + Math.pow(randomY - position.y, 2))
      if (distance < 100) {
        randomX = (randomX + cardWidth / 2) % (cardWidth - 150)
        randomY = (randomY + cardHeight / 2) % (cardHeight - 50)
      }
    }
    
    setPosition({ x: randomX, y: randomY })
  }

  return (
    <>
      <Card ref={cardRef} className="relative mx-auto w-full max-w-sm pt-0 style">
        <img
          src={clicked ? imageYes : 'gatoromantico.webp'}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-100 rounded-t-3xl"
        />
        <CardHeader>
          <CardTitle>{clicked ? 'Sabria que dirias que si ❤️' : 'Camila QLZO Quieres ser mi San valentin❤️❤️❤️!!!'}</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-center gap-4">
          <Button size="lg" onClick={handleClickYes}>Siii...❤️</Button>
          <Button
            onMouseEnter={handleMouseEnter}
            style={position ? {
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 50,
            } : undefined}
          >
            NO🙄🙄🙄
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default App
