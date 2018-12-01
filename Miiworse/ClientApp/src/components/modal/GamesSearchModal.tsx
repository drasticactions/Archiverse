﻿import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { observable } from 'mobx';
import InputField from '../fields/InputField';
import { observer } from 'mobx-react';
import { CommunityGame, PostSearch, GameSearch } from '../../appState';
import Img from 'react-image';
import * as ReactList from 'react-list';
import { PostSearchForm } from '../forms/PostSearchForm';
import { PostsView } from '../PostsView';
import { GamesView } from '../GamesView';
import { GamesSearchForm } from '../forms/GamesSearchForm';
@observer
export class GamesSearchModal extends React.Component<{ gamesView: GamesView }, {}> {
    state: any;
    search: GameSearch = new GameSearch();
    @observable isLoading: boolean;

    constructor(props: any) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    async open(postSearch: GameSearch) {
        this.search = postSearch;
        this.toggle();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    runSearch() {
        this.props.gamesView.loadMoreGames(true);
        this.toggle();
    }

    render() {
        return (
            <div className="group community-container">
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <h4>Game Search</h4>
                    </ModalHeader>
                    <ModalBody>
                        <GamesSearchForm search={this.search} />
                    </ModalBody>
                    <ModalFooter>
                        <Button block onClick={() => this.runSearch()}>Search</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}