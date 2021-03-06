function isInputTypeString(cpf: string) {
    return typeof cpf === 'string';
}

function validateInputLenght(cpf: string) {
    return cpf.length >= 11 || cpf.length <= 14;
}

function removeSpecialCharacters(cpf: string) {
    return cpf.replace(/[\.\-]/g, '');
}

function allDigitsAreEqual(cpf: string) {
    const firstDigit = cpf[0];
    return [...cpf].every(digit => digit === firstDigit);
}

function calculateFirstChecker(cpf: string): number {
    const firstNineDigits = cpf.slice(0, 9);
    return calculateChecker(firstNineDigits);
}

function calculateSecondChecker(cpf: string): number {
    const firstNineDigits = cpf.slice(0, 10);
    return calculateChecker(firstNineDigits);
}

function calculateChecker(cpf: string): number {
    let result = 0;
    let multiplier = 2;

    for (const digit of reverseString(cpf)) {
        result += Number(digit) * multiplier++;
    }

    const remainder = result % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

function reverseString(value: string) {
    return value.split('').reverse().join('');
}

function calculateCheckers(cpf: string): string {
    const firstChecker = calculateFirstChecker(cpf);
    const secondChecker = calculateSecondChecker(cpf);
    return `${firstChecker}${secondChecker}`
}

export function validate(cpf: string) {
    if (!cpf || !validateInputLenght(cpf) || !isInputTypeString(cpf)) {
        return false;
    }

    const cpfWithoutSpecialCharacters = removeSpecialCharacters(cpf);

    if (allDigitsAreEqual(cpfWithoutSpecialCharacters)) {
        return false;
    }

    const checkers = cpfWithoutSpecialCharacters.slice(9, 11);
    return checkers === calculateCheckers(cpfWithoutSpecialCharacters);
}