require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:first) }
  it { should validate_presence_of(:last) }
  it { should validate_presence_of(:email) }
end
