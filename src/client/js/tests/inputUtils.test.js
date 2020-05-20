import { isInputValid, calculateTripLength } from '../inputUtils'

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

test('Testing for success', () => {
    expect(isInputValid("11/11/2011")).toBeTruthy();
})

test('Testing that calculateTripLength is a valid function', () => {
    expect(calculateTripLength).toBeInstanceOf(Function);
})

test('Testing that calculateTripLength gives correct output', () => {
    expect(calculateTripLength).toBeInstanceOf(Function);
    expect(calculateTripLength("11/11/2011", "11/15/2011")).toBe(4);
})
