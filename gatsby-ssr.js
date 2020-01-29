'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildTrackingCode(pluginOptions) {
  var script = pluginOptions.localScript ? pluginOptions.localScript : pluginOptions.matomoUrl + '/js';

  var php = pluginOptions.localPHP ? pluginOptions.localPHP : '${pluginOptions.matomoUrl}/php';

  var html = '\n    window.dev = ' + pluginOptions.dev + '\n    if (window.dev === true || true) {\n      window._paq = window._paq || [];\n      ' + (pluginOptions.requireConsent ? 'window._paq.push([\'requireConsent\']);' : '') + '\n      ' + (pluginOptions.disableCookies ? 'window._paq.push([\'disableCookies\']);' : '') + '\n      window._paq.push([\'setTrackerUrl\', \'' + php + '\']);\n      window._paq.push([\'setSiteId\', \'' + pluginOptions.siteId + '\']);\n      window._paq.push([\'trackPageView\']);\n      window._paq.push([\'enableLinkTracking\']);\n      window._paq.push([\'enableHeartBeatTimer\']);\n      window.start = new Date();\n\n      (function() {\n        var d=document, g=d.createElement(\'script\'), s=d.getElementsByTagName(\'script\')[0];\n        g.type=\'text/javascript\'; g.async=true; g.defer=true; g.src=\'' + script + '\'; s.parentNode.insertBefore(g,s);\n      })();\n\n      if (window.dev === true) {\n        console.log(\'[Matomo] Tracking initialized\')\n\t\tconsole.log(\'[Matomo] matomoUrl: ' + pluginOptions.matomoUrl + ', siteId: ' + pluginOptions.siteId + '\')\n      }\n    }\n  ';

  return _react2.default.createElement('script', {
    key: 'gatsby-plugin-matomo',
    dangerouslySetInnerHTML: { __html: html }
  });
}

function buildTrackingCodeNoJs(pluginOptions, pathname) {
  var html = '<img src="' + pluginOptions.matomoUrl + '/php?idsite=' + pluginOptions.siteId + '&rec=1&url=' + (pluginOptions.siteUrl + pathname) + '" style="border:0" alt="tracker" />';

  return _react2.default.createElement('noscript', {
    key: 'gatsby-plugin-matomo',
    dangerouslySetInnerHTML: { __html: html }
  });
}

exports.onRenderBody = function (_ref, pluginOptions) {
  var setPostBodyComponents = _ref.setPostBodyComponents,
      pathname = _ref.pathname;

  if (process.env.NODE_ENV === 'production' || pluginOptions.dev === true) {
    return setPostBodyComponents([buildTrackingCode(pluginOptions), buildTrackingCodeNoJs(pluginOptions, pathname)]);
  }
  return null;
};