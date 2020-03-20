<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Fields.Osmap
 *
 * @copyright   Copyright (C) 2017 NAME. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JFormHelper::loadFieldClass('text');

class JFormFieldOsmap extends JFormFieldText
{
    public $type = 'Osmap';

    public function getInput()
    {
        $document = JFactory::getDocument();
        $document->addScript('/plugins/fields/osmap/assets/js/leaflet.js');
        $document->addScript('/plugins/fields/osmap/assets/js/osmap.js');
        $document->addStyleSheet('/plugins/fields/osmap/assets/css/leaflet.css');

        $options = [
            'id'        =>  $this->id,
            'latitude'  =>  $this->element['latitude'],
            'longitude' =>  $this->element['longitude'],
            'zoom'      =>  $this->element['zoom'],
        ];

        var_dump($options);

        $document->addScriptOptions('options', $options);

        $field =    '<div id="map" data-mode="" style="width: 400px; height: 400px;">';
        $field .=   '    <input type="hidden" data-map-markers="" value="" name="map-geojson-data" />';
        $field .=   '</div>';
        $field .=   '<input type="text" name="' .  $this->name . '" id="' . $this->id . '" value="' . $this->value. '" />';


        return $field;
    }
}