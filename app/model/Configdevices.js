Ext.define('myvera.model.Configdevices', {
	extend: 'Ext.data.Model',

	config: {
		//give the store some fields
		fields: [
			{name: 'id', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'state', type: 'int'},
			{name: 'room', type: 'int'},
			{name: 'category', type: 'int'},
			{name: 'subcategory', type: 'int'},
			{name: 'left', type: 'int'},
			{name: 'top', type: 'int'},
			{name: 'etage', type: 'int'},
			{name: 'icon', type: 'int'},
			{name: 'verif', type: 'string'},
			{name: 'sceneon', type: 'int'},
			{name: 'sceneoff', type: 'int'},
		],
		idProperty: 'id'
	}
});