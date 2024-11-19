'use client'                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="board">
        <div className="button-container">
          <button data-testid="0,0" className={css(0,0)} onClick={() => handleClick(0,0)}>{model.contents(0,0)}</button>
          <button data-testid="0,1" className={css(0,1)} onClick={() => handleClick(0,1)}>{model.contents(0,1)}</button>
          <button data-testid="0,2" className={css(0,2)} onClick={() => handleClick(0,2)}>{model.contents(0,2)}</button>
          <button data-testid="0,3" className={css(0,3)} onClick={() => handleClick(0,3)}>{model.contents(0,3)}</button>
          <button data-testid="0,4" className={css(0,4)} onClick={() => handleClick(0,4)}>{model.contents(0,4)}</button>
        </div>
      </div>
    </div>
  )
}
