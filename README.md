# KorkeusDEMO
Web-sovellus numeerisen korkeusdatan visualisoimiseen.

1. Kuvaus:
- Ohjelma avaa käyttäjän antaman, korkeusdataa sisältävän, .asc tiedoston kovalevyltä ja piirtää sen perusteella karttakuvan.
- Demo aukeaa indeksisivulle, jossa myös käyttöohjeet.

2. Korkeusdata:
- **(Demon indeksisivulla on latauslinkki testitiedostoon.)**
- Ohjelman tukema korkeusdata on vapaasti ladattavissa Maanmittauslaitoksen sivuilta:
- https://tiedostopalvelu.maanmittauslaitos.fi/tp/kartta (korkeusmalli 10m, ascii-enkoodattu versio)

3. Demosta
- Toteutus HTML:ää ja JavaScriptiä käyttäen
- Pohjalla ASP.NET MVC ja .NET Core 2.1 mahdollisia lisäominaisuuksia varten
- *Varsinainen koodi: /wwwroot/js/ClientDraw.js*
- Muut sivut/tiedostot ovat tällä hetkellä dotnetin oletuksia

4. Tiedossa olevat ongelmat:
- Ohjelma ei tässä vaiheessa osaa käsitellä oikein dataa, joka sisältää tyhjiä/NODATA arvoja.
