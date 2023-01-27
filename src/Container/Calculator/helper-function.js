export const evaluate = ({ previousOperand, operation, currentOperand }) => {
    if (isNaN(+currentOperand) || isNaN(+previousOperand)) {
        return '';
    }
    let computedValue = '';
    switch (operation) {
        case '+':
            computedValue = (+currentOperand) + (+previousOperand);
            break;
        case '-':
            computedValue = (+currentOperand) - (+previousOperand);
            break;
        case '*':
            computedValue = (+currentOperand) * (+previousOperand);
            break;
        case '÷':
            computedValue = (+currentOperand) / (+previousOperand);
            break;
        default: break;
    }

    return computedValue;

}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0
});

export function formatOperand(operand) {
    if (operand === '') return;
    const [integer, decimal] = operand.toString()?.split('.');
    if (!decimal) return isNaN(integer) ? integer : INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}