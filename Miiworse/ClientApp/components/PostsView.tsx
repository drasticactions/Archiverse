import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import StackGrid from "react-stack-grid";
import Waypoint = require('react-waypoint');
import moment = require('moment');
import Img from 'react-image';
import { PostSearchForm } from './forms/PostSearchForm';
import { Button, Glyphicon } from 'react-bootstrap';
import sizeMe from 'react-sizeme';
import { RouteComponentProps } from 'react-router';
import { AppState, PagedResults, Post, PostSearch, PostsViewState } from '../appState';
import { PostView } from './PostView';
import { PostReplyModal } from './modal/PostReplyModal';
import * as query from 'query-string';
import actions from '../actions';

interface Props {
    appState: AppState;
    search?: PostSearch;
    size: any;
    match: any;
    autoload: boolean;
    hideHeader?: boolean;
    isSearch?: boolean;
    staticData?: boolean;
    staticPosts?: Post[];
    customWidth?: string;
}

@observer
export class PostsView extends React.Component<Props, {}> {

    pagedResults: PagedResults = new PagedResults();
    @observable viewState: PostsViewState = new PostsViewState();
    grid: any;

    refs: {
        postReplyModal: PostReplyModal;
    };

    constructor(props) {
        super(props);
        if (this.props != null) {
            //console.log(this.props.match);
            this.viewState.isDone = false;
            this.viewState.isError = false;
            this.viewState.isEmpty = false;
            this.viewState.isLoading = false;
            this.viewState.posts = [];
            if (this.props.autoload && !this.props.staticData)
                this.loadMorePosts(true);

            if (this.props.staticData && this.props.staticPosts != null) {
                for (let post of this.props.staticPosts)
                    this.viewState.posts.push(post);
            }
        }
        
    }

    async loadMoreItems(args) {
        if (this.viewState.posts != null && this.viewState.posts.length > 0) {
            await this.loadMorePosts(false);
        }
    }

    async loadMorePosts(isDirty: boolean) {
        this.viewState.isError = false;
        this.viewState.isEmpty = false;

        if (isDirty) {
            this.pagedResults = new PagedResults();
            this.viewState.posts = [];
            this.props.search.page = 1;
            this.viewState.isEmpty = false;
            this.viewState.isDone = false;
            this.viewState.isError = false;
        }
        //location.search.replace(location.search, query.stringify(this.search));
        this.viewState.isLoading = true;
        try {
            this.pagedResults = await actions.returnPagedResults("api/posts", JSON.stringify(this.props.search));
            //console.log(this.pagedResults)
            if (this.pagedResults.results.length > 0) {
                for (let post of this.pagedResults.results)
                    this.viewState.posts.push(post);
            }
            else if (this.pagedResults.results.length <= 0 && this.viewState.posts.length <= 0) {
                this.viewState.isEmpty = true;
                this.viewState.isDone = true;
            }
            else if (this.pagedResults.results.length <= 0) {
                //console.log("is done")
                this.viewState.isDone = true;
            }
        } catch (e) {
            this.viewState.isError = true;
            console.error(e);
        }
        this.props.search.page = this.props.search.page + 1;
        this.viewState.isLoading = false;
    }

    openPostModal(post: Post) {
        this.refs.postReplyModal.open(post);
    }

    renderPopupModal(post: Post) {
        return <footer>
            <Glyphicon onClick={() => this.openPostModal(post)} style={{ float: 'right', cursor: 'pointer' }} glyph="option-horizontal" />
        </footer>
    }

    renderEmpty() {
        if (this.props.isSearch) {
            return <div className="empty-message">
                <h3 className="text-center">No posts found! 🙈</h3>
                <h4 className="text-center">We couldn't find any posts within the given search parameters.</h4>
                <h4 className="text-center">Change your search parameters and try again.</h4>
            </div>
        }
        return <div className="empty-message">
            <h3 className="text-center">No posts found! 🙈</h3>
        </div>
    }

    renderError() {
        let search = this.props.isSearch ? <h4 className="text-center">Change your search parameters and try again.</h4> : <h4></h4>;
        return <div className="error-message">
            <h3 className="text-center">Query Timeout! 😢</h3>
            <h4 className="text-center">The query took too long and timed out.</h4>
            {search}
        </div>
    }

    public render() {
        const { width } = this.props.size;
        let posts = this.viewState.posts != null ? this.viewState.posts.map(n => <div className="post post-content">
            {this.renderPopupModal(n)}
            <PostView post={n} isReply={this.props.hideHeader} />
        </div>) : "";
        let widthGrid = this.props.customWidth != null ? this.props.customWidth : width <= 768 ? '100%' : '33.33%';
        let stackgrid = this.viewState.posts.length > 0 ? <StackGrid monitorImagesLoaded={true} gridRef={grid => this.grid = grid} columnWidth={widthGrid}>
            {posts}
        </StackGrid> : <div/>
        let error = this.viewState.isError ? this.renderError() : <div />;
        let empty = this.viewState.isEmpty ? this.renderEmpty() : <div />;
        let loading = this.viewState.isLoading ? <img className="center-block" style={{ height: "100px", width: "100px" }} src="img/spinner.gif"></img> : <div />;
        let waypoint = !this.viewState.isDone && !this.props.staticData ? <Waypoint onEnter={(args) => this.loadMoreItems(args)}>
            {loading}
        </Waypoint> : <div />;
        return <div>
            <PostReplyModal ref="postReplyModal"></PostReplyModal>
            {empty}
            {error}
            {stackgrid}
            {waypoint}
        </div>;
    }
}