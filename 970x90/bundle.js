(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      log.debug = true; // set to false before publishing

      var dom = domIds(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        var tl = gsap.timeline({
          defaults: {
            ease: Power2.easeInOut
          },
          onComplete: addRollover
        });
        dom.ad_content.classList.remove('invisible');
        tl.from('#pegasus_1', {
          duration: 1.3,
          scale: 0.4,
          repeat: 1,
          yoyo: true
        }).to('#pegasus_1', {
          duration: 0.01,
          autoAlpha: 0
        }, "-=1").from('#pegasus_2', {
          duration: 0.01,
          autoAlpha: 0
        }, "-=1").to('#pegasus_2', {
          duration: 1.3,
          scale: 0.41,
          x: 4
        }, "-=1.2").to('#pegasus_2', {
          duration: 0.01,
          autoAlpha: 0
        }, "+=0.2").from('#pegasus_3', {
          duration: 0.01,
          autoAlpha: 0
        }).to('#pegasus_3', {
          duration: 1,
          y: '-4',
          ease: Sine.easeInOut,
          repeat: 3,
          yoyo: true
        }).from('#txt_1', {
          duration: 0.5,
          y: -90
        }, '-=2.7').from('#txt_2', {
          duration: 0.5,
          y: -90
        }, '-=2.5').from('#logo', {
          duration: 0.5,
          autoAlpha: 0,
          scale: 4
        }, '-=2.3').from('#cta_container', {
          duration: 0.5,
          autoAlpha: 0
        }, '-=1.5');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        var tl = new gsap.timeline();
        dom.ad_content.addEventListener('mouseenter', function () {
          tl.to('#pegasus_3', 1, {
            y: '3',
            ease: 'sine.inOut',
            repeat: 5,
            yoyo: true
          });

          if (tl.paused()) {
            tl.resume();
          }
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          tl.pause();
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
