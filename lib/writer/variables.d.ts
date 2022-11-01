export declare enum alignments {
    Centre = 2,
    Left = 0,
    Right = 1
}
export declare enum measures {
    Continuous = 3,
    Nominal = 1,
    Ordinal = 2
}
export declare enum types {
    Date = 20,
    DateTime = 22,
    Numeric = 5,
    String = 1
}
export interface SavVariable {
    name: string;
    short?: string;
    label: string;
    type: types;
    width: number;
    decimal: number;
    alignment?: alignments;
    measure?: measures;
    columns: number;
    valueLabels?: Array<{
        label: string;
        value: string | number;
    }>;
}
export declare function toArray(variables: any, ncases: any, { bias }: {
    bias: any;
}): any;
