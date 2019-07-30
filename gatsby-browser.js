'use strict';

/* eslint-disable no-console */

var first = true;

function getDuration() {
  var start = window.start || new Date();
  var now = new Date();
  var difference = now.getTime() - start.getTime();

  if (difference === 0) {
    return null;
  }

  return difference;
}

exports.onRouteUpdate = function (_ref) {
  var location = _ref.location;

  if (process.env.NODE_ENV === 'production' && typeof _paq !== 'undefined') {
    window._paq = window._paq || [];
    window.dev = window.dev || null;

    var pathname = location.pathname;

    if (first) {
      first = false;
      window._paq.push(['trackEvent', 'javascript', 'load', 'duration', getDuration()]);

      if (window.dev) {
        console.log('[Matomo] Page view for: ' + pathname);
      }
    } else {
      window._paq.push(['setReferrerUrl', pathname]);
      window._paq.push(['setCustomUrl', pathname]);
      window._paq.push(['setDocumentTitle', pathname]);
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      _paq.push(["enableHeartBeatTimer", 30]);

      if (window.dev) {
        console.log('[Matomo] Page view for: ' + pathname);
      }
    }
  }
  return null;
};