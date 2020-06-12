import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, ButtonGroup, Collapse } from 'reactstrap';
import InputField from '../fields/InputField';
import CheckboxField from '../fields/CheckboxField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PostSearch, SortPosts, UserSearch, SortGameSkill, SortTitle, Constants } from '../../appState';
import { CommunityPickerModal } from '../modal/CommunityPickerModal';
import { DateTimePicker } from 'react-widgets';

@observer
export class UserSearchForm extends React.Component<{ search: UserSearch }, {}> {
    @observable isOpen: boolean = false;
    @observable isDirty: boolean = false;
    constants: Constants = new Constants();
    updateProperty(key, value) {
        this.props.search[key] = value;
        this.isDirty = true;
    }

    updateDropProperty(x, y) {
        this.props.search[x.target.name] = parseInt(x.target.value);
        this.isDirty = true;
    }

    clearProperty(key, value) {
        this.props.search[key] = "";
        this.isDirty = true;
    }

    constructor(props: any) {
        super(props);
    }

    openPane() {
        this.isOpen = !this.isOpen;
    }

    onChangeDate(handler, value, formattedValue) {
        handler = value;
    }

    renderContents() {
        return <div style={{
            border: "1px solid #ccc",
            backgroundColor: "white", padding: "10px", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"
        }}>
            <form>
                <FormGroup>
                    <InputField type="text"
                        label="Nintendo Network ID (Case Sensitive)"
                        name="name"
                        onChange={(x, y) => this.updateProperty(x, y)}
                        value={this.props.search.name} />
                </FormGroup>
                <FormGroup>
                    <InputField type="text"
                        label="Username (Case Sensitive)"
                        name="screenName"
                        onChange={(x, y) => this.updateProperty(x, y)}
                        value={this.props.search.screenName} />
                </FormGroup>
                <FormGroup>
                    <Label>Country</Label>
                    <Input type="select" name="country" value={this.props.search.country} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        {this.constants.countryList.map(n => <option value={n}>{n}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Sort by # of Posts</Label>
                    <Input type="select" name="sortPosts" value={this.props.search.sortPosts} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortPosts.None}>---</option>
                        <option value={SortPosts.Most}>Most</option>
                        <option value={SortPosts.Least}>Least</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Sort by # of Replies</Label>
                    <Input type="select" name="sortReplies" value={this.props.search.sortReplies} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortPosts.None}>---</option>
                        <option value={SortPosts.Most}>Most</option>
                        <option value={SortPosts.Least}>Least</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Sort by # of Deleted Posts</Label>
                    <Input type="select" name="sortDeletedPosts" value={this.props.search.sortDeletedPosts} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortPosts.None}>---</option>
                        <option value={SortPosts.Most}>Most</option>
                        <option value={SortPosts.Least}>Least</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Sort by # of Followers</Label>
                    <Input type="select" name="sortFollowers" value={this.props.search.sortFollowers} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortPosts.None}>---</option>
                        <option value={SortPosts.Most}>Most</option>
                        <option value={SortPosts.Least}>Least</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Sort by # of Following users</Label>
                    <Input type="select" name="sortFollowing" value={this.props.search.sortFollowing} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortPosts.None}>---</option>
                        <option value={SortPosts.Most}>Most</option>
                        <option value={SortPosts.Least}>Least</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Sort by # of Friends</Label>
                    <Input type="select" name="sortFriends" value={this.props.search.sortFriends} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortPosts.None}>---</option>
                        <option value={SortPosts.Most}>Most</option>
                        <option value={SortPosts.Least}>Least</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Sort by Game Skill</Label>
                    <Input type="select" name="sortGameSkill" value={this.props.search.sortGameSkill} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortGameSkill.None}>---</option>
                        <option value={SortGameSkill.Expert}>Expert</option>
                        <option value={SortGameSkill.Intermediate}>Intermediate</option>
                        <option value={SortGameSkill.Beginner}>Beginner</option>
                        <option value={SortGameSkill.Hidden}>Hidden</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Order by Name</Label>
                    <Input type="select" name="sortName" value={this.props.search.sortName} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortTitle.Asc}>Ascending</option>
                        <option value={SortTitle.Desc}>Descending</option>
                    </Input>
                </FormGroup>
            </form>
       </div>
    }

    render() {
        let contentDiv = this.renderContents();
        return (
            <div style={{ marginBottom: "5px" }}>
                {contentDiv}
            </div>
        );
    }
}