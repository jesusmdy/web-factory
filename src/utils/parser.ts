export const toNumber = (value: string) => {
    return parseInt(value.replace(/px|rem|deg|fr|pt|pc|in|Q|mm|cm/, ''));
}