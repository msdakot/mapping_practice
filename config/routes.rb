Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  namespace :map do 
    get '/practice_02', :to => 'map#practice_02'
    get '/practice_03', :to => 'map#practice_03'
    get '/practice_04', :to => 'map#practice_04'
    get '/practice_05', :to => 'map#practice_05'
    get '/practice_06', :to => 'map#practice_06'
    get '/practice_07', :to => 'map#practice_07'
    get '/practice_08', :to => 'map#practice_08'
    get '/practice_09', :to => 'map#practice_09'
    get '/practice_10', :to => 'map#practice_10'
    get '/practice_11', :to => 'map#practice_11'
    get '/practice_12', :to => 'map#practice_12'
    get '/practice_13', :to => 'map#practice_13'
    get '/practice_14', :to => 'map#practice_14'
    get '/practice_15', :to => 'map#practice_15'

    # 로그프레소 맵 위젯으로 통으로 만들어 봅시다.
    get '/logpresso_map_widget', :to => 'map#logpresso_map_widget'

    root :to => 'map#index'
  end

  namespace :d3 do 
    get '/practice_02', :to => 'd3#practice_02'
    get '/practice_03', :to => 'd3#practice_03'
    get '/practice_04', :to => 'd3#practice_04'
    get '/practice_04', :to => 'd3#practice_04'
    get '/practice_05', :to => 'd3#practice_05'
    get '/practice_06', :to => 'd3#practice_06'
    root :to => 'd3#index'
  end


  root 'welcome#index'



  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
