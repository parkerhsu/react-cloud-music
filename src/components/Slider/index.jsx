import React, { useEffect, useState } from 'react'
import Swiper, { Pagination } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/swiper-bundle.css'
import './index.scss'

Swiper.use([Pagination])

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {el:'.swiper-pagination'},
      })
      setSliderSwiper(swiper)
    }
  }, [bannerList.length])

  return (
    <div className="slider-container">
      <div className="slider-padding"></div>

      <div className="swiper-container">
        <div className="swiper-wrapper">
            {
              bannerList.map((slider, index) => (
                <div className='swiper-slide' key={slider.imageUrl}>
                  <img className='swiper-item' src={slider.imageUrl} width='100%' height='100%'/>
                </div>
              ))
            }
        </div>

        <div className="swiper-pagination"></div>
      </div>
    </div>
  )
}

export default React.memo(Slider)