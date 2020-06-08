FactoryBot.define do
    factory :user do
      first { Faker::Name.first_name }
      last { Faker::Name.last_name }
      email { Faker::Internet.email }
    end
  end