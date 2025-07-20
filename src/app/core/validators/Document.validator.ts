import { AbstractControl, ValidatorFn } from "@angular/forms";

export class DocumentValidators {
    static validCPF(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: string } | null => {
            const rawCPF: string = (control.value ?? "").replace(/\D/g, "");

            if (!rawCPF || rawCPF.length !== 11 || /^(\d)\1+$/.test(rawCPF)) {
                return { invalidCPF: "CPF inválido." };
            }

            let sum = 0;
            for (let i = 0; i < 9; i++) {
                sum += parseInt(rawCPF.charAt(i), 10) * (10 - i);
            }

            let firstDigit = 11 - (sum % 11);
            if (firstDigit > 9) firstDigit = 0;

            sum = 0;
            for (let i = 0; i < 10; i++) {
                sum += parseInt(rawCPF.charAt(i), 10) * (11 - i);
            }

            let secondDigit = 11 - (sum % 11);
            if (secondDigit > 9) secondDigit = 0;

            if (parseInt(rawCPF.charAt(9), 10) !== firstDigit || parseInt(rawCPF.charAt(10), 10) !== secondDigit) {
                return { invalidCPF: "CPF inválido." };
            }

            return null;
        };
    }

    static validCNPJ(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: string } | null => {
            const rawCNPJ: string = (control.value ?? "").replace(/\D/g, "");

            if (!rawCNPJ || rawCNPJ.length !== 14 || /^(\d)\1+$/.test(rawCNPJ)) {
                return { invalidCNPJ: "CNPJ inválido." };
            }

            const calculateCheckDigit = (base: number[]): number => {
                let sum = 0;
                let weight = base.length - 7;
                for (let i = 0; i < base.length; i++) {
                    sum += base[i] * weight;
                    weight--;
                    if (weight < 2) weight = 9;
                }

                const remainder = sum % 11;
                return remainder < 2 ? 0 : 11 - remainder;
            };

            const digits: number[] = rawCNPJ.split("").map((char: string): number => parseInt(char, 10));

            const checkDigit1 = calculateCheckDigit(digits.slice(0, 12));
            const checkDigit2 = calculateCheckDigit([...digits.slice(0, 12), checkDigit1]);

            if (digits[12] !== checkDigit1 || digits[13] !== checkDigit2) {
                return { invalidCNPJ: "CNPJ inválido." };
            }

            return null;
        };
    }

    static validCPFOrCNPJ(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: string } | null => {
            const value: string = (control.value ?? "").replace(/\D/g, "");

            if (!value) {
                return null;
            }

            if (value.length === 11) {
                return this.validCPF()(control);
            }

            if (value.length === 14) {
                return this.validCNPJ()(control);
            }

            return { invalidCPFOrCNPJ: "CPF ou CNPJ inválido." };
        };
    }
}
