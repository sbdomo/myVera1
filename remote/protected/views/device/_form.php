<?php
/* @var $this DeviceController */
/* @var $model Device */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'device-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'user_id'); ?>
		<?php echo $form->textField($model,'user_id'); ?>
		<?php echo $form->error($model,'user_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'id_device'); ?>
		<?php echo $form->textField($model,'id_device'); ?>
		<?php echo $form->error($model,'id_device'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'name'); ?>
		<?php echo $form->textField($model,'name',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'status'); ?>
		<?php echo $form->textField($model,'status'); ?>
		<?php echo $form->error($model,'status'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'state'); ?>
		<?php echo $form->textField($model,'state'); ?>
		<?php echo $form->error($model,'state'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'room'); ?>
		<?php echo $form->textField($model,'room'); ?>
		<?php echo $form->error($model,'room'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'level'); ?>
		<?php echo $form->textField($model,'level'); ?>
		<?php echo $form->error($model,'level'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'category'); ?>
		<?php echo $form->textField($model,'category'); ?>
		<?php echo $form->error($model,'category'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'subcategory'); ?>
		<?php echo $form->textField($model,'subcategory'); ?>
		<?php echo $form->error($model,'subcategory'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'left'); ?>
		<?php echo $form->textField($model,'left'); ?>
		<?php echo $form->error($model,'left'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'top'); ?>
		<?php echo $form->textField($model,'top'); ?>
		<?php echo $form->error($model,'top'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'etage'); ?>
		<?php echo $form->textField($model,'etage'); ?>
		<?php echo $form->error($model,'etage'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'tripped'); ?>
		<?php echo $form->textField($model,'tripped'); ?>
		<?php echo $form->error($model,'tripped'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'icon'); ?>
		<?php echo $form->textField($model,'icon'); ?>
		<?php echo $form->error($model,'icon'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'verif'); ?>
		<?php echo $form->textField($model,'verif',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'verif'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'temperature'); ?>
		<?php echo $form->textField($model,'temperature'); ?>
		<?php echo $form->error($model,'temperature'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'sceneon'); ?>
		<?php echo $form->textField($model,'sceneon'); ?>
		<?php echo $form->error($model,'sceneon'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'sceneoff'); ?>
		<?php echo $form->textField($model,'sceneoff'); ?>
		<?php echo $form->error($model,'sceneoff'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'var1'); ?>
		<?php echo $form->textField($model,'var1',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'var1'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'var2'); ?>
		<?php echo $form->textField($model,'var2',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'var2'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'var3'); ?>
		<?php echo $form->textField($model,'var3',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'var3'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'var4'); ?>
		<?php echo $form->textField($model,'var4',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'var4'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'var5'); ?>
		<?php echo $form->textField($model,'var5',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'var5'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'var6'); ?>
		<?php echo $form->textField($model,'var6',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'var6'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'active'); ?>
		<?php echo $form->textField($model,'active'); ?>
		<?php echo $form->error($model,'active'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->