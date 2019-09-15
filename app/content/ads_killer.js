~ function() {

  if (document.domain === 'localhost' || ~document.domain.indexOf('oa.com')) {
    return
  }
  let hide = $('<div>').hide()
  $('body').append(hide)
  let sel = []

  function add(selector, url) {
    sel.push({
      selector,
      url
    })
  }

  add('[id^=ad_]')

  // http://tech.ifeng.com/a/20170720/44653845_0.shtml?_zbs_baidu_bk
  add('#rightCoupletId', '#leftCoupletId')

  // https://baike.baidu.com/item/%E8%85%BE%E8%AE%AF/112204?fr=aladdin#reference-[6]-1591-wrap
  add('.right-ad')

  // http://www.zol.com.cn/
  add('.gmine_ad', '.zmall-ad-1000')

  // http://www.ygdy8.com/
  add('body > a[href^=http]', 'body > [id^=cs_]')

  add('#content_left .EC_newppim')

  add('#midbanner', '#lovexin12', '#lovexin14')

  // baidu
  add('#content_left>.EC_result[id]')

  add('.google-auto-placed')

  add('.container a', 'http://www.rmdown.com/link.php')

  add('iframe[src*="//c.93hdw9.com]"')

  function clear() {

    $.each(sel, function(index, { selector, url }) {

      if (url && !location.href.match(url)) {
        return
      }
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