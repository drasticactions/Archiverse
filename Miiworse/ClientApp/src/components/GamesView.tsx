import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Waypoint from 'react-waypoint';
import StackGrid from 'react-stack-grid';
import { AppState, PagedResults, CommunityGame, GamesViewState, SortPosts, GameSearch } from '../appState';
import actions from '../actions';
import { GameView } from './GameView';


interface Props {
    appState: AppState;
    search?: GameSearch;
    size: any;
    match: any;
    autoload: boolean;
    hideHeader?: boolean;
    isSearch?: boolean;
    staticData?: boolean;
    staticPosts?: CommunityGame[];
    customWidth?: string;
}

@observer
export class GamesView extends React.Component<Props, {}> {
    pagedResults: PagedResults = new PagedResults();
    @observable viewState: GamesViewState = new GamesViewState();
    grid: any;

    constructor(props) {
        super(props);

        //this.parseQueryString(query.parse(location.search));
        if (this.props != null) {
            this.viewState.isDone = false;
            this.viewState.isError = false;
            this.viewState.isEmpty = false;
            this.viewState.isLoading = false;
        }

        this.loadMoreGames(true);
    }

    async loadMoreItems(args) {
        if (this.viewState.games != null && this.viewState.games.length > 0) {
            await this.loadMoreGames(false);
        }
    }

    async loadMoreGames(isDirty: boolean) {
        this.viewState.isError = false;
        this.viewState.isEmpty = false;

        if (this.refs.communitySearchForm != null && isDirty) {
            this.pagedResults = new PagedResults();
            this.viewState.games = [];
            isDirty = false;
            this.props.search.page = 1;
            this.viewState.isEmpty = false;
            this.viewState.isDone = false;
            this.viewState.isError = false;
        }
        this.viewState.isLoading = true;
        try {
            this.pagedResults = await actions.returnPagedResults("api/community", JSON.stringify(this.props.search));
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
        this.props.search.page = this.props.search.page + 1;
        //console.log(this.pagedResults);
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

    public render() {
        const { width } = this.props.size;
        let posts = this.viewState.games != null ? this.viewState.games.map(n => <GameView game={n} />) : "";
        let widthGrid = this.props.customWidth != null ? this.props.customWidth : width <= 400 ? '100%' : 400;
        let stackgrid = this.viewState.games.length > 0 ? <StackGrid monitorImagesLoaded={true} gridRef={grid => this.grid = grid} columnWidth={widthGrid}>
            {posts}
        </StackGrid> : <div />
        let error = this.viewState.isError ? this.renderError() : <div />;
        let empty = this.viewState.isEmpty ? this.renderEmpty() : <div />;
        let loading = this.viewState.isLoading ? <img className="center-block" style={{ height: "100px", width: "100px" }} src="img/spinner.gif"></img> : <div />;
        let waypoint = !this.viewState.isDone && !this.props.staticData ? <Waypoint bottomOffset='-200px' onEnter={(args) => this.loadMoreItems(args)}>
            {loading}
        </Waypoint> : <div />;
        return <div>
            {empty}
            {error}
            {stackgrid}
            {waypoint}
        </div>;
    }
}