import * as React from 'react';
import { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ControlLabel } from 'react-bootstrap';
@observer
export default class CheckboxField extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.props.onChange(event.target.name, event.target.checked)
    }

    render() {
        const input = this.props
        let className = input.isInline ? "checkbox-inline" : "";
        return (
            <label className={className}>
                <input
                    id={input.id}
                    name={input.name}
                    onChange={this.onChange}
                    type="checkbox"
                    checked={input.value} />
                {input.label}
            </label>
        )
    }
}