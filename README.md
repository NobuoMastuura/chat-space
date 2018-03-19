# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id      |integer|null: false, foreign_key: true|
|name    |string |null: false|
|email   |string |null: false, add_index unique: true|
|password|string |null: false|

### Association
- has_many :chats
- has_many :rooms, through: :room_users


## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|id            |integer|null: false, foreign_key: true|
|content       |text   |null: false|
|image         |text|
|room_id       |integer|null: false, foreign_key: true|
|user_id       |integer|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :room


## roomsテーブル
|Column|Type|Options|
|------|----|-------|
|id        |integer|null: false, foreign_key: true|
|name |string|null: false|

### Association
- has_many :users, through: :room_users
- has_many :chats


## room_userテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|room_id|integer|null: false, foreign_key: true|


### Association
belongs_to :user
belongs_to :room
