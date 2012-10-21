Ext.define('myvera.view.PanelConfigItem', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigItem',
	requires: [
        'Ext.Img',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.field.Toggle'
    ],
	config: {
		name:'PanelConfigItem',
        //title: 'Details',
        //styleHtmlContent: true,
        scrollable: 'vertical',
         tpl: [
            '<img src="resources/images/{iconURL}"> ID:{id}<br/>Nom: {name}'
        ],
        items: [
        {
   			xtype: 'togglefield',
   			name: 'active',
   			id: 'active',
   			label: 'Activé'
   		},
   		{
   			xtype: 'selectfield',
   			name: 'etage',
   			id: 'etage',
   			label: 'Etage',
   			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'floor_id'
   		},
   		{
        	xtype: 'textfield',
        	label: 'Position gauche',
        	id: 'gauche',
        	name: 'gauche'
        },
        {
        	xtype: 'textfield',
        	label: 'Position haut',
        	id: 'haut',
        	name: 'haut'
        },
        {
        	xtype: 'button',
        	text: 'definir l\'emplacement',
        	handler: function(){
        		Ext.getCmp('PanelConfigNavigation').push({
            xtype: 'PanelImage',
            title: 'Detail',
            data: Ext.getCmp('etage').getValue()
        });        		
       	}
        },
        {
        	xtype: 'button',
        	text: 'Enregistrer',
        	handler: function(){
        		
        		this.getParent().config.data.top=Ext.getCmp('haut').getValue();
        		this.getParent().config.data.left=Ext.getCmp('gauche').getValue();
        		this.getParent().config.data.active=Ext.getCmp('active').getValue();
        		this.getParent().config.data.etage=Ext.getCmp('etage').getValue();
        		var datas = Ext.encode(this.getParent().config.data);
        		
        		Ext.Ajax.request({
    url: './remote/index.php/device/SaveDevices/',
    method: 'GET',
    params: {
    	datas: datas,
    	connexion: Ext.getCmp('selectconnexion').getValue(),
    	ipvera: Ext.getCmp('ipvera').getValue(),
    	serial: Ext.getCmp('serial').getValue(),
    	url: Ext.getCmp('url').getValue(),
    	user:Ext.getCmp('login').getValue(),
    	password:Ext.getCmp('pass').getValue()
    },
    success: function(response){
        var text = response.responseText;
        alert("Device créé");
        Ext.getCmp('PanelConfigNavigation').pop();
        // process server response here
    }
});	
       	Ext.getStore('devicesStore').load();
       	}
        }
        ],
        listeners:{
          painted:function(e,d){
          	if(Ext.getCmp('etage').getValue()==""){
          		Ext.getCmp('etage').setValue(1);	
          	}else{
          		Ext.getCmp('etage').setValue(e.config.data.etage);	
          	}
          	Ext.getCmp('haut').setValue(e.config.data.top);
          	Ext.getCmp('gauche').setValue(e.config.data.left);
          	
          	Ext.getCmp('active').setValue(e.config.data.active);
          }}
      
    }
});