<?php
/* @var $this DeviceController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Devices',
);

$this->menu=array(
	array('label'=>'Create Device', 'url'=>array('create')),
	array('label'=>'Manage Device', 'url'=>array('admin')),
);
?>

<h1>Devices</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
