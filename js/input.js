(function($){
	
	// initialized on ACF events
	function initialize_field( $el ) {

		// Cache jquery selectors
		// Values to get/set
		var $id		= $el.find('.acf-focal_point-id'),
			$top	= $el.find('.acf-focal_point-top'),
			$left	= $el.find('.acf-focal_point-left'),

			// Elements to get/set 
			$fp		= $el.find('.acf-focal_point'),
			$img	= $el.find('.acf-focal_point-image'),
			$icon	= $el.find('.acf-focal_point-icon'),

			// Buttons to trigger events
			$add	= $el.find('.add-image'),
			$del	= $el.find('.acf-button-delete');


		// Hold/get our values
		var values = {
			id:		$id.val(),
			top:	$top.val() == '' ? 0.5 : $top.val(),
			left:	$left.val() == '' ? 0.5 : $left.val(),
			size:	$fp.data('preview_size')
		};
		

		// DOM elements
		var img		 = $img.get(0),
			icon = $icon.get(0);

		// To hold WP media frame
		var file_frame;

		// When we've loaded an image, draw the canvas.
		// (either on dom load or adding new image from WP media manager)
		$img.on("load", function(e){
			icon.style.left = (values.left * 100) + "%";
			icon.style.top = (values.top * 100) + "%";
		});

		// When we click the add image button...
		$add.on('click', function(){

			// If the media frame already exists, reopen it.
			if ( file_frame ) {
				file_frame.open();
				return;
			}

			// Create the media frame.
			file_frame = wp.media.frames.file_frame = wp.media({
				title: 'Select Image',
				button: { text: 'Select' }
			});

			// When an image is selected..
			file_frame.on('select', function() {

				// Get selected image objects
				var attachment	= file_frame.state().get('selection').first().toJSON(),
					src			= attachment.sizes[values.size];

				// Make UI active (hide add image button, show canvas)
				$fp.addClass('active');

				if (src === undefined) {
					src = attachment;
				}

				// Set image to new src
				$img.attr('src', src.url);

				// Update our post values and values obj
				$id.val(attachment.id).trigger('change');
				values.id = attachment.id;

			});

			// Finally, open the modal
			file_frame.open();
		});


		// When we click the delete image button...
		$del.on('click', function(){

			// Reset DOM image attributes
			$img.removeAttr('src width height');

			// Hide canvas and show add image button
			$fp.removeClass('active');

			// Reset our post values
			$id.val('');
			$top.val('');
			$left.val('').trigger('change');
			
			// reset to default
			icon.style.left = null;
			icon.style.top = null;
		});

		// When we click on the image...
		img.addEventListener("click", function(e) {
			var rect = img.getBoundingClientRect();
			var top = (e.clientY - rect.y) / rect.height;
			var left = (e.clientX - rect.x) / rect.width;
			$top.val(top.toFixed(2));
			$left.val(left.toFixed(2)).trigger('change');
			
			icon.style.left = left.toFixed(2) * 100 + "%";
			icon.style.top = top.toFixed(2) * 100 + "%";
		});		
	}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/
		
		acf.addAction('new_field/type=focal_point', function( field ){
			initialize_field( field.$el );
		});		
		
	}


})(jQuery);
