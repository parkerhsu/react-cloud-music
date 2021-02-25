import React, { useRef } from 'react'
import Icon from '../../../../components/GlobalIcon'
import { getSongAuthor } from '../../../../utils'
import disc from './disc.png'
import needle from './needle.png'
import { CSSTransition } from 'react-transition-group'
import animations from 'create-keyframe-animation'
import './index.scss'

function NormalPlayer(props) {
  const { song, fullScreen } = props
  const { toggleFullscreen } = props

  const normalPlayerRef = useRef(null)
  const cdWrapperRef = useRef(null)

  const transform = 'transform'
  
  const _getPosAndScale = () => {
    const paddingLeft = 40
    const paddingTop = 80
    const paddingBottom = 30
    const miniWidth = 40
    const normalWidth = window.innerWidth * 0.8
    const scale = miniWidth / normalWidth
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - normalWidth / 2 - paddingBottom
    
    return {
      x,
      y,
      scale
    }
  }

  const enter = () => {
    normalPlayerRef.current.style.display = 'flex'
    const { x, y, scale } = _getPosAndScale()
    let animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.2)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    })
    animations.runAnimation(cdWrapperRef.current, 'move')
  }

  const afterEnter = () => {
    cdWrapperRef.current.style.animation = ''
    animations.unregisterAnimation('move')
  }

  const leave = () => {
    const { x, y, scale } = _getPosAndScale()
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = 'all .4s'
    cdWrapperDom.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  }

  const afterLeave = () => {
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ''
    cdWrapperDom.style.transform = ''
    normalPlayerRef.current.style.display = 'none'
  }

  return (
    <CSSTransition
      in={fullScreen}
      timeout={400}
      classNames='normal'
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <div className="normal-player-wrapper" ref={normalPlayerRef}>
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
            <div className="cd" style={{backgroundImage: `url(${disc})`}} ref={cdWrapperRef}>
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
    </CSSTransition>
  )
}

export default React.memo(NormalPlayer)