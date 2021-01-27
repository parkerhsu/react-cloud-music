import React, { useEffect, useMemo, useState } from 'react';
import Scroll from '../../components/Scroll'
import Loading from '../../components/Loading'
import { getRankListRequest } from '../../api/request'
import './index.scss'

const filterIndex = rankList => {
  for(let i = 0; i < rankList.length; i ++ ) {
    if (rankList[i].tracks.length && !rankList[i+1].tracks.length) {
      return i + 1
    }
  }
  return 0
}

export default function Rank() {
  const [rankList, setRankList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRankListRequest().then(data => {
      setRankList(data.list)
      setLoading(false)
    })
  }, [])

  let [officialList, globalList] = useMemo(() => {
    if (rankList.length) {
      const index = filterIndex(rankList)
      const officialList = rankList.slice(0, index)
      const globalList = rankList.slice(index)
      return [officialList, globalList]
    }
    return [[], []]
  }, [rankList])

  const loadingDisplayStyle = useMemo(() => {
    return loading ? { 'display': 'none' } : { 'display': '' }
  }, [loading])

  const renderOfficialList = (list) => (
    <ul className="official-list">
      {
        list.map(item => (
          <li className="list-item" key={item.id}>
            <div className="img-wrapper">
              <img src={`${item.coverImgUrl}?param=300*300`}/>
              <div className="decorate"></div>
              <span>{item.updateFrequency}</span>
            </div>
            <ul className='track-list'>
              {
                item.tracks.map((item, key) => (
                  <li key={key}>{`${key+1}.${item.first}-${item.second}`}</li>
                ))
              }
            </ul>
          </li>
        ))
      }
    </ul>
  )

  const renderGlobalList = (list) => (
    <ul className="global-list">
      {
        list.map(item => (
          <li className="list-item" key={item.id}>
            <div className="img-wrapper">
              <img src={`${item.coverImgUrl}?param=300*300`}/>
              <span>{item.updateFrequency}</span>
            </div>
          </li>
        ))
      }
    </ul>
  )

  return(
    <section className='rank-content'>
      <Scroll direction='vertical'>
        <div>
          <h1 className='rank-title' style={loadingDisplayStyle}>官方榜</h1>
          { renderOfficialList(officialList) }
          <h1 className='rank-title' style={loadingDisplayStyle}>全球榜</h1>
          { renderGlobalList(globalList) }
          { loading ? <Loading /> : null }
        </div>
      </Scroll>
    </section>
  );
}