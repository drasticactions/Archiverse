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
import { AppState, CommunityGame, GameSearch, PostSearch, GameViewState } from '../appState';
import { PostsView } from './PostsView';
import actions from '../actions';
import { Link } from 'react-router-dom';

interface Props {
    appState: AppState;
    size: any;
    match: any;
    game?: CommunityGame;
}

@inject("appState") @observer
class CommunityGameView extends React.Component<Props, {}> {

    search: PostSearch;
    @observable viewState: GameViewState = new GameViewState();

    constructor(props) {
        super(props);
        console.log("change");
        this.search = new PostSearch();
        this.viewState.game = null;
        this.viewState.gameStats = null;
        this.viewState.gameDoesNotExist = false;
        if (this.props.match != null) {
            //console.log(this.props.match);
            this.search.gameId = this.props.match.params.id;
            actions.setCurrentGame(this.viewState, this.search, true);
        }
    }

    loading() {
        return <div style={{ paddingTop: "100px" }} className="loader">
            <img src="/img/spinner.gif"></img>
        </div>;
    }

    loadingGameMetadata() {
        return <div className="loader-parent">
            <img className="loader-child" src="/img/spinner.gif"></img>
        </div>;
    }

    errorLoadingGameMetadata() {
        return <div className="error-message">
            <h3 className="text-center">Query Timeout! 😢</h3>
            <h4 className="text-center">The query took too long and timed out.</h4>
        </div>;
    }

    renderSidebarCover(coverUri: string) {
        let archiveUri = "https://web.archive.org/web/20171014154111im_/" + coverUri;
        return <div id="sidebar-cover">
            <Img src={[archiveUri, '/img/missing-community.png']}
                className="sidebar-cover-image"
                loader={<img className="post-memo placeholder"
                    src="/img/placeholder-community.png"></img>}></Img>
        </div>;
    }

    renderPlatform(num: Number) {
        let platformtag = '';
        switch (num) {
            case 0:
                platformtag = '/img/platform-tag-3ds.png';
                break;
            case 1:
                platformtag = '/img/platform-tag-wiiu.png';
                break;
            case 2:
                platformtag = '/img/platform-tag-wiiu-3ds.png';
                break;
        }
        return <span className="platform-tag">
            <img src={platformtag}></img>
        </span>
    }

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
        }
    }

    renderGameBody() {
        let game = this.viewState.game;
        let iconUri = `https://web.archive.org/web/20171014154111im_/${game.iconUri}`;
        return <header id="sidebar-community-body">
            <span id="sidebar-community-img">
                <div className="icon-container">
                    <a target='_blank' href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/titles/${game.titleId}/${game.gameId}`}>
                        <Img src={[iconUri, '/img/anonymous-mii.png']} alt={game.title}
                            loader={<img
                                className="icon"
                                src="/img/spinner.gif"></img>}
                            className="icon"></Img>
                    </a>
                </div>
            </span>
            <span className="news-community-badge">{game.communityBadge}</span>
            <h1 className="community-name">
                <a href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/titles/${game.titleId}/${game.gameId}`}>{game.title}</a>
            </h1>
            <p className="community-view-region">{this.translateViewRegion(game.viewRegion)}</p>
        </header>
    }

    renderContent() {
        let game = this.viewState.game;
        let sidebarCover = game.communityListIcon != null && game.communityListIcon != '' ? this.renderSidebarCover(game.communityListIcon) : <div />;
        return <section id="sidebar-community" className="sidebar-container">
            {sidebarCover}
            {this.renderGameBody()}
        </section>;
    }

    renderGamePostData() {
        let game = this.viewState.game;
        return <div>
            <div className="sidebar-container sidebar-profile">
                <div className="user-data">
                    <div className="game-skill data-content">
                        <h4><span>Posts</span></h4>
                        <div className="note">{game.totalPosts.toLocaleString()}</div>
                    </div>
                    <div className="game-skill data-content">
                        <h4><span>Replies</span></h4>
                        <div className="note">{game.totalReplies.toLocaleString()}</div>
                    </div>
                    <div className="game-skill data-content">
                        <h4><span>Deleted Posts</span></h4>
                        <div className="note">{game.totalDeletedPosts.toLocaleString()}</div>
                    </div>
                </div>
            </div>
            <Link style={{ marginTop: "10px", marginBottom: "10px" }} to={`/posts?gameId=${game.gameId}`} className="btn btn-default btn-block" role="button">View Feed</Link>
            <a className="btn btn-default btn-block" style={{ marginTop: "10px", marginBottom: "10px" }} href={`https://web.archive.org/https://miiverse.nintendo.net/titles/${game.titleId}/${game.gameId}`} target='_blank'>View Original Community Page</a>
            {this.viewState.relatedGame != null && this.viewState.relatedGame.length > 0 ? this.renderRelatedGameData() : <div />}
        </div>;
    }

    renderRelatedGameData() {
        let related = this.viewState.relatedGame;
        return <div className="sidebar-setting sidebar-container">
            <ul className="sidebar-other-menu test-related-communities">
                <li>
                    <Link className="sidebar-menu-relation symbol test-related-communities-link" to={`/games?titleId=${this.viewState.game.titleId}`}>
                        <span>Related Communities</span>
                    </Link>
                </li>
                <li className="community-list">
                    <ul>
                        {related.map(game => {
                            return <li className="trigger test-community-list-item">
                                <div className="community-list-body">
                                    <div className="icon-container">
                                        <a target='_blank' href={`https://web.archive.org/web/20171014154111/https://miiverse.nintendo.net/titles/${game.titleId}/${game.gameId}`}>
                                            <Img src={[`https://web.archive.org/web/20171014154111im_/${game.iconUri}`, '/img/anonymous-mii.png']} alt={game.title}
                                                loader={<img
                                                    className="icon"
                                                    src="/img/spinner.gif"></img>}
                                                className="icon"></Img>
                                        </a>
                                    </div>
                                    <div className="body">
                                        <Link className="title" to={`/posts?gameId=${game.gameId}`}>{game.title}</Link>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    }

    renderGamePostMetadata() {
        const { width } = this.props.size;
        let gameStats = this.viewState.gameStats;
        let popularposts = gameStats.popularPosts.length > 0 ? <div>
            <PostsView ref="postsView"
                autoload={true}
                size={this.props.size}
                match={this.props.match}
                appState={this.props.appState}
                customWidth={width <= 768 ? '100%' : '44.33%'}
                hideHeader={true}
                staticPosts={gameStats.popularPosts}
                staticData={true}></PostsView>
        </div> : <div className="user-metadata"><h3 className="text-center">No game stats available 😪</h3></div>
        return popularposts;
    }

    renderGameView() {
        let stats = this.viewState.gameStats == null ? this.loadingGameMetadata() : this.renderGamePostMetadata();

        return <div>
            <div className="row">
                <div className="col-md-4">
                    {this.viewState.game == null ? this.loading() : this.renderContent()}
                    {this.viewState.gameStats == null ? <div /> : this.renderGamePostData()}
                </div>
                <div className="col-md-8">
                    <div style={{ padding: "2px", marginBottom: "5px" }} className="post post-content">
                        <h3 style={{ fontWeight: "bold", marginTop: "10px" }} className="text-center">Popular Posts</h3>
                    </div>
                    {this.viewState.isError ? this.errorLoadingGameMetadata() : stats}
                </div>
            </div>
        </div>
    }

    renderGameNotFoundView() {
        return <div>
            <div style={{ padding: "2px", marginBottom: "5px" }} className="post post-content">
                <h3 style={{ fontWeight: "bold", marginTop: "10px" }} className="text-center">Game ID Not Found 😪</h3>
            </div>
        </div>
    }

    public render() {
        return this.viewState.gameDoesNotExist ? this.renderGameNotFoundView() : this.renderGameView();
    }
}

export default sizeMe({ monitorHeight: true })(CommunityGameView);