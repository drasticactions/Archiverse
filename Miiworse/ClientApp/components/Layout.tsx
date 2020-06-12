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
        if (navigator.onLine) {
            return (
                <div>
                    <NavMenu />
                    <main role="main">
                        {this.props.children}
                    </main>
                </div>
            );
        }
        else {
            return <div className="loader">
                <div className="center-block">
                    <img className="center-block img-responsive" src="/img/archiverse-logo.png" />
                </div>
                <div className="center-block">
                    <h2 className="text-center">In order to explore the Archiverse, you must be connected to the Internet!</h2>
                    <h3 className="text-center">Verify your Internet connection and refresh.</h3>
                </div>
            </div>
        }
    }
}

export default Layout;