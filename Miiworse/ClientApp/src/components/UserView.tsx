import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Img from 'react-image'
import sizeMe from 'react-sizeme';
import { RouteComponentProps } from 'react-router';
import { AppState, PagedResults, Post, UserSearch, User, Constants, SortPosts, SortTitle } from '../appState';
import { UserSearchForm } from './forms/UserSearchForm'
import * as query from 'query-string';
import actions from '../actions';
import { Link } from 'react-router-dom';
import * as he from 'he';

@observer
export class UserView extends React.Component<{ user: User, isPostSearch?: boolean }, {}> {

    renderNumber(num: Number) {
        return num > 0 ? num : "-";
    }

    renderUserUrl(user: User) {
        return user.screenName == null || user.screenName == '' ? <a target='_blank'
            href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}
            className="nick-name">{this.renderScreenname(user.screenName)}</a>
            : <Link className="nick-name" to={`user/${he.encode(user.name)}`}>{he.decode(user.screenName)}</Link>
    }

    renderScreenname(screenname: string) {
        return screenname == null || screenname == '' ? "(Hidden)" : he.decode(screenname);
    }

    renderProfileBody(user: User) {
        let className = user.sidebarCoverUrl != null && user.sidebarCoverUrl != '' ? "with-profile-post-image" : "";
        let iconUri = `https://web.archive.org/web/20171014154111im_/${user.iconUri}`;
        return <div id="sidebar-profile-body" className={className}>
            <div className="icon-container">
                <a target='_blank' href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}>
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

    renderUserProfileFriendMetadata(user: User) {
        return <ul id="sidebar-profile-status">
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}>
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
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}>
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
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}>
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

    renderUserProfileMetadata(user: User) {
        return <ul id="sidebar-profile-status">
            <li>
                <a target='_blank'
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}>
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
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}>
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
                    href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/users/${he.encode(user.name)}`}>
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
                    {this.props.isPostSearch ? this.renderUserProfileFriendMetadata(user) : this.renderUserProfileMetadata(user)}
                </div>
            </div>
        );
    }

    render() {
        return this.renderUser(this.props.user);
    }
}