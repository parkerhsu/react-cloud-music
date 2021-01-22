import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import SvgIcon from '../components/SvgIcon'
import './MainLayout.scss'

function MainLayout(props) {
  const history = useHistory()
  const { route } = props

  return (
    <main>
      <header className="header">
        <span className='header-icon' onClick={() => alert('正在努力开发中...')}>
          <SvgIcon type='icon-gengduo'/>
        </span>
        <NavLink className='title' to='/'>网易云音乐</NavLink>
        <span className='header-icon' onClick={() => history.push('/search')}>
          <SvgIcon type='icon-sousuo'/>
        </span>
      </header>

      <nav className='nav'>
        <NavLink className='nav-item' to='/recommend' activeClassName='selected'>
          <span>推荐</span>
        </NavLink>
        <NavLink className='nav-item' to='/singer' activeClassName='selected'>
          <span>歌手</span>
        </NavLink>
        <NavLink className='nav-item' to='/rank' activeClassName='selected'>
          <span>排行榜</span>
        </NavLink>
      </nav>
      { renderRoutes(route.routes) }
    </main>
  )
}

export default React.memo(MainLayout)