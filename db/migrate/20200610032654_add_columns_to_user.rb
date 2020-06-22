# frozen_string_literal: true

class AddColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :encrypted_password, :string, null: false, default: ''
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    add_column :users, :sign_in_count, :integer, null: false, default: 0
    add_column :users, :last_sign_in_at, :datetime
    add_column :users, :current_siign_in_ip, :string
    add_column :users, :last_sign_in_ip, :string
    add_column :users, :token, :string
    add_column :users, :token_string, :string

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token
    add_index :users, :token_string
  end
end
