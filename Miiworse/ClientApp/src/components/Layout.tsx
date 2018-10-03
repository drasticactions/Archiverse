import * as React from 'react';
import NavMenu from './NavMenu';

class Layout extends React.Component {
    state: any;
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <NavMenu />
                <main role="main">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;