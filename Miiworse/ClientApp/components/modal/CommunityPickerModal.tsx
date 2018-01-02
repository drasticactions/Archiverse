import * as React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { observable } from 'mobx';
import InputField from '../Fields/InputField';
import { observer } from 'mobx-react';
import { CommunityGame, PostSearch } from '../../appState';
import Img from 'react-image';
import * as ReactList from 'react-list';
import { filter, contains } from 'lodash';
@observer
export class CommunityPickerModal extends React.Component<{}, {}> {
    @observable showModal: boolean;
    @observable isLoading: boolean;
    @observable games: CommunityGame[] = [];
    fullGames: CommunityGame[] = [];
    @observable search: PostSearch;
    @observable searchField: string;

    constructor(props: any) {
        super(props);
    }

    updateProperty(key, value) {
        this.searchField = value;
        if (value == '') {
            this.games = this.fullGames;
        }
        else {
            this.games = this.fullGames.filter(n => n.title.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
    }

    close() {
        this.showModal = false;
    }

    async open(search: PostSearch) {
        this.search = search;
        this.showModal = true;
        if (this.games.length <= 0)
            await this.loadGames();
    }

    selectGame(game: CommunityGame) {
        this.search.gameId = game.gameId;
        this.search.titleId = game.titleId;
        this.showModal = false;
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

    renderGame(game: CommunityGame) {
        return (
            <div onClick={() => this.selectGame(game)} style={{cursor: "pointer"}} className="post post-content">
                <div className="user-content">
                    <a className="icon-container">
                        <Img className="icon" src={["https://web.archive.org/web/20171110012107if_/" + game.iconUri, '/img/anonymous-mii.png']}></Img>
                    </a>
                    <div className="user-name-content">
                        <p className="user-name">
                            <span style={{color: "black", fontWeight: "bold"}} className="user-id">{game.title}</span>
                        </p>
                        <p className="user-name">
                            <span style={{ color: "black" }} className="user-id">{game.type}</span>
                        </p>
                        <p className="user-name">
                            <span style={{ color: "black" }} className="user-id">{this.translateViewRegion(game.viewRegion)}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }


    async loadGames() {
        this.isLoading = true;
        try {
            let method = 'POST';
            let headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            let body = JSON.stringify({ });
            //console.log(body);
            this.fullGames = await (await fetch("api/community/all", { method, headers, body })).json() as CommunityGame[];
            this.games = this.fullGames;
            //console.log(this.games);
        } catch (e) {
            console.error(e);
        }
        this.isLoading = false;
    }

    renderItem(index, key) {
        return <div style={{margin: "15px"}} key={key}>{this.renderGame(this.games[index])}</div>;
    }


    render() {
        let loading = this.isLoading ? <img className="center-block" style={{ height: "100px", width: "100px" }} src="img/spinner.gif"></img> : <div></div>;
        let games = this.games != null ? this.games.map(n => this.renderGame(n)) : "";
        return (
            <div className="group community-container">
                <Modal show={this.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <h4>Community Games</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <InputField type="text"
                                label="Game Title"
                                name="searchField"
                                onChange={
                                    (x, y) => this.updateProperty(x, y)
                                }
                                value={this.searchField} />
                        </form>
                        <div className="game-scroll-box">
                            <ReactList
                                itemRenderer={(key, value) => this.renderItem(key, value)}
                                length={this.games.length}></ReactList>
                        </div>
                        {loading}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}