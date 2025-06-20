import { formatUnits, hexToBigInt } from 'viem';

/**
 * Formats a balance by rounding it to a specified number of decimal places (maxDigits).
 * If the fractional part contains only zeros, it returns an integer.
 *
 * @param {string} balance - The balance in hexadecimal format.
 * @param {number} decimals - The number of decimal places.
 * @param {number} maxDigits - The maximum number of decimal places to display.
 * @returns {string} - The formatted balance as a string.
 */
export const formatBalance = (balance, decimals, maxDigits= 4) => {
    // Validate input parameters
    if (typeof balance !== 'string') {
        throw new TypeError('Balance must be a string');
    }

    if (typeof decimals !== 'number' || decimals < 0) {
        throw new TypeError('Decimals must be a non-negative number');
    }

    if (typeof maxDigits !== 'number' || maxDigits < 0) {
        throw new TypeError('MaxDigits must be a non-negative number');
    }

    // Convert the balance from hex to BigInt and then to a string with the appropriate number of decimals
    const formattedValue = formatUnits(hexToBigInt(balance), decimals);

    // Round the value to the specified number of decimal places
    const roundedValue = parseFloat(formattedValue).toFixed(maxDigits);

    // Convert the string back to a number to remove any unnecessary trailing zeros
    const finalValue = parseFloat(roundedValue);

    // Return the value as a string to maintain formatting
    return finalValue.toString();
}
