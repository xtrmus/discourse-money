# frozen_string_literal: true

# name: discourse-money
# about: SorHadi Para Eklentisi
# version: 1.0.0
# author: Alshain <xtrmus2319@gmail.com>
# url: https://github.com/discourse/discourse-money
# transpile_js: true

enabled_site_setting :money_enabled

DiscoursePluginRegistry.serialized_current_user_fields << "see_money"
DiscoursePluginRegistry.serialized_current_user_fields << "money_value"

load File.expand_path('../app/payment_store.rb', __FILE__)

register_asset "javascripts/discourse/templates/connectors/user-custom-preferences/money-preferences.hbs"
register_asset "javascripts/discourse/templates/connectors/user-summary-stat/user-summary-stat.hbs"
register_asset "javascripts/discourse/templates/connectors/user-profile-controls/user-profile-controls.hbs"
register_asset "stylesheets/common/money.scss"

after_initialize do
  User.register_custom_field_type('see_money', :boolean)
  User.register_custom_field_type('money_value', :text)
  
  load File.expand_path('../app/controllers/paracek_controller.rb', __FILE__)
  load File.expand_path('../app/controllers/payments_controller.rb', __FILE__)
  load File.expand_path('../app/controllers/odemeler_controller.rb', __FILE__)
  load File.expand_path('../app/controllers/odemeyap_controller.rb', __FILE__)

  
   Discourse::Application.routes.append do
    get '/odemeler' => 'odemeler#index'
	get '/u/:username/paracek' => 'paracek#index', constraints: { username: RouteFormat.username }
	get '/u/:username/odemeyap' => 'odemeyap#index', constraints: { username: RouteFormat.username }
	
	get '/payments' => 'payments#index'
	put '/payments/:payment_id' => 'payments#update'
	patch '/payments/:payment_id' => 'payments#patch'
	delete '/payments/:payment_id' => 'payments#destroy'
	
   end

  # add to class and serializer to allow for default value for the setting
  add_to_class(:user, :see_money) do
    if custom_fields['see_money'] != nil
      custom_fields['see_money']
    else
      SiteSetting.money_default
    end
  end

  add_to_serializer(:user, :see_money) do
    object.see_money
  end

  register_editable_user_custom_field [:see_money, :money_value]

  allow_public_user_custom_field :money_value

  add_to_serializer(:post, :user_money) do
    object.user.custom_fields['money_value'] if object.user
  end
end


