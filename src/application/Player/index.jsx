import React, { useCallback, useState } from 'react'
import MiniPlayer from './components/MiniPlayer'
import NormalPlayer from './components/NormalPlayer'
import './index.scss'

const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{name: "薛之谦"}]
}

function Player(props) {
  const [fullScreen, setFullScreen] = useState(false)

  const toggleFullscreen = useCallback((v) => {
    setFullScreen(v)
  }, [])

  return (
    <section className='player-content'>
      <MiniPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullscreen={toggleFullscreen}
      />
      <NormalPlayer 
        song={currentSong} 
        fullScreen={fullScreen}
        toggleFullscreen={toggleFullscreen}
      />
    </section>
  )
}

export default Player