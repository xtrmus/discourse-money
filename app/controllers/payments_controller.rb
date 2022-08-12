class PaymentsController < ApplicationController
  def index
    Rails.logger.info 'Called PaymentsController#index'
    payments = PaymentStore.get_payments()

    render json: { payments: payments.values }
  end

  def update
    Rails.logger.info 'Called PaymentsController#update'

    payment_id = params[:payment_id]
    payment = {
      'id' => payment_id,
	  'kullaniciadi' => params[:payment][:kullaniciadi],
      'adsoyad' => params[:payment][:adsoyad],
	  'paramiktari' => params[:payment][:paramiktari],
	  'ibanpapara' => params[:payment][:ibanpapara],
	  'adres' => params[:payment][:adres],
	  'durum' => params[:payment][:durum],
	  'zaman' => params[:payment][:zaman],
    }

    PaymentStore.add_payment(payment_id, payment)

    render json: { payment: payment }
  end
  
  def patch
    Rails.logger.info 'Called PaymentsController#patch'
	
	payment_id = params[:payment_id]
    payment = {

	  'durum' => "Tamamlandı"
    }

    PaymentStore.update_payment(payment_id, payment)

    render json: success_json
  end

  def destroy
    Rails.logger.info 'Called PaymentsController#destroy'

    PaymentStore.remove_payment(params[:payment_id])

    render json: success_json
  end
end