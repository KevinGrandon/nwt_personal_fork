nwt.register({

	name: 'BootstrapCollapse',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(collapse)/, this.collapse);
		},

		collapse: function(el) {

			console.log('Got collapse request', el);
			var collapseGroup = el.ancestor('.accordion-group'),
				body = collapseGroup.one('.accordion-body');

			// If we are expanded, collapse and return
			if (parseInt(body.getStyle('height'), 10) !== 0) {
				body.setStyle('height', '0px');
				return;
			}

			// Shrink all others in the accordian
			body.ancestor('.accordion').all('.collapse').setStyle('height', '0px');

			body.setStyle('height', 'auto');
		}
	}
});
nwt.plugin('BootstrapCollapse');