import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const RecommendComponent = lazy(() => import('../application/Recommend'))
const SingerComponent = lazy(() => import('../application/Singer'))
const RankComponent = lazy(() => import('../application/Rank'))
const AlbumComponent = lazy(() => import('../application/Album'))
const SingerDetailComponent = lazy(() => import('../application/SingerDetail'))

export default [
  {
    component: MainLayout,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'}/>,
      },
      {
        path: '/recommend',
        component: SuspenseComponent(RecommendComponent),
        key: 'recommend',
        routes: [
          {
            path: '/recommend/:id',
            component: SuspenseComponent(AlbumComponent)
          }
        ]
      },
      {
        path: '/singer',
        component: SuspenseComponent(SingerComponent),
        key: 'singer',
        routes: [
          {
            path: '/singer/:id',
            component: SuspenseComponent(SingerDetailComponent)
          }
        ]
      },
      {
        path: '/rank',
        component: SuspenseComponent(RankComponent),
        key: 'rank',
        routes: [
          {
            path: '/rank/:id',
            component: SuspenseComponent(AlbumComponent)
          }
        ]
      }
    ]
  }
]