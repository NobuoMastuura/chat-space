FactoryBot.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/uploads/message/image/26/48504164-D7F2-4E59-A1E3-43A4DD53858A.jpg")
    user
    group
  end
end
