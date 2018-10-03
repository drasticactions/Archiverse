import * as React from 'react';
import { observer } from 'mobx-react';

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
        return (
            <div className="form-group">
                <div className="checkbox">
                    <label>
                        <input
                            id={input.id}
                            name={input.name}
                            onChange={this.onChange}
                            type="checkbox"
                            checked={input.value} />
                        {input.label}
                    </label>
                </div>
            </div>
        )
    }
}