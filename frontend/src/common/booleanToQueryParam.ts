export function booleanToQueryParam(value: boolean): string {
    if (!value) {
        return "";
    }

    return "1";
}

