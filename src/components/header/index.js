import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <h1>Person A & Person B</h1>
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
  </header>
);

export default Header;
