import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import './css/site.css';
import './css/offdevice.css';
import './css/miiworst.css';
import './css/react-widgets.css';
import * as moment from 'moment';
import * as momentLocalizer from 'react-widgets-moment';
import registerServiceWorker from './registerServiceWorker';
import { AppState, Language } from './appState';
import { BrowserRouter } from 'react-router-dom';
import { Strings } from './strings';
import { Provider } from 'mobx-react';
import createBrowserHistory from 'mobx-history/createBrowserHistory';
import 'bootstrap/dist/css/bootstrap.css';
import '@neos21/bootstrap3-glyphicons/dist/css/bootstrap3-glyphicons.css';

declare var module: any;
const appState = new AppState();
moment.locale("en");
momentLocalizer();

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

const browserHistory = createBrowserHistory();
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const rootElement = document.getElementById('root');
const render = Component => {
    ReactDOM.render(
        <Provider {...stores}>
            <BrowserRouter basename={baseUrl}>
                <App />
            </BrowserRouter>
        </Provider>,
        rootElement
    );
}

render(App);

registerServiceWorker();

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(App);
    });
}
