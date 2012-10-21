<?php
/* @var $this DeviceController */
/* @var $model Device */

$this->breadcrumbs=array(
	'Devices'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List Device', 'url'=>array('index')),
	array('label'=>'Create Device', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('device-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Devices</h1>

<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'device-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'id',
		'user_id',
		'id_device',
		'name',
		'status',
		'state',
		/*
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
		*/
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
