~ function() {
    if (document.body && document.body.childElementCount < 2) {
        var json = findJson(document.body.innerHTML);
        if (json) {
            showData(json)
        }
    }


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

    function showData(json) {
        $.get(chrome.extension.getURL('/tpl/viewJson.tpl'), function(tpl) {
            $('<script type="text/tpl">').attr('id', 'viewJson2017').html(tpl).appendTo('body');
            var html = '<div class="json-wrap"><div class="line">' + template('viewJson2017', json) + '</div></div>';
            $('body').html(html);
            $('.expand, .dot').on('click', function() {
                $(this).parent().toggleClass('close')
            });
        })
    }

}();

~ function() {

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        if (request.act === 'showCookie') {
            show(request.cookie)
        }
    });

    function show(cookie) {
        cookie = cookie.concat(cookie, cookie,cookie  ,cookie)
        $.get(chrome.extension.getURL('/tpl/viewCookie.tpl'), function(tpl) {
            var html = template(tpl, cookie);
            html = $(html);
            html.on('click', function(e) {
                html.remove();
                $('body').removeClass('over-hidden');
                return false;
            }).on('click', 'table', function(e) {
                return false;
            }).on('wheel', function(e) {
                e.stopPropagation();
            })
            $('body').append(html).addClass('over-hidden');
        })
    }
}();

~ function() {

    return;
    function getWord() {
        var sel = window.getSelection();
        if (sel.type === 'Range') {
            if (sel.baseNode === sel.extentNode) {
                var start = Math.min(sel.baseOffset, sel.extentOffset);
                var end = Math.max(sel.baseOffset, sel.extentOffset);
                var word = sel.baseNode.data.substring(start, end);
                return word;
            }
        }
        return null;
    }

    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    document.addEventListener("drop", function(event) {
        event.preventDefault();
        var word = getWord();

        word && window.open('https://www.baidu.com/s?ie=UTF-8&wd=' + word)
    })
}();