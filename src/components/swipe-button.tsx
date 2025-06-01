import React, { useRef, useState } from "react"
import "./css/swipe-button.css"
import ARROW_SVG from "../assets/arrow.svg"

const SwipeButton = ({ onComplete }: { onComplete: () => void }) => {
  const [offsetX, setOffsetX] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const startDrag = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const thumbOffset = clientX - rect.left - dragX
    setOffsetX(thumbOffset)
    setDragging(true)
  }

  const stopDrag = () => {
    if (!containerRef.current) return
    const containerWidth = containerRef.current.offsetWidth
    if (dragX > containerWidth - 80) {
      onComplete()
    }
    setDragging(false)
    setDragX(0)
  }

  const handleMove = (clientX: number) => {
    if (!dragging || !containerRef.current) return
    const containerWidth = containerRef.current.offsetWidth
    const newX = Math.min(
      Math.max(
        0,
        clientX - containerRef.current.getBoundingClientRect().left - offsetX
      ),
      containerWidth - 60
    )
    setDragX(newX)
  }

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX)
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)
  const progress = containerRef.current?.offsetWidth
    ? Math.min(dragX / (containerRef.current.offsetWidth - 60), 1)
    : 0
  return (
    <div
      ref={containerRef}
      className="swipe-container"
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={onTouchMove}
      onTouchEnd={stopDrag}
    >
      <div
        className="swipe-track"
        style={{
          background: `linear-gradient(to right, #184e7f ${
            progress * 100
          }%, #f8f8f8 ${progress * 100}%)`,
          transition: dragging ? "none" : "background 0.3s ease",
        }}
      >
        <div className={`swipe-text `}>Swipe to Order</div>
        <div
          className="swipe-thumb"
          style={{ transform: `translateX(${dragX}px)` }}
          onMouseDown={(e) => startDrag(e.clientX)}
          onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        >
          <img src={ARROW_SVG} alt="arrow" />
        </div>
      </div>
    </div>
  )
}

export default SwipeButton
