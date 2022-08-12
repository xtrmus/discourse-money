class OdemelerController < ApplicationController
  def index
  Rails.logger.info 'Called OdemelerController#index'
    odemeler = PaymentStore.get_payments()

    render json: { odemeler: odemeler.values }
  end
end

