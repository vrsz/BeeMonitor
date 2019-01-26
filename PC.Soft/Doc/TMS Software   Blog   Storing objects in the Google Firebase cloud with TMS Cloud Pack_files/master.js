var touchStartPos;
var manualChange = false;

$(function() {

  // PARAMETERS
  //
  // Variabele 1: snelheid dot bij losstaande knoppen (bvb 'Discover more')
  // Variabele 2: snelheid dot bij de panelen
  // Variabele 3: snelheid gekleurd vlak bij hover over panelen
  // Variabele 4: Snelheid overgang bij hover hoofdmenu-items
  //
  setSpeedParameters(0.2, 0.4, 0.2, 0.6);

  var isTouch =  !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;
  if( !isTouch ){
    $('html').addClass('no-touch');
  } else {
    $('.panel.tms-product').click(function(e){
      var panel = $(this);
      if(!panel.hasClass('active'))
        setTimeout(function(){
          panel.addClass('active');
        }, 10);
      $('.panel.tms-product').removeClass('active');
    });
  }

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var trident = ua.indexOf('Trident/');
  var edge = ua.indexOf('Edge/');
  if (msie > 0 || trident > 0 || edge > 0) {
    $('body').append('<link rel="stylesheet" type="text/css" href="css/ie.css">');
  }

  $('.tms-btn-back').click(hideSideMenu);
  $('.tms-btn-next').click(showSideMenu);
  $('.tms-quicklinks-container a.btn-block').click(toggleQuicklinks);
  $('html').click(hideQuicklinks);
  $(document).bind('touchstart', function(e){ touchStartPos = $(window).scrollTop(); }).on('touchend', hideQuicklinksMob);
  $('.nav-main .nav-search').click(checkForm);

  if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  	$('.sticky').stick_in_parent({offset_top: 120, recalc_every:10});
    $('.sticky').on('sticky_kit:bottom', function(e) {
      $(this).parent().css('position', 'static');
    }).on('sticky_kit:unbottom', function(e) {
      $(this).parent().css('position', 'relative');
    });
  }

  resizeWindow(null);
});

function offsetAnchor() {
  if(location.hash.length !== 0) {
      window.scrollTo(0, $(location.hash).offset().top - 100);
  }
}

$(window).on("hashchange", function () {
  setTimeout(offsetAnchor, 10);
});

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    setTimeout(offsetAnchor, 10);
  });
});

window.setTimeout(function() {
  offsetAnchor();
}, 1);

function checkForm(e) {
  e.preventDefault();
  if(!$('.nav-main .nav-search').hasClass('active')){
    e.preventDefault();
    $('.nav-main .nav-search').addClass('active');
    $('.nav-main .nav-search input').focus();
  } else {
    $('.nav-main .nav-search').submit();
  }
  setTimeout(function () {
  if(!$('.nav-main .nav-search').hasClass('active')){
    e.preventDefault();
    $('.nav-main .nav-search').addClass('active');
    $('.nav-main .nav-search input').focus();
  } else {
    $('.nav-main .nav-search').submit();
  }}, 10);
}

function hideSideMenu(e) {
  $('aside').hide();
  $('.has-side').removeClass('col-md-9').removeClass('col-sm-8').addClass('col-sm-12');
  $('.tms-btn-next').show();
  manualChange = true;
  setTimeout(function () {
    $(document.body).trigger("sticky_kit:recalc");
  });
}

function showSideMenu(e) {
  $('aside').show();
  $('.has-side').removeClass('col-md-12').addClass('col-md-9').addClass('col-sm-8');
  $('.tms-btn-next').hide();
  manualChange = false;
  setTimeout(function () {
    $(document.body).trigger("sticky_kit:recalc");
  });
}

function toggleQuicklinks(e) {
  e.preventDefault();
  if($('.tms-quicklinks').hasClass('active')){
    $('.tms-quicklinks').removeClass('active');
  } else {
    setTimeout(function () {
      $('.tms-quicklinks').addClass('active');
    }, 10);
  }
}

function hideQuicklinks(e) {
  setTimeout(function () {
    $('.nav-main .nav-search').removeClass('active');
    $('.tms-quicklinks').removeClass('active');
  }, 5);
}

function hideQuicklinksMob(e) {
  var $target = $(e.target);
  var $myElement = $(".tms-quicklinks");
  if ($target.is($myElement) || $target.parents().is($myElement)){
  } else {
    var distance = touchStartPos - $(window).scrollTop();
    if (distance > 20 || distance < -20){

    } else {
      setTimeout(function () {
        $('.nav-main .nav-search').removeClass('active');
        $('.tms-quicklinks').removeClass('active');
      }, 5);
    }
  }
}

function setSpeedParameters(param1, param2, param3, param4){
  $('.tms-btn-dot').css('transition', param1 + 's bottom');
  $('.tms-panel-border').css('transition', param2 + 's height');
  $('.panel .tms-btn-dot').css('transition', param2 + 's bottom');
  $('.tms-panel-hidden').css('transition', param3 + 's margin');
  $('.nav-main .navbar-nav>li>a, .nav-main .nav-search').css('transition', param4 + 's background');
  $('.tms-side-menu .tms-side-title .tms-btn-dot').css('transition', param2 + 's bottom');
}

function resizeWindow(e) {
  winW = 630;
  if (document.body && document.body.offsetWidth) {
    winW = document.body.offsetWidth;
  }
  if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
    winW = document.documentElement.offsetWidth;
  }
  if (window.innerWidth) {
    winW = window.innerWidth;
  }
  if(winW >= 1024){
    if(manualChange === false){
      $('aside').show();
      $('.has-side').removeClass('col-md-12').addClass('col-md-9').addClass('col-sm-8');
      $('.tms-btn-next').hide();
    }
  } else {
    manualChange = false;
    $('aside').hide();
    $('.has-side').removeClass('col-md-9').removeClass('col-sm-8').addClass('col-sm-12');
    $('.tms-btn-next').hide();
  }


  if (winW <= 767)
  {
	$('.quicklinks-header').trigger("sticky_kit:detach");
  }
  else
  {
	$('.quicklinks-header').stick_in_parent();
  }

  scrollWindow(null);
}

function scrollWindow(e) {
  //if($(window).scrollTop() > 200){
      $('header .navbar-brand').css('height', 62  + 'px');
      $('header .navbar-brand').css('paddingTop', 15 + 'px');
      $('header .navbar-brand').css('paddingBottom', 15 + 'px');
      $('.nav-main .navbar-nav>li>a').css('paddingTop', 21 + 'px');
      $('.nav-main .navbar-nav>li>a').css('paddingBottom', 19 + 'px');
      $('.nav-main .nav-search button').css('height', '62px');
      $('.navbar-toggle').css('marginTop', 22 + 'px');
  /*} else {
    $('header .navbar-brand').css('height', (110 - $(window).scrollTop()/4) + 'px');
    $('header .navbar-brand').css('paddingTop', (40 - $(window).scrollTop()/8) + 'px');
    $('header .navbar-brand').css('paddingBottom', (40 - $(window).scrollTop()/8) + 'px');
    $('.nav-main .navbar-nav>li>a').css('paddingTop', (46 - $(window).scrollTop()/8) + 'px');
    $('.nav-main .navbar-nav>li>a').css('paddingBottom', (44 - $(window).scrollTop()/8) + 'px');
    $('.nav-main .nav-search button').css('height', (112 - $(window).scrollTop()/4) + 'px');
    $('.navbar-toggle').css('marginTop', (46 - $(window).scrollTop()/8) + 'px');
  }*/
}

$(window).resize(resizeWindow);
$(window).scroll(scrollWindow);
