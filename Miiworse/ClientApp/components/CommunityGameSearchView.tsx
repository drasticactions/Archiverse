import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import StackGrid from "react-stack-grid";
import { Button, Glyphicon } from 'react-bootstrap';
import Waypoint = require('react-waypoint');
import moment = require('moment');
import Img from 'react-image';
import { CommunitySearchForm } from './forms/CommunitySearchForm';
import { RouteComponentProps } from 'react-router';
import { AppState, PagedResults, CommunityGame, GameSearch, CommunitySearchViewState, SortPosts, SortTitle } from '../appState';
import sizeMe from 'react-sizeme';
import actions from '../actions';
import { Link } from 'react-router-dom';
import * as query from 'query-string';

interface Props {
    appState: AppState;
    size: any;
    match: any;
}

@inject("appState") @observer
class CommunityGameSearchView extends React.Component<Props, {}> {

    pagedResults: PagedResults = new PagedResults();
    @observable viewState: CommunitySearchViewState = new CommunitySearchViewState();
    search: GameSearch = new GameSearch();
    isDirty: boolean;

    updateProperty(key, value) {
        this.isDirty = true;
        this.search[key] = value;
    }

    refs: {
        communitySearchForm: CommunitySearchForm;
    };

    constructor(props) {
        super(props);

        //this.parseQueryString(query.parse(location.search));
        if (this.props != null) {
            this.viewState.isDone = false;
            this.viewState.isError = false;
            this.viewState.isEmpty = false;
            this.viewState.isLoading = false;
        }

        this.parseQueryString(query.parse(location.search));

        this.loadMoreGames();
    }

    parseQueryString(parsed) {
        if (parsed != null) {
            if (parsed.title != null)
                this.search.title = parsed.title;

            if (parsed.titleId != null)
                this.search.titleId = parsed.titleId;

            if (parsed.type != null)
                this.search.type = parsed.type;

            if (parsed.title != null)
                this.search.title = parsed.title;

            if (parsed.searchAmerica != null) {
                this.search.searchAmerica = (parsed.searchAmerica == 'true');
            }

            if (parsed.searchEurope != null) {
                this.search.searchEurope = (parsed.searchEurope == 'true');
            }

            if (parsed.searchJapan != null) {
                this.search.searchJapan = (parsed.searchJapan == 'true');
            }

            if (parsed.searchWorld != null) {
                this.search.searchWorld = (parsed.searchWorld == 'true');
            }

            if (parsed.orderDesc != null) {
                this.search.orderDesc = (parsed.orderDesc == 'true');
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
                    this.search.sortTitle = SortTitle.Asc;
                if (parsed.sortTitle == 'desc')
                    this.search.sortTitle = SortTitle.Desc;
            }
        }
    }


    onChange(event) {
        this.updateProperty(event.target.name, event.target.value);
    }

    async loadMoreItems() {
        if (this.viewState.games != null && this.viewState.games.length > 0 && !this.viewState.isLoading) {
            await this.loadMoreGames();
        }
    }

    async loadMoreGames() {
        this.viewState.isError = false;
        this.viewState.isEmpty = false;

        if (this.refs.communitySearchForm) {
            this.refs.communitySearchForm.isOpen = false;
        }

        if (this.refs.communitySearchForm != null && this.refs.communitySearchForm.isDirty)
        {
            this.pagedResults = new PagedResults();
            this.viewState.games = [];
            this.refs.communitySearchForm.isDirty = false;
            this.search.page = 1;
            this.viewState.isEmpty = false;
            this.viewState.isDone = false;
            this.viewState.isError = false;
        }
        this.viewState.isLoading = true;
        try {
            this.pagedResults = await actions.returnPagedResults("api/community", JSON.stringify(this.search));
            if (this.pagedResults.results.length > 0) {
                for (let post of this.pagedResults.results)
                    this.viewState.games.push(post);
            }
            else if (this.pagedResults.results.length <= 0 && this.viewState.games.length <= 0) {
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
        //console.log(this.pagedResults);
    }

    selectGame(game: CommunityGame) {

    }

    renderEmpty() {
        return <div className="empty-message">
            <h3 className="text-center">No games found! 🙈</h3>
            <h4 className="text-center">We couldn't find any games within the given search parameters.</h4>
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

    renderImage(imageUri) {
        if (imageUri == "") return <div></div>
        return <Img
            style={{ minHeight: '100px' }}
            className="post-memo"
            src={["https://web.archive.org/web/20171110012107if_/" + imageUri, '/img/missing-community.png']}
            loader={<img className="post-memo placeholder"
                src="/img/placeholder-community.png"></img>}
        ></Img>
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

    renderCommunityListIcon(coverUri: string) {
        let archiveUri = "https://web.archive.org/web/20171014154111im_/" + coverUri;
        return <div className="sidebar-cover-community">
            <Img src={[archiveUri, '/img/missing-community.png']}
                className="sidebar-cover-image"
                loader={<img className="post-memo placeholder"
                    src="/img/placeholder-community.png"></img>}></Img>
        </div>;
    }

    renderGameUrl(game: CommunityGame) {
        return <Link className="nick-name" to={`games/${game.gameId}`}>{game.title}</Link>
    }

    renderGameBody(game: CommunityGame) {
        let className = game.communityListIcon != null && game.communityListIcon != '' ? "with-profile-post-image" : "";
        let iconUri = `https://web.archive.org/web/20171014154111im_/${game.iconUri}`;
        return <div id="sidebar-profile-body" className={className}>
            <div className="icon-container">
                <Link target='_blank' to={`/games/${game.gameId}`}>
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

    renderGameProfileMetadata(game: CommunityGame) {
        return <ul className="community-metadata" id="sidebar-profile-status">
            <li>
                <Link to={`/games/${game.gameId}`}>
                    <span>
                        <span className="number test-friend-count">
                            {game.totalPosts.toLocaleString()}
                        </span>
                        Posts
                    </span>
                </Link>
            </li>
            <li>
                <Link to={`/games/${game.gameId}`}>
                    <span>
                        <span className="number test-following-count">
                            {game.totalReplies.toLocaleString()}
                        </span>
                        Replies
                    </span>
                </Link>
            </li>
            <li>
                <Link to={`/games/${game.gameId}`}>
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

    public render() {
        const { width } = this.props.size;
        let posts = this.viewState.games != null ? this.viewState.games.map(n => this.renderGame(n)) : "";
        let loading = this.viewState.isLoading ? <img className="center-block" style={{ height: "100px", width: "100px" }} src="img/spinner.gif"></img> : <div />;
        let error = this.viewState.isError ? this.renderError() : <div />;
        let empty = this.viewState.isEmpty ? this.renderEmpty() : <div />;
        let stackgrid = this.viewState.games.length > 0 ? <StackGrid monitorImagesLoaded={true} columnWidth={width <= 400 ? '100%' : 400}>
            {posts}
        </StackGrid> : <div />;
        let waypoint = !this.viewState.isDone ? <Waypoint onEnter={(args) => this.loadMoreItems()}>
            {loading}
        </Waypoint> : <div />;
        return <div>
            <div style={{ marginBottom: "5px" }}>
                <CommunitySearchForm ref="communitySearchForm" search={this.search}></CommunitySearchForm>
                <Button disabled={this.viewState.isLoading} onClick={() => { this.loadMoreGames() }} block>Search</Button>
            </div>
            {empty}
            {error}
            {stackgrid}
            {waypoint}
        </div>;
    }
}

export default sizeMe({ monitorHeight: true })(CommunityGameSearchView);