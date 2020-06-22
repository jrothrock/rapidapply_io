# frozen_string_literal: true

class Api::V1::Auth::UsersController < ApplicationController
  def new; end

  def create
    user = User.new

    user.email = params[:email].downcase
    user.first = params[:firstname].capitalize
    user.last = params[:lastname].capitalize

    user.password = params[:password].strip
    begin
      if user.save
        render json: {
          token: user.token,
          email: user.email
        }, status: :ok
      else
        if user.errors.key?(:email)
          render json: { email: true, message: 'Email is invalid' }, status: :bad_request
        else
          render json: { message: user.errors.full_messages }, status: :bad_request
        end
      end
    rescue ActiveRecord::RecordNotUnique => e
      puts e.message
      render json: {}, status: :conflict
    end
  end
end
