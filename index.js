function initAnglePresentor() {
  $('.angle-presentor').anglePresentor({
    dimensions: $('#dimensions').val(),
    minPosibleValue: $('#minPosibleValue').val(),
    maxPosibleValue: $('#maxPosibleValue').val(),
    minValue: $('#minValue').val(),
    maxValue: $('#maxValue').val(),
    mainContainerBackgroundBorderColor: $('#mainContainerBackgroundBorderColor').val(),
    mainContainerBackground: $('#mainContainerBackground').val(),
    valuePointsBackground: $('#valuePointsBackground').val(),
    valuePointsBorderColor: $('#valuePointsBorderColor').val(),
    selectedAreaBackground: $('#selectedAreaBackground').val(),
    selectedAreaBorderColor: $('#selectedAreaBorderColor').val()
  })
}

$(function() {
  initAnglePresentor()
  $('input').change(function(e) {
    $('canvas, .angle-presentor').remove()
    var form = $('.form')
    $('<div class="angle-presentor">').appendTo($('body'))

    try {
      initAnglePresentor()
    } catch (err) {
      e.preventDefault()
      alert(err)
    }
  })

  $('canvas').css('width', 300)
})
