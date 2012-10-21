<?php

/**
 * This is the model class for table "User".
 *
 * The followings are the available columns in table 'User':
 * @property integer $ID
 * @property string $LOGIN
 * @property string $IDBOX
 * @property string $IPVERA
 * @property string $URL
 *
 * The followings are the available model relations:
 * @property Device[] $devices
 */
class User extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return User the static model class
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
		return 'User';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('LOGIN, IDBOX, URL', 'required'),
			array('LOGIN', 'length', 'max'=>200),
			array('IDBOX', 'length', 'max'=>20),
			array('IPVERA', 'length', 'max'=>20),
			array('URL', 'length', 'max'=>150),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('ID, LOGIN, IDBOX, URL', 'safe', 'on'=>'search'),
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
			'devices' => array(self::HAS_MANY, 'Device', 'user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'ID' => 'ID',
			'LOGIN' => 'Login',
			'IDBOX' => 'Idbox',
			'IPVERA' => 'Ipvera',
			'URL' => 'Url',
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

		$criteria->compare('ID',$this->ID);
		$criteria->compare('LOGIN',$this->LOGIN,true);
		$criteria->compare('IDBOX',$this->IDBOX,true);
		$criteria->compare('URL',$this->URL,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}