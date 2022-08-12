class PaymentStore
  class << self
    def get_payments
      PluginStore.get('paracek', 'payments') || {}
    end

    def add_payment(payment_id, payment)
      payments = get_payments()
      payments[payment_id] = payment
      PluginStore.set('paracek', 'payments', payments)

      payment
    end
	
	def update_payment(payment_id, payment)
      payments = get_payments()
      payments[payment_id].durum = "Ödeme Yapıldı"
      PluginStore.set('paracek', 'payments', payments)
    end

    def remove_payment(payment_id)
      payments = get_payments()
      payments.delete(payment_id)
      PluginStore.set('paracek', 'payments', payments)
    end
  end
end