import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import Loading from '../../components/Loading'
import { throttle } from '../../utils'
import './index.scss'

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()
  const scrollContainerRef = useRef()

  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props
  const { onScroll, pullUp, pullDown } = props

  const pullUpDebounce = useMemo(() => {
    return throttle(pullUp, 300)
  }, [pullUp])

  //初始化
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      },
    })
    setBScroll(scroll)
    
    return () => {
      setBScroll(null)
    }
  }, [])

  // 每次重新渲染都要刷新实例，防止无法滚动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', scroll => {
      onScroll(scroll)
    })

    return () => {
      bScroll.off('scroll')
    }
  }, [bScroll, onScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    })

    return () => {
      bScroll.off('scrollEnd')
    }
  }, [bScroll, pullUp])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('touchEnd', pos => {
      if (pos.y > 50) {
        pullDown()
      }
    })

    return () => {
      bScroll.off('touchEnd')
    }
  }, [bScroll, pullDown])

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) return bScroll
    }
  }))

  const pullUpDisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }

  return (
    <div className="scroll-container" ref={scrollContainerRef}>
      { props.children }
      <div className="pull-up-loading" style={pullUpDisplayStyle}>
        <Loading />
      </div>
      <div className="pull-down-loading"></div>
    </div>
  )
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向下吸顶
}

export default React.memo(Scroll)