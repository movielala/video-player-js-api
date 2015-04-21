(function (window, _, Q, MLLVP) {

  var Player = MLLVP.Player;

  var YT = MLLVP.YT = {};

  /*
    Helpers
  */

  YT.parseUrl = function parseUrl(url) {



  };

  YT.convertLoadArguments = function convertLoadArguments(id, start, isUrl) {

    var end;

    if (typeof id === 'object') {

      var ytOptions = id;

      id = isUrl ? parseYtUrl(ytOptions.mediaContentUrl) : ytOptions.videoId;
      start = ytOptions.startSeconds;
      end = ytOptions.endSeconds;

    }

    var args = [
      id,
      {
        start: start,
        end: end
      }
    ];

    return args;

  };

  /*
    YT.Player Implementation
  */

  var YTPlayer = YT.Player = function YTPlayer(id, ytOptions) {
  
    var options = {};

    if (ytOptions.videoId) {
      options.load = ytOptions.videoId
    }

    if (ytOptions.events) {
      _.each(ytOptions.events, function (func, eventName) {
        console.log(eventName);
      });
    }

    Player.call(this, id, options);
  
  };

  YTPlayer.prototype = _.create(Player.prototype, {
    constructor: YTPlayer
  });

  YTPlayer.prototype.loadVideoById = function loadVideoById(id, start) {

    return this.loadVideo.apply(this, YT.convertLoadArguments(id, start));

  };

  YTPlayer.prototype.cueVideoById = function cueVideoById(id, start) {

    return this.cueVideo.apply(this, YT.convertLoadArguments(id, start));

  };

  YTPlayer.prototype.loadVideoByUrl = function loadVideoByUrl(url, start) {

    return this.loadVideo.apply(this, YT.convertLoadArguments(url, start, true));

  };

  YTPlayer.prototype.cueVideoByUrl = function cueVideoByUrl(url, start) {

    return this.cueVideo.apply(this, YT.convertLoadArguments(url, start, true));

  };

  YTPlayer.prototype.playVideo = YTPlayer.prototype.play;

  YTPlayer.prototype.pauseVideo = YTPlayer.prototype.pause;

  YTPlayer.prototype.stopVideo = YTPlayer.prototype.stop;

  YTPlayer.prototype.playVideo = YTPlayer.prototype.play;

  YTPlayer.prototype.seekTo = YTPlayer.prototype.seek;

  YTPlayer.prototype.unMute = YTPlayer.prototype.unmute;

  /*
    YouTube IFrame API Wrapping
  */

  if (MLLVP.config.ytWrapper) {

    // Export MLLVP.YT
    window.YT = YT;

    // Call onYouTubeIframeAPIReady
    if (window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady();
    }

  }

  /*
    Player States
  */

  // https://developers.google.com/youtube/iframe_api_reference#getPlayerState
  // https://developers.google.com/youtube/iframe_api_reference#onStateChange
  YT.PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
  };

  /*
    Events
  */

  // https://developers.google.com/youtube/iframe_api_reference#Events
  YT.Events = ['onReady', 'onStateChange', 'onPlaybackQualityChange', 'onPlaybackRateChange', 'onError', 'onApiChange'];

  var eventBindings = {
    'onReady': 'ready',
    'onStateChange': 'stateChange',
    'onError': 'error'
  };

  YTPlayer.prototype.addEventListener = function (ytEventName, listener) {

    if (YT.Events.indexOf(ytEventName) === -1) {
      throw new Error('Event "' + ytEventName + '" is not a valid YouTube IFrame API event.');
    }

    var eventName = eventBindings[ytEventName];

    if (!eventName) {
      throw new Error('Event "' + ytEventName + '" is not supported.');
    }

    // Do we have an MLLVP event for that?
    if (eventBindings[eventName]) {
      YTPlayer.prototype
    }

  };

  _.each(YT.Events, function (eventName) {

    // Do we have an MLLVP event for that?
    if (eventBindings[eventName]) {
      YTPlayer.prototype[eventName]
    }
    
  });

}(window, _, Q, MLLVP));