<?php
/* @var $this DeviceController */
/* @var $model Device */

$this->breadcrumbs=array(
	'Devices'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Device', 'url'=>array('index')),
	array('label'=>'Manage Device', 'url'=>array('admin')),
);
?>

<h1>Create Device</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>