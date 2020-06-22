# frozen_string_literal: true

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

    context 'with invalid attributes' do
      it 'verifies that the user isn\'t created if already created' do
        expect(User.count).to eq 0
        post :create, params: { firstname: 'test', lastname: 'test', email: 'test@test.com', password: 'test' }
        expect(User.count).to eq 1

        post :create, params: { firstname: 'test', lastname: 'test', email: 'test@test.com', password: 'test' }
        expect(response.status).to eq(409)
      end

      it 'verifies that the user isn\'t created with invalid email' do
        expect(User.count).to eq 0
        post :create, params: { firstname: 'test', lastname: 'test', email: 'testinvalidemail.com', password: 'test' }
        expect(User.count).to eq 0
      end
    end
  end
end
