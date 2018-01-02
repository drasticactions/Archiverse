import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import UserView from './components/UserView';
import CommunityGameView from './components/CommunityGameView';
import PostsSearchView from './components/PostsSearchView';
import UsersSearchView from './components/UsersSearchView';
import CommunityGameSearchView from './components/CommunityGameSearchView';

export const routes = <Layout>
    <Route exact path='/' component={PostsSearchView} />
    <Route exact path='/posts' component={PostsSearchView} />
    <Route exact path='/games' component={ CommunityGameSearchView } />
    <Route exact path='/about' component={About} />
    <Route exact path='/faq' component={FAQ} />
    <Route exact path='/users' component={UsersSearchView} />
    <Route exact path='/users/:id' component={UserView} />
    <Route exact path='/games/:id' component={CommunityGameView} />
</Layout>;
