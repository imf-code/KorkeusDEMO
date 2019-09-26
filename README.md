# KorkeusDEMO
Web-sovellus numeerisen korkeusdatan visualisoimiseen.

1. Kuvaus:
- Ohjelma avaa käyttäjän antaman, korkeusdataa sisältävän, .asc tiedoston kovalevyltä ja piirtää sen perusteella maanpinnan korkeutta kuvaavan karttakuvan.
- Demo aukeaa indeksisivulle.

2. Korkeusdata:
- **(Demon indeksisivulla on latauslinkki testitiedostoon.)**
- Ohjelman tukema korkeusdata on vapaasti ladattavissa Maanmittauslaitoksen sivuilta:
- https://tiedostopalvelu.maanmittauslaitos.fi/tp/kartta (korkeusmalli 10m, ascii-encoodattu versio)

3. Demosta
- Toteutus HTML:lä ja JavaScriptillä
- Käyttää ASP.NET MVC:tä ja .NET Core 2.1:tä
- *Itse koodi: /wwwroot/js/ClientDraw.js*
- Muut sivut/tiedostot ovat tällä hetkellä ASP.NET MVC:n oletuksia.

4. Tiedossa olevat ongelmat:
- Ohjelma ei tässä vaiheessa osaa käsitellä oikein dataa, joka sisältää tyhjiä/NODATA arvoja.
