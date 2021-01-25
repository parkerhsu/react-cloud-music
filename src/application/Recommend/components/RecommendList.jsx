import React from 'react'
import SvgIcon from '../../../components/SvgIcon'
import LazyLoad from 'react-lazyload'
import './RecommendList.scss'
import { getCount } from '../../../utils'

function RecommendList(props) {
  const { recommendList } = props

  return (
    <section className='recommend-list'>
      <h1 className='title'>推荐列表</h1>
      <ul className="list-wrapper">
        {
          recommendList.map(item => (
            <li key={item.id} className='list-item'>
              <div className="img-wrapper">
                <LazyLoad 
                  placeholder={<img src={require('./music.png')} width='100%' height='100%'/>}
                >
                  <img src={item.picUrl + "?param=300*300"} width='100%' height='100%'/>
                </LazyLoad>
                
                <div className="play-count">
                  <SvgIcon type='icon-erji'/>
                  <span>{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default React.memo(RecommendList)