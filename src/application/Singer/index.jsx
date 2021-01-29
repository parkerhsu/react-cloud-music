import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import HorizontalList from './components/HorizontalList'
import Scroll from '../../components/Scroll'
import Loading from '../../components/Loading'
import { categoryTypes, alphaTypes } from '../../api/config'
import { getHotSingerListRequest, getSingerListRequest } from '../../api/request'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { renderRoutes } from 'react-router-config'
import './index.scss'

export default function Singers(props) {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')
  const [singerList, setSingerList] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [pullUpLoading, setPullUpLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    getHotSingerListRequest(0).then(data => {
      setSingerList(data.artists)
      setLoading(false)
    })
  }, [])

  async function getSingerListData(category, alpha) {
    const data = await getSingerListRequest(category, alpha, 0)
    setSingerList(data.artists)
  }
  
  async function moreSingerListData(pageCount) {
    let data
    if (!category && alpha) {
      data = await getHotSingerListRequest(pageCount)
    } else {
      data = await getSingerListRequest(category, alpha, pageCount)
    }
    setSingerList(oldVal => oldVal.concat(data.artists))
  }

  const handleCategoryClick = (val) => {
    if (val === category) return
    getSingerListData(val, alpha)
    setCategory(val)
  }

  const handleAlphaClick = (val) => {
    if (val === alpha) return
    getSingerListData(category, val)
    setAlpha(val)
  }

  const handlePullUp = () => {
    setPullUpLoading(true)
    moreSingerListData(pageCount + 1).then(() => setPullUpLoading(false))
    setPageCount(pageCount+1)
  }

  return(
    <section className='singer-content'>
      <HorizontalList list={categoryTypes} selectedItem={category} title={"分类 (默认热门):"} handleClick={handleCategoryClick}/>
      <HorizontalList list={alphaTypes} selectedItem={alpha} title='首字母:' handleClick={handleAlphaClick}/>
      
      <div className="singer-list-wrapper">
        <Scroll pullUp={handlePullUp} pullUpLoading={pullUpLoading} onScroll={forceCheck}>
          <ul className="singer-list">
            {
              singerList.map((item, key) => (
                <li className="singer-list-item" key={key} onClick={() => history.push(`/singer/${item.id}`)}>
                  <LazyLoad 
                    placeholder={<img src={require('../../assets/music.png')} width='50px' height='50px'/>}
                  >
                    <img src={`${item.picUrl}?param=300*300`} width='50px' height='50px'/>
                  </LazyLoad>
                  <span>{item.name}</span>
                </li>
              ))
            }
          </ul>
          { loading ? <Loading /> : null }
        </Scroll>
      </div>
      { renderRoutes(props.route.routes) }
    </section>
  );
}