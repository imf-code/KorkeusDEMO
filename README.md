# KorkeusDEMO
Web-sovellus numeerisen korkeusdatan visualisoimiseen.

1. Demosta:
- Toteutus HTML:lä ja JavaScriptillä
- Käyttää ASP.NET MVC:tä ja .NET Core 2.1:tä

- Demo aukeaa indeksisivulle.
- Itse javascript koodi: /wwwroot/js/ClientDraw.js
- Muut sivut/tiedostot ovat tällä hetkellä ASP.NET MVC:n oletuksia.

2. Korkeusdata:
- Ohjelman tukema korkeusdata on vapaasti ladattavissa Maanmittauslaitoksen sivuilta:
- https://tiedostopalvelu.maanmittauslaitos.fi/tp/kartta (korkeusmalli 10m, ascii-encoodattu versio)
- **(HUOM! Demon indeksisivulla on latauslinkki testitiedostoon.)**

3. Tiedossa olevat ongelmat:
- Ohjelma ei tässä vaiheessa osaa käsitellä oikein dataa, joka sisältää tyhjiä/NODATA arvoja.
