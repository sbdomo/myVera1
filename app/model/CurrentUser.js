Ext.define('myvera.model.CurrentUser', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'ipvera', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'pass', type: 'string'},
			{name: 'isVue', type: 'boolean', defaultValue: true},
			{name: 'isReveil', type: 'boolean', defaultValue: true}
		],

		proxy: {
			type: 'localstorage',
			id: 'login-data'
		}
	}
});
