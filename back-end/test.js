
function MyPromise(executor) {
    let self = this;
    self.status = "pending";
    self.value = undefined;
    self.reason = undefined;

    self.onResolved = [];
    self.onRejected = [];

    function resolve(value) {
        if (self.status !== 'pending') 
            return;
        self.status = "resolved";
        self.value = value;
        self.onResolved.forEach(cb => cb());
    }
    function reject(reason) {
        if (self.status !== 'pending')
            return;
        self.status = "rejected";
        self.reason = reason;
        self.onRejected.forEach(cb => cb());
    }

    try {
        executor(resolve, reject);
    } catch(err) {
        reject(err);
    }
} 

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("循环引用"));
    }
    let called;
    
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    resolvePromise(promise2, y, resolve, reject);
                }, e => {
                    if (called) 
                        return;
                    called = true;
                    reject(e);
                })
            } else {
                if (called)
                    return;
                called = true;
                resolve(x);
            }
        } catch(e) {
            if (called)
                return;
            called = true;
            reject(e);
        }
    } else {
        if (called)
            return;
        called = true;
        resolve(x);
    }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
    let self = this;
    let promise2;
    promise2 = new MyPromise((resolve, reject) => {
        if (self.status === "pending") {
            self.onResolved.push(() => {
                let x = onResolved(self.value);
                resolvePromise(promise2, x, resolve, reject)
            });
        }

        if (self.status === "resolved") {
            let x = onResolved(self.value);
            resolvePromise(promise2, x, resolve, reject)
        }
        if (self.status === "rejected") {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject)
        }
    });
    return promise2;
}

let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("hello world");
    }, 1000);
});
p.then((message) => {
    console.log(message);
    return "hello";
}).then(message => {
    console.log(message);
})