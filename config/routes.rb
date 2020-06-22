# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      namespace :auth do
        post '/signup', to: 'users#create', as: 'add_user'
        post '/signin', to: 'sessions#create', as: 'signin'
        post '/signout', to: 'sessions#destroy', as: 'logout'
      end
    end
  end

  # IMPORTANT #
  # Forward all requests to home#index except for those that are AJAX.
  # This is needed for React routing to work correctly

  get '*page', to: 'home#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
  root 'home#index'
end
