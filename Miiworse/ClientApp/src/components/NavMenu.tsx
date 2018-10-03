import * as React from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { AppState } from '../appState';
import { observable } from 'mobx';
import { Strings } from '../strings';

@inject('appState') @observer
class NavMenu extends React.Component<{ appState?: AppState }, {}> {
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
        let { strings, currentLanguage } = this.props.appState;
        return (<Navbar className="navbar navbar-light bg-light navbar-expand-md justify-content-between fixed-top" expand="md">
            <div className="container-fluid">
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="dual-nav w-50 order-1 order-md-0" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/posts">{strings.Posts}</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/games">{strings.Games}</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/users">{strings.Users}</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/about">{strings.About}</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/faq">{strings.FAQ}</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
                <Link className='navbar-brand abs-center-x d-block text-center order-0 order-md-1' to={'/'}>
                    <div className='navbar-brand-style'>
                        <img style={{ maxHeight: "30px" }} className="navbar-brand-image img-responsive" src="/img/archiverse-logo.png">
                        </img>
                    </div>
                </Link>
            </div>
           
        </Navbar>);
    }
}

export default NavMenu;