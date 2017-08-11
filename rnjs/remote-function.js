/**
 * request: {
 *   type: 'remote-function-request',
 *   id: 1,
 *   source: '(function() {return new Date()})()',
 *   mac: 'random'
 * }
 * 
 * response: {
 *   type: 'remote-function-response',
 *   id: ${reqeust.id},
 *   mac: ${reqeust.mac},
 *   resolve: null,
 *   reject: null
 * }
 * 
 */
(function(global, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        global.RemoteFunction = factory();
    }
}(this, function() {
    var id = 1;
    var contexts = new Map();

    function Context(source) {
        this.id = id++;
        this.timestamp = new Date();
        this.source = source;
        this.mac = String(Math.floor(Math.random() * new Date().getTime())); // simple message authentication code
        this.resolve = undefined;
        this.reject = undefined;
    }

    function stringify(func, args) {
        return '(' + func + ')(' + JSON.stringify(args).slice(1, -1) + ')';
    }

    function parse(e) {
        return new Function('return ' + e);
    }

    function eval(e) {
        return parse(e)();
    }

    function newContext(func, args) {
        var context = new Context(stringify(func, args));
        contexts.set(context.id, context);
        return context;
    }

    function handleRequest(request) {
        return Promise.resolve(eval(request.source)).then(function(value) {
            return {
                id: request.id,
                mac: request.mac,
                resolve: value
            };
        }, function(error) {
            return {
                id: request.id,
                mac: request.mac,
                reject: error
            };
        });
    }

    function handleResponse(response) {
        var context = contexts.get(response.id);
        if (context == null) {
            throw new Error('Invalid ID: \n' + JSON.stringify(response));
        }
        if (context.mac !== r.mac) {
            throw new Error('Invalid MAC: \n' + JSON.stringify(response) + '\n' + JSON.stringify(context));
        }
        contexts.delete(response.id);
        if ('resolve' in response) {
            if (context.resolve) {
                context.resolve(response.resolve);
            }
            return context;
        }
        if ('reject' in response) {
            if (context.reject) {
                context.reject(response.reject);
            }
            return context;
        }
        throw new Error('Invalid Message: \n' + JSON.stringify(response));
    }

    return {
        stringify: stringify,
        parse: parse,
        eval: eval,
        newContext: newContext,
        handleRequest: handleRequest,
        handleResponse: handleResponse,
        contexts: contexts
    };
}));


window.document.addEventListener('message', function(message) {
    try {
        var r = JSON.parse(message);
        if (r.type === 'remote-function-request') {
            RemoteFunction.handleRequest(r).then(function(response) {
                response.type = 'remote-function-response';
                window.postMessage(JSON.stringify(response));
            }, function(e) {
                window.postMessage(JSON.stringify({
                    type: 'remote-function-response',
                    id: r.id,
                    mac: r.mac,
                    reject: String(e)
                }));
            });
            return;
        }
        if (r.type === 'remote-function-response') {
            var context = RemoteFunction.handleResponse(message);
            var time = new Date().getTime() - context.timestamp.getTime();
            console.log(context.source + '\n' + time + "ms");
            return;
        }
    } catch (e) {
        console.log(e);
    }
});

function hello1(hello) {
    return new Promise(function(resolve, reject) {
        var context = RemoteFunction.newContext(function(hello) { return hello + ' ' + new Date() }, [hello]);
        context.resolve = resolve;
        context.reject = reject;
        window.postMessage(JSON.stringify({
            type: 'remote-function-request',
            id: context.id,
            source: context.source,
            mac: context.mac
        }));
    });
}

function hello2(hello, callback, error) {
    var context = RemoteFunction.newContext(function(hello) { return hello + ' ' + new Date() }, [hello]);
    context.resolve = callback;
    context.reject = error;
    window.postMessage(JSON.stringify({
        type: 'remote-function-request',
        id: context.id,
        source: context.source,
        mac: context.mac
    }));
}
