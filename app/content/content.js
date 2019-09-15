~(function() {
  var chromeapi = {
    // installExt: function(extobj) {
    //   var img = new Image();
    //   img.src = "http://dd.browser.360.cn/static/a/154.6126.gif?crx_id=" + extobj["crx_id"] + "&rn=" + Math.random();
    //   $.get(URLCONF["domain"] + "/provider/clk/" + extobj["crx_id"]);
    //   window.open(extobj['filename'], "_self");
    //   return false;
    // },
    GetRunPath: function() {
      try {
        var path = external.GetRunPath(external.GetSID(window));
        return path.toLowerCase();
      } catch (e) {
        return "";
      }
    },
    Is360Chrome: function() {
      return this.GetRunPath().indexOf("360chrome") > -1;
    },
    is360chrome: function() {
      var _is360chrome = false;
      try {
        if (
          typeof chrome != "undefined" &&
          typeof chrome.webstorePrivate != "undefined" &&
          typeof chrome.webstorePrivate.beginInstallWithManifest3 != "undefined"
        ) {
          _is360chrome = true;
        } else {
          _is360chrome =
            navigator.userAgent.toLowerCase().indexOf("360ee") != -1;
        }
      } catch (e) {}
      return _is360chrome || this.Is360Chrome();
    }
  };

  if (!chromeapi.is360chrome()) {
    function getWord() {
      var sel = window.getSelection();
      return sel.toString();
      // if (sel.type === "Range") {
      //   if (sel.baseNode === sel.extentNode) {
      //     var start = Math.min(sel.baseOffset, sel.extentOffset);
      //     var end = Math.max(sel.baseOffset, sel.extentOffset);
      //     var word = sel.baseNode.data.substring(start, end);
      //     return word;
      //   }
      // }
      // return null;
    }

    document.addEventListener("dragover", function(event) {
      event.preventDefault();
    });

    document.addEventListener("drop", function(event) {
      event.preventDefault();
      var word = getWord();

      word && window.open("https://www.baidu.com/s?ie=UTF-8&wd=" + encodeURIComponent(word));
    });
  }
})();
