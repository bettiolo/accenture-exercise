// We don't need to update the state to display the Alert, do the check inline.
import React, {useEffect, useState} from 'react';

const css = {
  // Don't use inline styles, use css classes from the internal design guidelines
  fontSize: "12px"
}

// There is a typo in the function name, `Fuuel` should be `Fuel`;
// Argument `props` is not intuitive, be more explicit, use named arguments syntax `{ fuel }`
function CarsFuuel(props) {
  // Don't use inline styles, use css classes from the style guidelines
  return <h1 style={css}>Car's fuel consumed: {props.children}</h1>
}

// Argument `props` is not intuitive, be more explicit, use named arguments syntax `{ fuel }`
function Alert(props) {
  const fuel = props.fuel;
  // We don't need to update the state to display the Alert, do the check inline.
  const [state, setState] = useState(0);

  useEffect(() => {
    if (fuel > 1200) {
      setState(1);
    }
  }, [fuel]);

  if (state) {
    // Don't use inline styles, use css classes from the internal design guidelines
    return <h2 style={{color: "red"}}>Alert</h2>;
  } else {
    return <h2>All is fine</h2>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // MB: This comment is redundant
    // We declare the state
    this.state = {
      // `x` variable name is very generic, please use `position` instead
      x: 1,
      // There is no need to use shortened names, lets keep the naming explicit, use `fuel` instead of `f`
      f: 0
    }
  }

  updateCoordinates() {
    // Long lines of code are not very readable, please either break them in multiple lines or extract the logic
    setInterval(() => { this.setState(prevState => ({x: prevState.x + 1, f: 1 + prevState.f + prevState.x * 10})) }, 1000)
  }

  componentDidMount() {
    this.updateCoordinates();
  }

  render() {
    // Use destructuring assignment ie.: `const { prop1, prop2 } = this.state;
    var x1 = this.state.x;
    var fuel = this.state.f;

    return (
      <div>
        <h1>Position - {x1}</h1>
        { /* This stateless function should be using a value and not a collection of children components. Use props assignment instead, ie: `fuel={fuel}` like below */ }
        <CarsFuuel>{fuel}</CarsFuuel>
        <Alert fuel={fuel}/>
      </div>
    );
  }
}

export default App;
