export function __API_RESPONSE__(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function __API_HEADER__() {
    return { 'Content-Type': 'application/json' };
}

export function __API_PARAMS__(objParams) {
    let loginOptions = {
        method: 'POST',
        headers: __API_HEADER__(),
        body: JSON.stringify(objParams)
    };

    return loginOptions;
}