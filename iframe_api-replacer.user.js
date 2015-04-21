// ==UserScript==
// @name         MovieLaLa iframe_api Replacer
// @namespace    http://embed.movielala.com/
// @version      1.0.0
// @author       MovieLaLa
// @match      *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/*
    Configuration
*/

var newWidgetURL = 'https://d20psk4uwj5q3z.cloudfront.net/www-widgetapi.js';
var newHost = 'https://embed.movielala.com';

/*
    Patched iframe_api
*/

window.YT = {
    loading: 1,
    loaded: 0
};

window.YTConfig = {
    'host': newHost
};

(function() {
    var l = [];
    YT.ready = function(f) {
        if (YT.loaded) {
            f();
        } else {
            l.push(f);
        }
    };
    window.onYTReady = function() {
        YT.loaded = 1;
        for (var i = 0; i < l.length; i++) {
            try {
                l[i]();
            } catch (e) {}
        }
        
        // We will load very fast, even before the patched website declares onYouTubeIframeAPIReady() so watch for it
        var interval = window.setInterval(function () {

            if (typeof window.onYouTubeIframeAPIReady === 'function') {
                window.onYouTubeIframeAPIReady();

                window.clearInterval(interval);
            }

        }, 100);
    };
    YT.setConfig = function(c) {
        for (var k in c) {
            if (c.hasOwnProperty(k)) {
                YTConfig[k] = c[k];
            }
        }
    };
    var a = document.createElement('script');
    a.type = 'text/javascript';
    a.id = 'www-widgetapi-script';
    a.src = newWidgetURL;
    a.async = true;
    window.document.head.appendChild(a);
})();
