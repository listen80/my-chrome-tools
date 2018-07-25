~ function() {
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
    var tpl = `
    {if $d === null}
    <span class="null">null</span>
    {elseif $d === undefined}
    <span class="undefined">undefined</span>
    {elseif $d.constructor === Object || $d.constructor === Array}
    <span class="symbol">{$d.constructor === Object ? '&#123;' : '['}</span>{if Object.keys($d).length}<span class="expand"></span><div class="indent">
      {for $d}<div class="line">
        <span class="key">{$k}</span><span class="colon">:</span>{include "viewJson" $v}
      </div>{/for}
    </div>{/if}<span class="dot">...</span><span class="symbol">{$d.constructor === Object ? '&#125;' : ']'}</span>
    {elseif $d.constructor === String}
    <span class="string">"{escape $d}"</span>
    {elseif $d.constructor === Number}
    <span class="number">{$d}</span>
    {elseif $d.constructor === Boolean}
    <span class="boolean">{$d}</span>
    {else}
    <span class="other">{escape $d}</span>
    {/if}`
    var html = '<div class="json-wrap"><div class="line">' + leaf(tpl, 'viewJson')(json) + '</div></div>';
    var el = $(html).on('click', '.expand, .dot', function() {
      $(this).parent().toggleClass('close')
    });
    fn && fn(el[0])
  }

  if (document.body && document.body.childElementCount < 2) {
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

    var tpl = `
<div class="app-wrap">
  <div class="content">
    <table class="table">
      <colgroup span="2" align="left"></colgroup>
      <colgroup span="2" align="right"></colgroup>
      <colgroup align="right" width="200"></colgroup>
      <thead>
        <tr>
          <th>#</th>
          <th>Key</th>
          <th>Value</th>
          <th>Domain</th>
          <th>Expires</th>
        </tr>
      </thead>
      <tbody>
        {if $d.length} {for $d}
        <tr>
          <td>{$k + 1}</td>
          <td>{$v.name}</td>
          <td>
            <div style="word-break: break-all;">{decodeURIComponent($v.value)}</div>
          </td>
          <td><span>{$v.domain}</span></td>
          <td>{if $v.session}Session{else}{new Date($v.expirationDate * 1000).toLocaleString()}{/if}</td>
        </tr>
        {/for} {else}
        <tr>
          <td colspan="5" style="text-align: center">暂无</td>
        </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>`
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

  if(document.domain === 'localhost' || ~document.domain.indexOf('oa.com')) {
    return
  }
  let hide = $('<div>').hide()
  $('body').append(hide)
  let sel = []

  sel.push('[id^=ad_]')

  // http://tech.ifeng.com/a/20170720/44653845_0.shtml?_zbs_baidu_bk
  sel.push('#rightCoupletId', '#leftCoupletId')

  // https://baike.baidu.com/item/%E8%85%BE%E8%AE%AF/112204?fr=aladdin#reference-[6]-1591-wrap
  sel.push('.right-ad')

  // http://www.zol.com.cn/
  sel.push('.gmine_ad', '.zmall-ad-1000')

  // http://www.ygdy8.com/
  sel.push('body > a[href^=http]', 'body > [id^=cs_]')

  sel.push('#content_left .EC_newppim')

  sel.push('#midbanner', '#lovexin12', '#lovexin14')

  // baidu
  sel.push('#content_left>.EC_result[id]')

  function clear() {
    $.each(sel, function(index, selector) {
      let els = $(selector);
      if (els.length > 0) {
        hide.append(els)
      }
    })

    $('span').each(function() {
      if (~$(this).text().indexOf('广告')) {
        var div = $(this).closest('div[id]')
        if (!isNaN(div.attr('id'))) {
          div.html('')
          hide.appendTo(div)
        }
      }
    })
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
  setTimeout(clear, 5000)
  setTimeout(clear, 6000)
}();