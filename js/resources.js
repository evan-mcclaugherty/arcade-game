let Resources = (function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    load = function (urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        } else {
            _load(urlOrArr);
        }
    }

    _load = function (url) {
        if (resourceCache[url]) {
            return resourceCache[url];
        } else {
            var img = new Image();
            img.onload = function () {
                resourceCache[url] = img;
                if (isReady()) {
                    readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    get = function (url) {
        return resourceCache[url];
    }

    isReady = function () {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    onReady = function (func) {
        readyCallbacks.push(func);
    }

    return Object.freeze({
        load,
        get,
        onReady
    });
}());
