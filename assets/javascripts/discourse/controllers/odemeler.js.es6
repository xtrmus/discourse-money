export default Ember.Controller.extend({
  init() {
    this._super();
    this.set('payments', []);
    this.fetchPayments();
  },

  fetchPayments() {
    this.store.findAll('payment')
      .then(result => {
        for (const payment of result.content.reverse()) {
          this.payments.pushObject({"kullaniciadi": payment.kullaniciadi, "paramiktari": payment.paramiktari, "ibanpapara": payment.ibanpapara, "durum": payment.durum, "zaman": payment.zaman});
        }
      })
      .catch(console.error);
  },

  actions: {
    createPayment(content) {
      if (!content) {
        return;
      }

      const paymentRecord = this.store.createRecord('payment', {
        id: Date.now(),
        content: content
      });

      paymentRecord.save()
        .then(result => {
          this.payments.pushObject(result.target);
        })
        .catch(console.error);
    },

    deletePayment(payment) {
      this.store.destroyRecord('payment', payment)
        .then(() => {
          this.payments.removeObject(payment);
        })
        .catch(console.error);
    }
  }
});