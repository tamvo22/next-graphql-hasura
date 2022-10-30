/**
 * Generic Type Guard
 */
export const isTypeOf = <T>(varToBeChecked: any, propertyToCheckFor: keyof T): varToBeChecked is T => (varToBeChecked as T)[propertyToCheckFor] !== undefined;
