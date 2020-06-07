import { h } from 'preact';
import style from './style';
import Header from '../../components/header';
import faqsContent from '../../content/faqs.md';
import Markdown from 'preact-markdown';

const FAQs = () => (
  <div>
    <Header />
    <div class={style.home}>
      <div class={style.centered}>
        <h1 style="letter-spacing: 1px">FAQs</h1>
        <br />
        <figure class={`photo ${style.photo}`}>
          <img src="/assets/camels-700w.jpg" alt="" />
        </figure>
        <Markdown markdown={faqsContent} />
        <br />
        <br />
        <p style="text-align: center">~</p>
      </div>
    </div>
  </div>
);

export default FAQs;
