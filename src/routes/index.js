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

export default [
  {
    component: MainLayout,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'}/>
      },
      {
        path: '/recommend',
        component: SuspenseComponent(RecommendComponent),
        key: 'recommend'
      },
      {
        path: '/singer',
        component: SuspenseComponent(SingerComponent),
        key: 'singer'
      },
      {
        path: '/rank',
        component: SuspenseComponent(RankComponent),
        key: 'rank'
      }
    ]
  }
]