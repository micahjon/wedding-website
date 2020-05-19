import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Rsvp from '../routes/rsvp';
import Registry from '../routes/registry';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <link
          href="https://fonts.googleapis.com/css2?family=Parisienne&family=Gentium+Basic:wght@400&display=swap"
          rel="stylesheet"
        />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Rsvp path="/rsvp/" />
          <Registry path="/registry/" />
        </Router>
      </div>
    );
  }
}
