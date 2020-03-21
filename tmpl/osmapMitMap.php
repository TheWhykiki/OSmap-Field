<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Fields.Text
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
JHtml::_('jquery.framework');
$value = $field->value;
$document = JFactory::getDocument();

$document->addScript('/plugins/fields/osmap/assets/js/leaflet.js');
$document->addScript('/plugins/fields/osmap/assets/js/osmapFrontend.js');
$document->addStyleSheet('/plugins/fields/osmap/assets/css/leaflet.css');

$geo = explode(',',$value);

$options = [
    'latitude'  =>  $geo[0],
    'longitude' =>  $geo[1],
    'zoom'      =>  $fieldParams['zoom'],
];

$document->addScriptOptions('options', $options);
$field =    '<div id="map" data-mode="" style="width: 400px; height: 400px;">';
$field .=   '    <input type="hidden" data-map-markers="" value="" name="map-geojson-data" />';
$field .=   '</div>';



echo $field;
