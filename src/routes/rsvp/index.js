import { Component } from 'preact';
import style from './style';
import { Select } from 'react-functional-select';
import Member from '../../components/member';
import Switch from '../../components/switch';

// import {
//   SelectContainer,
// } from './helpers/styled';

class Rsvp extends Component {
  state = {
    input: '',
    families: [],
    selectedFamily: null,
    members: [],
    isAttendingBrunch: true,
    email: '',
    notes: '',
  };

  // Cancel fetch if user exits this component before it resolves
  abortRequestController = new AbortController();

  // Lifecycle: Called whenever our component is created
  componentDidMount() {
    fetch('/api/get-families', { signal: this.abortRequestController.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data.families)) {
          console.log('/api/get-families', data);
          throw new Error('Invalid API response');
        }

        const { families } = data;
        this.setState({ families });
      });
  }

  // Lifecycle: Called just before our component will be destroyed
  componentWillUnmount() {
    this.abortRequestController.abort();
  }

  setupUpdateMember(oldMember) {
    return (newProperties) => {
      const members = this.state.members.map((member) => {
        if (member === oldMember) Object.assign(member, newProperties);
        return member;
      });
      this.setState({ members });
    };
  }

  addPlusOne() {
    this.setState({
      members: [
        ...this.state.members,
        { name: '', placeholder: 'Plus-One', isAttending: true, isPlusOne: true },
      ],
    });
  }

  addFamilyMember() {
    this.setState({
      members: [
        ...this.state.members,
        {
          name: '',
          placeholder: 'Family Member',
          isAttending: true,
          isExtraMember: true,
        },
      ],
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { selectedFamily, members, isAttendingBrunch, email, notes } = this.state;

    console.log({
      selectedFamily,
      members,
      isAttendingBrunch,
      email,
      notes,
    });
  }

  render() {
    const isLoading = !this.state.families.length;
    const minChars = 0;
    const hasTypedEnough = this.state.input.length >= minChars;
    const canAddPlusOne =
      this.state.selectedFamily &&
      this.state.selectedFamily.plusOne &&
      !this.state.members.some(({ isPlusOne }) => isPlusOne);
    const canAddExtraPeople =
      this.state.selectedFamily &&
      this.state.selectedFamily.extraMembers &&
      this.state.members.filter(({ isExtraMember }) => isExtraMember).length < 3;
    const someoneIsAttending =
      this.state.selectedFamily &&
      this.state.members.some(({ name, isAttending }) => name.trim() && isAttending);
    return (
      <div>
        <div class={style.home}>
          <div class={style.centered}>
            <h1>RSVP</h1>
            <p>Person A & Person B</p>
            <p style={{ height: '100px' }}> </p>
            <form action="#" onSubmit={this.handleSubmit.bind(this)}>
              <Select
                placeholder={'Type your name'}
                isLoading={isLoading}
                options={hasTypedEnough ? this.state.families : []}
                noOptionsMsg={
                  hasTypedEnough
                    ? `No matches for "${this.state.input}"`
                    : 'Please type at least 3 characters'
                }
                openMenuOnClick={minChars === 0}
                isClearable={true}
                getOptionValue={(option) => option.family}
                getOptionLabel={(option) => option.family}
                onKeyDown={({ target }) =>
                  setTimeout(() => {
                    this.setState({ input: target.value.trim() });
                  }, 0)
                }
                onOptionChange={(selectedFamily) => {
                  if (selectedFamily === this.state.selectedFamily) return;
                  this.setState({
                    selectedFamily,
                    members: selectedFamily
                      ? selectedFamily.members.map((name) => ({
                          name,
                          isAttending: true,
                        }))
                      : [],
                  });
                }}
              />
              {this.state.selectedFamily ? (
                <div class="form">
                  {this.state.members.map((member) =>
                    Member(member, this.setupUpdateMember(member))
                  )}
                  {canAddPlusOne && (
                    <button onClick={this.addPlusOne.bind(this)}>Add Plus One</button>
                  )}
                  {canAddExtraPeople && (
                    <button onClick={this.addFamilyMember.bind(this)}>
                      Add Person
                    </button>
                  )}
                  {someoneIsAttending && (
                    <div class="form__row">
                      <label>
                        <span>
                          Are you interested in coming to brunch on Sunday morning?
                        </span>
                        <Switch
                          onChange={(isChecked) =>
                            this.setState({ isAttendingBrunch: isChecked })
                          }
                          isChecked={this.state.isAttendingBrunch}
                        />
                      </label>
                    </div>
                  )}
                  {someoneIsAttending && (
                    <div class="form__row">
                      <label>
                        <span>
                          If plans change due to Covid, what email can we reach you at?
                        </span>
                        <input
                          type="email"
                          onChange={(event) =>
                            this.setState({ email: event.target.value.trim() })
                          }
                          required
                        />
                      </label>
                    </div>
                  )}
                  <div class="form__row">
                    <label>
                      <span>Anything else we should know?</span>
                      <textarea
                        type="text"
                        onChange={(event) =>
                          this.setState({ notes: event.target.value.trim() })
                        }
                      />
                    </label>
                  </div>
                  <div class="form__row">
                    <button>Submit RSVP</button>
                  </div>
                </div>
              ) : (
                ''
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Rsvp;
