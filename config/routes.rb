Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'pages#home'
  get 'about', to: 'pages#about'
  get 'faqs', to: 'pages#faqs'
  resources :contacts
  get 'contact-us', to: 'contacts#new'
end
