function initAnglePresentor() {
  $('.angle-presentor').anglePresentor({
    dimensions: $('#dimensions').val(),
    minPosibleValue: $('#minPosibleValue').val(),
    maxPosibleValue: $('#maxPosibleValue').val(),
    minValue: $('#minValue').val(),
    maxValue: $('#maxValue').val()
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
