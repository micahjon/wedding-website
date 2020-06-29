import { h } from 'preact';
import style from './style.css';

const Item = ({ id, name, link, photo, count, claimDates }, markAsPurchased) => {
  const claimedCount = claimDates.length;
  const isAvailable = count > claimedCount;
  return (
    <div class={style.item}>
      <div
        style={`padding-bottom: 100%; margin-bottom: 0.5rem; background: url('${photo.url}') center no-repeat; background-size: contain`}
      />
      <h3>{name}</h3>
      <p>{`${claimedCount} of ${count} claimed`}</p>
      {isAvailable ? (
        <button
          class={`button button--block ${style.purchasedButton}`}
          onClick={onMarkAsPurchased}
        >
          Mark as Purchased
        </button>
      ) : (
        ''
      )}
      <a
        class={`button button--block ${style.viewItemButton}`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Item
      </a>
    </div>
  );

  function onMarkAsPurchased() {
    if (
      confirm(
        `Are you sure you'd like to mark ${
          count > 1 ? 'one of these items' : 'this item'
        } as purchased?`
      )
    ) {
      markAsPurchased(id);
    }
  }
};

export default Item;
