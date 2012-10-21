Ext.define('myvera.model.Floors', {
    extend: 'Ext.data.Model',

    config: {
            //give the store some fields
            fields: [
	            {name: 'id',  type: 'int'},
		    {name: 'user_id',   type: 'int'},
		    {name: 'floor_id',  type: 'int'},
		    {name: 'name',  type: 'string'},
		    {name: 'path',  type: 'string'}
		    ],
	    idProperty: 'id'
    }
    });