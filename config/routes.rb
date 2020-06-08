Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '/', to: 'home#index'
  
  namespace :api do
    namespace :v1 do
      namespace :auth do
        post '/signup', to: 'users#create', as: 'add_user'
        post '/signin', to: 'sessions#create', as: 'signin'
        post '/signout', to: 'sessions#destroy', as: 'logout'
      end
    end
  end
end
