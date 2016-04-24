$(document).ready(function() {

	if ($(window).scrollTop()===0){
		$('#main-nav').removeClass('scrolled');
	}
	else{
		$('#main-nav').addClass('scrolled');    
	}

	$(window).scroll(function(){
		if ($(window).scrollTop()===0){
			$('#main-nav').removeClass('scrolled');
		}
		else{
			$('#main-nav').addClass('scrolled');    
		}
	});
	
	$("#home .text-col h1").fitText(0.9, { minFontSize: '38px', maxFontSize: '63px' });
	$("#home .text-col p").fitText(1.2, { minFontSize: '18px', maxFontSize: '32px' });
	
	if($('#home .imac-screen').length){
		$('.imac-screen img').load(function(){
			$('#home .text-col h1, #home .text-col p, #home .imac-frame').addClass('in');
		});
	}else{
		$('#home .text-col h1, #home .text-col p').addClass('in');
	}

	$('a.scrollto').click(function(e){
		$('html,body').scrollTo(this.hash, this.hash, {gap:{y:-50},animation:  {easing: 'easeInOutCubic', duration: 1600}});
		e.preventDefault();

		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});

	$("[data-toggle='tooltip']").tooltip();

	$('.scrollimation').waypoint(function(){
		$(this).addClass('in');
	},{offset:function(){
			var h = $(window).height();
			var elemh = $(this).outerHeight();
			if ( elemh > h*0.3){
				return h*0.7;
			}else{
				return h - elemh;
			}
		}
	});

	$(window).resize(function(){
		scrollSpyRefresh();
		waypointsRefresh();
	});

	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}

	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}

});	