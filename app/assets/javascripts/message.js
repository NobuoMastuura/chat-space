$(function(){
  function buildHTML(message){
    var html =  `<div class="chat-content">
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
                    </div>
                  </div>
                </div>`;
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(formData.get('message[content]'));
    $('.main-center').animate({scrollTop: $('.main-center')[0].scrollHeight}, 100, 'swing');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-contents").append(html)
      $(".main-bottom__message").val("")
    })
  });
  // // 自動更新機能
  var interval = setInterval(function() {
    // 他のページに移動したときには自動更新をしないために
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
  // //     // location.hrefとすることで現在のアクションからデータを取得することができる
  // //     // urlの一番後ろの.jsonっていうのはデータタイプの指定
      url: location.href,
      dataType: 'json',
    })
  //   // jbulderから受け取った情報がjsonに入っている
    .done(function(json) {
      var insertHTML = ""
      json.forEach(function(message){
        insertHTML += buildHTML(message);
      });
      $(".chat-contents").html(insertHTML);
      console.log("自動更新")
    })
    .fail(function(json) {
      alert("自動更新に失敗しました");
    });
  } else {
    clearInterval(interval);
  }}, 5 * 1000 );
});
