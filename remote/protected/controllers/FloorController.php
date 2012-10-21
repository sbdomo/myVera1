<?php

class FloorController extends Controller
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
				'actions'=>array('index','view','JsonGetFloors','create','update','DeleteFloor'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array(),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}
public function actionJsonGetFloors()
{

  if(isset($_GET['connexion']) && isset($_GET['user'])){
  	if($_GET['connexion']==0){
  		$jsonconfig=$this->getDevicesFromFile();
		echo $jsonconfig;
  	}else{
	  	$criteria = new CDbCriteria;
		$criteria->condition = "LOGIN=:LOGIN";
		$criteria->params = array(':LOGIN'=>$_GET['user']);
		$criteria->with = array('user');
		
  		$floors=Floor::model()->findAll($criteria);
  		$arr = array();
  		$i=0;
    foreach($floors as $floor)
    {
        	   
        $arr[$i] = $floor->attributes;
        $i++;
    }

    print CJSON::encode(array(

            'floors' => $arr,
        ));
   		
	}
  
  }else{
  	echo 'pb1';
  }
  
  
  //echo CJSON::encode($device);
	
  Yii::app()->end();
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

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Floor;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
		//print_r('donnees: '.$_GET['datas']);
		//$datas=json_decode($_GET['datas'],true);
		$user = User::model()->find('LOGIN=:LOGIN',array(':LOGIN'=>$_GET['user']));
		$model->name=$_GET['name'];
		$model->user_id=$user->ID;
		$model->floor_id=$_GET['floor_id'];
		if($_GET['url']<>""){
			$model->path=$this->performGetImage($_GET['url']);	
		}
		
		//if(isset($_POST['Floor']))
		//{
			if($model->save())
				return "success:true";
				//$this->redirect(array('view','id'=>$model->id));
		//}

		//$this->render('create',array(
		//	'model'=>$model,
		//));
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
	$datas=json_decode($_GET['datas'],true);
		//if(isset($_POST['Floor']))
		//{
			print_r($datas);
			if($datas['linkimage']<>""){
			$model->path=$this->performGetImage($datas['linkimage']);
				unset($datas['path']);	
		}
			unset($datas['linkimage']);
			$model->attributes=$datas;
			print_r($model->attributes);
			if($model->save())
				echo "success:true";
		//}

		//$this->render('update',array(
		//	'model'=>$model,
		//));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDeleteFloor($id)
	{
		//echo 'id'.$id;
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		//if(!isset($_GET['ajax']))
		//	$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Floor');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Floor('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Floor']))
			$model->attributes=$_GET['Floor'];

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
		$model=Floor::model()->findByPk($id);
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
		if(isset($_POST['ajax']) && $_POST['ajax']==='floor-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
		/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performGetImage($url)
	{
		$ch = curl_init ($url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
    $raw=curl_exec($ch);
    curl_close ($ch);
	if(!$raw){
	
		return 'pb';
	}
    //if(file_exists($saveto)){
    //    unlink($saveto);
    //}
	$saveto='/myvera/resources/images/upload/'.uniqid().'.jpg';
    $fp = fopen('../..'.$saveto,'x');
    fwrite($fp, $raw);
    fclose($fp);
	return $saveto;
	}
}
