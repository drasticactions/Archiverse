import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { observable } from 'mobx';
import InputField from '../fields/InputField';
import { observer } from 'mobx-react';
import { CommunityGame, PostSearch, UserSearch } from '../../appState';
import Img from 'react-image';
import * as ReactList from 'react-list';
import { PostSearchForm } from '../forms/PostSearchForm';
import { UserSearchForm } from '../forms/UserSearchForm';
import { UsersView } from '../UsersView';

@observer
export class UsersSearchModal extends React.Component<{ usersView: UsersView }, {}> {
    state: any;
    search: UserSearch = new UserSearch();
    @observable isLoading: boolean;

    constructor(props: any) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    async open(userSearch: UserSearch) {
        this.search = userSearch;
        this.toggle();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    runSearch() {
        this.props.usersView.loadMoreUsers(true);
        this.toggle();
    }

    render() {
        return (
            <div className="group community-container">
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <h4>User Search</h4>
                    </ModalHeader>
                    <ModalBody>
                        <UserSearchForm search={this.search} />
                    </ModalBody>
                    <ModalFooter>
                        <Button block onClick={() => this.runSearch()}>Search</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}