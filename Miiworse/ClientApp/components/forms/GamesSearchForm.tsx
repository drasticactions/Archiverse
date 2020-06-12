import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, ButtonGroup, Collapse } from 'reactstrap';
import InputField from '../fields/InputField';
import CheckboxField from '../fields/CheckboxField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PostSearch, SortPosts, UserSearch, SortGameSkill, SortTitle, Constants, GameSearch } from '../../appState';
import { CommunityPickerModal } from '../modal/CommunityPickerModal';
import { DateTimePicker } from 'react-widgets';

@observer
export class GamesSearchForm extends React.Component<{ search: GameSearch }, {}> {
    @observable isOpen: boolean = false;
    @observable isDirty: boolean = false;

    updateProperty(key, value) {
        this.props.search[key] = value;
        this.isDirty = true;
    }

    updateDropProperty(x, y) {
        this.props.search[x.target.name] = x.target.value;
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
                    <Label>Order Title</Label>
                    <Input type="select" name="sortTitle" value={this.props.search.sortTitle} onChange={(x, y) => this.updateDropProperty(x, y)}>
                        <option value={SortTitle.Asc}>Ascending</option>
                        <option value={SortTitle.Desc}>Descending</option>
                    </Input>
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