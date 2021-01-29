import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Header from '../../components/Header'
import { getSinderDetailRequest } from '../../api/request'
import SongList from '../../components/SongList'
import Icon from '../../components/GlobalIcon'
import './index.scss'

function SingerDetail() {
  const [singerDetail, setSingerDetail] = useState(null)
  const [showStatus, setShowStatus] = useState(true)
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    getSinderDetailRequest(id).then(data => {
      setSingerDetail(data)
    })
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames='fly'
      appear={true}
      unmountOnExit
      onExited={() => history.goBack()}
    >
      <section className='singer-detail-wrapper'>
        <Header title='返回' handleClick={() => setShowStatus(false)}/>
        <div className="background">
          <img src={singerDetail && singerDetail.artist.picUrl}/>
          <div className="filter"></div>
        </div>
        <div className="collect-btn">
          <Icon type='icon-tianjiadao'/>
          <span>收藏</span>
        </div>
        <SongList songList={singerDetail && singerDetail.hotSongs}/>
      </section>
    </CSSTransition>
  )
}

export default SingerDetail