import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import StackGrid from "react-stack-grid";
import Waypoint = require('react-waypoint');
import moment = require('moment');
import Img from 'react-image'
import sizeMe from 'react-sizeme';
import { Button, Glyphicon } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import { AppState, PagedResults, Post, UserSearch, User, UsersSearchViewState, Constants, SortPosts, SortTitle } from '../appState';
import { UserSearchForm } from './forms/UserSearchForm'
import * as query from 'query-string';
import actions from '../actions';
import { Link } from 'react-router-dom';
import * as he from 'he';
import { find } from 'lodash';

interface Props {
    appState: AppState;
    size: any;
    match: any;
}

@inject("appState") @observer
class UsersSearchView extends React.Component<Props, {}> {

    pagedResults: PagedResults = new PagedResults();
    @observable viewState: UsersSearchViewState = new UsersSearchViewState();
    search: UserSearch = new UserSearch();
    constants: Constants = new Constants();

    refs: {
        userSearchForm: UserSearchForm;
    };

    constructor(props) {
        super(props);

        if (this.props != null) {
            this.viewState.isDone = false;
            this.viewState.isError = false;
            this.viewState.isEmpty = false;
            this.viewState.isLoading = false;
            this.parseQueryString(query.parse(location.search));
            this.loadMoreUsers();
        }
    }

    parseQueryString(parsed) {
        if (parsed != null) {
            if (parsed.name != null)
                this.search.name = parsed.name;

            if (parsed.screenName != null)
                this.search.screenName = parsed.screenName;

            if (parsed.country != null) {
                let country = he.decode(parsed.country);
                let result = find(this.constants.countryList, n => n == country);
                if (result != null) {
                    this.search.country = result;
                }
            }

            if (parsed.sortPosts != null) {
                if (parsed.sortPosts == 'asc')
                    this.search.sortPosts = SortPosts.Least;
                if (parsed.sortPosts == 'desc')
                    this.search.sortPosts = SortPosts.Most;
            }

            if (parsed.sortReplies != null) {
                if (parsed.sortReplies == 'asc')
                    this.search.sortReplies = SortPosts.Least;
                if (parsed.sortReplies == 'desc')
                    this.search.sortReplies = SortPosts.Most;
            }

            if (parsed.sortDeletedPosts != null) {
                if (parsed.sortDeletedPosts == 'asc')
                    this.search.sortDeletedPosts = SortPosts.Least;
                if (parsed.sortDeletedPosts == 'desc')
                    this.search.sortDeletedPosts = SortPosts.Most;
            }

            if (parsed.sortTitle != null) {
                if (parsed.sortTitle == 'asc')
                    this.search.sortName = SortTitle.Asc;
                if (parsed.sortTitle == 'desc')
                    this.search.sortName = SortTitle.Desc;
            }

            
        }
    }

    renderSidebarCover(coverUri: string) {
        let archiveUri = "https://web.archive.org/web/20171014154111im_/" + coverUri;
        let backgroundImageUri = `url(${archiveUri}`;
        return <div id="sidebar-cover" style={{ backgroundImage: backgroundImageUri }}>
            <Img src={archiveUri}
                className="sidebar-cover-image"
                loader={<img className="post-memo placeholder"
                    src="/img/placeholder.png"></img>}></Img>
        </div>;
    }

    renderScreenname(screenname: string) {
        return screenname == null || screenname == '' ? "(Hidden)" : he.decode(screenname);
    }

    renderUserUrl(user: User) {
        return user.screenName == null || user.screenName == '' ? <a target='_blank'
            href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}
            className="nick-name">{this.renderScreenname(user.screenName)}</a>
            : <Link className="nick-name" to={`users/${user.name}`}>{he.decode(user.screenName)}</Link>
    }

    renderProfileBody(user: User) {
        let className = user.sidebarCoverUrl != null && user.sidebarCoverUrl != '' ? "with-profile-post-image" : "";
        let iconUri = `https://web.archive.org/web/20171014154111im_/${user.iconUri}`;
        return <div id="sidebar-profile-body" className={className}>
            <div className="icon-container">
                <a target='_blank' href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}>
                    <Img src={[iconUri, '/img/anonymous-mii.png']} alt={user.screenName}
                        loader={<img
                            className="icon"
                            src="/img/spinner.gif"></img>}
                        className="icon"></Img>
                </a>
            </div>
            {this.renderUserUrl(user)}
            <p className="id-name">{user.name}</p>
            <p className="id-name">{user.country}</p>
        </div>
    }

    renderUserProfileMetadata(user: User) {
        return <ul id="sidebar-profile-status">
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}>
                    <span>
                        <span className="number test-friend-count">
                            {user.totalPosts}
                        </span>
                        Posts
                    </span>
                </a>
            </li>
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}>
                    <span>
                        <span className="number test-following-count">
                            {user.totalReplies}
                        </span>
                        Replies
                    </span>
                </a>
            </li>
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}>
                    <span>
                        <span className="number test-follower-count">
                            {user.totalDeletedPosts}
                        </span>
                        Deleted Posts
                    </span>
                </a>
            </li>
        </ul>;
    }

    renderUser(user: User) {
        let sidebarCover = user.sidebarCoverUrl != null && user.sidebarCoverUrl != '' ? this.renderSidebarCover(user.sidebarCoverUrl) : <div />;
        return (
            <div className="user-sidebar">
                <div className="sidebar-container">
                    {sidebarCover}
                    {this.renderProfileBody(user)}
                    {this.renderUserProfileMetadata(user)}
                </div>
            </div>
        );
    }

    async loadMoreItems() {
        if (this.viewState.users != null && this.viewState.users.length > 0) {
            await this.loadMoreUsers();
        }
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

    async loadMoreUsers() {

        if (this.refs.userSearchForm) {
            this.refs.userSearchForm.isOpen = false;
        }

        this.viewState.isError = false;
        this.viewState.isEmpty = false;
        if (this.refs.userSearchForm != null && this.refs.userSearchForm.isDirty)
        {
            this.pagedResults = new PagedResults();
            this.viewState.users = [];
            this.refs.userSearchForm.isDirty = false;
            this.search.page = 1;
            this.viewState.isEmpty = false;
            this.viewState.isDone = false;
            this.viewState.isError = false;
        }
        this.viewState.isLoading = true;
        try {
            this.pagedResults = await actions.returnPagedResults("api/users", JSON.stringify(this.search));
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
        this.search.page = this.search.page + 1;
    }

    public render() {
        const { width } = this.props.size;
        let users = this.viewState.users != null ? this.viewState.users.map(n => this.renderUser(n)) : "";
        let loading = this.viewState.isLoading ? <img className="center-block" style={{ height: "100px", width: "100px" }} src="img/spinner.gif"></img> : <div/>;
        let error = this.viewState.isError ? this.renderError() : <div />;
        let empty = this.viewState.isEmpty ? this.renderEmpty() : <div />;
        let stackgrid = this.viewState.users.length > 0 ? <StackGrid monitorImagesLoaded={true} columnWidth={width <= 768 ? '100%' : '33.33%'}>
            {users}
        </StackGrid> : <div />;
        let waypoint = !this.viewState.isDone ? <Waypoint onEnter={(args) => this.loadMoreItems()}>
            {loading}
        </Waypoint> : <div />;
        // 325
        return <div>
            <div style={{ marginBottom: "5px" }}>
                <UserSearchForm ref="userSearchForm" search={this.search}></UserSearchForm>
                <Button disabled={this.viewState.isLoading} onClick={() => { this.loadMoreUsers() }} block>Search</Button>
            </div>
            {empty}
            {error}
            {stackgrid}
            <div>
                {waypoint}
            </div>
        </div>;
    }
}

export default sizeMe({ monitorHeight: true })(UsersSearchView);