import { Component } from 'preact';
import style from './style';
import Header from '../../components/header';
import Gift from '../../components/gift';
import text from '../../content/text';

class Registry extends Component {
  state = {
    isLoading: true,

    // Registry items
    items: [],
  };

  // Cancel fetch if user exits this component before it resolves
  abortRequestController = new AbortController();

  handleMarkAsPurchased(id) {
    const updatedItems = this.state.items.map((item) => {
      if (item.id === id) item.claimDates.push(getDateString());
      return item;
    });
    this.setState({ items: updatedItems });

    fetch('/api/claim-registry-item', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        claimDates: updatedItems.find((item) => item.id === id).claimDates,
      }),
    })
      .then((res) => res.json())
      .catch(() => {})
      .then((data) => {
        if (!data || !data.success) {
          console.log('/api/claim-registry-item ->', data);
          alert('Sorry, please reload this page and try again');
          throw new Error('Invalid API response');
        }
      });
  }

  // Lifecycle: Called whenever our component is created
  componentDidMount() {
    fetch('/api/get-registry-items', { signal: this.abortRequestController.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data.items)) {
          console.log('/api/get-registry-items', data);
          throw new Error('Invalid API response');
        }

        const { items } = data;
        this.setState({ items, isLoading: false });
      });
  }

  // Lifecycle: Called just before our component will be destroyed
  componentWillUnmount() {
    this.abortRequestController.abort();
  }

  render() {
    const unclaimedItems = this.state.items.filter(
      (item) => item.count > item.claimDates.length
    );
    const claimedItems = this.state.items.filter(
      (item) => item.count <= item.claimDates.length
    );
    const handleMarkAsPurchased = this.handleMarkAsPurchased.bind(this);
    return (
      <div>
        <Header />
        <div class={style.home}>
          <div class={style.centered}>
            <h1 style="letter-spacing: 1px">Registry</h1>
            <br />
            <p>{text.registry_intro}</p>
            <br />
            <h2>Unclaimed Items</h2>
            <div style="display: flex; flex-wrap: wrap">
              {this.state.isLoading ? (
                <p style="margin: 1rem 0;">Loading...</p>
              ) : unclaimedItems.length ? (
                unclaimedItems.map((item) => Gift(item, handleMarkAsPurchased))
              ) : (
                <p>No items</p>
              )}
            </div>
            <br />
            <br />
            <h2>Claimed Items</h2>
            <div style="display: flex; flex-wrap: wrap">
              {this.state.isLoading ? (
                <p style="margin: 1rem 0;">Loading...</p>
              ) : claimedItems.length ? (
                claimedItems.map((item) => Gift(item, handleMarkAsPurchased))
              ) : (
                <p>No items</p>
              )}
            </div>
            <br />
            <p>{text.registry_contact}</p>
            <br />
            <p style="text-align: center">~</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Registry;

// https://stackoverflow.com/a/10632399/1546808
function getDateString() {
  const d = new Date();
  return `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/')} ${[
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
  ].join(':')}`;
}
