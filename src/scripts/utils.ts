export type TemplateFunction = (...values: string[]) => string;

export function template(literals: TemplateStringsArray, ...placeholders: string[]): TemplateFunction {
    return (...values: string[]) => {
        let result = "";

        for (let i = 0; i < placeholders.length; i++) {
            result += literals[i];
            result += values[i] || placeholders[i];
        }

        return result;
    };
}
