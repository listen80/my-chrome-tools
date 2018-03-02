$(function() {
    var command = (function() {
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
                        $('.input-content').find('img').attr('src', str)
                    }
                    reader.readAsDataURL(file);
                } else {
                    console.log('not a image')
                }
            }
        }

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
            }
        }
    })();

    $('.input').on('click', function() {
        command.input();
    })

    $('.copy').on('click', function() {
        command.copy();
        alert('已经复制');
    })
})

$(function() {

    $('.json').on('click', function() {
        var json = findJson($('#textarea').val());
        if (json) {
            showData(json, function(el) {
                $('.json-content').empty().append(el);
            })
        } else {
            alert('error json')
        }
    })
})
            
$(function() {
    var sections = $('section');

    $('header a').on('click', function() {
        sections.eq($(this).index()).show().siblings().hide();
    }).eq(0).trigger('click')
})