import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import text from '../../content/text.js';

const Header = ({ styles } = {}) => (
  <header class={style.header} style={{ ...styles }}>
    <div class={style.inner}>
      <Link href="/">
        <h1>{text.couple}</h1>
      </Link>
      <nav>
        <Link activeClassName={style.active} href="/">
          The Wedding
        </Link>
        <Link activeClassName={style.active} href="/rsvp">
          RSVP
        </Link>
        <Link activeClassName={style.active} href="/registry">
          Registry
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
