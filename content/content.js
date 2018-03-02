~ function() {
    if(document.body && document.body.childElementCount < 2) {
        var json = findJson(document.body.innerHTML);
        if (json) {
            showData(json, function(el) {
                $('body').empty().append(el)
            })
        }
    }
}();

~ function() {
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        if (request.act === 'showCookie') {
            show(request.cookie)
        }
    });

    function show(cookie) {
        $.get(chrome.extension.getURL('/tpl/viewCookie.tpl'), function(tpl) {
            var html = leaf(tpl)(cookie);
            var el = $(html).on('click', function(e) {
                el.remove();
                $('body').removeClass('over-hidden');
                return false;
            }).on('click', 'table', function(e) {
                return false;
            }).on('wheel', function(e) {
                e.stopPropagation();
            })
            $('body').append(el).addClass('over-hidden');
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