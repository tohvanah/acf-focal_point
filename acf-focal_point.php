<?php

/*
Plugin Name: ACF: Image Focal Point
Plugin URI: https://github.com/tohvanah/acf-focal_point/
Description: Adds a new field type to Advanced Custom Fields allowing users to draw focal points on images.
Version: 2.0
Author: John Healey / spwarner / Daniel Berkman
Author URI: http://twitter.com/lostinnovation
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/


// Include field type for ACF5
// $version = 5 and can be ignored until ACF6 exists
function include_field_types_focal_point( $version ) {
	
	include_once('acf-focal_point-v5.php');
}
add_action('acf/include_field_types', 'include_field_types_focal_point');	


?>
