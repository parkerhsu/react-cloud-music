import React from 'react'
import { useHistory } from 'react-router-dom'
import Icon from '../GlobalIcon'
import './index.scss'

function Header(props) {
  const history = useHistory()

  const { title } = props
  const { handleClick } = props

  const handleGoBack = () => {
    history.goBack()
  }

  return (
    <header className='back-header'>
      <Icon type='icon-zuojiantou' onClick={handleGoBack}/>
      <span>{title}</span>
    </header>
  )
}

export default React.memo(Header)