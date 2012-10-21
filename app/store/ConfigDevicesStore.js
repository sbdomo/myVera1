Ext.define('myvera.store.ConfigDevicesStore', {
    extend: 'Ext.data.Store',
    requires: ['myvera.model.ConfigDevices'],
	config: {   
    model: 'myvera.model.ConfigDevices',
    storeId: 'ConfigDevicesStore',
	    sorters: [
//	    {
//		    property : 'etage',
//		    direction: 'ASC'
//	    },
	    {
		    property : 'room',
		    direction: 'ASC'
	    },
	    {
		    property : 'name',
		    direction: 'ASC'
	    }
	    ],
            grouper: {
                groupFn: function(record) {
			var roomname=record.get('room');
			var roomsection="0"
			if(Ext.getStore('Rooms').getById(record.get('room'))) {
				roomname=Ext.getStore('Rooms').getById(record.get('room')).get('name');
				roomsection=Ext.getStore('Rooms').getById(record.get('room')).get('section');
			}
			
			return '<div class="head'+ roomsection + '">' + roomname + '</div>';
			//return '<div class="head'+ record.get('etage') + '">' + roomname + '</div>';
                }
            },
            //sorters: 'name',

            //autoload the data from the server
//            autoLoad: true,
//	    listeners: {
//		    load: function(store) {
//		    	Ext.Msg.alert('Test',Ext.getStore('devplan1Store').getById(35).get('name'))
			    //store.each(function(record) {
			    //                    });
//		    }
//	    },
	    //setup the proxy for the store to use an ajax proxy and give it a url to load
	    //the local contacts.json file
	    proxy: {
		    type: 'ajax',
		    url: './remote/index.php/device/JsonDevicesConfig/',
		    reader: {
			    type: 'json',
			    rootProperty: 'devices'
		    }
	    }
    }
}
);