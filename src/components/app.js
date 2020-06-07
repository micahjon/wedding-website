import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Rsvp from '../routes/rsvp';
import Registry from '../routes/registry';
import FAQs from '../routes/faqs';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
    const pageTitles = {
      '': `Audrey & Micah's Wedding`,
      rsvp: `RSVP | Audrey & Micah's Wedding`,
      registry: `Registry | Audrey & Micah's Wedding`,
    };
    if (typeof window !== 'undefined') {
      document.title = pageTitles[e.url.replace(/[^a-z]/g, '')] || pageTitles[''];
    }
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
          <FAQs path="/faqs/" />
        </Router>
      </div>
    );
  }
}
