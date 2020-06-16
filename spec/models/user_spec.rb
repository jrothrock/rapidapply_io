# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:first) }
  it { should validate_presence_of(:last) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:encrypted_password) }

  it { should allow_value('test@test.com').for(:email) }
  it { should_not allow_value('test.com').for(:email) }
  it { should_not allow_value('test').for(:email) }

  it 'has a valid Factory' do
    expect(FactoryBot.create(:user)).to be_valid
  end

  it 'verifies that the token is set' do
    expect(User.count).to eq 0
    FactoryBot.create(:user)
    expect(User.count).to eq 1
    expect(User.first.token).not_to be_empty
    expect(User.first.token_string).not_to be_empty
  end
end
