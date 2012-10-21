Ext.define('myvera.view.PanelConfigFloor', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigFloor',
	requires: [
        'Ext.Img',
        'Ext.field.Text',
    ],
    
	config: {
		tpl: [
            ' ID:{id}<br/>Nom: {name}<br/><img src="{path}">'
        ],
		name:'PanelConfigFloor',
       scrollable: 'vertical',
        
        items: [       
   		{
        	xtype: 'textfield',
        	label: 'Floor Number',
        	id: 'floor_id',
        	name: 'floor_id'
        },{
        	xtype: 'textfield',
        	label: 'name',
        	id: 'name',
        	name: 'name'
        },
        {
        	xtype: 'textfield',
        	label: 'Url to the image',
        	id: 'linkimage',
        	name: 'linkimage'
        },{
        	xtype: 'textfield',
        	label: 'path',
        	id: 'path',
        	disabled: true,
        	name: 'path'
        },
        {
        	xtype: 'button',
        	text: 'Enregistrer',
        	handler: function(){
        		
        		
        		if(this.getParent().config.data){
        			this.getParent().config.data.name=Ext.getCmp('name').getValue();
        		this.getParent().config.data.path=Ext.getCmp('path').getValue();
        		this.getParent().config.data.linkimage=Ext.getCmp('linkimage').getValue();
        		var datas = Ext.encode(this.getParent().config.data);
        			Ext.Ajax.request({
    url: './remote/index.php/floor/Update/'+this.getParent().config.data.id,
    method: 'GET',
    params: {
    	datas: datas,
    	connexion: Ext.getCmp('selectconnexion').getValue(),
    	user:Ext.getCmp('login').getValue(),
    	password:Ext.getCmp('pass').getValue()
    },
    success: function(response){
        var text = response.responseText;
        alert('etage mis à jour');
        // process server response here
    }
});	
        		}else{
        			console.log('zzez');
        			Ext.Ajax.request({
    url: './remote/index.php/floor/Create/',
    method: 'GET',
    params: {
    	name: Ext.getCmp('name').getValue(),
    	connexion: Ext.getCmp('selectconnexion').getValue(),
    	url: Ext.getCmp('linkimage').getValue(),
    	floor_id: Ext.getCmp('floor_id').getValue(),
    	user:Ext.getCmp('login').getValue(),
    	password:Ext.getCmp('pass').getValue()
    },
    success: function(response){
        var text = response.responseText;
        alert('etage créé');
        var FloorsStore = Ext.getStore('FloorsStore');
		FloorsStore.getProxy().setExtraParam( 'connexion',  Ext.getCmp('selectconnexion').getValue());
		FloorsStore.getProxy().setExtraParam( 'user',  Ext.getCmp('login').getValue());
		FloorsStore.getProxy().setExtraParam( 'password',  Ext.getCmp('pass').getValue());
		FloorsStore.getProxy().setExtraParam( 'ipvera',  Ext.getCmp('ipvera').getValue());
		FloorsStore.getProxy().setExtraParam( 'serial',  Ext.getCmp('serial').getValue());
		FloorsStore.getProxy().setExtraParam( 'url',  Ext.getCmp('url').getValue());
		FloorsStore.load(function(floors) {
            var items = [];
            
            Ext.each(floors, function(floor) {
               /* if (!picture.get('image')) {
                    return;
                }
                */
                items.push({
                    xtype: 'dataplan',
                    style: 'background:url('+floor.data.path+') no-repeat left top;',
                    itemTpl: '<tpl if="etage=='+floor.data.floor_id+'">' + myvera.util.Templates.getTplplan() + '</tpl>'
                    
                });
            });
            //Ext.getCmp('carouselplan').add(new myvera.view.dataplan
            Ext.getCmp('carouselplan').setItems(items);
            Ext.getCmp('carouselplan').setActiveItem(0);
        });
        Ext.getCmp('PanelConfigFloorsNavigation').pop();
        // process server response here
    }
});	
        		}
        		
       	Ext.getStore('FloorsStore').load();
       	}
        },
                {
        	xtype: 'button',
        	text: 'Supprimer',
        	handler: function(){
        		
        		
        		if(this.getParent().config.data){
        			
        			Ext.Ajax.request({
    url: './remote/index.php/floor/DeleteFloor/'+this.getParent().config.data.id,
    method: 'GET',
    params: {
    	connexion: Ext.getCmp('selectconnexion').getValue(),
    	user:Ext.getCmp('login').getValue(),
    	password:Ext.getCmp('pass').getValue()
    },
    success: function(response){
        var text = response.responseText;
        // process server response here
    }
});	
        		}
        		
       	Ext.getStore('FloorsStore').load();
       	Ext.getCmp('PanelConfigFloorsNavigation').pop();
       	}
        }
        ],
        listeners:{
          updatedata:function(e,d){
          	Ext.getCmp('name').setValue(d.name);
          	Ext.getCmp('floor_id').setValue(d.floor_id);
          	Ext.getCmp('path').setValue(d.path);
          }}
        
      
    }
});