import EmberObject, {set, computed, observer} from '@ember/object';
import discourseComputed from "discourse-common/utils/decorators";

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
          this.payments.pushObject(payment);
        }
      })
      .catch(console.error);
  },

  actions: {
    createPayment(adsoyad,paramiktari,ibanpapara,adres,durum,zaman) {
      if (!adsoyad || !paramiktari ||!ibanpapara ||!adres) {
		alert("Lütfen Bilgileri Eksiksiz Doldurun");
        return;
      }
	  
	  if(this.currentUser.custom_fields.money_value < paramiktari){
		alert("En Fazla Bakiyeniz Kadar Para Çekebilirsiniz");
		return;
	  }
	  
		Date.prototype.getFromFormat = function(format) {
			var yyyy = this.getFullYear().toString();
			format = format.replace(/yyyy/g, yyyy)
			var mm = (this.getMonth()+1).toString(); 
			format = format.replace(/mm/g, (mm[1]?mm:"0"+mm[0]));
			var dd  = this.getDate().toString();
			format = format.replace(/dd/g, (dd[1]?dd:"0"+dd[0]));
			var hh = this.getHours().toString();
			format = format.replace(/hh/g, (hh[1]?hh:"0"+hh[0]));
			var ii = this.getMinutes().toString();
			format = format.replace(/ii/g, (ii[1]?ii:"0"+ii[0]));
			var ss  = this.getSeconds().toString();
			format = format.replace(/ss/g, (ss[1]?ss:"0"+ss[0]));
			return format;
		};

		var d = new Date();
		var date = d.getFromFormat('yyyy-mm-dd hh:ii:ss');

      const paymentRecord = this.store.createRecord('payment', {
        id: Date.now(),
        kullaniciadi: this.currentUser.username,
		adsoyad: adsoyad,
		paramiktari: paramiktari,
		ibanpapara: ibanpapara,
		adres: adres,
		durum: "İşlem Aşamasında",
		zaman: date
      });

      paymentRecord.save()
        .then(result => {
          this.payments.pushObject(result.target);
        })
        .catch(console.error);
    },
	
	updatePayment(payment){
		this.store.update('payment', payment.id, {
			id: payment.id,
			kullaniciadi: payment.kullaniciadi,
			adsoyad: payment.adsoyad,
			paramiktari: payment.paramiktari,
			ibanpapara: payment.ibanpapara,
			adres: payment.adres,
			durum: "Ödeme Yapıldı",
			zaman: payment.zaman
		  });

		

    },
	

    deletePayment(payment) {
      this.store.destroyRecord('payment', payment)
        .then(() => {
          this.payments.removeObject(payment);
        })
        .catch(console.error);
    },
	
  }
});