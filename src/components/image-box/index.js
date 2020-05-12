import { h } from 'preact';
// import style from './style.css';

const ImageBox = ({ aspectRatio, imageSizes, alt = '', content }) => {
  const figureStyle = {
    position: 'fixed',
    paddingBottom: `${100 / aspectRatio}%`,
    margin: 0,
    width: '100%',
    background: '#ededed',
  };
  const placeholderStyle = {
    position: 'relative',
    zIndex: 2,
    paddingTop: `${100 / aspectRatio}%`,
  };
  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  const sortedSizes = Object.keys(imageSizes).sort();
  const srcSet = sortedSizes
    .map((width) => `assets/${imageSizes[width]} ${width}w`)
    .join(',');
  const largestImageUrl = `assets/${imageSizes[sortedSizes[sortedSizes.length - 1]]}`;
  return (
    <div>
      <figure style={figureStyle}>
        <img src={largestImageUrl} alt={alt} srcSet={srcSet} style={imageStyle} />
      </figure>
      <div style={placeholderStyle}>{content}</div>
    </div>
  );
};

export default ImageBox;
