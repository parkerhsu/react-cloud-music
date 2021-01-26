import React, { useEffect, useRef } from 'react'
import Scroll from '../../../../components/Scroll'
import PropTypes from 'prop-types'
import './index.scss'

function HorizontalList(props) {
  const listWrapper = useRef(null)

  const { list, selectedItem, title } = props
  const { handleClick } = props

  useEffect(() => {
    let totalWidth = 0
    const spanEls = listWrapper.current.querySelectorAll('span')
    Array.from(spanEls).forEach(el => {
      totalWidth += el.offsetWidth
    })
    listWrapper.current.style.width = `${totalWidth}px`
  }, [])

  return (
    <Scroll direction='horizontal'>
      <div className="list-wrapper" ref={listWrapper}>
        <div className="list">
          <span className='list-title'>{title}</span>
          {
            list.map(item => (
              <span 
                key={item.key}
                className={`list-item ${selectedItem === item.key ? 'selected' : ''}`}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </span>
            ))
          }
        </div>
      </div>
    </Scroll>
  )
}

HorizontalList.defaultProps = {
  list: [],
  selectedItem: '',
  title: '',
  handleClick: null
};

HorizontalList.propTypes = {
  list: PropTypes.array,
  selectedItem: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};

export default React.memo(HorizontalList)