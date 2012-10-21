<?php

class DeviceController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';
	

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view','JsonGetState','JsonGetDevices','JsonDevicesConfig','SaveDevices','ReadAction'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}
public function actionJsonGetState()
{
  if(isset($_GET['connexion']) && isset($_GET['user']) && isset($_GET['password']) && isset($_GET["loadtime"]) && isset($_GET["dataversion"]) && isset($_GET["timeout"]) && $_GET["minimumdelay"]){
  $vera=$this->getUrl();	
  $url=$vera.'/data_request?id=sdata&loadtime='.$_GET["loadtime"].'&dataversion='.$_GET["dataversion"].'&timeout='.$_GET["timeout"].'&minimumdelay='.$_GET["minimumdelay"];
  $data = Yii::app()->CURL->run($url);
  $arrData=json_decode($data,true);
  //echo $data;
  //print_r($arrData);
  $results['full']=$arrData['full'];
  $results['loadtime']=$arrData['loadtime'];
  $results['dataversion']=$arrData['dataversion'];
  $arrData=$arrData['devices'];
  
  
foreach ($arrData as $val) {
  		//echo $val['monthlyhistory'];
  			
      $val['monthlyhistory']="";
	  $val['dailyhistory']="";
	  $val['twohourlyhistory']="";
	  $results['devices'][] =$val;
  }
$arrData['devices']=$arrData;
$data=json_encode($results);
  echo $data;
  }else{
  	echo 'pb3';
  }
  
  
	
//  Yii::app()->end();
}

public function actionJsonGetDevices()
{
 
  if(isset($_GET['connexion']) && isset($_GET['user'])){
  	if($_GET['connexion']==0){
  		$jsonconfig=$this->getDevicesFromFile();
		echo $jsonconfig;
  	}else{
	$arr=$this->getDevicesFromDb();
    print CJSON::encode(array(

            'devices' => $arr,
        ));
   		
	}
  
  }else{
  	echo 'pb1';
  }
  
  
  //echo CJSON::encode($device);
	
  Yii::app()->end();
}

public function actionJsonDevicesConfig()
{
 
  if(isset($_GET['connexion'])){
  	$url=$this->getUrl();
	$json2=json_decode(Yii::app()->CURL->run($url.'/data_request?id=sdata'),true);	
	$jsondevices=$json2['devices'];
  	if($_GET['connexion']==0){
  		$jsonconfig=$this->getDevicesFromFile();	
		$jsonconfig2 = json_decode($jsonconfig,true);
  	}else{
		$jsonconfig2=$this->getDevicesFromDb();
	}
  	    $inserted=0;
foreach ($jsondevices as $val1) {			
		$val1['iconURL']='l'.$val1['category'].'_0.png';
	if($jsonconfig2){
    foreach ($jsonconfig2 as $key => $val2) {
		
        if ($val1['id'] == $val2['id_device']) {
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
echo $json;
  }else{
  	echo 'pb4';
  }
  
  
  //echo CJSON::encode($device);
	
  Yii::app()->end();
}

public function actionSaveDevices()
{
  $newdevice=json_decode(stripslashes($_GET['datas']),true);
  if(isset($_GET['connexion']) && isset($_GET['user'])){
  	if($_GET['connexion']==0){
  	$jsonconfig2['devices']=json_decode($this->getDevicesFromFile(),true);	
	$find=0;
    foreach ($jsonconfig2 as $key => $val1) {
		
        if ($val1['id'] == $newdevice['id']) {
			$val1['active']=$newdevice['active'];
			$val1['top']=$newdevice['top'];
			$val1['left']=$newdevice['left'];
			$val1['etage']=$newdevice['etage'];
            $results['devices'][] = $val1;
			$find=1;
			
        }else{
        	$results['devices'][] = $val1;
        }
	}
		if($find==0 && $newdevice['active']==1){
            $results['devices'][] = $newdevice;
		}
		    
$json=json_encode($results);
$filename = "../../myvera/devices.json";
$handle = fopen($filename, "w");
$jsonconfig = fwrite($handle, $json);
fclose($handle);
  	}else{
$deviceExist = Device::model()->with('user')->find('LOGIN=:LOGIN AND id_device=:ID_DEVICE',array(':LOGIN'=>$_GET['user'],':ID_DEVICE'=>$newdevice['id']));
	if($deviceExist){
		$deviceExist->active=$newdevice['active'];
		$deviceExist->top=$newdevice['top'];
		$deviceExist->left=$newdevice['left'];
		$deviceExist->etage=$newdevice['etage'];
		echo $deviceExist->save(false);	
	}else{
		$url=$this->getUrl();
		$json2=json_decode(Yii::app()->CURL->run($url.'/data_request?id=sdata'),true);	
		$jsondevices=$json2['devices'];
		$user = User::model()->find('LOGIN=:LOGIN',array(':LOGIN'=>$_GET['user']));
		foreach ($jsondevices as $val1){

	if($val1['id']==$newdevice['id']){
		$newDevice=new Device;
		$newDevice->user_id=$user->ID;
		$newDevice->id_device=$val1['id'];
		$newDevice->name=$val1['name'];
		$newDevice->category=$val1['category'];
		$newDevice->etage=$newdevice['etage'];
		$newDevice->top=$newdevice['top'];
		$newDevice->left=$newdevice['left'];
		$newDevice->active=$newdevice['active'];
		$newDevice->save(false);
	}}
	}
	}
  
  }else{
  	echo 'pb5';
  }
  
  
  //echo CJSON::encode($device);
	
  Yii::app()->end();
}


public function actionReadAction()
{
  //header('Content-type: application/json');

  //$device = User::model()->findByPK((int)$id);
  
  
  if(isset($_GET['user']) && isset($_GET['password']) && isset($_GET['ipvera']) && isset($_GET['connexion']) && isset($_GET["DeviceNum"]) && isset($_GET["serviceId"]) && isset($_GET["action"]) && isset($_GET["targetvalue"]) && isset($_GET["newvalue"])){
	$url=$this->getUrl();
	if($_GET['action']=="RunScene") {
	$url=$url.'/data_request?id=lu_action&serviceId='.$_GET['serviceId'].'&action='.$_GET['action'].'&SceneNum='.$_GET['newTargetValue'].'&output_format=json';
	} else {
	$url=$url.'/data_request?id=lu_action&DeviceNum='.$_GET['DeviceNum'].'&serviceId='.$_GET['serviceId'].'&action='.$_GET['action'].'&'.$_GET['targetvalue'].'='.$_GET['newTargetValue'].'&output_format=json';
	}
	echo file_get_contents($url);  	
  	
  }else{
  	echo 'pb6';
  }
   
  //echo CJSON::encode($device);
	
  //Yii::app()->end();
}
	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Device;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Device']))
		{
			$model->attributes=$_POST['Device'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Device']))
		{
			$model->attributes=$_POST['Device'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Device');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Device('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Device']))
			$model->attributes=$_GET['Device'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=Device::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='device-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

		/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function getUrl()
	{
		$ipvera=$_GET['ipvera'];
		if($_GET['connexion']==0){
			
			$url='http://'.$ipvera.'/port_3480';
			
			
		}else{
			$fp=@fsockopen($ipvera,80,$errno, $errstr, 3);
			if($fp){
				$url='http://'.$ipvera.'/port_3480';
				fclose($fp);
			}else{
				$user=$_GET['user'];
				$password=$_GET['password'];
				$serial=$_GET['serial'];
				$url=$_GET['url'];
				$url='https://'.$url.'/'.$user.'/'.$password.'/'.$serial;
			}
			
		}
		//echo "url".$url;
		return $url;
	}

		/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function getDevicesFromDb()
	{
  		$criteria = new CDbCriteria;
		$criteria->condition = "LOGIN=:LOGIN";
		$criteria->params = array(':LOGIN'=>$_GET['user']);
		$criteria->with = array('user');
		
  		$devices=Device::model()->findAll($criteria);
  		$arr = array();
  		$i=0;
    foreach($devices as $device)
    {
        $device->id=$device->id_device;
		if($device->icon==0){
		$device->icon="";	
		}	   
        $arr[$i] = $device->attributes;
        $i++;
    }
		return $arr;
	}	
	
		/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function getDevicesFromFile()
	{
  		$filename = "../../myvera/devices.json";
		$handle = fopen($filename, "r");
		$jsonconfig = fread($handle, filesize($filename));
		fclose($handle);
		return $jsonconfig;
	}	
		
}
