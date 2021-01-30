import React, { useRef } from 'react'
import { getSongAuthor } from '../../../../utils'
import Icon from '../../../../components/GlobalIcon'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

function MiniPlayer(props) {
  const miniPlayerRef = useRef(null)

  const { song, fullScreen } = props
  const { toggleFullscreen } = props

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames='mini'
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex'
      }}
      onExit={() => {
        miniPlayerRef.current.style.display = 'none'
      }}
    >
      <div className="miniplayer-wrapper" ref={miniPlayerRef}>
        <div className="song-info">
          <img className='song-pic' src={song.al.picUrl} onClick={() => toggleFullscreen(!fullScreen)}/>
          <div className="text">
            <span className="name nowrap">{song.name}</span>
            <span className="author nowrap">{getSongAuthor(song.ar)}</span>
          </div>
        </div>
        <div className="btn-wrapper">
          <div className="player-btn">
            <Icon type='icon-bofangzhong'/>
          </div>
          <div className="list-btn">
            <Icon type='icon-bofangduilie'/>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)