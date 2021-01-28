import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import SvgIcon from '../../components/SvgIcon'
import { getCount } from '../../utils'
import SongList from '../../components/SongList'
import './index.scss'

const currentAlbum = {
  creator: {
    avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
    nickname: "浪里推舟"
  },
  coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
  subscribedCount: 2010711,
  name: "听完就睡，耳机是天黑以后柔软的梦境",
  tracks:[
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
  ]
}

function Album() {
  const { id } = useParams()
  const [showStatus, setShowStatus] = useState(true)
  const [albumInfo, setAlbumInfo] = useState({})

  useEffect(() => {
    setAlbumInfo(currentAlbum)
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames='fly'
      appear
      unmountOnExit
    >
      <section className="album-content">
        <div className="background" style={{backgroundImage: `url(${albumInfo.coverImgUrl})`}}>
          <div className="filter"></div>
        </div>
        <header className='album-header'>
          <SvgIcon type='icon-zuojiantou'/>
          <span>歌单</span>
        </header>
        <div className="album-info-wrapper">
          <div className="album-info">
            <div className="img-wrapper">
              <div className="decorate"></div>
              <img src={albumInfo.coverImgUrl} width='100%' height='100%' />
              <div className="play-count">
                <SvgIcon type='icon-erji'/>
                <span>{getCount(albumInfo.subscribedCount)}</span>
              </div>
            </div>
            <div className="album-desc">
              <span className='album-name'>{albumInfo.name}</span>
              <div className="album-creator">
                <img src={albumInfo.creator && albumInfo.creator.avatarUrl}/>
                <span>{albumInfo.creator && albumInfo.creator.nickname}</span>
              </div>
            </div>
          </div>
          <div className="album-btns">
            <div className="album-btn">
              <SvgIcon type='icon-pinglun1'/>
              <span>评论</span>
            </div>
            <div className="album-btn">
              <SvgIcon type='icon-shoucang'/>
              <span>喜欢</span>
            </div>
            <div className="album-btn">
              <SvgIcon type='icon-tianjiadao'/>
              <span>收藏</span>
            </div>
            <div className="album-btn">
              <SvgIcon type='icon-gengduo1'/>
              <span>更多</span>
            </div>
          </div>
        </div>
        <div className="album-list-wrapper">
          <SongList songList={albumInfo.tracks}/>
        </div>
      </section>
    </CSSTransition>
  )
}

export default Album