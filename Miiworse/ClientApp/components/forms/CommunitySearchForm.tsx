import * as React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, ButtonGroup, Collapse } from 'react-bootstrap';
import InputField from '../Fields/InputField';
import CheckboxField from '../Fields/CheckboxField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { GameSearch, SortPosts, SortTitle } from '../../appState';

@observer
export class CommunitySearchForm extends React.Component<{ search: GameSearch }, {}> {

    @observable isOpen: boolean = false;
    @observable isDirty: boolean = false;
    @observable searchText: string = "Show Advance Search Options";

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
                            label="Title Search"
                            name="title"
                            onChange={(x, y) => this.updateProperty(x, y)}
                            value={this.props.search.title} />
                    </FormGroup>
                    <FormGroup>
                        <InputField type="text"
                            label="Type Search"
                            name="type"
                            onChange={(x, y) => this.updateProperty(x, y)}
                            value={this.props.search.type} />
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
                        <ControlLabel>Order Title</ControlLabel>
                        <FormControl componentClass="select" name="sortTitle" value={this.props.search.sortTitle} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortTitle.Asc}>Ascending</option>
                            <option value={SortTitle.Desc}>Descending</option>
                        </FormControl>
                    </FormGroup>
                    <CheckboxField
                        label="America Region"
                        name="searchAmerica"
                        isInline={true}
                        onChange={(x, y) =>
                            this.updateProperty(x, y)}
                        value={this.props.search.searchAmerica} />
                    <CheckboxField
                        label="Japan Region"
                        name="searchJapan"
                        isInline={true}
                        onChange={(x, y) =>
                            this.updateProperty(x, y)}
                        value={this.props.search.searchJapan} />
                    <CheckboxField
                        label="Europe Region"
                        name="searchEurope"
                        isInline={true}
                        onChange={(x, y) =>
                            this.updateProperty(x, y)}
                        value={this.props.search.searchEurope} />
                    <CheckboxField
                        label="World Region"
                        name="searchWorld"
                        isInline={true}
                        onChange={(x, y) =>
                            this.updateProperty(x, y)}
                        value={this.props.search.searchWorld} />
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