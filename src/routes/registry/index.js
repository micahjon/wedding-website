import { h } from 'preact';
import style from './style';
import ImageBox from '../../components/image-box';

const Home = () => (
  <div>
    <ImageBox
      aspectRatio={3151 / 1964}
      imageSizes={{ 1920: 'cover-1920w.jpg', 1024: 'cover-1024w.jpg' }}
      content={
        <div class={style.home}>
          <div class={style.centered}>
            <h1>We're getting married!</h1>
            <p style={{ height: '1000px' }}> </p>
          </div>
        </div>
      }
    />
  </div>
);

export default Home;
