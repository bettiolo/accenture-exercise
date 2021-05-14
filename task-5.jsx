import React, {useEffect, useState} from 'react';

const css = {
  fontSize: "12px"
}

function CarsFuuel(props) {
  return <h1 style={css}>Car's fuel consumed: {props.children}</h1>
}

function Alert(props) {
  const fuel = props.fuel;
  const [state, setState] = useState(0);

  useEffect(() => {
    if (fuel > 1200) {
      setState(1);
    }
  }, [fuel]);

  if (state) {
    return <h2 style={{color: "red"}}>Alert</h2>;
  } else {
    return <h2>All is fine</h2>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // We declare the state
    this.state = {
      x: 1,
      f: 0
    }
  }

  updateCoordinates() {
    setInterval(() => { this.setState(prevState => ({x: prevState.x + 1, f: 1 + prevState.f + prevState.x * 10})) }, 1000)
  }

  componentDidMount() {
    this.updateCoordinates();
  }

  render() {
    var x1 = this.state.x;
    var fuel = this.state.f;

    return (
      <div>
        <h1>Position - {x1}</h1>
        <CarsFuuel>{fuel}</CarsFuuel>
        <Alert fuel={fuel}/>
      </div>
    );
  }
}

export default App;

/*
Line 1:
We don't need to update the state to display the Alert, do the check inline.

Line 4:
Don't use inline styles, use css classes from the internal design guidelines

Line 7:
There is a typo in the function name `Fuuel`, it should be `Fuel`;
Argument `props` is not intuitive, be more explicit, use named arguments syntax `{ fuel }`

Line 8:
Don't use inline styles, use css classes from the style guidelines
Also, see Line ??? about the use of `children`

Line 12:
Argument `props` is not intuitive, be more explicit, use named arguments syntax `{ fuel }`

Line 13:
We don't need to update the state to display `Alert`, do the check inline.

Line 22:
Don't use inline styles, use css classes from the internal design guidelines

Line 32:
This comment is redundant

Line 34:
`x` variable name is very generic, please use `position` instead

Line 35:
There is no need to use shortened names, lets keep the naming explicit, use `fuel` instead of `f`

Line 40:
Long lines of code are not very readable, please either break them in multiple lines or extract the logic

Line 48,49:
Use destructuring assignment to a `const`, ie.: `const { prop1, prop2 } = this.state;

Line 54:
This stateless function should be using a value and not a collection of children components.
Use props assignment instead, ie: `fuel={fuel}` like the invocation of `Alert`
 */
