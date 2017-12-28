$(function() {

    ~ function(argument) {
        var command = (function(document) {
            var input = document.createElement('input');
            input.type = "file";
            input.accept = "image/gif, image/jpeg, image/png";
            input.onchange = function(e) {
                var file = this.files[0]
                if (file) {
                    if (file.type.indexOf('image/') === 0) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            str = e.target.result;
                            done && done(str);
                        }
                        reader.readAsDataURL(file);
                    } else {
                        console.log('not a image')
                    }
                }
            }


            var done = null;
            var str = '';

            document.addEventListener('copy', function(e) {
                e.clipboardData.setData('text/plain', str);
                e.preventDefault();
            });

            return {
                copy: () => {
                    document.execCommand("copy");
                },
                input: () => {
                    input.click();
                },
                done: (fn) => {
                    done = fn;
                }
            }
        })(document);

        $('.input').on('click', function() {
            command.input();
        })

        $('.copy').on('click', function() {
            command.copy();
            console.log('copyed');
        })

        command.done(function(s) {
            console.log(s.substr(0, 100));
        })
    }()
})

$(function() {
    $('.json').on('click', function() {
        var json = findJson($('#textarea').val());
        if (json) {
            showData(json)
        }
    })
})

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
        var html = '<div class="json-wrap"><div class="line">' + ltpl(tpl, 'viewJson')(json) + '</div></div>';
        $('body').html($(html));
        $('.expand, .dot').on('click', function() {
            $(this).parent().toggleClass('close')
        });
    })
}