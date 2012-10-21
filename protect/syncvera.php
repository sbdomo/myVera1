<?php
header('Content-Type: text/html; charset=utf-8');
//$vera='http://192.168.1.6/port_3480';
//$connexion=0;
if($_GET["connexion"]==0){
$vera='http://'.$_GET['ipvera'].'/port_3480';
}elseif($_GET["connexion"]==1){
//$vera='https://fwd2.mios.com/'.$_GET["login"].'/'.$_GET["password"].'/35101946';	
$vera='https://fwd2.mios.com/tmartinez/bb7h5o7y/35101946';	
}
$vera='https://fwd2.mios.com/tmartinez/bb7h5o7y/35101946';	
$id=$_GET["id"];
    // $jsondevices[$i]['TROUVE'] = $data['location_id'];
//read json an vera

$json="";
 if($id=='config') {
	$url=$vera.'/data_request?id=sdata';
	$json = CurlFileGetContents($url, 80);
	$json2=json_decode($json,true);	
	$jsondevices=$json2['devices'];
	if($_GET['connexion']==0){
	$filename = "../devices.json";
	$handle = fopen($filename, "r");
	$jsonconfig = fread($handle, filesize($filename));
	fclose($handle);
	$jsonconfig2 = json_decode($jsonconfig,true);
	}else if($_GET['connexion']==1){
		try {
  $dns = 'mysql:host=localhost;dbname=myvera';
  $utilisateur = 'usrmyvera';
  $motDePasse = 'ym7j287eYNF7qARF';
  $connection = new PDO( $dns, $utilisateur, $motDePasse );
} catch ( Exception $e ) {
  echo "Connection à MySQL impossible : ", $e->getMessage();
  die();
}

try {
$jsonconfig2['devices']="";
$query = $connection->query("SELECT * FROM DEVICES a INNER JOIN USERS b on a.ID=b.USER_ID where LOGIN='".$user."'");
if($query){
$jsonconfig2['devices']=$query->fetchAll(PDO::FETCH_ASSOC);
//print_r($jsonconfig2);
}
//$query->closeCursor();
} catch( Exception $e ){
  echo 'Erreur de suppression : ', $e->getMessage();
}	
	}

	$jsonconfig2=$jsonconfig2['devices'];
    $inserted=0;
foreach ($jsondevices as $val1) {
		$val1['iconURL']='l'.$val1['category'].'_0.png';
	if($jsonconfig2){
    foreach ($jsonconfig2 as $key => $val2) {
		
        if ($val1['id'] == $val2['id']) {
			$val1['active']=1;
            $results['devices'][] = array_merge($val2,$val1);
			$inserted=1;
            
        }
		
    }
	}
	if($inserted==0){
		$val1['active']=0;
        $results['devices'][] = $val1;
	}
	$inserted=0;
}
$json=json_encode($results);

} elseif($id=='savedevice') {
	//print($_POST['datas']);
	$newdevice=json_decode(stripslashes($_POST['datas']),true);
	//print($_POST['datas']);
	//echo 'ndid:'.$newdevice;
	if($_POST['connexion']==0){
	$filename = "../devices.json";
	$handle = fopen($filename, "r");
	$jsonconfig = fread($handle, filesize($filename));
	fclose($handle);
	
	$jsonconfig2 = json_decode($jsonconfig,true);
	$jsonconfig2=$jsonconfig2['devices'];
    $find=0;
    foreach ($jsonconfig2 as $key => $val1) {
		
        if ($val1['id'] == $newdevice['id']) {
        	//echo 1;
			$val1['active']=$newdevice['active'];
			$val1['top']=$newdevice['top'];
			$val1['left']=$newdevice['left'];
			$val1['etage']=$newdevice['etage'];
            $results['devices'][] = $val1;
			$find=1;
			
        }else{
        	//echo 2;
        	$results['devices'][] = $val1;
        }
	}
		if($find==0 && $newdevice['active']==1){
        		//echo 3;
        	//print_r('new  : '.$newdevice);
            $results['devices'][] = $newdevice;
		}
		
    

$json=json_encode($results);
//print $json;
$handle = fopen($filename, "w");
$jsonconfig = fwrite($handle, $json);
fclose($handle);
	}else if($_POST['connexion']==1){
try {
  $dns = 'mysql:host=localhost;dbname=myvera';
  $utilisateur = 'usrmyvera';
  $motDePasse = 'ym7j287eYNF7qARF';
  $connection = new PDO( $dns, $utilisateur, $motDePasse );
} catch ( Exception $e ) {
  echo "Connection à MySQL impossible : ", $e->getMessage();
  die();
}
$query = $connection->query("SELECT * FROM DEVICES a INNER JOIN USERS b on a.ID=b.USER_ID where LOGIN='".$user."' and ID=".$newdevice['id']);
if($query){
$enregistrement = $query->fetch(PDO::FETCH_OBJ);
}
if($enregistrement){
$query = $connection->query("UPDATE DEVICES SET ACTIVE=".$newdevice['active'].",TOP=".$newdevice['top'].",LEFT=".$newdevice['left'].",ETAGE=".$newdevice['etage']." where ID=".$newdevice['id']);
}else{
		$url=$vera.'/data_request?id=sdata';
	$json = CurlFileGetContents($url, 80);
	$json2=json_decode($json,true);	
	
	$jsondevices=$json2['devices'];
$query = $connection->query("SELECT * FROM USERS WHERE LOGIN='".$user."'");
$enregistrement = $query->fetch(PDO::FETCH_OBJ);

foreach ($jsondevices as $val1){
	//echo $val1['id'];
	if($val1['id']==$newdevice['id']){
echo "INSERT INTO DEVICES(`LOGIN_ID`,`ID`,`NAME`,`CATEGORY`,`LEFT`,`TOP`,`ACTIVE`) VALUES (".$enregistrement->ID.",".$val1['id'].",'".$val1['name']."',".$val1['category'].",".$newdevice['left'].",".$newdevice['top'].",".$newdevice['active'].")";
	$query = $connection->query("INSERT INTO DEVICES(LOGIN_ID,ID,NAME,CATEGORY,LEFT,TOP,ACTIVE) VALUES (".$enregistrement->ID.",".$val1['id'].",'".$val1['name']."',".$val1['category'].",".$newdevice['left'].",".$newdevice['top'].",".$newdevice['active'].")");	
	}
} 	
//	
}
		
	}
}  elseif($id=='lu_action') {
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
		$url=$vera.'/data_request?id=lu_action&DeviceNum='.$DeviceNum.'&serviceId='.$serviceId.'&action=SetText1&newText1Value='.$text1.'&output_format=json';
		$json=file_get_contents($url);
	}
	if($alarmduration!="") {
		$url=$vera.'/data_request?id=lu_action&DeviceNum='.$DeviceNum.'&serviceId='.$serviceId.'&action=SetAlarmDuration&newAlarmDurationValue='.$alarmduration.'&output_format=json';
		$json=file_get_contents($url);
	}
		$url=$vera.'/data_request?id=lu_action&DeviceNum='.$DeviceNum.'&serviceId='.$serviceId.'&action=SetNewAlarmTime&NewAlarmTime='.$alarmtime.'&output_format=json';
		$json=file_get_contents($url);
	//AlarmTime'], ["Alarm duration (in seconds):","",'AlarmDuration'], ["Text:","",'Text1'
	
	
	

}
//print_r(json_decode($json));
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