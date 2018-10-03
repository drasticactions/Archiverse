import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { PostSearchForm } from './forms/PostSearchForm';
import { PostsSearchModal } from './modal/PostsSearchModal';
import { Button } from 'reactstrap';
import sizeMe from 'react-sizeme';
import { RouteComponentProps } from 'react-router';
import { AppState, PagedResults, Post, PostSearch, SortPosts } from '../appState';
import { PostView } from './PostView';
import { PostsView } from './PostsView';
import * as query from 'query-string';
import actions from '../actions';

interface Props {
    appState: AppState;
    size: any;
    match: any;
}

@inject("appState") @observer
class PostsSearchView extends React.Component<Props, {}> {

    pagedResults: PagedResults = new PagedResults();
    @observable errorString: string = "";
    search: PostSearch = new PostSearch();
    grid: any;

    refs: {
        postsView: PostsView;
        postsSearchModal: PostsSearchModal;
    };

    constructor(props) {
        super(props);
        if (this.props != null) {
            //console.log(this.props);
        }

        this.parseQueryString(query.parse(location.search));
    }

    parseQueryString(parsed) {
        if (parsed != null) {
            if (parsed.gameId != null)
                this.search.gameId = parsed.gameId;

            if (parsed.titleId != null)
                this.search.titleId = parsed.titleId;

            if (parsed.name != null)
                this.search.name = parsed.name;

            if (parsed.screenName != null)
                this.search.screenName = parsed.screenName;

            if (parsed.isDrawingOnly != null) {
                this.search.isDrawingOnly = (parsed.isDrawingOnly == 'true');
            }

            if (parsed.isScreenshotOnly != null) {
                this.search.isScreenshotOnly = (parsed.isScreenshotOnly == 'true');
            }

            if (parsed.orderDateDesc != null) {
                this.search.orderByDateDescending = (parsed.orderDateDesc == 'true');
            }

            if (parsed.sortEmpathy != null) {
                if (parsed.sortEmpathy == 'asc')
                    this.search.sortEmpathy = SortPosts.Least;
                if (parsed.sortEmpathy == 'desc')
                    this.search.sortEmpathy = SortPosts.Most;
            }

            if (parsed.sortReplyCount != null) {
                if (parsed.sortReplyCount == 'asc')
                    this.search.sortReplyCount = SortPosts.Least;
                if (parsed.sortReplyCount == 'desc')
                    this.search.sortReplyCount = SortPosts.Most;
            }
        }
    }

    loadMorePosts() {
        this.refs.postsView.loadMorePosts(true)
    }

    openModal() {
        this.refs.postsSearchModal.open(this.search);
    }

    public render() {
        const { width } = this.props.size;
        return <div>
            <PostsSearchModal postsView={this.refs.postsView} ref="postsSearchModal"/>
            <div style={{ marginBottom: "5px" }}>
                <Button 
                disabled={this.refs.postsView != null 
                && this.refs.postsView.viewState.isLoading} 
                onClick={() => { this.openModal() }} block>Search</Button>
            </div>
            <PostsView ref="postsView"
                autoload={true}
                size={this.props.size}
                match={this.props.match}
                appState={this.props.appState}
                isSearch={true}
                search={this.search}></PostsView>
        </div>;
    }
}

export default sizeMe({ monitorHeight: true })(PostsSearchView);