const DAY_START = 6 * 60 + 30; // 06h30
const NIGHT_START = 19 * 60; //   19h00

/** Nuit de 19h00 à 06h29, jour de 06h30 à 18h59. */
export function isNight(d = new Date()) {
  const m = d.getHours() * 60 + d.getMinutes();
  return m < DAY_START || m >= NIGHT_START;
}

/** Millisecondes jusqu'au prochain changement (06h30 ou 19h00 pile). */
export function msUntilNextSwitch(d = new Date()) {
  const m = d.getHours() * 60 + d.getMinutes();
  const target = m < DAY_START ? DAY_START : m < NIGHT_START ? NIGHT_START : DAY_START + 24 * 60;
  const now = m * 60 + d.getSeconds();
  return (target * 60 - now) * 1000 - d.getMilliseconds() + 50;
}

/** Exécuté avant l'affichage de la page : aucun clignotement blanc/noir au chargement. */
export const THEME_SCRIPT = `(function(){var d=new Date(),m=d.getHours()*60+d.getMinutes(),n=m<390||m>=1140,r=document.documentElement;r.classList.toggle('dark',n);r.style.colorScheme=n?'dark':'light';})();`;
