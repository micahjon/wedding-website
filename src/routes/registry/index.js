import { h } from 'preact';
import style from './style';
import Header from '../../components/header';

const Registry = () => (
  <div>
    <Header />
    <div class={style.centered}>
      <p>Coming soon...</p>
      <p style={{ height: '600px' }} />
      <p style="text-align: center">~</p>
    </div>
  </div>
);

export default Registry;
