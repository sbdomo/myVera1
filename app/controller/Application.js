Ext.define('myvera.controller.Application', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.DataView'],

	config: {
		views: ['Main','carouselplan','HomePanel', 'PanelConfig', 'PanelConfigGenerale', 'PanelConfigFloorsNavigation', 'PanelConfigNavigation', 'PanelConfigRoomsNavigation', 'datalist','panelinfo','dataliston','datalistoff','listclock','paneloverlay'],
		stores: ['ConfigDevicesStore', 'devicesStore', 'FloorsStore', 'ConfigScenesStore'],
		models: ['Veradevices', 'Configdevices', 'modelRooms','CurrentUser', 'Floors', 'Configscenes'],
		
		panel3d: true,
		
		refs: {
		},
		control: {
			'viewport': {
				//capture the orientation change event
				orientationchange: 'onOrientationchange'
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
		
		//if (Ext.os.is.Android) {
			        var height = Ext.Viewport.getWindowHeight();
				var width = Ext.Viewport.getWindowWidth();
				if(width > height){
					orientation = 'landscape';
				} else {
					orientation = 'portrait';
				}
		//}
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
		//comment mettre this.panel3d plutôt que this.getApplication().getController('Application').getPanel3d() ?
		if(this.getApplication().getController('Application').getPanel3d()==true) {
			//if (Ext.os.is.Android) {
				if(width > height){
					orientation = 'landscape';
				} else {
					orientation = 'portrait';
				}
			//}
			var homepanel = Ext.getCmp('homepanel');
			console.log('orientationchange : ' + homepanel.id);
			if(orientation=="landscape") {
				if(homepanel.getActiveItem().id=='datalist') homepanel.setActiveItem(Ext.getCmp('carouselplan'));
			} else {
				if(homepanel.getActiveItem().id=='carouselplan') homepanel.setActiveItem(Ext.getCmp('datalist'));
			}
		}
	}
});
