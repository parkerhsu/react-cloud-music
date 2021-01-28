import React from 'react'
import classes from 'classnames'

function Icon(props) {
  const { type, ...restProps } = props
  
  const classNames = classes('iconfont', type)

  return (
    <i className={classNames} {...restProps}></i>
  )
}

export default React.memo(Icon)