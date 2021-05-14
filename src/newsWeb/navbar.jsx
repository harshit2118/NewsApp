import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class NavBar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <Link className="navbar-brand" to="/">
                    NewsSite
                </Link>
                <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-taget="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link" to='/home?q=sports'>Sports</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/home?q=cricket'>Cricket</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/home?q=movie'>Movie</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/home?q=education'>Education</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;