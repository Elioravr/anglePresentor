$.widget("custom.anglePresentor", {
  options: {
    dimensions: 150,
    minPosibleValue: 0,
    maxPosibleValue: 360
  },
  _create: function () {
    var dimensions = this.options.dimensions

    var canvasJquery = $('<canvas></canvas>')
                   .attr('width', dimensions)
                   .attr('height', dimensions)

    var domCanvas = canvasJquery[0]
    var c = domCanvas.getContext('2d')

    c.fillStyle = '#ccc'
    c.strokeStyle = '#333'
    c.beginPath();
    var x = dimensions / 2
    var y = dimensions / 2
    var radius = dimensions / 2 - 10
    var startPoint = this._toRadians(this.options.minPosibleValue)
    var endPoint = this._toRadians(this.options.maxPosibleValue)

    c.arc(x, y, radius, startPoint, endPoint, false);
    c.fill();
    c.stroke();

    this.element
      .addClass("jquery-angle-presentor")
      .hide()
      .after(canvasJquery)
  },
  _toRadians: function (angle) {
    return angle * (Math.PI / 180);
  }
})

$(function() {
  $('.angle-presentor').anglePresentor()
})
