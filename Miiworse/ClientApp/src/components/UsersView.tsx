import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Waypoint from 'react-waypoint';
import StackGrid from 'react-stack-grid';
import { AppState, PagedResults, User, UsersViewState, UserSearch, SortPosts } from '../appState';
import actions from '../actions';
import { UserView } from './UserView';

interface Props {
    appState: AppState;
    search?: UserSearch;
    size: any;
    match: any;
    autoload: boolean;
    hideHeader?: boolean;
    isSearch?: boolean;
    staticData?: boolean;
    staticPosts?: User[];
    customWidth?: string;
}

@observer
export class UsersView extends React.Component<Props, {}> {

    pagedResults: PagedResults = new PagedResults();
    @observable viewState: UsersViewState = new UsersViewState();
    grid: any;

    constructor(props) {
        super(props);
        if (this.props != null) {
            this.viewState.isDone = false;
            this.viewState.isError = false;
            this.viewState.isEmpty = false;
            this.viewState.isLoading = false;
            if (this.props.autoload && !this.props.staticData)
                this.loadMoreUsers(true);
        }
    }

    async loadMoreItems(args) {
        if (this.viewState.users != null && this.viewState.users.length > 0) {
            await this.loadMoreUsers(false);
        }
    }

    async loadMoreUsers(isDirty: boolean) {
        this.viewState.isError = false;
        this.viewState.isEmpty = false;
        if (isDirty) {
            this.pagedResults = new PagedResults();
            this.viewState.users = [];
            this.props.search.page = 1;
            this.viewState.isEmpty = false;
            this.viewState.isDone = false;
            this.viewState.isError = false;
        }
        this.viewState.isLoading = true;
        try {
            this.pagedResults = await actions.returnPagedResults("api/users", JSON.stringify(this.props.search));
            if (this.pagedResults.results.length > 0) {
                for (let user of this.pagedResults.results)
                    this.viewState.users.push(user);
            }
            else if (this.pagedResults.results.length <= 0 && this.viewState.users.length <= 0) {
                this.viewState.isEmpty = true;
                this.viewState.isDone = true;
            }
            else if (this.pagedResults.results.length <= 0) {
                this.viewState.isDone = true;
            }
        } catch (e) {
            this.viewState.isError = true;
            console.error(e);
        }
        this.viewState.isLoading = false;
        this.props.search.page = this.props.search.page + 1;
    }

    renderEmpty() {
        return <div className="empty-message">
            <h3 className="text-center">No users found! 🙈</h3>
            <h4 className="text-center">We couldn't find any users within the given search parameters.</h4>
            <h4 className="text-center">Change your search parameters and try again.</h4>
        </div>
    }

    renderError() {
        return <div className="error-message">
            <h3 className="text-center">Query Timeout! 😢</h3>
            <h4 className="text-center">The query took too long and timed out.</h4>
            <h4 className="text-center">Change your search parameters and try again.</h4>
        </div>
    }

    searchPostState() {
        return this.props.search.sortFriends != SortPosts.None || this.props.search.sortFollowers != SortPosts.None || this.props.search.sortFollowing != SortPosts.None;
    }

    public render() {
        const { width } = this.props.size;
        let isPostSearch =  this.searchPostState();
        let posts = this.viewState.users != null ? this.viewState.users.map(n => <UserView user={n} isPostSearch={isPostSearch} />) : "";
        let widthGrid = this.props.customWidth != null ? this.props.customWidth : width <= 768 ? '100%' : '33.33%';
        let stackgrid = this.viewState.users.length > 0 ? <StackGrid monitorImagesLoaded={true} gridRef={grid => this.grid = grid} columnWidth={widthGrid}>
            {posts}
        </StackGrid> : <div />

        let error = this.viewState.isError ? this.renderError() : <div />;
        let empty = this.viewState.isEmpty ? this.renderEmpty() : <div />;
        let loading = this.viewState.isLoading ? <img className="center-block" style={{ height: "100px", width: "100px" }} src="img/spinner.gif"></img> : <div />;
        let waypoint = !this.viewState.isDone && !this.props.staticData ? <Waypoint bottomOffset='-500px' onEnter={(args) => this.loadMoreItems(args)}>
            {loading}
        </Waypoint> : <div />;
        return <div>
            {empty}
            {error}
            {stackgrid}
            {waypoint}
        </div>
    }
}