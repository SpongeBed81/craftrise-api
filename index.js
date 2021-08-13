module.exports = {
    //jQuery <3
    //SpongeBed Was here...
    KullaniciBilgi: async function(kullaniciadi) {
        var hooman = require("hooman")
        if(!kullaniciadi) throw new TypeError("Kullanıcı Verisinin Çekilebilmesi İçin Bir Kullanıcı Adı Girilmelidir!")
        const response = await hooman.get(`https://www.craftrise.com.tr/oyuncu/${kullaniciadi}`)
      const source = await response.body
      const cheerio = require("cheerio")
      var $ = cheerio.load(source)
      var rankçek = $("body > div.profileTitle > div.profileTitle-generalInformation > div:nth-child(3) > p").text()
      var yetki = $("body > div.profileTitle > div.profileTitle-generalInformation > div:nth-child(2) > p").text()
      var aktiflik = $("body > div.profileTitle > div.buttons.align-items-parent > div > a > p").text()
      var kayıttarih = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(1) > td:nth-child(2)").text()
      var songiriş = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()
      var coinler = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()
      var arksayısı = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(4) > td:nth-child(2)").text()
      var profilimg = $("body > div.profileTitle > img").attr("src")

 
      var oynadığıoyun = $("body > div.profileTitle > div.buttons.align-items-parent > div").attr("title")
      var oyun = null
      if(oynadığıoyun === undefined) {
       oyun = "Oyun Oynamıyor"
      } else {
        oyun = oynadığıoyun.slice(10).replace("</b>", "")
      }
      var seviyetitle = $("body > div.profileTitle > div.profileTitle-generalInformation > div:nth-child(3)").attr("title")
      //console.log(seviyetitle)
      var isim = $("body > div.profileTitle > div.profileTitle-generalInformation > p").text()
      var tp1 = seviyetitle.split("<b>").join("")
      var tp2 = tp1.indexOf("Tecrübe puanı")
      var tp3 = tp1.slice(tp2)
      function reverse(s){
        return s.split("").reverse().join("");
    }
    var tp4 = reverse(tp3)
    var tp5 = tp4.indexOf(" ")
    var tp6 = tp4.slice(tp5)
    var tp7 = reverse(tp6)
    var tp8 = tp7.split("Tecrübe puanı: ").join("")
    var indexal9 = tp8.indexOf("TP")
    var indexal10 = tp8.indexOf("Sonraki")
    var kesme = tp8.slice(indexal10).split("Sonraki seviye: ").join("")
    var yinesubstrbruh = kesme.substring(0, kesme.length - 1)
    var substryapma = tp8.substring(0, indexal9-1)
      var jsonret = {Ad: isim, ProfilResmi: profilimg, Tag: yetki ,Seviye: rankçek, TP: substryapma, SonrakiSeviyeIcinTp: yinesubstrbruh, AktifMi: aktiflik, OynadigiOyun: oyun, KayitTarihi: kayıttarih, SonGiris: songiriş, Coinler: coinler, ArkadasSayisi: arksayısı}
      return jsonret
    },
    OyunlarBilgisiniAl: async function(kullaniciadi, oyunadi) {
      var hooman = require("hooman")
      if(!kullaniciadi) throw new TypeError("Kullanıcı Verisinin Çekilebilmesi İçin Bir Kullanıcı Adı Girilmelidir!")
      if(!oyunadi) throw new TypeError("Kişinin Oyun Hakkındaki İstatistiklerini Öğrenmek İçin Geçerli Bir Oyun Adı Girmelisin!")
      const response = await hooman.get(`https://www.craftrise.com.tr/oyuncu/${kullaniciadi}`)
      const source = await response.body
      const cheerio = require("cheerio")
      var $ = cheerio.load(source)
      var games = $(".gameStats").text()
      var games2 = games.replace(/\r\n/g,'\n').split('\n');
      games2 = games2.filter(item => item);
      var count = 0
      for(element of games2) {
        var elemental = element.toLowerCase()
        if(elemental === oyunadi.toLowerCase()) {
          var kazanma= games2[count+2]
          var puan= games2[count+4]
          var jsonret = {Kazanma: kazanma, Puan: puan}
          return jsonret
        }
        count++
      }
    }
}