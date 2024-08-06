function debounce(func, wait) {
    let timeout;
    let promise;
    return function (...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        return new Promise((resolve, reject) => {
            timeout = setTimeout(() => {
                promise = func.apply(this, args);
                if (promise && promise.then) {
                    promise.then(resolve).catch(reject);
                } else {
                    resolve(promise);
                }
            }, wait);
        });
    };
}



export { debounce }