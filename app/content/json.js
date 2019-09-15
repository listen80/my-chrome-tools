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
