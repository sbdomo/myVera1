Ext.define('myvera.controller.Application', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.DataView'],

	config: {
		views: ['Main','carouselplan','HomePanel','PanelConfig', 'datalist','panelinfo','dataliston','datalistoff','listclock','paneloverlay'],
		stores: ['devicesStore', 'storeRooms'],
		models: ['Veradevices', 'modelRooms','CurrentUser'],
		
		panel3d: null,
		
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
		
		// HomePanel creation
		var homepanel = Ext.getCmp('homepanel');
		homepanel.getTabBar().hide();
		var orientation = Ext.Viewport.getOrientation();
		if (orientation == "landscape") {
			homepanel.setActiveItem(Ext.getCmp('carouselplan'));
		} else {
			homepanel.setActiveItem(Ext.getCmp('datalist'));
		}
		
		// PanelOverlay creation and hide
		var paneloverlay = Ext.create('myvera.view.paneloverlay');
		Ext.Viewport.add(paneloverlay);
		paneloverlay.hide();
	},
	onOrientationchange: function(viewport, orientation, width, height) {
		var homepanel = Ext.getCmp('homepanel');
		console.log('orientationchange : ' + homepanel.id);
		if (orientation == "landscape") {
			if (homepanel.getActiveItem().id == 'datalist') {
				homepanel.setActiveItem(Ext.getCmp('carouselplan'));
			}
		} else {
			if (homepanel.getActiveItem().id == 'carouselplan') {
				homepanel.setActiveItem(Ext.getCmp('datalist'));
			}
		}
	}
});
