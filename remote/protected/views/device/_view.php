<?php
/* @var $this DeviceController */
/* @var $data Device */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('user_id')); ?>:</b>
	<?php echo CHtml::encode($data->user_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('id_device')); ?>:</b>
	<?php echo CHtml::encode($data->id_device); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('name')); ?>:</b>
	<?php echo CHtml::encode($data->name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('status')); ?>:</b>
	<?php echo CHtml::encode($data->status); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('state')); ?>:</b>
	<?php echo CHtml::encode($data->state); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('room')); ?>:</b>
	<?php echo CHtml::encode($data->room); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('level')); ?>:</b>
	<?php echo CHtml::encode($data->level); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('category')); ?>:</b>
	<?php echo CHtml::encode($data->category); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('subcategory')); ?>:</b>
	<?php echo CHtml::encode($data->subcategory); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('left')); ?>:</b>
	<?php echo CHtml::encode($data->left); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('top')); ?>:</b>
	<?php echo CHtml::encode($data->top); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('etage')); ?>:</b>
	<?php echo CHtml::encode($data->etage); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('tripped')); ?>:</b>
	<?php echo CHtml::encode($data->tripped); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('icon')); ?>:</b>
	<?php echo CHtml::encode($data->icon); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('verif')); ?>:</b>
	<?php echo CHtml::encode($data->verif); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('temperature')); ?>:</b>
	<?php echo CHtml::encode($data->temperature); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('sceneon')); ?>:</b>
	<?php echo CHtml::encode($data->sceneon); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('sceneoff')); ?>:</b>
	<?php echo CHtml::encode($data->sceneoff); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('var1')); ?>:</b>
	<?php echo CHtml::encode($data->var1); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('var2')); ?>:</b>
	<?php echo CHtml::encode($data->var2); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('var3')); ?>:</b>
	<?php echo CHtml::encode($data->var3); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('var4')); ?>:</b>
	<?php echo CHtml::encode($data->var4); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('var5')); ?>:</b>
	<?php echo CHtml::encode($data->var5); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('var6')); ?>:</b>
	<?php echo CHtml::encode($data->var6); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('active')); ?>:</b>
	<?php echo CHtml::encode($data->active); ?>
	<br />

	*/ ?>

</div>