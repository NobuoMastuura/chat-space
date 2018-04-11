json.name @message.user.name
json.id @message.id
json.data @message.created_at.strftime("%Y %m/%d %H:%M")
json.content @message.content
json.image @message.image
