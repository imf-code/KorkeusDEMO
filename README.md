# KorkeusDEMO
Web-sovellus numeerisen korkeusdatan visualisoimiseen.
- [Prototyyppivaiheessa oleva C++ versio](https://github.com/imf-code/KorkeusCPP)
- [Pelkästään selaimen vaativa riisuttu versio](https://github.com/imf-code/KorkeusDEMOnoMVC)

### Kuvaus
- Vaatii dotnet ympäristön toimiakseen. (Yllä linkki riisuttuun versioon.)
- **Demo aukeaa indeksisivulle, jossa myös käyttöohjeet.**
- Ohjelma avaa käyttäjän antaman, korkeusdataa sisältävän, .asc tiedoston kovalevyltä ja piirtää sen perusteella karttakuvan.
- Ohjelmalla on mahdollista värittää kartta myös kahadella eri värillä, käyttäjän määrittämän korkeuden perusteella.
- Sisältää myös keskeneräisen tietokantaominaisuuden, jonka perusominasuudet toimivat, mutta joka vaatii valmiin tietokannan.

### Korkeusdata
-  [Karttalehti L3324 testausta varten (Google Drive -linkki)](https://drive.google.com/open?id=1NEDHwa4FT27VzYHhrSQeiCt0eli4hdzc)
- Ohjelman tukema korkeusdata on vapaasti ladattavissa Maanmittauslaitoksen sivuilta:
- https://tiedostopalvelu.maanmittauslaitos.fi/tp/kartta (korkeusmalli 10m, ascii-enkoodattu versio; myös 2m versio toimii, mutta sen käsittely voi olla varsin hidasta)

### Demosta
- Toteutus HTML:ää ja JavaScriptiä käyttäen
- Pohjalla ASP.NET MVC ja .NET Core 2.1
- **Pääasiallinen ohjelmakoodi: ./wwwroot/js/clientdraw/**
- Tietokantatoiminnot toteutettu dotnetin Entity Framework:ia hyödyntäen. Kooditiedostot: MapController.cs, dbControls.cs ja database.js
