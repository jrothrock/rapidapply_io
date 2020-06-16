# frozen_string_literal: true

require 'jwt'
require 'bcrypt'
require 'securerandom'
class User < ApplicationRecord
  validates_presence_of :first
  validates_presence_of :last
  validates_presence_of :email
  validates_presence_of :encrypted_password

  attr_reader :password
  include BCrypt

  validates_format_of :email, with: /\A*.(?=.*\@\b)(?=.*\.\b).*\Z/, on: :create

  before_create :create_token

  def self.find_by_credentials(email, password)
    user = User.where('email = ?', email).first
    begin
      if user.password == password
        begin
          user.create_token
          user.save!
        rescue StandardError
          retry
        end
        user
      end
    rescue StandardError
      nil
    end
 end

  def self.find_by_token(token)
    if token && token != 'undefined'
      decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' }
      random_string = decoded_token[0]['string']
      user = User.where('token_string = ?', random_string).first
      return user
    end
    false
  rescue StandardError => e
    logger.info '---BEGIN---'
    logger.info 'Error in find by token'
    logger.info "Time: #{Time.now}"
    logger.debug e
    logger.info '---END---'
    false
  end

  def password
    @password ||= Password.new(encrypted_password)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.encrypted_password = @password
  end

  def self.setUUID
    uuid = SecureRandom.hex(20)
    raise 'Go buy some lotto tickets, UUID has a duplicate!' if User.unscoped.where('uuid = ?', uuid).any?

    uuid
  rescue StandardError
    retry
  end

  def create_token
    begin
      random_string = SecureRandom.hex(20)
      if User.unscoped.where('token_string = ?', random_string).any? then raise 'Go buy some lotto tickets, the token_string has a duplicate!' end
    rescue StandardError
      retry
    end
    self.token_string = random_string
    payload = { string: token_string }
    token = JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
    self.token = token
  end

  def self.logout(token)
    decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' }
    random_string = decoded_token[0]['string']
    user = User.where('token_string = ?', random_string).first
    if user.email
      user.token = ''
      user.token_string = ''
      user.save!
      true
    end
  rescue StandardError
    false
  end
end
