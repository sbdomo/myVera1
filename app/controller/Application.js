Ext.define('myvera.controller.Application', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.DataView','Ext.data.JsonP'],

	config: {
		views: ['Main','carouselplan','PanelImage','PanelConfigNavigation','PanelConfigFloorsNavigation','PanelConfigGenerale','HomePanel','PanelConfig','PanelLogin','datalist','panelinfo','dataliston','datalistoff','listclock','paneloverlay'],
		stores: ['ConfigDevicesStore','devicesStore', 'storeRooms','FloorsStore'],
		models: ['ConfigDevices','Veradevices', 'modelRooms','CurrentUser','Floors'],
		
		refs: {
			main: 'PanelConfigNavigation',
			mainFloors: 'PanelConfigFloorsNavigation',
			PanelConfigItem: 'PanelConfigItem'
		},
		control: {
			'viewport': {
				//capture the orientation change event
				orientationchange: 'onOrientationchange'
			},
			'PanelConfigItems': {
                disclose: 'showDetail'
           },
           'PanelConfigFloors': {
                disclose: 'showDetail'
            }
		}
	},
	// called when the Application is launched, remove if not needed
	launch: function(app) {
		this.initViewport();

	},
	initViewport: function() {
		Ext.Viewport.add(Ext.create('myvera.view.Main'));
		Ext.getCmp('homepanel').getTabBar().hide();
		var orientation = Ext.Viewport.getOrientation();
		if(orientation=="landscape") {
			Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
		} else {
			Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('datalist'));
		}
		Ext.Viewport.add(Ext.create('myvera.view.paneloverlay'));
		Ext.getCmp('paneloverlay').hide();
	},
	onOrientationchange: function(viewport, orientation, width, height) {
		//var activeItem = viewport.getActiveItem().id;
		
		//var homepanel = viewport.getAt(0).getAt(0);
		var homepanel = Ext.getCmp('homepanel');
		//var carousel =Ext.get('carouselplan').getActiveItem().id;
		console.log('orientationchange : ' + homepanel.id);		
		if(orientation=="landscape") {
			if(homepanel.getActiveItem().id=='datalist') homepanel.setActiveItem(Ext.getCmp('carouselplan'));
		} else {
			if(homepanel.getActiveItem().id=='carouselplan') homepanel.setActiveItem(Ext.getCmp('datalist'));
		}
	   },
	showDetail: function(list, record) {
       if(list.id=="PanelConfigItems"){
       	this.getMain().push({
            xtype: 'PanelConfigItem',
            title: 'Detail',
            data: record.getData()
        });
       }else{
       	Ext.getCmp('PanelConfigFloorsNavigation').push({
            xtype: 'PanelConfigFloor',
            title: 'Detail',
            data: record.getData()
        });
       }
        
       // PanelConfigItem.setRecord(record);
   }
   
});
