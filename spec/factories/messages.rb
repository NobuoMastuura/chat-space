FactoryBot.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/uploads/message/image/35/B45236A6-FA0C-45A7-8D6F-F391CD538394.JPG")
    user
    group
  end
end
