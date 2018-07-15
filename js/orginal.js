

// Build package info 
window.buildinfo = {
  buildname : 'fs-composer-build',
  ver : '3.2.6',
  template : 'newclientcustom'
};

/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
 **/


// configure fonts to load from vendors
// check src/js/plugins/fontLoader.js for reference
 WebFontConfig = {
 	monotype: { //fonts.com
		projectId: 'abde0386-da0b-415e-b3f8-bb1fb40a814a'
	}
 };


jQuery(function($) {

    'use strict';

    var HOME;
    var OFFCANVAS;
    var SUBNAV;
    var UTIL;
    var TODOS;

    var $body = $('body');
    var $navMain = $('.nav-main');
    var $navSub = $('.nav-sub');
    var $navMain_level1 = $('#fsHeader').find('.nav-main .fsNavLevel1');
    var sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text();
    var $navSub_title = $navSub.find('> header > .fsElementTitle');
    var bpMobile = 600;
    var bpTablet = 800;
    var isHome = $('.home').length;
    var notDraftMode = !$('.fsDraftMode').length; // if (isHome && notDraftMode)....

    var notComposeMode = !$('.fsComposeMode').length;
    var $heroSliderElement = $('.universal-slideshow');
    var brand = $('#fsPoweredByFinalsite');
    var $wWidth = $(window).width();
    var $heroHolder = $('.header-multimedia-holder');

    //check if browser supports placeholders for placeholder()
    $.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();


        // check for buildinfo and add classes to body tag
        (function(){

            if ( window.buildinfo !== undefined ){
                var b = document.getElementsByTagName('body')[0];
                b.setAttribute( 'data-buildver', window.buildinfo.ver );
                b.setAttribute( 'data-sitetemplate', window.buildinfo.template );

                /*
                     // how to style against certain versions
                     body[data-buildver^="2.0"]{
                     margin-top: 100px;
                     }
                 */
            }

        })();


        if(!isHome && notComposeMode)
            {
                var sub_h_ancestor = $('.nav-main nav ul.fsNavLevel1 > li.fsNavParentPage.fsNavCurrentPageAncestor > div.fsNavPageInfo').height();

                var sub_h_curent = $('.nav-main nav ul.fsNavLevel1 > li.fsNavParentPage.fsNavCurrentPage > div.fsNavPageInfo').height();

//                console.log(sub_h);

                    $(".fsContainer.inner-logo-multimedia").css("margin-top", sub_h_ancestor);

                    $(".fsContainer.inner-logo-multimedia").css("margin-top", sub_h_curent);
            }


    // ================================
    // Home
    // ================================

    HOME = {


        init: function() {

            // NOTE: call HOME functions here like
            // this.slideshow();

        },

        slideshow: function() {

            // src/plugins/fsMediaPull.js
            $('.universal-slideshow').each(function() {
              var self = $(this);

              self.mediaSlider({
                mediaTemplate:[
                  '<article class="universal-slide" style="background-image: url({imgSrc});">',
                    '<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />', // keep an <img> with an alt attribute in the slide
                    '<div class="caption-wrapper">',
                      '<div class="caption-title">{captionTitle}</div>',
                      '<div class="caption-desc">{captionDesc}</div>',
                    '</div>',
                  '</article>'
                ], // html markup
                slick: {
                    // define your custom slick settings here
                },
                bp: 600,   // when to pull in mobile size images
                preSlickCallback: function(element) {}, //code to run before slick inits
                callback: function(element) {

                    //       write all functions to be run after media data has been pulled in here
                    //       ie (randomize, etc...)
                    //       defaults to null

                }
              });
            });
        }

    };

    if (isHome) {

        HOME.init();

    }

    TODOS = {

        init: function() {
            this.move_brand();
            this.trigger_search();
            this.trigger_portal();
            this.set_feed();
            this.callout_header_bg();
            this.grid_quicklink_bg();
            this.no_slideshow();
            this.set_margin();

        },

        move_brand: function()
        {
            var low_footer = $('#fsFooter .fsBanner .lower-copyright >.fsElementContent');

            if (brand.length && notComposeMode){
                brand.appendTo(low_footer);
            }
        },

        trigger_search: function()
        {
            if(notComposeMode)
            {
                $('.search-trigger').click(function()
                {
                    $('.search-holder').toggleClass('active');
                    $('.top-portal-list').removeClass('open');

                });

            }
        },

        trigger_portal: function()
        {
            if(notComposeMode)
            {
                $('.portal-trigger').click(function()
                {
                    $('.top-portal-list').toggleClass('open');
                    $('.search-holder').removeClass('active');
                });

            }
        },

        set_feed: function()
        {
             function facebook_blog() {
                   var f_list = [];
                   $('.mentone-social-admin .facebook-feed li.feed-item.j-facebook').each(function(i, v) {
                       v = $(v);
                       f_list.push({

                           summary: $('.j-text .j-message > p', v).text().trim().substr(0, 105),

                           img_facebook: $(v).find('>a > img').attr('src')
                       });

                            $('.mentone-social > .fsElementContent').append('<div class="facebook-box"><div class="facebook-image"><div class="facebook-image-overlay" style="background-image: url(' + f_list[i].img_facebook + ')"></div></div><p class="facebook-info"><span class="social-title">@mentonegirlsgs</span>' + f_list[i].summary + '...</p></div>');

                   });
            }

             function insta_blog() {
                   var t_list = [];
                   $('.mentone-social-admin .insta-feed li.feed-item.j-instagram').each(function(i, v) {
                       v = $(v);
                       t_list.push({

                           summary: $('.j-text .j-message > p', v).text().trim().substr(0, 105),

                           img_twitter: $(v).find('>a > img').attr('src')
                       });

                            $('.mentone-social > .fsElementContent').append('<div class="insta-box"><div class="insta-image"><div class="insta-image-overlay" style="background-image: url(' + t_list[i].img_twitter + ')"></div></div><p class="insta-info"><span class="social-title">@mentonegirlsgs</span>' + t_list[i].summary + '...</p></div>');

                   });
            }


          //LOAD FUNCTION

            $(window).load(function() {
                setTimeout(function() {
                  facebook_blog();
                  insta_blog();
                }, 3000);
            });
        },


        callout_header_bg: function()
        {

            $('.custom-callout .fsElementHeaderContent').each(function () {

              var image = $(this).find('img').attr('src');

              $(this).css('background-image', 'url("' + image + '")');
            });
        },

        grid_quicklink_bg: function()
        {

            $('.home-multimedia-grid .grid-quicklink > header .fsElementHeaderContent').each(function () {

              var image = $(this).find('img').attr('src');

              $(this).css('background-image', 'url("' + image + '")');
            });
        },

        no_slideshow: function()
        {
               if (notComposeMode)
               {
                  if (!$heroHolder.length && !isHome)
                  {
                      $('.fsPageBodyWrapper').addClass('no-slider');
                  }
               }

        },

        set_margin: function()
        {

        }





};

    TODOS.init();

    // ================================
    // Off Canvas Menu
    // ================================

    OFFCANVAS = {

        init: function() {
            this.clickHandler();
        },

        clickHandler: function() {
            // Toggle attribute of the body
            $('.drawer-trigger').click(function() {
                $body.toggleClass('drawer-is-active');
            });

            // Remove attribute on the bottom if anything other than
            // what is mentioned is clicked on
            $(document).on('click', function(event) {
                if (!$(event.target).closest('#fsMenu, .drawer-trigger').length) {
                    $body.removeClass('drawer-is-active');
                }
            });
        }

    };

    OFFCANVAS.init();

    // ================================
    // Sub Navigation
    // ================================

    SUBNAV = {

        init: function() {

            this.title();
            this.mobileNav();

        },

        // Create a section title based on the current page
        title: function() {
            if (sectionTitle.length !== 0) {
                $navSub_title.html(sectionTitle);
            }

            if ($navSub.find('nav .fsNavLevel1').length !== 0) {
                $navSub.removeClass('nav-sub-empty');
            } else {
                $navSub.addClass('nav-sub-empty');
            }

        },

        mobileNav: function() {
            // nav-sub - mobile toggle
            $navSub_title.click(function() {
                $(this).closest($navSub).toggleClass('active-nav');
            });

            // nav-sub remove click elsewhere
            $(document).on('click', function(event) {
                if (!$(event.target).closest($navSub).length) {
                    $navSub.removeClass('active-nav');
                }
            });

        }

    };

    SUBNAV.init();

    // ================================
    // Utility & milliseconds Functions
    // ================================

    UTIL = {

        init: function() {

            this.respondSliders();
            this.accessibilityMenu();
            this.googleTranslateAccessibility();

        },

        respondSliders: function() {

            // ================================
            // Responsive Built-in sliders
            // ================================

            // the following takes care of the news/calendar slideshow option
            // and makes them responsive

            var targets = [
                '.fsNews.fsSlideshow',
                '.fsCalendar.fsSlideshow'
            ];


            var bp = [{

                breakpoint: bpTablet,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: bpMobile,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll:1,
                    dots: false
                }
            }];

            for (var i = 0; i < targets.length; i++) {
                $(targets[i] + ' .fsElementSlideshow')
                    .slick('slickSetOption', 'responsive', bp, true);
            }

        },

        accessibilityMenu: function() {

            if (notDraftMode) {
                $navMain.find(".fsNavLevel1").accessibility_menu();
            }

        },

        googleTranslateAccessibility: function() {

            if($("#google_translate_element").length) {
                var maxTranslateAttempts = 50;
                var checkTranslate = setInterval(function() {
                    maxTranslateAttempts -= 1;
                    if($("#google_translate_element select.goog-te-combo").length) {
                        clearInterval(checkTranslate);
                        if((!$("#google_translate_element select.goog-te-combo").parent()[0].length && $("#google_translate_element select.goog-te-combo").parent()[0].tagName !== "LABEL") && (!$("#google_translate_element select.goog-te-combo").prev().length || $("#google_translate_element select.goog-te-combo").prev()[0].tagName !== "LABEL")) {
                            $("#google_translate_element select.goog-te-combo").before('<label for="select-translate">Translate Website</label>');
                            $("#google_translate_element select.goog-te-combo").attr("id","select-translate");
                        }
                    } else if(maxTranslateAttempts === 0) {
                        clearInterval(checkTranslate);
                    }
                }, 200);
            }

        }

    };

    UTIL.init();

}); //jQuery

/* ==================================================
    NEWS BLOG
================================================== */
function news_blog() {
       var news_list = [];
       $('.mentone-news-admin > .fsElementContent article').each(function(i, v) {
           v = $(v);
           news_list.push({
               link: $('.fsTitle a', v).parent().clone().html(),

               href: $('.fsTitle a' , v).attr('href'),

               read_href: $('a.fsNewsPostLink.fsReadMoreLink' , v).attr('href'),

               read_text: $('a.fsNewsPostLink.fsReadMoreLink' , v).text().trim(),

               summary: $('.fsSummary p', v).text().trim().substr(0, 60),

               imgnews: $(v).find('.fsThumbnail img').attr('src'),

               time: $('.fsDateTime .fsDate' , v).clone().html()


           });

                $('.homepage-news > .fsElementContent').append('<div class="news-item"><div class="news-image" style="background-image: url(' + news_list[i].imgnews + ')"></div><div class="news-sum"><div class="newsTitle"><p class="linkSnk">' + news_list[i].link +'</p></div><p class="news-info">' + news_list[i].summary + '...</p><div class="news-date">Posted: ' + news_list[i].time +'</div></div></div>');

       });
}

/* ==================================================
CALENDAR
================================================== */
function calendar_grid() {
       var calendar_list = [];
       $('.mentone-calendar-admin > .fsElementContent .slick-slider .slick-track article').each(function(i, v) {
           v = $(v);
           calendar_list.push({
               title: $('.fsTitle a.fsCalendarEventLink', v).text().trim().substr(0, 25),

               pop_link: $('.fsTitle a.fsCalendarEventLink', v).parent().clone().html(),

               href: $('.fsTitle a.fsCalendarEventLink' , v).attr('href'),

               day_name: $('.fsDate .fsDayName', v).text().trim(),

               month: $('.fsDate .fsMonth', v).text().trim(),

               day: $('.fsDate .fsDay', v).text().trim(),

               img_calendar: $(v).find('.fsNotes img').attr('src')
           });

                $('.homepage-events > .fsElementContent').append('<div class="calendar-item"><span class="top-arrow"></span><div class="calendar-date"><span class="day">' + calendar_list[i].day +'</span><span class="day-name">' + calendar_list[i].day_name +'</span><span class="month">' + calendar_list[i].month +'</span></div><div class="calendar-image" style="background-image: url(' + calendar_list[i].img_calendar + ')"></div><div class="calendarTitle">' + calendar_list[i].pop_link +'</div></div>');

       });
}

    $(document).ready(function(){

        news_blog();
        calendar_grid();

        $(".homepage-news .news-item:first-child .news-sum .newsTitle p.linkSnk").click(function() {

            $("body:not(.fsComposeMode) .mentone-news-admin .fsElementContent article:first-child").find(".fsTitle a").eq($(this).index()).trigger('click');

        });

        $(".homepage-news .news-item:nth-child(2) .news-sum .newsTitle p.linkSnk").click(function() {

            $("body:not(.fsComposeMode) .mentone-news-admin .fsElementContent article:nth-child(2)").find(".fsTitle a").eq($(this).index()).trigger('click');

        });

        $(".homepage-news .news-item:last-child .news-sum .newsTitle p.linkSnk").click(function() {

            $("body:not(.fsComposeMode) .mentone-news-admin .fsElementContent article:last-child").find(".fsTitle a").eq($(this).index()).trigger('click');

        });

//        $(".homepage-events .calendar-item:first-child .calendarTitle p.linkSnk").click(function() {
//
//            $("body:not(.fsComposeMode) .mentone-calendar-admin .fsElementContent article:first-child").eq($(this).index()).find(".fsTitle a").trigger('click');
//
//        });
//
//        $(".homepage-events .calendar-item:nth-child(2) .calendarTitle p.linkSnk").click(function() {
//
//            $("body:not(.fsComposeMode) .mentone-calendar-admin .fsElementContent article:nth-child(2)").eq($(this).index()).find(".fsTitle a").trigger('click');
//
//        });
//
//        $(".homepage-events .calendar-item:nth-child(3) .calendarTitle p.linkSnk").click(function() {
//
//            $("body:not(.fsComposeMode) .mentone-calendar-admin .fsElementContent article:nth-child(3)").eq($(this).index()).find(".fsTitle a").trigger('click');
//
//        });

        $('.homepage-news .news-item .newsTitle').dotdotdot();



    });

    $( window ).resize(function() {
       $('.homepage-news .news-item .newsTitle').dotdotdot();
    });


function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function debounce(e,t,n){var i;return function(){var a=this,r=arguments,s=function(){i=null,n||e.apply(a,r)},o=n&&!i;clearTimeout(i),i=setTimeout(s,t),o&&e.apply(a,r)}}function placeholder(e,t){"use strict";var n,i,a=100,r=100;n=function s(){e.find("input.gsc-input").length?$.support.placeholder?e.find("input.gsc-input").attr("placeholder",t):e.find("input.gsc-input").attr("value",t):a>0&&(i=setTimeout(s,r),a-=1)},i=setTimeout(n,r)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var i=n.split("."),a=t[i.shift()],r=0,s=i.length;r<s;r++)a=a[i[r]];return"undefined"!=typeof a&&null!==a?a:""})}function changeGoogleStyles(){if(($goog=$(".goog-te-menu-frame").contents().find("body")).length){var e="<style>.goog-te-menu2 {max-width:100% !important;overflow:scroll !important;box-sizing:border-box !important;height:auto !important;}</style>";$goog.prepend(e)}else setTimeout(changeGoogleStyles,50)}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,i=$(e.target).closest(".fsCalendarDaybox");n=i.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),i.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,i){var a=$(i).hasClass("fsCalendar fsGrid");a&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}!function(e){function t(e){var t=e.createElement("script"),n=e.scripts[0];t.src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",t.async=!0,n.parentNode.insertBefore(t,n)}t(e);var n,i=e.getElementsByClassName("fsForm");if(i.length)for(var a=0;a<i.length;a++)n=i[a].getElementsByTagName("iframe")[0],n.onload=function(){this.contentWindow.WebFontConfig=window.WebFontConfig,t(this.contentDocument)}}(document),function(e){"use strict";function t(t,n){var i=this,a={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],bp:600,callback:null,url:null};i.element=t,i.container=t,i.settings=e.extend(!0,{},a,n),i.url="",i.init()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}t.prototype={init:function(){var e=this;e.element.classList.contains("fsMedia")?(e.container=e.element.getElementsByClassName("fsMediaCustomPlayer")[0],e.url=e.container.getAttribute("data-playlisturl")):e.settings.url&&(e.url=e.settings.url),e.html=Array.isArray(e.settings.mediaTemplate)?e.settings.mediaTemplate.join("\n"):e.settings.mediaTemplate,e.getContent()},getContent:function(){var t=this;e.getJSON(t.url).done(function(e){for(var i=e.objects,a=0;a<i.length;a++){var r=n(nano(t.html,{imgSrc:window.innerWidth>t.settings.bp?i[a].full_path:i[a].mobile_path,captionTitle:i[a].object_title,captionDesc:i[a].object_description}));0==r.textContent.trim().length&&r.getElementsByClassName("caption-wrapper").length&&r.getElementsByClassName("caption-wrapper")[0].classList.add("is-empty"),t.container.appendChild(r)}t.callback()})},callback:function(){var e=this;"function"==typeof e.settings.callback&&e.settings.callback.call()}},e.fn.mediaPull=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e){"use strict";function t(t,n){function i(){e.getJSON(s.url).done(function(e){r.initialSlide=parseInt(Math.ceil(Math.random()*e.objects.length)),a()})}function a(){s.settings=e.extend(!0,{},s.defaults,n),s.init()}var r,s=this;s.element=t,s.isMedia=!1,s.autoplay=!1,s.randomize=!1,s.html="",s.element.classList.contains("fsMedia")?s.isMedia=!0:s.element.classList.contains("fsMediaCustomPlayer")&&(s.element=e(s.element).parents(".fsMedia")[0],s.isMedia=!0),s.isMedia&&(s.autoplay=e.parseJSON(e(s.element).find(".fsMediaCustomPlayer").attr("data-autoplay")),s.randomize=e.parseJSON(e(s.element).find(".fsMediaCustomPlayer").attr("data-randomstart")),s.url=e(s.element).find(".fsMediaCustomPlayer").attr("data-playlisturl")),r={slidesToShow:1,accessibility:!0,dots:!0,arrows:!0,autoplay:s.autoplay,pauseOnHover:!1,adaptiveHeight:!0,initialSlide:s.randomize?i():0},s.defaults={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],slick:r,bp:600,preSlickCallback:null,callback:null},s.randomize||a()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}function i(t){t.classList.toggle("slider-playing"),t.classList.toggle("slider-paused"),t.classList.contains("slider-playing")?e(t).slick("slickPlay"):e(t).slick("slickPause")}t.prototype={init:function(){var e=this;e.slider=e.isMedia?e.element.getElementsByClassName("fsMediaCustomPlayer")[0]:e.element,e.slider.classList.add("fsCustomSlider"),e.html=Array.isArray(e.settings.mediaTemplate)?e.settings.mediaTemplate.join("\n"):e.settings.mediaTemplate,e.isMedia?e.sliderPrep():document.body.classList.contains("fsDraftMode")||e.slickInit()},sliderPrep:function(){var t=this;e(t.element).mediaPull({mediaTemplate:t.settings.mediaTemplate,bp:t.settings.bp,callback:function(){t.slickInit()}})},slickInit:function(){var t=this,a=e(t.slider);a.on("init",function(e,a){if(t.settings.slick.autoplay&&a.$slides.length>1){var r=n("<button class='slider-play-btn'>Play</button>");r.addEventListener("click",function(){i(t.slider)}),t.slider.insertBefore(r,t.slider.firstChild),a.options.autoplay?t.slider.classList.add("slider-playing"):t.slider.classList.add("slider-paused")}"function"==typeof t.settings.callback&&t.settings.callback.call(t,t.element)}),"function"==typeof t.settings.preSlickCallback&&t.settings.preSlickCallback.call(t,t.element),a.slick(t.settings.slick)}},e.fn.mediaSlider=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e,t){function n(e,t,n){var i=e.children(),a=!1;e.empty();for(var s=0,o=i.length;s<o;s++){var l=i.eq(s);if(e.append(l),n&&e.append(n),r(e,t)){l.remove(),a=!0;break}n&&n.detach()}return a}function i(t,n,s,o,l){var d=!1,c="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",f="script, .dotdotdot-keep";return t.contents().detach().each(function(){var u=this,p=e(u);if("undefined"==typeof u)return!0;if(p.is(f))t.append(p);else{if(d)return!0;t.append(p),!l||p.is(o.after)||p.find(o.after).length||t[t.is(c)?"after":"append"](l),r(s,o)&&(d=3==u.nodeType?a(p,n,s,o,l):i(p,n,s,o,l)),d||l&&l.detach()}}),n.addClass("is-truncated"),d}function a(t,n,i,a,o){var c=t[0];if(!c)return!1;var u=d(c),p=u.indexOf(" ")!==-1?" ":"ã€€",h="letter"==a.wrap?"":p,m=u.split(h),v=-1,g=-1,y=0,b=m.length-1;for(a.fallbackToLetter&&0==y&&0==b&&(h="",m=u.split(h),b=m.length-1);y<=b&&(0!=y||0!=b);){var C=Math.floor((y+b)/2);if(C==g)break;g=C,l(c,m.slice(0,g+1).join(h)+a.ellipsis),i.children().each(function(){e(this).toggle().toggle()}),r(i,a)?(b=g,a.fallbackToLetter&&0==y&&0==b&&(h="",m=m[0].split(h),v=-1,g=-1,y=0,b=m.length-1)):(v=g,y=g)}if(v==-1||1==m.length&&0==m[0].length){var x=t.parent();t.detach();var w=o&&o.closest(x).length?o.length:0;if(x.contents().length>w?c=f(x.contents().eq(-1-w),n):(c=f(x,n,!0),w||x.detach()),c&&(u=s(d(c),a),l(c,u),w&&o)){var k=o.parent();e(c).parent().append(o),e.trim(k.html())||k.remove()}}else u=s(m.slice(0,v+1).join(h),a),l(c,u);return!0}function r(e,t){return e.innerHeight()>t.maxHeight}function s(t,n){for(;e.inArray(t.slice(-1),n.lastCharacter.remove)>-1;)t=t.slice(0,-1);return e.inArray(t.slice(-1),n.lastCharacter.noEllipsis)<0&&(t+=n.ellipsis),t}function o(e){return{width:e.innerWidth(),height:e.innerHeight()}}function l(e,t){e.innerText?e.innerText=t:e.nodeValue?e.nodeValue=t:e.textContent&&(e.textContent=t)}function d(e){return e.innerText?e.innerText:e.nodeValue?e.nodeValue:e.textContent?e.textContent:""}function c(e){do e=e.previousSibling;while(e&&1!==e.nodeType&&3!==e.nodeType);return e}function f(t,n,i){var a,r=t&&t[0];if(r){if(!i){if(3===r.nodeType)return r;if(e.trim(t.text()))return f(t.contents().last(),n)}for(a=c(r);!a;){if(t=t.parent(),t.is(n)||!t.length)return!1;a=c(t[0])}if(a)return f(e(a),n)}return!1}function u(t,n){return!!t&&("string"==typeof t?(t=e(t,n),!!t.length&&t):!!t.jquery&&t)}function p(e){for(var t=e.innerHeight(),n=["paddingTop","paddingBottom"],i=0,a=n.length;i<a;i++){var r=parseInt(e.css(n[i]),10);isNaN(r)&&(r=0),t-=r}return t}if(!e.fn.dotdotdot){e.fn.dotdotdot=function(t){if(0==this.length)return e.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){e(this).dotdotdot(t)});var a=this,s=a.contents();a.data("dotdotdot")&&a.trigger("destroy.dot"),a.data("dotdotdot-style",a.attr("style")||""),a.css("word-wrap","break-word"),"nowrap"===a.css("white-space")&&a.css("white-space","normal"),a.bind_events=function(){return a.bind("update.dot",function(t,o){switch(a.removeClass("is-truncated"),t.preventDefault(),t.stopPropagation(),typeof l.height){case"number":l.maxHeight=l.height;break;case"function":l.maxHeight=l.height.call(a[0]);break;default:l.maxHeight=p(a)}l.maxHeight+=l.tolerance,"undefined"!=typeof o&&(("string"==typeof o||"nodeType"in o&&1===o.nodeType)&&(o=e("<div />").append(o).contents()),o instanceof e&&(s=o)),m=a.wrapInner('<div class="dotdotdot" />').children(),m.contents().detach().end().append(s.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var c=!1,f=!1;return d.afterElement&&(c=d.afterElement.clone(!0),c.show(),d.afterElement.detach()),r(m,l)&&(f="children"==l.wrap?n(m,l,c):i(m,a,m,l,c)),m.replaceWith(m.contents()),m=null,e.isFunction(l.callback)&&l.callback.call(a[0],f,s),d.isTruncated=f,f}).bind("isTruncated.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(a[0],d.isTruncated),d.isTruncated}).bind("originalContent.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(a[0],s),s}).bind("destroy.dot",function(e){e.preventDefault(),e.stopPropagation(),a.unwatch().unbind_events().contents().detach().end().append(s).attr("style",a.data("dotdotdot-style")||"").removeClass("is-truncated").data("dotdotdot",!1)}),a},a.unbind_events=function(){return a.unbind(".dot"),a},a.watch=function(){if(a.unwatch(),"window"==l.watch){var t=e(window),n=t.width(),i=t.height();t.bind("resize.dot"+d.dotId,function(){n==t.width()&&i==t.height()&&l.windowResizeFix||(n=t.width(),i=t.height(),f&&clearInterval(f),f=setTimeout(function(){a.trigger("update.dot")},100))})}else c=o(a),f=setInterval(function(){if(a.is(":visible")){var e=o(a);c.width==e.width&&c.height==e.height||(a.trigger("update.dot"),c=e)}},500);return a},a.unwatch=function(){return e(window).unbind("resize.dot"+d.dotId),f&&clearInterval(f),a};var l=e.extend(!0,{},e.fn.dotdotdot.defaults,t),d={},c={},f=null,m=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=e.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=e.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),d.afterElement=u(l.after,a),d.isTruncated=!1,d.dotId=h++,a.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&a.watch(),a},e.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},e.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","ã€€",",",";",".","!","?"],noEllipsis:[]}},e.fn.dotdotdot.debug=function(e){};var h=1,m=e.fn.html;e.fn.html=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):m.apply(this,arguments)};var v=e.fn.text;e.fn.text=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?(n=e("<div />").text(n).html(),this.trigger("update",[n])):v.apply(this,arguments)}}}(jQuery),jQuery(document).ready(function(e){e(".dot-ellipsis").each(function(){var t=e(this).hasClass("dot-resize-update"),n=e(this).hasClass("dot-timer-update"),i=0,a=e(this).attr("class").split(/\s+/);e.each(a,function(e,t){var n=t.match(/^dot-height-(\d+)$/);null!==n&&(i=Number(n[1]))});var r=new Object;n&&(r.watch=!0),t&&(r.watch="window"),i>0&&(r.height=i),e(this).dotdotdot(r)})}),jQuery(window).on("load",function(){jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot")}),function(e){"use strict";var t={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};e.fn.accessibility_menu=function(n){var i=e.extend({menuClass:"menu-item-open",mainMenuLabel:"Main Menu",mainMenuRole:"navigation",topMenuRole:"menubar",listItemsRole:"menuitem",subNavRole:"menu",firstTab:"level2"},n),a=e(this),r=".fsNavPageInfo",s=".fsNavLevel1",o=".fsNavLevel2",l=".fsNavPageDescription",d=a.find("> li > a");e(this).parent().attr("role",i.mainMenuRole).attr("aria-label",i.mainMenuLabel),e(this).attr("role",i.topMenuRole).find("li").attr("role",i.listItemsRole),e(this).find(o).attr("role",i.subNavRole),e(this).find(r).find("a").attr("tabIndex",-1),e(d).each(function(){e(this).next(r).length>0&&e(this).parent("li").attr("aria-haspopup","true").find(r).attr("aria-hidden","true")}),e(d).bind("focus mouseenter mouseleave",function(){var t=new Array;if(e(this).parents(s).find("> li > a").removeAttr("tabindex"),e(this).parents(s).find("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabindex",-1),e(this).next(r).attr("aria-hidden","false").parent("li").addClass(i.menuClass),t.push(e(this)[0]),"level2"==i.firstTab){if(e(this).next(r).find(o).find("a").length)for(var n=0;n<e(this).next(r).find(o).find("a").length;n++)t.push(e(this).next(r).find(o).find("a")[n]);if(e(this).next(r).find(l).find("a").length)for(var a=0;a<e(this).next(r).find(l).find("a").length;a++)t.push(e(this).next(r).find(l).find("a")[a])}else if("pagedesc"==i.firstTab){if(e(this).next(r).find(l).find("a").length)for(var d=0;d<e(this).next(r).find(l).find("a").length;d++)t.push(e(this).next(r).find(l).find("a")[d]);if(e(this).next(r).find(o).find("a").length)for(var c=0;c<e(this).next(r).find(o).find("a").length;c++)t.push(e(this).next(r).find(o).find("a")[c])}for(var f=0;f<t.length;f++)t[f].setAttribute("tabindex",f)}),e(this).on("mouseleave",function(){e(this).find("> li > a").removeAttr("tabindex"),e(this).find("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(d).keydown(function(n){var a=e(this).parent("li").find(r).find("a").length;if(38==n.keyCode)n.preventDefault(),e(this).parent("li").find(r).find("a").length&&e(this).parent("li").find(r).find("a[tabindex="+a+"]").focus();else if(39==n.keyCode)n.preventDefault(),0==e(this).parent("li").next("li").length?e(this).parents(s).find("> li").first().find("a").first().focus():e(this).parent("li").next("li").find("a").first().focus();else if(40==n.keyCode)e(this).parent("li").find(r).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus());else if(37==n.keyCode)n.preventDefault(),0==e(this).parent("li").prev("li").length?e(this).parents(s).find("> li").last().find("a").first().focus():e(this).parent("li").prev("li").find("a").first().focus();else if(9==n.keyCode)if(n.shiftKey)if(0==e(this).parent("li").prev("li").length)e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1);else if(e(this).parent("li").prev("li").length){n.preventDefault();var o=e(this).parent("li").prev("li").find(r).find("a").length;e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1),e(this).parent("li").prev("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").prev("li").find(">a").focus().parent().find(r).find("a[tabindex="+o+"]").focus()}else e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1);else e(this).parent("li").find(r).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus());else 32==n.keyCode?(n.preventDefault(),window.location=e(this).attr("href")):27==n.keyCode?(n.preventDefault(),e("."+i.menuClass).removeClass(i.menuClass).find("> a").removeAttr("tabindex").parent("li").find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):e(this).parent("li").find(r+"[aria-hidden=false] a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})});var c=e(this).find(r).find("a");e(c).keydown(function(n){var a=e(this).parents(r).find("a").length,o=parseInt(e(this).attr("tabindex"));if(38==n.keyCode)n.preventDefault(),1==o?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(o-1)+"]").focus();else if(39==n.keyCode)n.preventDefault(),0==e(this).parents(r).parent("li").next("li").length?e(this).parents(s).find("> li").first().find("a").first().focus():e(this).parents(r).parent("li").next("li").find("a").first().focus();else if(40==n.keyCode)n.preventDefault(),o==a?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(o+1)+"]").focus();else if(27==n.keyCode||37==n.keyCode)n.preventDefault(),e(this).parents(r).parent("li").find("> a").focus(),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true");else if(9==n.keyCode)n.shiftKey?(n.preventDefault(),1==o?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(o-1)+"]").focus()):o==a?e(this).parents(r).parent("li").next("li").length?(n.preventDefault(),e(this).parents(r).parent("li").next("li").find("a").first().focus()):(e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):(n.preventDefault(),e(this).parents(r).find("a[tabindex="+(o+1)+"]").focus());else if(32==n.keyCode)n.preventDefault(),window.location=e(this).attr("href");else{var l=!1;e(this).parent("li").nextAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),l=!0,!1}),l||e(this).parent("li").prevAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})}}),e(document).click(function(){e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(this).click(function(e){e.stopPropagation()})}}(jQuery),window.Modernizr=function(e,t,n){function i(e){y.cssText=e}function a(e,t){return typeof e===t}function r(e,t){return!!~(""+e).indexOf(t)}function s(e,t){for(var i in e){var a=e[i];if(!r(a,"-")&&y[a]!==n)return"pfx"!=t||a}return!1}function o(e,t,i){for(var r in e){var s=t[e[r]];if(s!==n)return i===!1?e[r]:a(s,"function")?s.bind(i||t):s}return!1}function l(e,t,n){var i=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+w.join(i+" ")+i).split(" ");return a(t,"string")||a(t,"undefined")?s(r,t):(r=(e+" "+k.join(i+" ")+i).split(" "),o(r,t,n))}var d,c,f,u="2.8.3",p={},h=!0,m=t.documentElement,v="modernizr",g=t.createElement(v),y=g.style,b={}.toString,C=" -webkit- -moz- -o- -ms- ".split(" "),x="Webkit Moz O ms",w=x.split(" "),k=x.toLowerCase().split(" "),T={svg:"http://www.w3.org/2000/svg"},E={},S=[],j=S.slice,M=function(e,n,i,a){var r,s,o,l,d=t.createElement("div"),c=t.body,f=c||t.createElement("body");if(parseInt(i,10))for(;i--;)o=t.createElement("div"),o.id=a?a[i]:v+(i+1),d.appendChild(o);return r=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),d.id=v,(c?d:f).innerHTML+=r,f.appendChild(d),c||(f.style.background="",f.style.overflow="hidden",l=m.style.overflow,m.style.overflow="hidden",m.appendChild(f)),s=n(d,e),c?d.parentNode.removeChild(d):(f.parentNode.removeChild(f),m.style.overflow=l),!!s},D=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var i;return M("@media "+t+" { #"+v+" { position: absolute; } }",function(t){i="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),i},N={}.hasOwnProperty;f=a(N,"undefined")||a(N.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return N.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=j.call(arguments,1),i=function(){if(this instanceof i){var a=function(){};a.prototype=t.prototype;var r=new a,s=t.apply(r,n.concat(j.call(arguments)));return Object(s)===s?s:r}return t.apply(e,n.concat(j.call(arguments)))};return i}),E.flexbox=function(){return l("flexWrap")},E.flexboxlegacy=function(){return l("boxDirection")},E.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:M(["@media (",C.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},E.cssanimations=function(){return l("animationName")},E.csscolumns=function(){return l("columnCount")},E.csstransforms=function(){return!!l("transform")},E.csstransforms3d=function(){var e=!!l("perspective");return e&&"webkitPerspective"in m.style&&M("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},E.csstransitions=function(){return l("transition")},E.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(i){}return n},E.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(i){}return n},E.svg=function(){return!!t.createElementNS&&!!t.createElementNS(T.svg,"svg").createSVGRect},E.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==T.svg},E.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(b.call(t.createElementNS(T.svg,"clipPath")))};for(var P in E)f(E,P)&&(c=P.toLowerCase(),p[c]=E[P](),S.push((p[c]?"":"no-")+c));return p.addTest=function(e,t){if("object"==typeof e)for(var i in e)f(e,i)&&p.addTest(i,e[i]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(m.className+=" "+(t?"":"no-")+e),p[e]=t}return p},i(""),g=d=null,function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function a(e){var t=g[e[m]];return t||(t={},v++,e[m]=v,g[v]=t),t}function r(e,n,i){if(n||(n=t),c)return n.createElement(e);i||(i=a(n));var r;return r=i.cache[e]?i.cache[e].cloneNode():h.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),!r.canHaveChildren||p.test(e)||r.tagUrn?r:i.frag.appendChild(r)}function s(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||a(e);for(var r=n.frag.cloneNode(),s=0,o=i(),l=o.length;s<l;s++)r.createElement(o[s]);return r}function o(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?r(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var i=a(e);return y.shivCSS&&!d&&!i.hasCSS&&(i.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||o(e,i),e}var d,c,f="3.7.0",u=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,m="_html5shiv",v=0,g={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){d=!0,c=!0}}();var y={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:f,shivCSS:u.shivCSS!==!1,supportsUnknownElements:c,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:l,createElement:r,createDocumentFragment:s};e.html5=y,l(t)}(this,t),p._version=u,p._prefixes=C,p._domPrefixes=k,p._cssomPrefixes=w,p.mq=D,p.testProp=function(e){return s([e])},p.testAllProps=l,p.testStyles=M,m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+S.join(" "):""),p}(this,this.document),function(e,t,n){function i(e){return"[object Function]"==v.call(e)}function a(e){return"string"==typeof e}function r(){}function s(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function o(){var e=g.shift();y=1,e?e.t?h(function(){("c"==e.t?u.injectCss:u.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),o()):y=0}function l(e,n,i,a,r,l,d){function c(t){if(!p&&s(f.readyState)&&(b.r=p=1,!y&&o(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&h(function(){x.removeChild(f)},50);for(var i in S[n])S[n].hasOwnProperty(i)&&S[n][i].onload()}}var d=d||u.errorTimeout,f=t.createElement(e),p=0,v=0,b={t:i,s:n,e:r,a:l,x:d};1===S[n]&&(v=1,S[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){c.call(this,v)},g.splice(a,0,b),"img"!=e&&(v||2===S[n]?(x.insertBefore(f,C?null:m),h(c,d)):S[n].push(f))}function d(e,t,n,i,r){return y=0,t=t||"j",a(e)?l("c"==t?k:w,e,t,this.i++,n,i,r):(g.splice(this.i++,0,e),1==g.length&&o()),this}function c(){var e=u;return e.loader={load:d,i:0},e}var f,u,p=t.documentElement,h=e.setTimeout,m=t.getElementsByTagName("script")[0],v={}.toString,g=[],y=0,b="MozAppearance"in p.style,C=b&&!!t.createRange().compareNode,x=C?p:m.parentNode,p=e.opera&&"[object Opera]"==v.call(e.opera),p=!!t.attachEvent&&!p,w=b?"object":p?"script":"img",k=p?"script":w,T=Array.isArray||function(e){return"[object Array]"==v.call(e)},E=[],S={},j={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};u=function(e){function t(e){var t,n,i,e=e.split("!"),a=E.length,r=e.pop(),s=e.length,r={url:r,origUrl:r,prefixes:e};for(n=0;n<s;n++)i=e[n].split("="),(t=j[i.shift()])&&(r=t(r,i));for(n=0;n<a;n++)r=E[n](r);return r}function s(e,a,r,s,o){var l=t(e),d=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(a&&(a=i(a)?a:a[e]||a[s]||a[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,a,r,s,o):(S[l.url]?l.noexec=!0:S[l.url]=1,r.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(i(a)||i(d))&&r.load(function(){c(),a&&a(l.origUrl,o,s),d&&d(l.origUrl,o,s),S[l.url]=2})))}function o(e,t){function n(e,n){if(e){if(a(e))n||(f=function(){var e=[].slice.call(arguments);u.apply(this,e),p()}),s(e,f,t,0,d);else if(Object(e)===e)for(l in o=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--o&&(i(f)?f=function(){var e=[].slice.call(arguments);u.apply(this,e),p()}:f[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(u[l])),s(e[l],f,t,l,d))}else!n&&p()}var o,l,d=!!e.test,c=e.load||e.both,f=e.callback||r,u=f,p=e.complete||r;n(d?e.yep:e.nope,!!c),c&&n(c)}var l,d,f=this.yepnope.loader;if(a(e))s(e,0,f,0);else if(T(e))for(l=0;l<e.length;l++)d=e[l],a(d)?s(d,0,f,0):T(d)?u(d):Object(d)===d&&o(d,f);else Object(e)===e&&o(e,f)},u.addPrefix=function(e,t){j[e]=t},u.addFilter=function(e){E.push(e)},u.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=c(),e.yepnope.executeStack=o,e.yepnope.injectJs=function(e,n,i,a,l,d){var c,f,p=t.createElement("script"),a=a||u.errorTimeout;p.src=e;for(f in i)p.setAttribute(f,i[f]);n=d?o:n||r,p.onreadystatechange=p.onload=function(){!c&&s(p.readyState)&&(c=1,n(),p.onload=p.onreadystatechange=null)},h(function(){c||(c=1,n(1))},a),l?p.onload():m.parentNode.insertBefore(p,m)},e.yepnope.injectCss=function(e,n,i,a,s,l){var d,a=t.createElement("link"),n=l?o:n||r;a.href=e,a.rel="stylesheet",a.type="text/css";for(d in i)a.setAttribute(d,i[d]);s||(m.parentNode.insertBefore(a,m),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this},function(e){var t=e({});e.subscribe=function(){t.on.apply(t,arguments)},e.unsubscribe=function(){t.off.apply(t,arguments)},e.publish=function(){t.trigger.apply(t,arguments)}}(jQuery),changeGoogleStyles();