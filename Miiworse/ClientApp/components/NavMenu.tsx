import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { AppState, Language } from '../appState';
import { FormControl } from 'react-bootstrap';
import * as Strings from '../strings';

@inject("appState") @observer
export class NavMenu extends React.Component<{appState?: AppState}, {}> {


    onChannelChange(x) {
        this.props.appState.currentLanguage = x.target.value;
        this.changeLanguage();
    }

    changeLanguage() {
        let { strings, currentLanguage, LanguageManager } = this.props.appState;
        switch (+currentLanguage) {
            case Language.en:
                LanguageManager.EnglishStrings(strings);
                break;
            case Language.ja:
                LanguageManager.JapaneseStrings(strings);
                break;
            default:
                break;
        }
    }

    public render() {
        let { strings } = this.props.appState;
        if (strings == null) return <div />;
        console.log(this.props.appState.strings);
        return <div className='main-nav'>
            <div className='navbar navbar-default'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-left' to={'/'}>
                        <img className="navbar-brand-image img-responsive" src="/img/archiverse-logo.png">
                        </img>
                    </Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <FormControl onChange={(x) => this.onChannelChange(x)} componentClass="select">
                                <option value={Language.en}>{strings.Language.English}</option>
                                <option value={Language.ja}>{strings.Language.Japanese}</option>
                            </FormControl>
                        </li>
                        <li>
                            <NavLink to={'/posts'} activeClassName='active'>
                                <span className='glyphicon glyphicon-comment'></span> {strings.Posts}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/games' } activeClassName='active'>
                                <span className='glyphicon glyphicon-star'></span> {strings.Games}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/users' } activeClassName='active'>
                                <span className='glyphicon glyphicon-user'></span> {strings.Users}
                            </NavLink>
                        </li>
                        <li role="separator" className="divider-vertical"></li>
                        <li>
                            <NavLink to={'/about'} activeClassName='active'>
                                {strings.About}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/faq'} activeClassName='active'>
                                {strings.FAQ}
                            </NavLink>
                        </li>
                        <li role="separator" className="divider-vertical"></li>
                        <li>
                            <a target="_blank" href="https://www.archiveteam.org/">
                                Archive Team
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/drasticactions/Archiverse">
                                Archiverse GitHub
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.twitter.com/drasticactionSA">
                                Drastic Actions @ Twitter
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
