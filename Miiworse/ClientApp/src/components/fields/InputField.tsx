import * as React from 'react';
import { Props } from 'react';
import { observer } from 'mobx-react';
import { Label, Tooltip } from 'reactstrap';
import actions from '../../actions';

@observer
export default class InputField extends React.Component<any, any> {
    state: any;
    refGuid: string;

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.refGuid = actions.generateGuid();
        this.state = {
            tooltipOpen: false
        };
    }

    onChange(event) {
        this.props.onChange(event.target.name, event.target.value)
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    focus() {
        let ref = this.refs[this.refGuid] as any;
        if (ref != null) {
            ref.focus();
        }
    }

    generateHelpLabel(help: string, name: string) {
        return <span style={{ marginRight: "8px" }} id={'tooltip-' + name} className="label label-default">
            ?
        <Tooltip isOpen={this.state.tooltipOpen} toggle={this.toggle} target={'tooltip-' + name}>
                {help}
            </Tooltip>
        </span>;
    }

    render() {
        const input = this.props
        let renderLabel = input.help != null && input.name != null ? this.generateHelpLabel(input.help, input.name) : <div />
        return (
            <div className="form-group">
                <Label>{renderLabel}{input.label}:</Label>
                <input
                    className="form-control"
                    id={input.id}
                    ref={this.refGuid}
                    name={input.name}
                    onChange={this.onChange}
                    type={input.type}
                    value={input.value} />
            </div>
        )
    }
}