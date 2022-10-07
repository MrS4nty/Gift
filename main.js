(function() {
	var $body = document.body
	, $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

	if ( typeof $menu_trigger !== 'undefined' ) {
		$menu_trigger.addEventListener('click', function() {
			$body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
		});
	}

}).call(this);

// SubMenus

const mostrar1 = () => {
  if(document.querySelector(".submenucontent").classList.contains("ocultar")){
     document.querySelector(".submenucontent").classList.remove("ocultar");
  } else {
     document.querySelector(".submenucontent").classList.add("ocultar");
  }
}

const mostrar2 = () => {
  if(document.querySelector(".submenucontent2").classList.contains("ocultar")){
     document.querySelector(".submenucontent2").classList.remove("ocultar");
  } else {
     document.querySelector(".submenucontent2").classList.add("ocultar");
  }
}
