// We don't need to update the state to display the Alert, do the check inline.
import React from 'react';

const css = {
  // Don't use inline styles, use css classes from the internal design guidelines
  fontSize: "12px"
}

// There is a typo in the function name, `Fuuel` should be `Fuel`;
// Argument `props` is not intuitive, be more explicit, use named arguments syntax `{ fuel }`
const CarsFuel = ({ fuel }) =>
  // Don't use inline styles, use css classes from the style guidelines
  <h1 style={css}>Car's fuel consumed: {fuel}</h1>;

// Argument `props` is not intuitive, be more explicit, use named arguments syntax `{ fuel }`
function Alert({ fuel }) {
  // We don't need to update the state to display the Alert, do the check inline.
  const displayAlert = fuel > 1200;
  return displayAlert ?
    // Don't use inline styles, use css classes from the internal design guidelines
    <h2 style={{color: "red"}}>Alert</h2>
    :
    <h2>All is fine</h2>;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // MB: This comment is redundant
    // We declare the state
    this.state = {
      // `x` variable name is very generic, please use `position` instead
      position: 1,
      // There is no need to use shortened names, lets keep the naming explicit, use `fuel` instead of `f`
      fuel: 0
    }
  }

  updateCoordinates() {
    // Long lines of code are not very readable, please either break them in multiple lines or extract the logic
    setInterval(() => {
      this.setState(prevState => ({
        position: prevState.position + 1,
        fuel: 1 + prevState.fuel + prevState.position * 10
      })) }
      , 1000)
  }

  componentDidMount() {
    this.updateCoordinates();
  }

  render() {
    // Use destructuring assignment ie.: `const { prop1, prop2 } = this.state;
    const { position, fuel } = this.state;

    return (
      <div>
        <h1>Position - {position}</h1>
        { /* This stateless function should be using a value and not a collection of children components. Use props assignment instead, ie: `fuel={f}` like below */ }
        <CarsFuel fuel={fuel} />
        <Alert fuel={fuel} />
      </div>
    );
  }
}

export default App;
