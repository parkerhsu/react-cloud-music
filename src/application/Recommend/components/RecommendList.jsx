import React from 'react'
import SvgIcon from '../../../components/SvgIcon'
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
                <img src={item.picUrl} />
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