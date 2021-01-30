import React from 'react'
import Icon from '../../../../components/GlobalIcon'
import { getSongAuthor } from '../../../../utils'
import disc from './disc.png'
import needle from './needle.png'
import { CSSTransition } from 'react-transition-group'
import './index.scss'

function NormalPlayer(props) {
  const { song, fullScreen } = props
  const { toggleFullscreen } = props

  return (
    <div className="normal-player-wrapper">
      <div className="background">
        <img src={song.al.picUrl} width='100%' height='100%'/>
      </div>
      <div className="gray-layer"></div>

      <div className="player-header border-fix">
        <div className="back-btn" onClick={() => toggleFullscreen(!fullScreen)}>
          <Icon type='icon-zuojiantou'/>
        </div>
        <div className="text">
          <span className="nam nowrap">{song.name}</span>
          <span className="author">{getSongAuthor(song.ar)}</span>
        </div>
      </div>
      
      <div className="player-content">
        <div className="cover-wrapper">
          <div className="cd" style={{backgroundImage: `url(${disc})`}}>
            <img src={song.al.picUrl} />
          </div>
          <p className='current-lyric'>I don't think about you</p>
        </div>
        <div className="lyric-wrapper"></div>
      </div>

      <div className="player-footer">
        <div className="control-btns">
          <Icon type='icon-liebiaoxunhuan'/>
          <Icon type='icon-shangyiqu'/>
          <Icon type='icon-bofangzhong'/>
          <Icon type='icon-xiayiqu'/>
          <Icon type='icon-bofangduilie'/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(NormalPlayer)