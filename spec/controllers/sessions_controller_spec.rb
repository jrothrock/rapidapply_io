# frozen_string_literal: true

require 'api/v1/auth/sessions_controller'
require 'rails_helper'

RSpec.describe Api::V1::Auth::SessionsController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'verifies that the token is different, as the user has logged in and then token is updated' do
        expect(User.count).to eq 0
        user = User.create!(first: 'test', last: 'test', email: 'test@test.com', password: 'test')
        expect(User.count).to eq 1
        expect(User.first.token).not_to be_empty
        expect(User.first.token_string).not_to be_empty

        post :create, params: { email: 'test@test.com', password: 'test' }

        expect(User.first.token).not_to eq user.token
        expect(User.first.token_string).not_to eq user.token_string
      end
    end
  end

  describe 'POST #destroy' do
    context 'with valid attributes' do
      it 'verifies that the token is unset on logout' do
        expect(User.count).to eq 0
        user = FactoryBot.create(:user)
        expect(User.count).to eq 1
        expect(User.first.token).not_to be_empty
        expect(User.first.token_string).not_to be_empty

        request.headers['Authorization'] = 'Bearer ' + User.first.token
        post :destroy, params: {}

        expect(User.first.token).to be_empty
        expect(User.first.token).to be_empty
      end
    end
  end
end
