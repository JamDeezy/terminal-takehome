Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :bookings, only: [:index, :show] do
      post 'watch', on: :member
    end
  end

  # Client app catch-all
  get '*page', to: 'application#client', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
