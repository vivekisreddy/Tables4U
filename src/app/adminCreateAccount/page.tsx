'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  const handleCreate = (and) => {
    and.preventDefault()
    // bring to admin log in page
    andRefreshDisplay()
  }

  // below is where the GUI for the admin log in page is drawn
  return (
    <div>
      <form onSubmit={handleCreate}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(and) => setEmail(and.target.value)}/>
        <label htmlFor="password"></label>
        <input type="text" id="password" name="password" value={password} onChange={(and) => setPassword(and.target.value)}/>
        <button className="create">Create</button>
      </form>
    </div>
  )
}