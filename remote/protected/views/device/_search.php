<?php
/* @var $this DeviceController */
/* @var $model Device */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'id'); ?>
		<?php echo $form->textField($model,'id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'user_id'); ?>
		<?php echo $form->textField($model,'user_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'id_device'); ?>
		<?php echo $form->textField($model,'id_device'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'name'); ?>
		<?php echo $form->textField($model,'name',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'status'); ?>
		<?php echo $form->textField($model,'status'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'state'); ?>
		<?php echo $form->textField($model,'state'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'room'); ?>
		<?php echo $form->textField($model,'room'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'level'); ?>
		<?php echo $form->textField($model,'level'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'category'); ?>
		<?php echo $form->textField($model,'category'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'subcategory'); ?>
		<?php echo $form->textField($model,'subcategory'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'left'); ?>
		<?php echo $form->textField($model,'left'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'top'); ?>
		<?php echo $form->textField($model,'top'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'etage'); ?>
		<?php echo $form->textField($model,'etage'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'tripped'); ?>
		<?php echo $form->textField($model,'tripped'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'icon'); ?>
		<?php echo $form->textField($model,'icon'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'verif'); ?>
		<?php echo $form->textField($model,'verif',array('size'=>10,'maxlength'=>10)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'temperature'); ?>
		<?php echo $form->textField($model,'temperature'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'sceneon'); ?>
		<?php echo $form->textField($model,'sceneon'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'sceneoff'); ?>
		<?php echo $form->textField($model,'sceneoff'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'var1'); ?>
		<?php echo $form->textField($model,'var1',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'var2'); ?>
		<?php echo $form->textField($model,'var2',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'var3'); ?>
		<?php echo $form->textField($model,'var3',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'var4'); ?>
		<?php echo $form->textField($model,'var4',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'var5'); ?>
		<?php echo $form->textField($model,'var5',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'var6'); ?>
		<?php echo $form->textField($model,'var6',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'active'); ?>
		<?php echo $form->textField($model,'active'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->