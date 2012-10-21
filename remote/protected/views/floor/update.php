<?php
/* @var $this FloorController */
/* @var $model Floor */

$this->breadcrumbs=array(
	'Floors'=>array('index'),
	$model->name=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Floor', 'url'=>array('index')),
	array('label'=>'Create Floor', 'url'=>array('create')),
	array('label'=>'View Floor', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Floor', 'url'=>array('admin')),
);
?>

<h1>Update Floor <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>