import React from 'react'
import classes from 'classnames'

function SvgIcon({
  type,
  classnames,
  ...restProps
}) {
  return (
    <svg className={classes('icon', classnames)} aria-hidden="true" {...restProps}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default React.memo(SvgIcon)