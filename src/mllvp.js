(function (window, _, Q, Channel) {

  var document = window.document;

  console.log('Hello!', document.currentScript);

  /*
    Helpers
  */

  var getElement = function (element) {

    if (!element) {
      return;
    }

    if (typeof element === 'string') {
      return document.getElementById(element);
    }

    if (element.length) {
      element = element[0];
    }

    if (!isElement(element)) {
      return;
    }

    return element;

  };

  var isElement = function isElement(obj) {

    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof window.HTMLElement === 'function') {
      return (obj instanceof window.HTMLElement);
    }

    return (typeof obj.nodeName === 'string' && obj.nodeType === 1);

  };

  /*
    MLLVP
  */
  
  var MLLVP = window.MLLVP = window.MLLVP || {};
  
  MLLVP.config = _.assign({
    ytWrapper: true,
    host: 'https://embed.movielala.com/',
    channelScope: 'mllvp'
  }, window.MLLVPConfig || {});

  /*
    MLLVP.Player
  */

  var Player = MLLVP.Player = function (element, options) {

    if (!(this instanceof MLLVP.Player)) {
      return new MLLVP.Player(element, options);
    }

    this.options = _.assign({
      inFrameLoading: false
    }, MLLVP.config, options || {});

    // Get the element
    element = getElement(element);

    if (!element) {
      throw new Error('The element parameter must be an element or an ID for an element.');
    }

    this.element = element;

    // Create the frame
    this.frame = document.createElement('iframe');
    this.frame.allowFullscreen = true;
    this.frame.frameBorder = 0;

    // Should we load or cue a video?
    if (this.options.cue) {
      this.cueVideo.call(this, options.cue);
    } else if (this.options.load) {
      this.loadVideo.call(this, options.load);
    }

    // Append the frame
    this.element.appendChild(this.frame);

    // Create the channel
    this.channel = Channel.build({
      window: this.frame.contentWindow,
      origin: this.options.host,
      scope: this.options.channelScope
    });

    //iframe.src = MLLVP.config.host + '/embed/' + 

  };

  Player.states = ['NOTREADY', 'IDLE', 'BUFFERING', 'PLAYING'];
  Player.events = ['ready', 'stateChange', 'desiredStateChange', 'time', 'seek'];

  Player.prototype.loadVideo = function loadVideo(id, options) {

    if (typeof id === 'object') {
      options = id;
      id = options.id;
    }

    if (this.options.inFrameLoading) {
      throw new Error('Not yet implemented.');
    } else {
      this.frame.src = MLLVP.config.host + 'embed/' + id;
    }

  };

  Player.prototype.cueVideo = function loadVideo(id, options) {

    //this.loadVideo(id, options);

  };

  Player.prototype.play = function play() {

    var def = Q.defer();

    this.channel.call({
      method: 'play',
      success: def.resolve,
      error: def.reject
    });

    return def.promise;

  };

  Player.prototype.pause = function pause() {

    var def = Q.defer();

    this.channel.call({
      method: 'pause',
      success: def.resolve,
      error: def.reject
    });

    return def.promise;

  };

  Player.prototype.stop = function stop() {

    var def = Q.defer();

    this.channel.call({
      method: 'stop',
      success: def.resolve,
      error: def.reject
    });

    return def.promise;

  };

  Player.prototype.seek = function seek(seconds) {

    var def = Q.defer();

    this.channel.call({
      method: 'seek',
      params: {seconds: seconds},
      success: def.resolve,
      error: def.reject
    });

    return def.promise;

  };

  Player.prototype.mute = function mute() {

  };

  Player.prototype.unmute = function unmute() {

  };

  Player.prototype.isMuted = function isMuted() {

  };

  Player.prototype.setVolume = function setVolume() {

  };

  Player.prototype.getVolume = function getVolume() {

  };

  Player.prototype.getCurrentTime = function getCurrentTime() {

  };

}(window, _, Q, Channel));
