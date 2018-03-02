$(function() {

	function open(engine, value) {
		window.open(engine + value)
	}

	function bind(selector){
		var el = $(selector), engine = el.attr('url')
		el.find('[type="text"]').on('keydown', function(event) {
			if(event.keyCode === 13) {
				open(engine, $(this).val());
			}
		})
		el.find('[type="button"]').on('click', function(event) {
			open(engine, $(this).prev().val());
		})
	}

	$('.item').each(function() {
		bind(this)
	})
})