//SpongeBed Was Here...
module.exports={
    KullaniciBilgi: async function(kullaniciadi) {
        var fetch = require("node-fetch")
        if(!kullaniciadi) throw new TypeError("Kullanıcı Verisinin Çekilebilmesi İçin Bir Kullanıcı Adı Girilmelidir!")
        return fetch("https://www.craftrise.com.tr/oyuncu/" + kullaniciadi).then(async (body) => {
      const source = await body.text()
      const arr = source.toString().replace(/\r\n/g,'\n').split('\n');
      var satırlar = []
      for(let i of arr) {
    satırlar.push(i)
      }
var sayisay = 0
var isim = null
var seviye = null
var durum = null
var kayıttarih = null
var arkadaşsayısı = null
var coinler = null
var songiriş = null
var profilfoto2 = null
var apaçıkseviyeğ = null
var sonrakiseviyeiçintp = null
var şuankitp2 = null
      for(let element of satırlar) {
          sayisay++



     
          if(element.includes(`https://www.craftrise.com.tr/gets/get-head`)) {
            
              var profilfoto = satırlar[sayisay - 1].slice(12)
               profilfoto2 = profilfoto.replace(/.{0,2}$/, '');
              var isimindex = sayisay + 2
              var seviyeindex = sayisay + 8
              var durumindexi = sayisay + 16
              seviye = satırlar[seviyeindex].replace(`\t\t\t\ttitle="Seviye: <b>`, "").split(`</b><br>`).join(" - ").split(`</b> <br>`).join(" - ").split(`</b>`).join("").split(`<br>`).join("").split(`<b>`).join("").split(`">`).join("")
              apaçıkseviyeğ = seviye.substr(0, seviye.indexOf(" - "))
              var şuankitp = seviye.slice(seviye.indexOf(" - ")).slice(3)
            durum = satırlar[durumindexi].replace(`\t\t\t\t\t<a><p class="p-10px">`, "").replace(`</p></a>`, "")
              sonrakiseviyeiçintp = şuankitp.slice(şuankitp.indexOf(" - ") + 2).replace(` Sonraki seviye: `, "")
              şuankitp2 = şuankitp.substring(0, şuankitp.indexOf(" - ")).replace(`Tecrübe puanı: `, "")
            
if(durum === `\t\t\t`) {
durum = "Bilgi Gizli"
}
               isim = satırlar[isimindex].slice(56).substring(0, kullaniciadi.length)
          }





          if(element.includes(`Kayıt Tarihi`)) {
            kayıttarih = satırlar[sayisay + 2].slice(32).replace(`<td style="text-align: right;">`, "").replace(`</td>`, "")
           }
           if(element.includes("Arkadaşlar")) {
            arkadaşsayısı = satırlar[sayisay + 2].replace(`                                <td style="text-align: right;">`, "").replace(`</td>`, "")
           }
           if(element.includes("Coinler")) {
            coinler = satırlar[sayisay + 2].replace(`                                <td style="text-align: right;">`, "").replace(`</td>`, "")
           }
          if(element.includes("Son Giriş")) {
songiriş = satırlar[sayisay + 2].replace(`                                <td style="text-align: right;">`, "").replace(`</td>`, "")
          }

          if(isim !== null) {
            if(coinler !== null) {
              if(arkadaşsayısı !== null) {
var jsonret = {Ad: isim, ProfilResmi: profilfoto2, Seviye: apaçıkseviyeğ,TP: şuankitp2, SonrakiSeviyeIcinTp: sonrakiseviyeiçintp,AktifMi: durum, KayitTarihi: kayıttarih, SonGiris: songiriş, Coinler: coinler, ArkadasSayisi: arkadaşsayısı}
return jsonret
              }
            }

          }
      }
    })
    },

OyunlarBilgisiniAl: async function(kullaniciadi, oyunadi) {
  var fetch = require("node-fetch")
  if(!kullaniciadi) throw new TypeError("Kullanıcı Verisinin Çekilebilmesi İçin Bir Kullanıcı Adı Girilmelidir!")
  if(!oyunadi) throw new TypeError("Kişinin Oyun Hakkındaki İstatistiklerini Öğrenmek İçin Geçerli Bir Oyun Adı Girmelisin!")
  var oyunadi2 = oyunadi.split(" ").join("")
  return fetch("https://www.craftrise.com.tr/oyuncu/" + kullaniciadi).then(async (body) => {
const source = await body.text()
const arr = source.toString().replace(/\r\n/g,'\n').split('\n');
var satırlar = []
for(let i of arr) {
satırlar.push(i)
}
var sayisay = 0

for(let element of satırlar) {
    sayisay++
    if(element.includes(`images/games/`+ `${oyunadi2.toLowerCase()}`+ `.jpg`)) {
    var kazanma = satırlar[sayisay + 5].slice(10).replace(`<span>`, "").replace(`</span>`, "")
    var puan = satırlar[sayisay + 9].slice(10).replace(`<span>`, "").replace(`</span>`, "")
       var returning = {Kazanma: kazanma, Puan: puan}
       return returning
    } 
}
})
}    
}
