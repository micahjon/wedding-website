import { h } from 'preact';
import style from './style.css';
import Switch from '../switch';

const Member = ({ name, placeholder, isAttending }, updateMember) => {
  const updateName = (event) => {
    updateMember({ name: event.target.value });
  };
  const updateAttendance = (isChecked) => {
    updateMember({ isAttending: isChecked });
  };

  const hasName = name.trim().length;

  return (
    <div class={`form__row ${style.member}`}>
      <label>
        <span>Name</span>
        <input
          type="text"
          value={name}
          placeholder={placeholder}
          onInput={updateName}
        ></input>
      </label>
      <label class={hasName ? '' : style.disabled}>
        <span>Attending?</span>
        <Switch onChange={updateAttendance} isChecked={isAttending} />
      </label>
      <label class={hasName ? '' : style.disabled}>
        <span>Dietary Restrictions</span>
        <textarea cols="30" rows="2"></textarea>
      </label>
    </div>
  );
};

export default Member;
