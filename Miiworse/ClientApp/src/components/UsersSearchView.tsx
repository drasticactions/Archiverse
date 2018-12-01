import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button } from 'reactstrap';
import { AppState, PagedResults, Post, PostSearch, SortPosts, UserSearch, UsersViewState, Constants, SortTitle, User } from '../appState';
import * as query from 'query-string';
import actions from '../actions';
import { UserSearchForm } from './forms/UserSearchForm';
import Waypoint from 'react-waypoint';
import * as he from 'he';
import { find } from 'lodash';
import { Link } from 'react-router-dom';
import Img from 'react-image';
import StackGrid from 'react-stack-grid';
import { UsersSearchModal } from './modal/UsersSearchModal';
import sizeMe from 'react-sizeme';
import { UsersView } from './UsersView';

interface Props {
    appState: AppState;
    size: any;
    match: any;
}

@inject("appState") @observer
class UsersSearchView extends React.Component<Props, {}> {
    pagedResults: PagedResults = new PagedResults();
    @observable viewState: UsersViewState = new UsersViewState();
    search: UserSearch = new UserSearch();
    constants: Constants = new Constants();

    refs: {
        usersView: UsersView;
        usersSearchModal: UsersSearchModal;
    };

    constructor(props) {
        super(props);

        if (this.props != null) {
            this.viewState.isDone = false;
            this.viewState.isError = false;
            this.viewState.isEmpty = false;
            this.viewState.isLoading = false;
            this.parseQueryString(query.parse(location.search));
            //this.loadMoreUsers();
        }
    }

    parseQueryString(parsed) {
        if (parsed != null) {
            if (parsed.name != null)
                this.search.name = he.decode(parsed.name);

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

    openModal() {
        this.refs.usersSearchModal.open(this.search);
    }

    public render() {
        const { width } = this.props.size;
        return <div>
            <UsersSearchModal usersView={this.refs.usersView} ref="usersSearchModal" />
            <div style={{ marginBottom: "5px" }}>
                <Button
                    disabled={this.refs.usersView != null
                        && this.refs.usersView.viewState.isLoading}
                    onClick={() => { this.openModal() }} block>Search</Button>
            </div>
            <UsersView ref="usersView"
                autoload={true}
                size={this.props.size}
                match={this.props.match}
                appState={this.props.appState}
                isSearch={true}
                search={this.search}></UsersView>
        </div>;
    }
}

export default sizeMe({ monitorHeight: true })(UsersSearchView);