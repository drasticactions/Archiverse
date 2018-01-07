import * as React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, ButtonGroup, Collapse } from 'react-bootstrap';
import InputField from '../Fields/InputField';
import CheckboxField from '../Fields/CheckboxField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { UserSearch, SortPosts, SortTitle, SortGameSkill, Constants } from '../../appState';


@observer
export class UserSearchForm extends React.Component<{ search: UserSearch }, {}> {

    @observable isOpen: boolean = false;
    @observable isDirty: boolean = false;
    @observable searchText: string = "Show Advance Search Options";
    constants: Constants = new Constants();

    updateProperty(key, value) {
        this.props.search[key] = value;
        this.isDirty = true;
    }

    updateDropProperty(x, y) {
        this.props.search[x.target.name] = x.target.value;
        this.isDirty = true;
    }

    constructor(props: any) {
        super(props);
    }

    openPane() {
        this.isOpen = !this.isOpen;
    }

    renderContents() {
        return (
            <div style={{
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
                        <ControlLabel>Country</ControlLabel>
                        <FormControl componentClass="select" name="country" value={this.props.search.country} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            {this.constants.countryList.map(n => <option value={n}>{n}</option>)}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of Posts</ControlLabel>
                        <FormControl componentClass="select" name="sortPosts" value={this.props.search.sortPosts} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of Replies</ControlLabel>
                        <FormControl componentClass="select" name="sortReplies" value={this.props.search.sortReplies} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of Deleted Posts</ControlLabel>
                        <FormControl componentClass="select" name="sortDeletedPosts" value={this.props.search.sortDeletedPosts} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of Followers</ControlLabel>
                        <FormControl componentClass="select" name="sortFollowers" value={this.props.search.sortFollowers} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of Following users</ControlLabel>
                        <FormControl componentClass="select" name="sortFollowing" value={this.props.search.sortFollowing} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of Friends</ControlLabel>
                        <FormControl componentClass="select" name="sortFriends" value={this.props.search.sortFriends} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by Game Skill</ControlLabel>
                        <FormControl componentClass="select" name="sortGameSkill" value={this.props.search.sortGameSkill} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortGameSkill.None}>---</option>
                            <option value={SortGameSkill.Expert}>Expert</option>
                            <option value={SortGameSkill.Intermediate}>Intermediate</option>
                            <option value={SortGameSkill.Beginner}>Beginner</option>
                            <option value={SortGameSkill.Hidden}>Hidden</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Order by Name</ControlLabel>
                        <FormControl componentClass="select" name="sortName" value={this.props.search.sortName} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortTitle.Asc}>Ascending</option>
                            <option value={SortTitle.Desc}>Descending</option>
                        </FormControl>
                    </FormGroup>
                </form>
            </div>

        );
    }

    render() {
        let contentDiv = this.renderContents();
        return (
            <div style={{ marginBottom: "5px" }}>
                <div>
                    <ButtonGroup vertical block>
                        <Button onClick={() => this.openPane()}>{this.searchText}</Button>
                    </ButtonGroup>
                </div>
                <Collapse in={this.isOpen}>
                    {contentDiv}
                </Collapse>
            </div>
        );
    }
}