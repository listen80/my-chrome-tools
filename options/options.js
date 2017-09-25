$(function() {
	$('input').on('change', function() {
		var file = this.files[0]
		if (file) {
			if (file.type.indexOf('image/') === 0) {
				var reader = new FileReader();
				reader.onload = function(e) {
					str = e.target.result;
				}
				reader.readAsDataURL(document.querySelector("input[type=file]").files[0]);
			} else {
				console.log('not a image')
			}
		}
	})

	var str = '';
	$('button').on('click', function() {
		copy(str)
	})

	function copy(str) {
		var save = function(e) {
			document.removeEventListener('copy', save);
			e.clipboardData.setData('text/plain', str);
			e.preventDefault();
		}
		document.addEventListener('copy', save);
		document.execCommand("copy");
	}

})