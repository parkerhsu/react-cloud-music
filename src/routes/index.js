import React from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../application/Home/Home';
import Singers from '../application/Singers/Singers';
import Recommend from '../application/Recommend/Recommend';
import Rank from '../application/Rank/Rank';

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={"/recommend"}/>
                )
            },
            {
                path: '/recommend',
                component: Recommend,
            },
            {
                path: '/singers',
                component: Singers,
            },
            {
                path: '/rank',
                component: Rank,
            }
        ]
    }
]