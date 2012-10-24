<?php
header('Content-Type: text/html; charset=utf-8');

// Load config
//include "param.php";
$ipvera=$_GET["ipvera"];
$vera = 'http://'.$ipvera.':3480';
$id=$_GET["id"];

//read json an vera
$json="";
if($id=='sdata') {
	$loadtime=$_GET["loadtime"];
	$dataversion=$_GET["dataversion"];
	$timeout=$_GET["timeout"];
	$minimumdelay=$_GET["minimumdelay"];
	$url=$vera.'/data_request?id=sdata&loadtime='.$loadtime.'&dataversion='.$dataversion.'&timeout='.$timeout.'&minimumdelay='.$minimumdelay;
	$json = CurlFileGetContents($url, 80);
} elseif($id=='lu_action') {
	$DeviceNum=$_GET["DeviceNum"];
	$serviceId=$_GET["serviceId"];
	$action=$_GET["action"];
	$targetvalue=$_GET["targetvalue"];
	$newTargetValue=$_GET["newvalue"];
	
	//id=lu_action&output_format=xml&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunScene&SceneNum=
	    
	if($action=="RunScene") {
	$url=$vera.'/data_request?id=lu_action&serviceId='.$serviceId.'&action='.$action.'&SceneNum='.$newTargetValue.'&output_format=json';
	} else {
	$url=$vera.'/data_request?id=lu_action&DeviceNum='.$DeviceNum.'&serviceId='.$serviceId.'&action='.$action.'&'.$targetvalue.'='.$newTargetValue.'&output_format=json';
	}
	$json=file_get_contents($url);
} elseif($id=='vclock') {
	$DeviceNum=$_GET["DeviceNum"];
	$alarmtime=$_GET["alarmtime"];
	$alarmduration=$_GET["alarmduration"];
	$text1=$_GET["text1"];
	
	$serviceId="urn:upnp-org:serviceId:VClock1";
	///data_request&id=lu_action&output_format=json&DeviceNum=65&serviceId=urn:upnp-org:serviceId:VClock1&action=SetNewAlarmTime&NewAlarmTime=10:33:00
	if($text1!="") {
		$url=$vera.'/data_request?id=lu_action&DeviceNum='.$DeviceNum.'&serviceId='.$serviceId.'&action=SetText1&newText1Value='.rawurlencode($text1).'&output_format=json';
		//echo $url;
		$json=file_get_contents($url);
		//echo " text : ".$json." - ";
	}
	if($alarmduration!="") {
		$url=$vera.'/data_request?id=lu_action&DeviceNum='.$DeviceNum.'&serviceId='.$serviceId.'&action=SetAlarmDuration&newAlarmDurationValue='.$alarmduration.'&output_format=json';
		$json=file_get_contents($url);
	}
		$url=$vera.'/data_request?id=lu_action&DeviceNum='.$DeviceNum.'&serviceId='.$serviceId.'&action=SetAlarmTime&newAlarmTimeValue='.$alarmtime.'&output_format=json';
		$json=file_get_contents($url);
	//AlarmTime'], ["Alarm duration (in seconds):","",'AlarmDuration'], ["Text:","",'Text1'
	
	
	

}
print($json);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//Functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//To dowload json from Vera (with timeout parameter)
//there is no timeout in file_get_contents
function CurlFileGetContents($adresse, $timeout = 60){
  $ch = curl_init($adresse);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_USERAGENT, "PHP script");
  curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
  $page    = curl_exec($ch);
  $CurlErr = curl_error($ch);
  curl_close($ch);
  if ($CurlErr){
    //echo $CurlErr;
    return "Erreur";
  }else{
    return $page;
  }
}
?>