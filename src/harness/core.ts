
import {DiagnosticMessage} from './diagnostics.generated';

import 'terminal-colors';

export interface Map<T> {
    [index: string]: T;
}

let hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasProperty<T>(map: Map<T>, key: string): boolean {
    return hasOwnProperty.call(map, key);
}

export function includes<T>(arr: T[], search: T): boolean {
    return arr.indexOf(search) !== -1;
}

function formatStringFromArgs(text: string, args: { [index: number]: any; }, baseIndex?: number): string {
    baseIndex = baseIndex || 0;

    return text.replace(/\{(\d+)\}/g, (match, index?) => args[+index + baseIndex]);
}

export function createDiagnostic(diagnostic: DiagnosticMessage, ...args: any[]): DiagnosticMessage;
export function createDiagnostic(diagnostic: DiagnosticMessage): DiagnosticMessage {
    let text = diagnostic.message;

    if (arguments.length > 1) {
        text = formatStringFromArgs(text, arguments, 1);
    }

    return {
        message: text,
        code: diagnostic.code
    }
}

export const enum AssertionLevel {
    None = 0,
    Normal = 1,
    Aggressive = 2,
    VeryAggressive = 3,
}

export namespace Debug {
    let currentAssertionLevel = AssertionLevel.None;

    export function shouldAssert(level: AssertionLevel): boolean {
        return currentAssertionLevel >= level;
    }

    export function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string): void {
        if (!expression) {
            let verboseDebugString = '';
            if (verboseDebugInfo) {
                verboseDebugString = '\r\nVerbose Debug Information: ' + verboseDebugInfo();
            }

            throw new Error('Debug Failure. False expression: ' + (message || '') + verboseDebugString);
        }
    }

    export function fail(message?: string): void {
        Debug.assert(false, message);
    }
}

export function printDiagnostic(diagnostic: DiagnosticMessage): void {
    console.log(`[ ${(<any>(diagnostic.code + '')).red} ] - ${diagnostic.message}`);
}

export function printDiagnostics(diagnostics: DiagnosticMessage[]): void {
    for (let d of diagnostics) {
        printDiagnostic(d);
    }
}