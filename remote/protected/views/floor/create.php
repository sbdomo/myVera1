<?php
/* @var $this FloorController */
/* @var $model Floor */

$this->breadcrumbs=array(
	'Floors'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Floor', 'url'=>array('index')),
	array('label'=>'Manage Floor', 'url'=>array('admin')),
);
?>

<h1>Create Floor</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>