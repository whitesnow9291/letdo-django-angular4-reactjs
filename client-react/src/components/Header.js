import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Header.css';
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
// The Header creates links that can be used to navigate
// between routes.

class Header extends React.Component {
  state = {
        isShowingLogin: true,
        redirect: false
    }
  onLoginSuccess = () => this.setState({ isShowingLogin: false })
  onLogout = () => {
    localStorage.removeItem('currentUser'); 
    this.setState({ isShowingLogin: true });
    this.setState({ redirect: true });
  }
  componentDidMount = () =>{
    let user = localStorage.getItem('currentUser');
    if (user){
      this.setState({isShowingLogin: false});
    }
  }
  render() {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/portfolio'/>;
     }
    return (
      <header className="header">
        <nav className="header">
          <ul className="push_left">
            <li><Link to='/'>About</Link></li>
            <li><Link to='/portfolio'>Portfolio</Link></li>
          </ul>
          <ul className="push_right">
            { this.state.isShowingLogin && <li><LoginModal onLoginSuccess={ this.onLoginSuccess} /></li>}
            { this.state.isShowingLogin && <li><SignUpModal /></li>}
            { !this.state.isShowingLogin && <li><Link to='/portfolioedit'>My Portfolio</Link></li>}
            { !this.state.isShowingLogin && <li><a onClick={this.onLogout}>LogOut</a></li>}

          </ul>
        </nav>
      </header>)
  }
}
export default Header
