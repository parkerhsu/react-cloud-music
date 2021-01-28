import React, { useMemo } from 'react'
import PropType from 'prop-types'
import SvgIcon from '../../components/SvgIcon'
import { getSongAuthor } from '../../utils'
import './index.scss'

function SongList(props) {
  const { songList } = props

  const renderSongList = (list) => {
    return list.map((item, index) => (
      <li className='song-item' key={index}>
        <span className='index'>{index+1}</span>
        <div className="song-info">
          <span className='name'>{item.name}</span>
          <span className="author">{`${getSongAuthor(item.ar)}-${item.al.name}`}</span>
        </div>
      </li>
    ))
  }

  return (
    <div className="song-list-wrapper">
      <div className="song-list-header">
        <SvgIcon type='icon-xiayiqu'/>
        <span>播放全部</span>
        <span className='count-text'>{`(共${songList && songList.length}首)`}</span>
      </div>
      <ul className="song-list">
        { songList && renderSongList(songList) }
      </ul>
    </div>
  )
}


export default React.memo(SongList)