
import {DiagnosticMessage} from './diagnostics.generated';

export {DiagnosticMessage};

export * from '../types';

export interface Map<T> {
    [index: string]: T;
}

export interface CommandLineOption {
    name: string;
    type: string | Map<number>;
    isFilePath?: boolean;
    shortName?: string;
    error?: DiagnosticMessage;
    experimental?: boolean;
}

export interface CommandLineOptions {
    tests?: string;
    interactive?: boolean;
    help?: boolean;

    [option: string]: string | number | boolean;
}