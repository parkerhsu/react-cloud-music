import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Icon from '../../components/GlobalIcon'
import { getCount } from '../../utils'
import SongList from '../../components/SongList'
import { getAlbumDetailRequest } from '../../api/request'
import Loading from '../../components/Loading'
import Header from '../../components/Header'
import './index.scss'

function Album() {
  const { id } = useParams()
  const [showStatus, setShowStatus] = useState(true)
  const [albumInfo, setAlbumInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAlbumDetailRequest(id).then(data => {
      setAlbumInfo(data.playlist)
      setLoading(false)
    })
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
        <Header title='歌单'/>
        <div className="album-info-wrapper">
          <div className="album-info">
            <div className="img-wrapper">
              <div className="decorate"></div>
              <img src={albumInfo.coverImgUrl} width='100%' height='100%' />
              <div className="play-count">
                <Icon type='icon-erji'/>
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
              <Icon type='icon-pinglun1'/>
              <span>评论</span>
            </div>
            <div className="album-btn">
              <Icon type='icon-shoucang'/>
              <span>喜欢</span>
            </div>
            <div className="album-btn">
              <Icon type='icon-tianjiadao'/>
              <span>收藏</span>
            </div>
            <div className="album-btn">
              <Icon type='icon-gengduo1'/>
              <span>更多</span>
            </div>
          </div>
        </div>
        <div className="album-list-wrapper">
          <SongList songList={albumInfo.tracks}/>
        </div>
        { loading ? <Loading /> : null }
      </section>
    </CSSTransition>
  )
}

export default Album