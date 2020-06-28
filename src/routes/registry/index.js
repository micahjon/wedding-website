import { Component } from 'preact';
import style from './style';
import Header from '../../components/header';
import Gift from '../../components/gift';

class Registry extends Component {
  state = {
    // Registry items
    items: [],
  };

  // Cancel fetch if user exits this component before it resolves
  abortRequestController = new AbortController();

  handleMarkAsPurchased(id) {
    const updatedItems = this.state.items.map((item) => {
      if (item.id === id) item.claimedCount++;
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
        claimedCount: updatedItems.find((item) => item.id === id).claimedCount,
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
        this.setState({ items });
      });
  }

  // Lifecycle: Called just before our component will be destroyed
  componentWillUnmount() {
    this.abortRequestController.abort();
  }

  render() {
    const unclaimedItems = this.state.items.filter(
      (item) => item.count > item.claimedCount
    );
    const claimedItems = this.state.items.filter(
      (item) => item.count <= item.claimedCount
    );
    const handleMarkAsPurchased = this.handleMarkAsPurchased.bind(this);
    return (
      <div>
        <Header />
        <div class={style.home}>
          <div class={style.centered}>
            <h1 style="letter-spacing: 1px">Registry</h1>
            <br />
            <p>
              We have everything we need and much more. Please don't feel obligated to
              bring a gift!
            </p>
            <br />
            <h2>Unclaimed Items</h2>
            <div style="display: flex; flex-wrap: wrap">
              {unclaimedItems.length ? (
                unclaimedItems.map((item) => Gift(item, handleMarkAsPurchased))
              ) : (
                <p>No items</p>
              )}
            </div>
            <br />
            <br />
            <h2>Claimed Items</h2>
            <div style="display: flex; flex-wrap: wrap">
              {claimedItems.length ? (
                claimedItems.map((item) => Gift(item, handleMarkAsPurchased))
              ) : (
                <p>No items</p>
              )}
            </div>
            <br />
            <p style="text-align: center">~</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Registry;
