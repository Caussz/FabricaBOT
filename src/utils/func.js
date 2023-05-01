const { sizeFormatter } = require('human-readable')

let formatp = sizeFormatter({
    std: 'JEDEC', 
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
  })
  
  function runtime(seconds) {
    seconds = Number(seconds);
      let d = Math.floor(seconds / (3600 * 24));
      let h = Math.floor(seconds % (3600 * 24) / 3600);
      let m = Math.floor(seconds % 3600 / 60);
      let s = Math.floor(seconds % 60);
      let dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " dias, ") : "";
      let hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
      let mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
      let sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
  }

module.exports = {
    formatp,
    runtime
}