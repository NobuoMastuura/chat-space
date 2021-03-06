$(function(){
  // 生成するメッセージ部分
  function buildHTML(message){
    var insertImage = '';
    if (message.image) {
    var insertImage = `<img src="${message.image}", class: "lower-message__image">`;
    }
    var html =  `<div class="chat-content-main" data-message-id="${message.id}">
                  <div class="chat-box">
                    <div class="chat-data">
                      <div class="chat-data__chat__name">
                        ${message.name}
                      </div>
                      <div class="chat-data__chat__date">
                        ${message.data}
                      </div>
                    </div>
                    <div class="chat__content">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                      ${insertImage}
                    </div>
                  </div>
                </div>`;
    return html;
  }
  // メッセージ送信時のイベント
  $('.new_message').on('submit', function(e){
    // デフォルトで設定してあるsubmitを止めるためためにpreventDefaultで送信を止める
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.form__submit').attr('disabled', false)
      $(".chat-contents").append(html)
      $(".hidden").val("")
      $(".main-bottom__message").val("")
      $('.main-center').animate({scrollTop: $('.main-center')[0].scrollHeight}, 100, 'swing');
    })
  });
  // 自動更新機能
  var interval = setInterval(function() {
    // lastメソッドで要素の一番最後のものを取得することができる
    var id = $('.chat-content-main').last().data('message-id');
    var url = window.location.href;
    // 他のページに移動したときには自動更新をしないために
    if (url.match(/\/groups\/\d+\/messages/)){
    $.ajax({
      // location.hrefとすることで現在のアクションからデータを取得することができる
      // urlの一番後ろの.jsonっていうのはデータタイプの指定
      url: url,
      type: 'GET',
      data: {id: id},
      dataType: 'json',
    })
    // jbulderから受け取った情報がjsonに入っている
    .done(function(json) {
      if (json.length !== 0){
        json.forEach(function(message){
          $(".chat-contents").append(buildHTML(message));
        });
      }
      $('.form__submit').attr('disabled', false)
      $('.main-center').animate({scrollTop: $('.main-center')[0].scrollHeight}, 100, 'swing');
    })
    .fail(function(json) {
      alert("自動更新に失敗しました");
    });
  } else {
    clearInterval(interval);
  }}, 5 * 1000 );
});
