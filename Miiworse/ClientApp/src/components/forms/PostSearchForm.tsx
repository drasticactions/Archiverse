import * as React from 'react';
import { Button, Form, FormGroup, Input, Label, FormControl, ButtonGroup, Collapse } from 'reactstrap';
import InputField from '../fields/InputField';
import CheckboxField from '../fields/CheckboxField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PostSearch, SortPosts } from '../../appState';
import { CommunityPickerModal } from '../modal/CommunityPickerModal';
import { DateTimePicker } from 'react-widgets';

@observer
export class PostSearchForm extends React.Component<{ search: PostSearch }, {}> {

    @observable isOpen: boolean = false;
    @observable isDirty: boolean = false;

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
            <div style={{
                border: "1px solid #ccc",
                backgroundColor: "white", padding: "10px", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"
            }}>
                <Form>
                    <FormGroup>
                        <Button block onClick={() => this.openModal()}>Select Game</Button>
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
                            label="Nintendo Network ID (Case Sensitive)"
                            name="name"
                            onChange={(x, y) => this.updateProperty(x, y)}
                            value={this.props.search.name} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Sort by # of "Yeahs"</Label>
                        <Input type="select" name="sortEmpathy" value={this.props.search.sortEmpathy} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Sort by # of Replies</Label>
                        <Input type="select" name="sortReplyCount" value={this.props.search.sortReplyCount} onChange={(x, y) => this.updateDropProperty(x, y)}>
                            <option value={SortPosts.None}>---</option>
                            <option value={SortPosts.Most}>Most</option>
                            <option value={SortPosts.Least}>Least</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Start Date:</Label>
                        <DateTimePicker value={this.props.search.startDate}
                            onChange={(x) => this.updateProperty("startDate", x)}
                            time={false} />
                    </FormGroup>
                    <FormGroup>
                        <Label>End Date:</Label>
                        <DateTimePicker
                            onChange={(x) => this.updateProperty("endDate", x)}
                            value={this.props.search.endDate}
                            time={false} />
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
                {contentDiv}
            </div>
        );
    }
}