/**
 * @param url
 * @param options
 * @returns {Promise<Response>}
 */
function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        .then(checkStatus)
        .then(response => {
        // decode JSON, but avoid problems with empty responses
        return response.text()
            .then(text => text ? JSON.parse(text) : '')
    });
}

/**
 *
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error
}

/**
 * @returns {Promise<any>}
 */
export function getRepLogs() {
    return fetchJson('/reps')
        .then(data => data.items);
}

/**
 * @param id
 * @returns {Promise<Response>}
 */
export function deleteRepLog(id) {
    return fetchJson(`/reps/${id}`, {
        method: 'DELETE'
    });
}

export function createRepLog(repLog) {
    return fetchJson('/reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}