<?php
//header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');
header("content-type:application/json");

if ($json = @file_get_contents('php://input'))
{
    $array_json = json_decode($json, true);
}
else
{
    $array_json = array();
}
$data=array();
foreach ($array_json['devices'] as $device) {
	$data[]=array (
		'id' => $device["id"],
		'name' => $device["name"],
		'status' => '0',
		'state' => '-3',
		'room' => $device['room'],
		'category' => $device['category'],
		'subcategory' => $device['subcategory'],
		'left' => $device['left'],
		'top' => $device['top'],
		'etage' => $device['etage'],
		'tripped' => '0',
		'icon' => $device['icon'],
		'verif' => $device['verif'],
		'sceneon' => $device['sceneon'],
		'sceneoff' => $device['sceneoff'],
		);
}
$result_json='{"devices":'.json_encode($data).'}';

$fp = fopen("../resources/config/devices.json","w+"); //creation du fichier
fputs($fp, $result_json); // on écrit les données dans le data.json
fclose($fp); //on ferme le data.json

echo "{'success':true}";
?>