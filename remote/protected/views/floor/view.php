<?php
/* @var $this FloorController */
/* @var $model Floor */

$this->breadcrumbs=array(
	'Floors'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Floor', 'url'=>array('index')),
	array('label'=>'Create Floor', 'url'=>array('create')),
	array('label'=>'Update Floor', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Floor', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Floor', 'url'=>array('admin')),
);
?>

<h1>View Floor #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'user_id',
		'floor_id',
		'name',
		'path',
	),
)); ?>
