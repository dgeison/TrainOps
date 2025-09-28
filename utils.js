// utils.js
// Funções utilitárias de data/idade utilizadas nos controllers e views.
// Mantidas simples para fins de estudo.

module.exports = {
  /**
   * Calcula idade a partir de um timestamp (ms desde epoch) considerando mês e dia.
   * @param {number} timestamp
   * @returns {number} idade em anos
   */
  age: function age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    // Ajuste se ainda não fez aniversário no ano corrente
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    return age;
  },

  /**
   * Converte timestamp para múltiplos formatos úteis em formulários e exibição.
   * @param {number} timestamp
   * @returns {{day:string, month:string, year:string, iso:string, birthDay:string}}
   */
  date: function (timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`, // Formato ISO usado em inputs type="date"
      birthDay: `${day}/${month}` // Exibição simplificada (sem ano)
    };
  },
};
