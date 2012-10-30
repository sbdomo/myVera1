Ext.define('myvera.view.PanelConfigFloor', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigFloor',
	requires: [
        'Ext.Img',
        'Ext.field.Text'
    ],
    
	config: {
		tpl: [ '<div style="text-align:center"><img style="width:450px" src="./resources/config/img/{path}"></div>' ],
		name:'PanelConfigFloor',
		//styleHtmlContent: true,
		scrollable: 'vertical',
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigFloor',
		},
		{
			xtype: 'textfield',
			label: 'Nom',
			id: 'name',
			name: 'name'
		},
		{
			xtype: 'textfield',
			label: 'Url de l\'image',
			id: 'linkimage',
			name: 'linkimage'
		},{
			xtype: 'textfield',
			label: 'Image',
			id: 'path',
			disabled: true,
			name: 'path'
		},
		{
			xtype: 'button',
			text: 'Ajouter',
			ui: 'confirm',
			iconCls: 'add',
			iconMask: true,
			margin: 5,
			name: 'savefloor',
			itemId: 'savefloor'
		},
                {
			xtype: 'button',
			text: 'Supprimer',
			margin: 5,
			iconCls: 'trash',
			iconMask: true,
			hidden: true,
			name: 'deletefloor',
			itemId: 'deletefloor'
		}
		],
		listeners:{
			updatedata:function(e,d){
				var label = e.down('#titlePanelConfigFloor');
				var html = d.name + ' - ID: ' + d.id;
				label.setHtml(html);
				e.down('#deletefloor').show();
				e.down('#savefloor').setIconCls('refresh');
				e.down('#savefloor').setText('Mettre à jour');
				Ext.getCmp('name').setValue(d.name);
				Ext.getCmp('path').setValue(d.path);
			}
		}
		
	}
});