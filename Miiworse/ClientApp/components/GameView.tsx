import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Img from 'react-image'
import { CommunityGame } from '../appState';
import { Link } from 'react-router-dom';
import * as he from 'he';

@observer
export class GameView extends React.Component<{ game: CommunityGame }, {}> {

    translateViewRegion(viewRegion: any) {
        switch (viewRegion) {
            case 1:
                return "Japan";
            case 2:
                return "America";
            case 4:
                return "Europe";
            case 5:
                return "World";
            default:
                return "World";
        }
    }

    renderGameUrl(game: CommunityGame) {
        return <Link className="nick-name" to={`game/${game.gameId}`}>{game.title}</Link>
    }

    renderGameBody(game: CommunityGame) {
        let className = game.communityListIcon != null && game.communityListIcon != '' ? "with-profile-post-image" : "";
        let iconUri = `https://web.archive.org/web/20171014154111im_/${game.iconUri}`;
        return <div id="sidebar-profile-body" className={className}>
            <div className="icon-container">
                <Link target='_blank' to={`/game/${game.gameId}`}>
                    <Img src={[iconUri, '/img/anonymous-mii.png']} alt={game.title}
                        loader={<img
                            className="icon"
                            src="/img/spinner.gif"></img>}
                        className="icon"></Img>
                </Link>
            </div>
            {this.renderGameUrl(game)}
            <p className="id-name">{game.type}</p>
            <p className="id-name">{this.translateViewRegion(game.viewRegion)}</p>
        </div>
    }

    renderGameProfileMetadata(game: CommunityGame) {
        return <ul className="community-metadata" id="sidebar-profile-status">
            <li>
                <Link to={`/game/${game.gameId}`}>
                    <span>
                        <span className="number test-friend-count">
                            {game.totalPosts.toLocaleString()}
                        </span>
                        Posts
                    </span>
                </Link>
            </li>
            <li>
                <Link to={`/game/${game.gameId}`}>
                    <span>
                        <span className="number test-following-count">
                            {game.totalReplies.toLocaleString()}
                        </span>
                        Replies
                    </span>
                </Link>
            </li>
            <li>
                <Link to={`/game/${game.gameId}`}>
                    <span>
                        <span className="number test-follower-count">
                            {game.totalDeletedPosts.toLocaleString()}
                        </span>
                        Deleted Posts
                    </span>
                </Link>
            </li>
        </ul>;
    }

    renderCommunityListIcon(coverUri: string) {
        let archiveUri = "https://web.archive.org/web/20171014154111im_/" + coverUri;
        return <div className="sidebar-cover-community">
            <Img src={[archiveUri, '/img/missing-community.png']}
                className="sidebar-cover-image"
                loader={<img className="post-memo placeholder"
                    src="/img/placeholder-community.png"></img>}></Img>
        </div>;
    }

    renderGame(game: CommunityGame) {
        let sidebarCover = game.communityListIcon != null && game.communityListIcon != '' ? this.renderCommunityListIcon(game.communityListIcon) : <div />;
        return (
            <div className="user-sidebar">
                <div className="sidebar-container">
                    {sidebarCover}
                    {this.renderGameBody(game)}
                    {this.renderGameProfileMetadata(game)}
                </div>
            </div>
        );
    }

    render() {
        return this.renderGame(this.props.game);
    }
}