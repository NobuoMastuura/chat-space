# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id      |integer|null: false, foreign_key: true|
|name    |string |null: false|
|email   |string |null: false|
|password|string |null: false|

### Association
- has_many :chats
- has_many :rooms




## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|id            |integer|null: false, foreign_key: true|
|content       |text   |null: false|
|chat_room_id  |integer|null: false, foreign_key: true|
|user_id       |integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :room


## roomsテーブル
|Column|Type|Options|
|------|----|-------|
|id        |integer|null: false, foreign_key: true|
|room_name |string|null: false|


### Association
- belongs_to :user
- has_many   :rooms
