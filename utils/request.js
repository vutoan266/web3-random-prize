const get = (url, params) =>
    fetch(url + new URLSearchParams(params)).then(async (response) => {
        const resObj = await response.json();
        if (response.status === 200) {
            if (resObj.result === 'success') {
                return resObj.data;
            } else throw new Error(resObj.message);
        } else {
            throw new Error(resObj);
        }
    });

const post = (url, data) =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response) => {
        const resObj = await response.json();
        if (response.status === 200) {
            if (resObj.result === 'success') {
                return resObj.data;
            } else throw new Error(resObj.message);
        } else {
            throw new Error(resObj);
        }
    });

const fetcher = {
    get,
    post
};

export default fetcher;
