<?php
/* @var $this UserController */
/* @var $model User */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'user-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'LOGIN'); ?>
		<?php echo $form->textField($model,'LOGIN',array('size'=>60,'maxlength'=>200)); ?>
		<?php echo $form->error($model,'LOGIN'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'IDBOX'); ?>
		<?php echo $form->textField($model,'IDBOX',array('size'=>20,'maxlength'=>20)); ?>
		<?php echo $form->error($model,'IDBOX'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'URL'); ?>
		<?php echo $form->textField($model,'URL',array('size'=>60,'maxlength'=>150)); ?>
		<?php echo $form->error($model,'URL'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->