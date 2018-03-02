function findJson(str) {
    var json = null;
    if (str) {
        try {
            json = JSON.parse(str);
        } catch (e) {
            str = /{[\w\W]+}/.exec(str);
            if (str) {
                try {
                    json = JSON.parse(str[0])
                } catch (e) {}
            }
        }
    }

    if (typeof json !== "object") {
        return null;
    } else {
        return json;
    }
}

function showData(json, fn) {
    $.get(chrome.extension.getURL('/tpl/viewJson.tpl'), function(tpl) {
        var html = '<div class="json-wrap"><div class="line">' + leaf(tpl, 'viewJson')(json) + '</div></div>';
        var el = $(html).on('click', '.expand, .dot', function() {
            $(this).parent().toggleClass('close')
        });
        fn && fn(el[0])
    })
}