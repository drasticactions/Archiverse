import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Post } from '../../appState';
import Img from 'react-image';
import { PostView } from '../PostView'

@observer
export class PostReplyModal extends React.Component<{autoloadPostId?: string}, {}> {
    state: any;
    @observable isLoading: boolean;
    @observable post: Post;
    @observable replies: Post[] = [];
    oldState: any;
    constructor(props: any) {
        super(props);
        this.state = {
            modal: this.props.autoloadPostId != ''
        };
        this.toggle = this.toggle.bind(this);
        if (this.props.autoloadPostId != '')
            this.loadPost();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    close() {
        this.toggle();
    }

    async open(post: Post) {
        window.history.pushState(window.history.state, "Post Reply", `post/${post.id}`);
        this.replies = [];
        this.post = post;
        this.toggle();
        await this.loadReplies();
    }

    async loadPost() {
        this.isLoading = true;
        try {
            let method = 'POST';
            let headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            let body = JSON.stringify({ id: this.props.autoloadPostId });
           
            this.post = await (await fetch(`api/posts/getpost`, { method, headers, body })).json() as Post;
            await this.loadReplies();
        } catch (e) {
            console.error(e);
        }
        this.isLoading = false;
    }

    async loadReplies() {
        this.isLoading = true;
        try {
            let method = 'POST';
            let headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            let body = JSON.stringify({ inReplyToId: this.post.id });
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
        let post = this.post != null ? <PostView isReply={true} post={this.post}></PostView> : <div/>
        let title = this.post != null ? <a className="community-header-link" href={`https://web.archive.org/https://miiverse.nintendo.net/titles/${this.post.titleId}/${this.post.gameId}`} target='_blank'>
        <Img className="community-icon" src={this.post.gameCommunityIconUri}></Img>
        {this.post.gameCommunityTitle}
    </a> : <div/>;
        let replies = this.replies != null ? this.replies.map(n => <div style={{ marginBottom: "5px" }} className="post post-content">
            <PostView isReply={true} post={n} />
        </div>) : "";
        return (
            <div className="group community-container">
                <Modal isOpen={this.state.modal} toggle={() => this.close()}>
                    <ModalHeader toggle={() => this.close()}>
                        {title}
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ marginBottom: "5px" }} className="post post-content">
                            {post}
                        </div>
                        <div>{replies}</div>
                        {loading}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.close()}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}