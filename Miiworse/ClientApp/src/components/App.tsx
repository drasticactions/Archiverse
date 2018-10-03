import * as React from 'react';
import Layout from './Layout';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router';
import { AppState } from '../appState';
import { inject, observer } from 'mobx-react';
import '../App.css';
import PostsSearchView from './PostsSearchView';

type PathParamsType = {
    param1: string,
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    appState?: AppState,
}

@inject('appState') @observer
class App extends React.Component<PropsType> {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={PostsSearchView} />
                <Route path='/post/:id' component={PostsSearchView} />
                <Route exact path='/posts' component={PostsSearchView} />
            </Layout>
        );
    }
}

export default withRouter(App);