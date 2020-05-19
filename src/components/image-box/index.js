import { h } from 'preact';
import dist from 'preact-ssr-prepass';
// import style from './style.css';

const ImageBox = ({ aspectRatio, imageSizes, alt = '', content }) => {
  const maxWidth = '1000px';
  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth,
  };
  const imageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth,
    margin: '0 auto',
  };
  const placeholderStyle = {
    paddingTop: `${100 / aspectRatio}%`,
    margin: 0,
  };
  const contentStyle = {
    position: 'relative',
    zIndex: 2,
  };
  const sortedSizes = Object.keys(imageSizes).sort();
  const srcSet = sortedSizes
    .map((width) => `assets/${imageSizes[width]} ${width}w`)
    .join(',');
  const largestImageUrl = `assets/${imageSizes[sortedSizes[sortedSizes.length - 1]]}`;
  return (
    <div>
      <div style={containerStyle}>
        <img src={largestImageUrl} alt={alt} srcSet={srcSet} style={imageStyle} />
        <div style={placeholderStyle} />
      </div>
      <div style={contentStyle}>{content}</div>
    </div>
  );
};

export default ImageBox;
