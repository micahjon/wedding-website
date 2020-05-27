import { Component } from 'preact';
import style from './style';
import Markdown from 'preact-markdown';
import { Select } from 'react-functional-select';
import Header from '../../components/header';
import Member from '../../components/member';
import Switch from '../../components/switch';
import eventContent from '../../content/event.md';

// import {
//   SelectContainer,
// } from './helpers/styled';

class Rsvp extends Component {
  state = {
    // Selecting family
    input: '',
    families: [],
    selectedFamily: null,

    // Form data
    members: [],
    isAttendingBrunch: true,
    email: '',
    notes: '',

    // Submission
    isSubmitting: false,
    wasSubmitted: false,
    submissionError: '',
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

    const data = {
      familyID: selectedFamily.id,
      email,
      notes,
      isAttendingBrunch,
      people: members,
    };

    this.setState({
      isSubmitting: true,
      wasSubmitted: false,
      submissionError: '',
    });

    fetch('/api/submit-rsvp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: this.abortRequestController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('/api/submit-rsvp ->', data);
        this.setState({
          isSubmitting: false,
          wasSubmitted: Boolean(data.success),
        });
        setTimeout(() => {
          if (data.success) {
            const someoneIsAttending =
              this.state.selectedFamily &&
              this.state.members.some(
                ({ name, isAttending }) => name.trim() && isAttending
              );
            if (someoneIsAttending) {
              alert(`Thanks, we'll see you in October!`);
            } else {
              alert(`Thanks, we'll miss you!`);
            }
          } else {
            alert(`Sorry, unable to submit RSVP\n${data.error}`);
          }
        }, 100);
      });
  }

  render() {
    const isLoading = !this.state.families.length;
    const minChars = 3;
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
        <Header />
        <div class={style.home}>
          <div class={style.centered}>
            <h1 style="letter-spacing: 1px">RSVP!</h1>
            <figure class={`photo ${style.photo}`}>
              <img src="/assets/image3.jpg" alt="" />
            </figure>
            <Markdown markdown={eventContent} />
            <br />
            <Select
              placeholder={'Type your name'}
              menuMaxHeight={35 * 5}
              isLoading={isLoading}
              style={{ background: 'green' }}
              addClassNames={true}
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
            <br />
            <form action="#" onSubmit={this.handleSubmit.bind(this)}>
              {this.state.selectedFamily ? (
                <div class="form">
                  <h2
                    class="serif"
                    style={{ margin: '2rem 1rem 1rem', textAlign: 'center' }}
                  >
                    You're Invited!
                  </h2>
                  {this.state.members.map((member) =>
                    Member(member, this.setupUpdateMember(member))
                  )}
                  {canAddPlusOne && (
                    <div class="form__row" style={{ paddingTop: 0 }}>
                      <button
                        type="button"
                        class="button button--small"
                        onClick={this.addPlusOne.bind(this)}
                      >
                        Add Plus One
                      </button>
                    </div>
                  )}
                  {canAddExtraPeople && (
                    <div class="form__row" style={{ paddingTop: 0 }}>
                      {' '}
                      <button
                        type="button"
                        class="button button--small"
                        onClick={this.addFamilyMember.bind(this)}
                      >
                        Add Person
                      </button>
                    </div>
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
                          style={{ width: '16rem' }}
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
                  <div class="form__row" style={{ paddingTop: 0 }}>
                    <button class="button" disabled={this.state.isSubmitting}>
                      {this.state.isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ height: '200px' }} />
              )}
            </form>
            <br />
            <p style="text-align: center">~</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Rsvp;
