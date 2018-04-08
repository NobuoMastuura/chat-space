json.array! @messages.each do |message|
  json.name   message.user.name
  json.data   message.created_at.strftime("%Y %m/%d %H:%M")
  json.content   message.content
  json.image  message.image
  json.id     message.id
end