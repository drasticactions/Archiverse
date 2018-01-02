import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
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
                            <NavLink to={'/posts'} activeClassName='active'>
                                <span className='glyphicon glyphicon-comment'></span> Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/games' } activeClassName='active'>
                                <span className='glyphicon glyphicon-star'></span> Games
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/users' } activeClassName='active'>
                                <span className='glyphicon glyphicon-user'></span> Users
                            </NavLink>
                        </li>
                        <li role="separator" className="divider-vertical"></li>
                        <li>
                            <NavLink to={'/about'} activeClassName='active'>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/faq'} activeClassName='active'>
                                FAQ
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
