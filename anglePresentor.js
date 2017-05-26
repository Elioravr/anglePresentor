$.widget("custom.anglePresentor", {
  options: {
    dimensions: 150,
    minPosibleValue: 0,
    maxPosibleValue: 360,
    mainContainerBackgroundBorderColor: '#333',
    mainContainerBackground: '#ccc',
    valuePointsBackground: 'red',
    valuePointsBorderColor: '#333',
    selectedAreaBackground: '#777',
    selectedAreaBorderColor: '#333',
  },
  _create: function () {
    this._validateOptions()
    var dimensions = this.options.dimensions

    var canvasJquery = $('<canvas></canvas>')
                   .attr('width', dimensions + 'px')
                   .attr('height', dimensions + 'px')

    this._domCanvas = canvasJquery[0]
    this._c = this._domCanvas.getContext('2d')

    this._initConsts()
    this._initAnglesContainer()
    this._initValuesAnglesContainer()
    this._initValueCircle(this.options.minValue)
    this._initValueCircle(this.options.maxValue)

    this.element
      .addClass("jquery-angle-presentor")
      .hide()
      .after(canvasJquery)
  },
  _validateOptions: function () {
    if (!parseInt(this.options.minValue)) {
      throw 'anglesPresentor: You must fill minValue as an option'
    }
    if (!parseInt(this.options.maxValue)) {
      throw 'anglesPresentor: You must fill minValue as an option'
    }
    if (parseInt(this.options.dimensions) < 100) {
      throw 'anglesPresentor: You can\'t fill dimensions that is smaller than 100'
    }
    if (parseInt(this.options.maxValue) > parseInt(this.options.maxPosibleValue)) {
      throw 'anglesPresentor: You can\'t fill maxValue that is bigger than the maxPosibleValue'
    }
    if (parseInt(this.options.minValue) < parseInt(this.options.minPosibleValue)) {
      debugger
      throw 'anglesPresentor: You can\'t fill minValue that is smaller than the minPosibleValue'
    }
    if (parseInt(this.options.minValue) > parseInt(this.options.maxValue)) {
      throw 'anglesPresentor: You can\'t fill minValue that is bigger than the maxValue'
    }
    if (parseInt(this.options.minValue) > 360 ||
        parseInt(this.options.maxValue) > 360 ||
        parseInt(this.options.minPosibleValue) > 360 ||
        parseInt(this.options.maxPosibleValue) > 360) {
      throw 'anglesPresentor: You can\'t fill any angle that is bigger than 360'
    }
  },
  _initConsts: function () {
    var dimensions = this.options.dimensions

    this.DIMENSIONS = dimensions
    this.PADDING = 35
    this.BIGGEST_RADIUS = this.DIMENSIONS / 2 - this.PADDING
    this.MAX_X = this.DIMENSIONS - this.PADDING
    this.MAX_Y = this.DIMENSIONS - this.PADDING
    this.CENTER_POINT_X = this.DIMENSIONS / 2
    this.CENTER_POINT_Y = this.DIMENSIONS / 2
  },
  _initAnglesContainer: function () {
    var backgroundColor = this.options.mainContainerBackground
    var borderColor = this.options.mainContainerBorderColor
    var x = this.CENTER_POINT_X
    var y = this.CENTER_POINT_Y
    var radius = this.BIGGEST_RADIUS
    var startPoint = this._toRadians(this.options.minPosibleValue)
    var endPoint = this._toRadians(this.options.maxPosibleValue)

    this._drawCircle(backgroundColor, borderColor, x, y, radius, startPoint, endPoint)
  },
  _initValuesAnglesContainer: function () {
    var backgroundColor = this.options.selectedAreaBackground
    var borderColor = this.options.selectedAreaBorderColor
    var x = this.CENTER_POINT_X
    var y = this.CENTER_POINT_Y
    var radius = this.BIGGEST_RADIUS
    var startPoint = this._toRadians(this.options.minValue)
    var endPoint = this._toRadians(this.options.maxValue)

    this._drawCircle(backgroundColor, borderColor, x, y, radius, startPoint, endPoint)
  },
  _initLabels: function (x, y, text) {
    var fontSize = 15;
    var labelsPadding = 10;

    if (this.DIMENSIONS > 500) {
      fontSize = 25;
      labelsPadding = 25;
    } else if (this.DIMENSIONS < 300) {
      fontSize = 13;
    }

    this._c.fillStyle = 'black'
    this._c.font = fontSize + 'px Arial'
    this._c.fillText(text+'°', x + labelsPadding, y + labelsPadding)
  },
  _initValueCircle: function (angle) {
    var dimensions = this.options.dimensions
    var backgroundColor = this.options.valuePointsBackground
    var borderColor = this.options.valuePointsBorderColor
    var x = this._getXFromAngle(angle)
    var y = this._getYFromAngle(angle)

    var radius = 8;
    if (this.DIMENSIONS > 500) {
      radius = 15;
    }

    var startPoint = this._toRadians(0)
    var endPoint = this._toRadians(360)

    this._drawCircle(backgroundColor, borderColor, x, y, radius, startPoint, endPoint)
    this._initLabels(x, y, angle)
  },
  _drawCircle: function (backgroundColor, borderColor, x, y, radius, startPoint, endPoint) {
    this._c.fillStyle = backgroundColor
    this._c.strokeStyle = borderColor
    this._c.beginPath();

    if (startPoint !== this._toRadians(0) || endPoint !== this._toRadians(360)) {
      this._c.moveTo(x, y);
    }

    this._c.arc(x, y, radius, startPoint, endPoint, false);
    this._c.closePath()
    this._c.fill();
    this._c.stroke();
  },
  _getXFromAngle(angle) {
    return Math.cos(this._toRadians(angle)) * this.BIGGEST_RADIUS + this.CENTER_POINT_X
  },
  _getYFromAngle(angle) {
    return Math.sin(this._toRadians(angle)) * this.BIGGEST_RADIUS + this.CENTER_POINT_Y
  },
  _toRadians: function (angle) {
    return angle * (Math.PI / 180) + Math.PI / 2;
  }
})
