import { h } from 'preact';
import Markdown from 'preact-markdown';
import style from './style';
import Header from '../../components/header';
import ImageBox from '../../components/image-box';
import eventContent from '../../content/event.md';
import pageContent from '../../content/homepage.md';
import text from '../../content/text';

const Home = () => (
  <div>
    <ImageBox
      aspectRatio={3151 / 1964}
      imageSizes={{ 1920: 'cover-1920w.jpg', 1024: 'cover-1024w.jpg' }}
      content={
        <div class={style.home}>
          <Header />
          <main class={style.centered}>
            <h1 class="serif">We're getting married!</h1>
            <Markdown markdown={eventContent} />
            <p style="text-align: center;">
              <a class="button" href="/rsvp/" style={{ letterSpacing: '1px' }}>
                RSVP
              </a>
            </p>
            <br />
            <Markdown markdown={pageContent} />
            <br />

            <h3>Photos</h3>
            <figure class="photo">
              <img src="/assets/image1.jpg" alt="" />
              <figcaption>
                <Markdown markdown={text.image1} />
              </figcaption>
            </figure>

            <figure class="photo">
              <img src="/assets/image5.jpg" alt="" />
              <figcaption>
                <Markdown markdown={text.image5} />
              </figcaption>
            </figure>

            <figure class="photo">
              <img src="/assets/image2.jpg" alt="" />
              <figcaption>
                <Markdown markdown={text.image2} />
              </figcaption>
            </figure>

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
