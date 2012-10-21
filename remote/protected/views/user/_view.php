<?php
/* @var $this UserController */
/* @var $data User */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('ID')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->ID), array('view', 'id'=>$data->ID)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('LOGIN')); ?>:</b>
	<?php echo CHtml::encode($data->LOGIN); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('IDBOX')); ?>:</b>
	<?php echo CHtml::encode($data->IDBOX); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('URL')); ?>:</b>
	<?php echo CHtml::encode($data->URL); ?>
	<br />


</div>