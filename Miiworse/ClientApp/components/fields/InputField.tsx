import * as React from 'react';
import { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ControlLabel } from 'react-bootstrap';
import actions from '../../actions';

@observer
export default class InputField extends React.Component<any, any> {

    refGuid: string;

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.refGuid = actions.generateGuid();
    }

    onChange(event) {
        this.props.onChange(event.target.name, event.target.value)
    }

    focus() {
        //console.log("Focus!");
        let ref = this.refs[this.refGuid] as any;
        if (ref != null) {
            ref.focus();
        }
    }

    render() {
        const input = this.props
        return (
            <div>
                <ControlLabel>{input.label}: </ControlLabel>
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
