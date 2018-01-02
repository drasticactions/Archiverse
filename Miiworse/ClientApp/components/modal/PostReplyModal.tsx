import * as React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Post } from '../../appState';
import Img from 'react-image';
import { PostView } from '../PostView'

@observer
export class PostReplyModal extends React.Component<{}, {}> {
    
    @observable showModal: boolean;
    @observable isLoading: boolean;
    @observable post: Post = new Post();
    @observable replies: Post[] = [];

    constructor(props: any) {
        super(props);
    }

    close() {
        this.showModal = false;
    }

    async open(post: Post) {
        this.replies = [];
        this.post = post;
        this.showModal = true;
        await this.loadReplies();
    }

    async loadReplies() {
        this.isLoading = true;
        try {
            let method = 'POST';
            let headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            let body = JSON.stringify({inReplyToId: this.post.id});
            //console.log(body);
            this.replies = await (await fetch("api/replies", { method, headers, body })).json() as Post[];
            //console.log(this.replies);
        } catch (e) {
            console.error(e);
        }
        this.isLoading = false;
    }

    render() {
        //console.log(this.post);
        let loading = this.isLoading ? <img className="center-block" style={{ height: "100px", width: "100px" }} src="img/spinner.gif"></img> : <div></div>;
        let replies = this.replies != null ? this.replies.map(n => <div style={{ marginBottom: "5px" }} className="post post-content">
            <PostView isReply={true} post={n} />
        </div>) : "";
        return (
            <div className="group community-container">
                <Modal show={this.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                    <a className="community-header-link" href={`https://web.archive.org/https://miiverse.nintendo.net/titles/${this.post.titleId}/${this.post.gameId}`} target='_blank'>
                        <Img className="community-icon" src={this.post.gameCommunityIconUri}></Img>
                        {this.post.gameCommunityTitle}
                    </a>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{marginBottom: "5px"}} className="post post-content">
                            <PostView isReply={true} post={this.post}></PostView>
                        </div>
                        <div>{replies}</div>
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