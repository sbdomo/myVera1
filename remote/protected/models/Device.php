<?php

/**
 * This is the model class for table "Device".
 *
 * The followings are the available columns in table 'Device':
 * @property integer $id
 * @property integer $user_id
 * @property integer $id_device
 * @property string $name
 * @property integer $status
 * @property integer $state
 * @property integer $room
 * @property integer $level
 * @property integer $category
 * @property integer $subcategory
 * @property integer $left
 * @property integer $top
 * @property integer $etage
 * @property integer $tripped
 * @property integer $icon
 * @property string $verif
 * @property double $temperature
 * @property integer $sceneon
 * @property integer $sceneoff
 * @property string $var1
 * @property string $var2
 * @property string $var3
 * @property string $var4
 * @property string $var5
 * @property string $var6
 * @property integer $active
 *
 * The followings are the available model relations:
 * @property User $user
 */
class Device extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Device the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'Device';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id, id_device, name, status, state, room, level, category, subcategory, left, top, etage, tripped, icon, verif, temperature, sceneon, sceneoff, var1, var2, var3, var4, var5, var6, active', 'required'),
			array('user_id, id_device, status, state, room, level, category, subcategory, left, top, etage, tripped, icon, sceneon, sceneoff, active', 'numerical', 'integerOnly'=>true),
			array('temperature', 'numerical'),
			array('name, var1, var2, var3, var4, var5, var6', 'length', 'max'=>50),
			array('verif', 'length', 'max'=>10),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, user_id, id_device, name, status, state, room, level, category, subcategory, left, top, etage, tripped, icon, verif, temperature, sceneon, sceneoff, var1, var2, var3, var4, var5, var6, active', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'user' => array(self::BELONGS_TO, 'User', 'user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'user_id' => 'User',
			'id_device' => 'Id Device',
			'name' => 'Name',
			'status' => 'Status',
			'state' => 'State',
			'room' => 'Room',
			'level' => 'Level',
			'category' => 'Category',
			'subcategory' => 'Subcategory',
			'left' => 'Left',
			'top' => 'Top',
			'etage' => 'Etage',
			'tripped' => 'Tripped',
			'icon' => 'Icon',
			'verif' => 'Verif',
			'temperature' => 'Temperature',
			'sceneon' => 'Sceneon',
			'sceneoff' => 'Sceneoff',
			'var1' => 'Var1',
			'var2' => 'Var2',
			'var3' => 'Var3',
			'var4' => 'Var4',
			'var5' => 'Var5',
			'var6' => 'Var6',
			'active' => 'Active',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('id_device',$this->id_device);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('status',$this->status);
		$criteria->compare('state',$this->state);
		$criteria->compare('room',$this->room);
		$criteria->compare('level',$this->level);
		$criteria->compare('category',$this->category);
		$criteria->compare('subcategory',$this->subcategory);
		$criteria->compare('left',$this->left);
		$criteria->compare('top',$this->top);
		$criteria->compare('etage',$this->etage);
		$criteria->compare('tripped',$this->tripped);
		$criteria->compare('icon',$this->icon);
		$criteria->compare('verif',$this->verif,true);
		$criteria->compare('temperature',$this->temperature);
		$criteria->compare('sceneon',$this->sceneon);
		$criteria->compare('sceneoff',$this->sceneoff);
		$criteria->compare('var1',$this->var1,true);
		$criteria->compare('var2',$this->var2,true);
		$criteria->compare('var3',$this->var3,true);
		$criteria->compare('var4',$this->var4,true);
		$criteria->compare('var5',$this->var5,true);
		$criteria->compare('var6',$this->var6,true);
		$criteria->compare('active',$this->active);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}