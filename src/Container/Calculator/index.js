import { Component } from "react";
import './index.css';
import INPUTS, { ACTIONS } from '../../Constants/Calculator-inputs';
import CalculatorInputButton from '../../Component/CalculatorInputButton';
import { formatOperand, evaluate } from './helper-function';

class Calculator extends Component {
    constructor() {
        super();

        this.state = {
            previousOperand: '',
            currentOperand: '',
            operation: '',
            overwrite: false
        }
    }

    handleClick = ({ type, payload }) => {
        switch (type) {
            case ACTIONS.ADD_DIGIT:
                if (this.state.overwrite) {
                    this.setState({
                        ...this.state,
                        currentOperand: `${payload?.input}`,
                        overwrite: false
                    });
                    break;
                }
                if (payload?.input === '0' && this?.state?.currentOperand === '0') break;
                if (payload?.input === '.' && this?.state?.currentOperand.includes('.')) break;
                this.setState({
                    ...this.state,
                    currentOperand: `${this?.state?.currentOperand || ''}${payload?.input}`
                });
                break;
            case ACTIONS.CHOOSE_OPERATION:
                if (this?.state?.previousOperand === '' && this.state?.currentOperand === '') {
                    break;
                }
                if (this?.state?.previousOperand === '') {
                    this.setState({
                        ...this.state,
                        operation: payload?.input,
                        previousOperand: this?.state?.currentOperand,
                        currentOperand: ''
                    });
                    break;
                }
                this.setState({
                    ...this.state,
                    operation: payload?.input,
                    previousOperand: evaluate(this.state),
                    currentOperand: '',
                })
                break;
            case ACTIONS.CLEAR:
                this.setState({
                    previousOperand: '',
                    currentOperand: '',
                    operation: '',

                });
                break;
            case ACTIONS.DELETE_DIGIT:
                if (this?.state?.overwrite) {
                    this.setState({
                        ...this.state,
                        currentOperand: '',
                        overwrite: false
                    })
                }
                if (this?.state?.currentOperand === '' || this?.state?.currentOperand?.length === 1) {
                    this.setState({
                        ...this.state,
                        previousOperand: '',
                        currentOperand: '',
                        operation: '',
                    });
                    break;
                }
                this.setState({
                    ...this.state,
                    currentOperand: this?.state?.currentOperand.slice(0, -1),
                });
                break;
            case ACTIONS.EVALUATE:
                if (this?.state?.previousOperand === '' || this.state?.currentOperand === '' || this.state?.operation === '') {
                    break;
                }
                this.setState({
                    ...this.state,
                    overwrite: true,
                    currentOperand: evaluate(this.state),
                    previousOperand: '',
                    operation: '',
                });
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div className='calculator-grid'>
                <div className='output'>
                    <div className='previous-operand'>{
                        formatOperand(`${this?.state?.previousOperand}${this?.state?.operation}`)}</div>
                    <div className='current-operand'>
                        {
                            formatOperand(this?.state?.currentOperand)
                        }
                    </div>
                </div>
                <button className='span-two' onClick={() => this.handleClick({ state: this?.state, type: ACTIONS.CLEAR })}> AC</button>
                <button onClick={() => this.handleClick({ state: this?.state, type: ACTIONS.DELETE_DIGIT })}> DEL</button>
                {INPUTS.map((input, index) => {
                    let i = index + 1;
                    return <CalculatorInputButton
                        key={i}
                        type={isNaN(input) && input !== '.' ? ACTIONS?.CHOOSE_OPERATION : ACTIONS?.ADD_DIGIT}
                        input={input}
                        state={this?.state}
                        handleClick={this.handleClick}
                    />
                })}
                <button className='span-two' onClick={() => this.handleClick({ state: this?.state, type: ACTIONS.EVALUATE })}>=</button>
            </div>)
    }
}

export default Calculator;