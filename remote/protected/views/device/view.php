<?php
/* @var $this DeviceController */
/* @var $model Device */

$this->breadcrumbs=array(
	'Devices'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Device', 'url'=>array('index')),
	array('label'=>'Create Device', 'url'=>array('create')),
	array('label'=>'Update Device', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Device', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Device', 'url'=>array('admin')),
);
?>

<h1>View Device #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'user_id',
		'id_device',
		'name',
		'status',
		'state',
		'room',
		'level',
		'category',
		'subcategory',
		'left',
		'top',
		'etage',
		'tripped',
		'icon',
		'verif',
		'temperature',
		'sceneon',
		'sceneoff',
		'var1',
		'var2',
		'var3',
		'var4',
		'var5',
		'var6',
		'active',
	),
)); ?>
