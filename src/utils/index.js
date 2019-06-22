module.exports = {
    format: function (str, object) {
        var array = Array.prototype.slice.call(arguments, 1);
        return str.replace(/\\?\#{([^{}]+)\}/gm, function (match, name) {
            if (match.charAt(0) == '\\')
                return match.slice(1);
            var index = Number(name)
            if (index >= 0)
                return array[index];
            if (object && object[name] !== void 0)
                return object[name];
            return '';
        });
    },
    getUrlQuery: function (url) {
        url = url ? url : window.location.href;
        var _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (var i = 0, _len = _arrS.length; i < _len; i++) {
            var pos = _arrS[i].indexOf('=');
            if (pos === -1) {
                continue;
            }
            var name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    }
};
