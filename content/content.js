~ function() {
    if(document.body && document.body.childElementCount < 2) {
        var json = findJson(document.body.innerText);
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

~ function() {

    let div = $('<div>').hide()
    let sel = []

    sel.push('[id^=ad]')

    // http://tech.ifeng.com/a/20170720/44653845_0.shtml?_zbs_baidu_bk
    sel.push('#rightCoupletId', '#leftCoupletId')

    // https://baike.baidu.com/item/%E8%85%BE%E8%AE%AF/112204?fr=aladdin#reference-[6]-1591-wrap
    sel.push('.right-ad')

    // http://www.zol.com.cn/
    sel.push('.gmine_ad', '.zmall-ad-1000')

    // http://www.ygdy8.com/
    sel.push('body > a[href^=http]', 'body > [id^=cs_]')

    function clear() {
        $.each(sel, function(index, selector) {
            let els = $(selector);
            if(els.length > 0) {
                console.log(els.selector)
                div.append(els)
                // els.hide();
            }
        })

        // $('span[data-tuiguang]').each((index, selector) => {
        //     $(selector).closest('div[id]').appendTo(div)
        // })
    }
    setTimeout(clear, 0)
    setTimeout(clear, 15)
    setTimeout(clear, 30)
    setTimeout(clear, 50)
    setTimeout(clear, 100)
    setTimeout(clear, 200)
    setTimeout(clear, 500)
    setTimeout(clear, 1000)
    setTimeout(clear, 2000)
    setTimeout(clear, 3000)
}();