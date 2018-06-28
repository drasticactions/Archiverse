import './css/site.css';
import './css/offdevice.css';
import './css/miiworst.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'mobx-react';
import * as RoutesModule from './routes';
import { AppState, Language } from './appState';
import { Strings } from './strings';

let routes = RoutesModule.routes;

declare var module: any;
const appState = new AppState();

const stores = {
    appState: appState,
};

try {
    switch (navigator.language.toLowerCase()) {
        case "en-us":
            appState.strings = new Strings();
            break;
        case "ja-jp":
            appState.currentLanguage = Language.ja;
            appState.LanguageManager.JapaneseStrings(appState.strings);
            break;
        default:
            appState.strings = new Strings();
            break;
    }
} catch (e) {
    appState.strings = new Strings();
}

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <AppContainer>
            <Provider {...stores}>
                <Router children={routes} basename={baseUrl} />
            </Provider>
        </AppContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
