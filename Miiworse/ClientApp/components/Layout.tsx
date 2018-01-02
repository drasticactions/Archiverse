import * as React from 'react';
import { NavMenu } from './NavMenu';
import { inject, observer } from "mobx-react";
import { withRouter} from 'react-router-dom';
import { AppState } from '../appState';
import DevTools from "mobx-react-devtools";

export interface LayoutProps {
    children?: React.ReactNode;
    appState?: AppState
}

@withRouter @inject('appState') @observer
export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9 body-contents'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
