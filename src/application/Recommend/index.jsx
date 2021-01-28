import React, { useEffect } from 'react';
import Slider from '../../components/Slider'
import RecommendList from './components/RecommendList'
import Loading from '../../components/Loading'
import Scroll from '../../components/Scroll'
import { connect } from 'react-redux'
import * as actions from './store/action'
import { forceCheck } from 'react-lazyload'
import { renderRoutes } from 'react-router-config'
import './index.scss'

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return(
    <section className='recommend-content'>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList recommendList={recommendListJS}/>
        </div>
        { enterLoading ? <Loading /> : null }
      </Scroll>
      {renderRoutes(props.route.routes)}
    </section>
  );
}

const matchStateToProps = state => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
})

const matchDispatchToProps = dispatch => ({
  getBannerDataDispatch() {
    dispatch(actions.getBannerList())
  },
  getRecommendListDataDispatch() {
    dispatch(actions.getRecommendList())
  }
})

export default connect(matchStateToProps, matchDispatchToProps)(React.memo(Recommend))