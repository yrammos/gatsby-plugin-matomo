'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildTrackingCode(pluginOptions) {
  var script = pluginOptions.localScript ? pluginOptions.localScript : pluginOptions.matomoUrl + '/js';
  var requireConsent = pluginOptions.requireConsent
  var requireCookies = pluginOptions.requireCookies
  var siteUrl = pluginOptions.siteUrl
  var php = pluginOptions.localPHP ? pluginOptions.localPHP : `${pluginOptions.matomoUrl}/php`;

  var html =
  `
    window._paq = window._paq || [];
    ${requireConsent ? "window._paq.push(['requireConsent']);" : ''}
    ${disableCookies ? "window._paq.push(['disableCookies']);" : ''}
    window._paq.push(['enableHeartBeatTimer']);
    window.start = new Date();
    (function(){var u = ${pluginOptions.siteUrl};
      _paq.push([ 'setTrackerUrl', u + ${php} ]);
      _paq.push([ 'setSiteId', '${siteId}' ]);
      var d = document,
          g = d.createElement('script'),
          s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript';
      g.async = true;
      g.defer = true;
      g.src = u + ${php};
      s.parentNode.insertBefore(g, s);
    })();
  `

  return _react2.default.createElement('script', {
    key: 'gatsby-plugin-matomo',
    dangerouslySetInnerHTML: { __html: html }
  });
}

function buildTrackingCodeNoJs(pluginOptions, pathname) {
  // var html = '<img src="' + pluginOptions.matomoUrl + '/php?idsite=' + pluginOptions.siteId + '&rec=1&url=' + (pluginOptions.siteUrl + pathname) + '" style="border:0" alt="tracker" />';
  var html = '<img src="" alt="" />';   // No tracking pixel.
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