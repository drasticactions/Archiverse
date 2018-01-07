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
import { AppState, User, PostSearch, UserStats, UserViewState } from '../appState';
import { PostsView } from './PostsView';
import actions from '../actions';
import * as he from 'he';
import { Link } from 'react-router-dom';

interface Props {
    appState: AppState;
    size: any;
    match: any;
    user?: User;
}

@inject("appState") @observer
class UserView extends React.Component<Props, {}> {
    @observable search: PostSearch;
    @observable viewState: UserViewState = new UserViewState();

    constructor(props) {
        super(props);
        this.search = new PostSearch();
        this.viewState.user = null;
        this.viewState.userStats = null;
        this.viewState.userDoesNotExist = false;
        if (this.props.match != null) {
            //console.log(this.props.match);
            this.search.name = he.decode(this.props.match.params.id);
            actions.setCurrentUser(this.viewState, this.search, true);
        }
    }

    loading() {
        return <div style={{ paddingTop: "100px"}} className="loader">
            <img src="/img/spinner.gif"></img>
        </div>;
    }

    loadingUserMetadata() {
        return <div className="loader-parent">
            <img className="loader-child" src="/img/spinner.gif"></img>
        </div>;
    }

    errorLoadingUserMetadata() {
        return <div className="error-message">
            <h3 className="text-center">Query Timeout! 😢</h3>
            <h4 className="text-center">The query took too long and timed out.</h4>
        </div>;
    }

    renderSidebarCover(coverUri: string) {
        //console.log(coverUri);
        let archiveUri = "https://web.archive.org/web/20171014154111im_/" + coverUri;
        let backgroundImageUri = `url(${archiveUri}`;
        return <div id="sidebar-cover" style={{ backgroundImage: backgroundImageUri }}>
            <Img src={archiveUri}
                className="sidebar-cover-image"
                loader={<img className="post-memo placeholder"
                src="/img/placeholder.png"></img>}></Img>
        </div>;
    }

    renderCountry(country: string) {
        return country == null || country == '' ? "Hidden" : country;
    }

    renderNumber(num: Number) {
        return num > 0 ? num : "-";
    }

    renderGameskill(num: Number) {
        switch (num) {
            case 0:
                return "Expert";
            case 1:
                return "Intermediate";
            case 2:
                return "Casual";
            case 3:
                return "Beginner";
            default:
                return "Hidden";
        }
    }

    renderGenres(genre: string) {
        return genre == '' ? '-----' : genre;
    }

    renderUserProfileMetadata() {
        let user = this.viewState.user;
        return <ul id="sidebar-profile-status">
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}>
                    <span>
                        <span className="number test-friend-count">
                            {this.renderNumber(user.friendsCount)} / 100
                        </span>
                        Friends
                    </span>
                </a>
            </li>
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}>
                    <span>
                        <span className="number test-following-count">
                            {this.renderNumber(user.followingCount)}
                        </span>
                        Following
                    </span>
                </a>
            </li>
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}>
                    <span>
                        <span className="number test-follower-count">
                            {this.renderNumber(user.followerCount)}
                        </span>
                        Followers
                    </span>
                </a>
            </li>
        </ul>;
    }

    renderProfileBody() {
        let user = this.viewState.user;
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
            <a target='_blank'
                href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${user.name}`}
                className="nick-name">{he.decode(user.screenName)}</a>
            <p className="id-name">{user.name}</p>
        </div>
    }


    renderContent() {
        let user = this.viewState.user;
        return <div className="sidebar-container sidebar-profile">
            {this.renderBio(user.bio)}
            <Link style={{ marginTop: "10px", marginBottom: "10px" }} to={`/posts?name=${user.name}`} className="btn btn-default btn-block" role="button">View Feed</Link>
            <a className="btn btn-default btn-block" style={{ marginTop: "10px", marginBottom: "10px" }} href={`https://web.archive.org/https://miiverse.nintendo.net/users/${user.name}`} target='_blank'>View Original Profile Page</a>
            {this.renderUserData()}
        </div>;
    }

    renderBio(bio: string) {
        return bio != '' && bio != null ? <div className="profile-comment">
            <p className="js-truncated-text">
                {bio}
            </p>
        </div> : <div />;
    }

    renderUserData() {
        let user = this.viewState.user;
        return <div className="user-data">
            <div className="user-main-profile data-content">
                <h4><span>Country</span></h4>
                <div className="note">{this.renderCountry(user.country)}</div>
                <h4><span>Birthday</span></h4>
                <div className="note birthday">{user.birthday}</div>
            </div>
            <div className="game-skill data-content">
                <h4><span>Game Experience</span></h4>
                <div className="note">{this.renderGameskill(user.gameSkill)}</div>
            </div>
            <div className="game data-content">
                <h4><span>Systems Owned</span></h4>
                <div className="note">{user.gameSystem}</div>
            </div>
            <div className="favorite-game-genre">
                <h4><span>Favorite Game Genres</span></h4>
                <div className="note">{this.renderGenres(user.favoriteGameGenres)}</div>
            </div>
        </div>;
    }

    renderUserPostData() {
        let user = this.viewState.user;
        return <div className="user-data">
            <div className="game-skill data-content">
                <h4><span>Posts</span></h4>
                <div className="note">{user.totalPosts}</div>
            </div>
            <div className="game-skill data-content">
                <h4><span>Replies</span></h4>
                <div className="note">{user.totalReplies}</div>
            </div>
            <div className="game-skill data-content">
                <h4><span>Deleted Posts</span></h4>
                <div className="note">{user.totalDeletedPosts}</div>
            </div>
        </div>;
    }

    renderUser() {
        let user = this.viewState.user;
        let sidebarCover = user.sidebarCoverUrl != null && user.sidebarCoverUrl != '' ? this.renderSidebarCover(user.sidebarCoverUrl) : <div />;
        return <div id="sidebar" className="user-sidebar">
            <div className="sidebar-container">
                {sidebarCover}
                {this.renderProfileBody()}
                {this.renderUserProfileMetadata()}
            </div>
            {this.renderContent()}
            <div className="sidebar-container sidebar-profile">
                {this.renderUserPostData()}
            </div>
        </div>;
    }

    renderUserPostMetadata() {
        const { width } = this.props.size;
        let userStats = this.viewState.userStats;
        let popularposts = userStats.popularPosts.length > 0 ? <div>
            <PostsView ref="postsView"
                autoload={true}
                size={this.props.size}
                match={this.props.match}
                appState={this.props.appState}
                customWidth={width <= 768 ? '100%' : '44.33%'}
                staticPosts={userStats.popularPosts}
                staticData={true}></PostsView>
        </div> : <div className="user-metadata"><h3 className="text-center">No user stats available 😪</h3></div>
        return popularposts;
    }

    renderUserView() {
        let stats = this.viewState.userStats == null ? this.loadingUserMetadata() : this.renderUserPostMetadata();
        return <div>
            <div className="row">
                <div className="col-md-4">
                    {this.viewState.user == null ? this.loading() : this.renderUser()}
                </div>
                <div className="col-md-8">
                    <div style={{ padding: "2px", marginBottom: "5px" }} className="post post-content">
                        <h3 style={{ fontWeight: "bold", marginTop: "10px" }} className="text-center">Popular Posts</h3>
                    </div>
                    {this.viewState.isError ? this.errorLoadingUserMetadata() : stats}
                </div>
            </div>
        </div>;
    }

    renderUserNotFoundView() {
        return <div>
            <div style={{ padding: "2px", marginBottom: "5px" }} className="post post-content">
                <h3 style={{ fontWeight: "bold", marginTop: "10px" }} className="text-center">User Not Found 😪</h3>
            </div>
        </div>
    }

    render() {
        return this.viewState.userDoesNotExist ? this.renderUserNotFoundView() : this.renderUserView();
    }
}

export default sizeMe({ monitorHeight: true })(UserView);