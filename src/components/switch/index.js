import ReactSwitch from 'react-switch';

const Switch = ({ isChecked, onChange }) => (
  <ReactSwitch
    onChange={onChange}
    checked={isChecked}
    checkedIcon={
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          fontSize: 14,
          color: 'white',
          paddingLeft: 2,
        }}
      >
        Yes
      </div>
    }
    uncheckedIcon={
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          fontSize: 14,
          color: 'white',
          paddingRight: 2,
        }}
      >
        No
      </div>
    }
    activeBoxShadow={'0 0 0 2px #3c5cd6'}
  />
);

export default Switch;
