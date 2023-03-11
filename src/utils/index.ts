export const idGenerator = () => {
    return Math.random().toString(36).substr(2, 9);
}

export const uuidGenerator = () => {
    return Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
}

export const uuidV4Generator = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const defaultSuffix = ['px', 'em', 'rem', '%'];

export const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
