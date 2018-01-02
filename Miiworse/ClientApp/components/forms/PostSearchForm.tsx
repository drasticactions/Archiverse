import * as React from 'react';
import { Modal, Button, Form, FormGroup, InputGroup, Glyphicon, ControlLabel, FormControl, ButtonGroup, Collapse } from 'react-bootstrap';
import InputField from '../Fields/InputField';
import CheckboxField from '../Fields/CheckboxField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PostSearch, SortPosts } from '../../appState';
import { CommunityPickerModal } from '../modal/CommunityPickerModal';
import * as DatePicker from 'react-bootstrap-date-picker'

@observer
export class PostSearchForm extends React.Component<{ search: PostSearch }, {}> {
    
    @observable isOpen: boolean = false;
    @observable isDirty: boolean = false;
    @observable searchText: string = "Show Advance Search Options";
    
    refs: {
        communityPickerModal: CommunityPickerModal;
    };

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

    openModal() {
        this.isDirty = true;
        this.refs.communityPickerModal.open(this.props.search);
    }

    onChangeDate(handler, value, formattedValue) {
        handler = value;
    }

    renderContents() {
        return (
            <div style={{ border: "1px solid #ccc", 
                backgroundColor: "white", padding: "10px", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"
            }}>
                <Form>
                    <FormGroup>
                        <ButtonGroup vertical block>
                            <Button onClick={() => this.openModal()}>Select Game</Button>
                        </ButtonGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputField type="text"
                            label="Game ID"
                            name="gameId"
                            onChange={
                                (x, y) => this.updateProperty(x, y)
                            }
                            value={this.props.search.gameId} />
                    </FormGroup>
                    <FormGroup>
                        <InputField type="text"
                            label="Username"
                            name="name"
                            onChange={(x, y) => this.updateProperty(x, y)}
                            value={this.props.search.name} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of "Yeahs"</ControlLabel>
                        <FormControl componentClass="select" name="sortEmpathy" value={this.props.search.sortEmpathy} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sort by # of Replies</ControlLabel>
                        <FormControl componentClass="select" name="sortReplyCount" value={this.props.search.sortReplyCount} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Start Date:</ControlLabel>
                        <DatePicker value={this.props.search.startDate} onChange={(x, y) => this.updateProperty("startDate", x)} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>End Date:</ControlLabel>
                        <DatePicker value={this.props.search.endDate} onChange={(x, y) => this.updateProperty("endDate", x)} />
                    </FormGroup>
                    <CheckboxField
                        label="Drawing Only"
                        name="isDrawingOnly"
                        isInline={true}
                        onChange={(x, y) =>
                            this.updateProperty(x, y)}
                        value={this.props.search.isDrawingOnly} />
                    <CheckboxField
                        label="Screenshot Only"
                        name="isScreenshotOnly"
                        isInline={true}
                        onChange={(x, y) =>
                            this.updateProperty(x, y)}
                        value={this.props.search.isScreenshotOnly} />
                    <CheckboxField
                        label="Order By Date Descending"
                        name="orderByDateDescending"
                        isInline={true}
                        onChange={(x, y) =>
                            this.updateProperty(x, y)}
                        value={this.props.search.orderByDateDescending} />
                </Form>
            </div>
        );
    }

    render() {
        let contentDiv = this.renderContents();
        return (
            <div style={{ marginBottom: "5px" }}>
                <CommunityPickerModal ref="communityPickerModal"></CommunityPickerModal>
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