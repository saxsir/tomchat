/*
 * tomchat JavaScript Library v0.0.1
 * https://github.com/saxsir/tomchat
 *
 * Includes
 *   - jQuery.js(http://jquery.com/)
 *   - bootstrap.js(http://getbootstrap.com/)
 *
 * Copyrights 2013 saxsir
 *
 * Released under the MIT license
 * http://choosealicense.com/licenses/mit/
 *
 * Date: 2013-10-06
 */
;
(function (window, $) {
  //@notice Connect WebSocket server
  var port = 8124,
    host = 'sandbox.in.net',
    ws = new WebSocket('ws://' + host +  ':' + port + '/');

  //@notice Put a random user name
  var userName = 'ゲスト' + Math.floor(Math.random() * 100);
  $('#user-name').append(userName);

  var closeBtn = $('<button>')
    .attr({
      type: 'button',
      class: 'close',
      'data-dismiss': 'alert',
      'aria-hidden': 'true'
    })
    .html('&times;');

  //@notice When succeeded connecting to server
  ws.onopen = function () {
    $('#textbox').focus();
    ws.send(JSON.stringify({
      type: 'join',
      user: userName
    }));
  };

  //@notice When got a message
  ws.onmessage = function (event) {
    //@notice Parse message
    var data = JSON.parse(event.data),
      item = $('<li>').append(
        $('<div>').append(
          $('<span>').addClass('glyphicon glyphicon-user'),
          $('<small>').addClass('meta chat-time').append(data.time))
      );

    switch (data.type) {
      case 'join':
        item.addClass('alert alert-info')
          .prepend(closeBtn)
          .children('div').children('span').after(' ' + data.user + 'が入室しました');
        break;

      case 'chat':
        //@notice As link automatically when text is url
        data.text = data.text.replace(/(http:\/\/[\x21-\x7e]+)/i, "<a href='$1'>$1</a>");
        data.text = data.text.replace(/(https:\/\/[\x21-\x7e]+)/i, "<a href='$1'>$1</a>");
        item.addClass('well well-small')
          .append($('<div>').html(data.text))
          .children('div').children('span').after(' ' + data.user);
        break;

      case 'defect':
        item.addClass('alert')
          .prepend(closeBtn)
          .children('div').children('span').after(' ' + data.user + 'が退室しました');
        break;

      default:
        item.addClass('alert alert-error')
          .children('div').children('span').removeClass('glyphicon glyphicon-user').addClass('glyphicon glyphicon-warning-sign')
          .after('不正なメッセージを受信しました');
    }

    $('#chat-history').prepend(item).hide().fadeIn(200);
  };

  //@notice When errors occured
  ws.onerror = function (e) {
    var span = $('<span>')
      .addClass('glyphicon glyphicon-warning-sign');
    $('#chat-area').empty()
      .addClass('alert alert-dismissable alert-danger')
      .append(closeBtn, span, 'サーバーに接続できませんでした');
  };

  //@notice Send a talk
  var textbox = $('#textbox');
  textbox.on('keydown', function (event) {
    if (event.keyCode === 13 && textbox.val().length > 0) {
      ws.send(JSON.stringify({
        type: 'chat',
        user: userName,
        text: textbox.val()
      }));
      textbox.val('');
    }
  });

  //@notice Before closing browser
  window.onbeforeunload = function () {
    ws.send(JSON.stringify({
      type: 'defect',
      user: userName,
    }));
  };
}(window, jQuery));