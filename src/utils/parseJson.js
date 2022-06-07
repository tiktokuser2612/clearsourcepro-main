
function parseJSON(data) {
    try {
        return JSON.parse(data);
    }
    catch (e) {
        return []
    }
}

function stringifyJSON(data) {
    try {
        return JSON.stringify(data)
    } catch (e) {
        return []
    }
}

export {
    parseJSON,
    stringifyJSON
}

