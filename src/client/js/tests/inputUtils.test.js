import { isInputValid, isDateValid, calculateTripLength } from '../inputUtils'

test('Testing that isInputValid is a valid function', () => {
    expect(isInputValid).toBeInstanceOf(Function);
})

test('Testing that null value will fail to be a valid input', () => {
    expect(isInputValid(null)).toBeFalsy();
})

test('Testing that empty value will fail to be a valid input', () => {
    expect(isInputValid("")).toBeFalsy();
})

test('Testing that blank (whitespace) value will fail to be a valid input', () => {
    expect(isInputValid("    ")).toBeFalsy();
})

test('Testing isDateValid for success', () => {
    expect(isDateValid("11/11/2011")).toBeTruthy();
})

test('Testing isDateValid for failure', () => {
    expect(isDateValid("11/11/11")).toBeFalsy();
})

test('Testing that calculateTripLength is a valid function', () => {
    expect(calculateTripLength).toBeInstanceOf(Function);
})

test('Testing that calculateTripLength gives correct output', () => {
    expect(calculateTripLength).toBeInstanceOf(Function);
    expect(calculateTripLength("11/11/2011", "11/15/2011")).toBe(4);
})
