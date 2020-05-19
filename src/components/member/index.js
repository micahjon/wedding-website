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
  const updateDietaryRestrictions = (event) => {
    updateMember({ dietaryRestrictions: event.target.value });
  };

  const hasName = name.trim().length;

  return (
    <div class="form__row">
      <label>
        <span>Name</span>
        <input
          type="text"
          value={name}
          placeholder={placeholder}
          onInput={updateName}
        />
      </label>
      <label class={hasName ? '' : style.disabled}>
        <span>Attending?</span>
        <Switch onChange={updateAttendance} isChecked={isAttending} />
      </label>
      <label class={hasName && isAttending ? '' : style.disabled}>
        <span>Dietary Restrictions</span>
        <textarea cols="30" rows="2" onInput={updateDietaryRestrictions} />
      </label>
    </div>
  );
};

export default Member;
