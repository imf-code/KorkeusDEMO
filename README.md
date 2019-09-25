# KorkeusDEMO
Web-sovellus numeerisen korkeusdatan visualisoimiseen.

Demosta:
Demo aukeaa indeksisivulle.
Itse javascript koodi: /wwwroot/js/ClientDraw.js
Muut sivut/tiedostot ovat tällä hetkellä Asp.net MVC:n oletuksia.

Korkeusdata:
Korkeusdata on vapaasti ladattavissa Maanmittauslaitoksen sivuilta:
https://tiedostopalvelu.maanmittauslaitos.fi/tp/kartta (korkeusmalli 10m, ascii-encoodattu versio)
(HUOM! Demon indeksisivulla on suora latauslinkki testitiedostoon.)

Known issues:
-Ohjelma ei osaa käsitellä oikein dataa, joka sisältää tyhjiä/NODATA arvoja.