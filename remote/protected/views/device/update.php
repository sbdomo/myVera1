<?php
/* @var $this DeviceController */
/* @var $model Device */

$this->breadcrumbs=array(
	'Devices'=>array('index'),
	$model->name=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Device', 'url'=>array('index')),
	array('label'=>'Create Device', 'url'=>array('create')),
	array('label'=>'View Device', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Device', 'url'=>array('admin')),
);
?>

<h1>Update Device <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>