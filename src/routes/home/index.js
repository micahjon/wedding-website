import { h } from 'preact';
import Markdown from 'preact-markdown';
import style from './style';
import Header from '../../components/header';
import ImageBox from '../../components/image-box';
import eventContent from '../../content/celebration.md';

const Home = () => (
  <div>
    <ImageBox
      aspectRatio={3151 / 1964}
      imageSizes={{ 1920: 'cover-1920w.jpg', 1024: 'cover-1024w.jpg' }}
      content={
        <div class={style.home}>
          <Header />
          <main class={style.centered}>
            <h1 class="serif">We got married, now let's party!</h1>
            <Markdown markdown={eventContent} />
            <br />
            <br />
            <br />
            <br />
            <p style="text-align: center">~</p>
          </main>
        </div>
      }
    />
  </div>
);

export default Home;

{
  /* <figure class="photo">
              <img src="/assets/image3.jpg" alt="" />
              <figcaption>
                <Markdown markdown={text.image3} />
              </figcaption>
            </figure> */
}
