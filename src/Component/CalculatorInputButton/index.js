import { Component } from "react";

class CalculatorInputButton extends Component {
    render() {
        const { type, input, handleClick } = this.props;
        return <button onClick={() => handleClick({ type, payload: { input } })}>{input}</button>
    }
}

export default CalculatorInputButton;