import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { PostsSearchModal } from './modal/PostsSearchModal';
import { Button } from 'reactstrap';
import sizeMe from 'react-sizeme';
import { AppState, PagedResults, Post, PostSearch, SortPosts, GameSearch, SortTitle } from '../appState';
import { PostsView } from './PostsView';
import * as query from 'query-string';
import { GamesView } from './GamesView';
import { GamesSearchModal } from './modal/GamesSearchModal';

interface Props {
    appState: AppState;
    size: any;
    match: any;
}

@inject("appState") @observer
class GamesSearchView extends React.Component<Props, {}> {

    pagedResults: PagedResults = new PagedResults();
    @observable errorString: string = "";
    search: GameSearch = new GameSearch();
    grid: any;

    refs: {
        gamesView: GamesView;
        gamesSearchModal: GamesSearchModal;
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

    loadMorePosts() {
        this.refs.gamesView.loadMoreGames(true)
    }

    openModal() {
        this.refs.gamesSearchModal.open(this.search);
    }

    public render() {
        const { width } = this.props.size;
        return <div>
            <GamesSearchModal gamesView={this.refs.gamesView} ref="gamesSearchModal" />
            <div style={{ marginBottom: "5px" }}>
                <Button
                    disabled={this.refs.gamesView != null
                        && this.refs.gamesView.viewState.isLoading}
                    onClick={() => { this.openModal() }} block>Search</Button>
            </div>
            <GamesView ref="gamesView"
                autoload={true}
                size={this.props.size}
                match={this.props.match}
                appState={this.props.appState}
                isSearch={true}
                search={this.search}></GamesView>
        </div>;
    }
}

export default sizeMe({ monitorHeight: true })(GamesSearchView);