# frozen_string_literal: true

require 'api/v1/auth/users_controller'
require 'rails_helper'

RSpec.describe Api::V1::Auth::UsersController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'verifies that the user is created' do
        expect(User.count).to eq 0

        post :create, params: { firstname: 'test', lastname: 'test', email: 'test@test.com', password: 'test' }

        expect(User.count).to eq 1
      end
    end
  end
end
