# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first { Faker::Name.first_name }
    last { Faker::Name.last_name }
    email { Faker::Internet.email }
    # really just needs to be any string
    password { Faker::Name.last_name }
  end
end
