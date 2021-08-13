## **Craftrise-API**

**Not**

API İle İlgili Herhangi Sorunuz Veya Sorununuz Olursa Discord Adresim ! SıpançBet#9752 Burdan Bana DM Atabilirsiniz.

**ChangeLog**

Tag eklendi artık kullanıcının moderatör veya oyuncu olduğunu ayırt edebilirsiniz.

Bazen veri doğru olsa bile undefined verme sorunu çözüldü.

Veri çekerken çıkan HTML tagları çözüldü.

**Craftrise-API nedir**

craftrise-api Craftrise Minecraft Sunucusunun Sitesinden Veri Çekmek İçin Yapılmış Kullanması Kolay Bir API Modülüdür


**Neler yapılabilir?**

• Belirtilen Oyuncunun Hesap Bilgileri Ve Durumu Alınabilir.

• Belirtilen Oyuncunun Belirtilen Oyundaki İstatistikleri Alınabilir.

**Örnekler**

Belirtilen Oyuncunun Hesap Bilgisini Alma Örneği Aşağıda Belirtilmiştir.

    var api = require("craftrise-api")
    
    async function apiveri() {
    var veriler = await api.KullaniciBilgi("SpongeBed")
    if(veriler == undefined) {
      return console.log("Bu Hesap Adıyla İlişkili Bir Kullanıcı Bulunamadı!")
    }
    console.log(veriler)
    }
    
    apiveri()

Yukarıdaki Kod Bize Şu Sonucu Döndürecektir:

    {
    Ad: 'SpongeBed',
    ProfilResmi: 'https://www.craftrise.com.tr/gets/get-head.php?s=256&u=SpongeBed',
    Tag: 'OYUNCU',
    Seviye: 'KIZILTAŞ I',
    TP: '13.055',
    SonrakiSeviyeIcinTp: '50.945',
    AktifMi: 'ÇEVRİMDIŞI',
    OynadigiOyun: 'Oyun Oynamıyor',
    KayitTarihi: ' 5 Ekim 2020 21:40',
    SonGiris: ' 4 Ağustos 21:23',
    Coinler: '10.695',
    ArkadasSayisi: '9'
    }
Yukarıdaki Sonuçtan Herhangi Bir Değer Almak İstersek Şöyle Kullanabiliriz:
 

      var api = require("craftrise-api")
        
        async function apiveri() {
        var veriler = await api.KullaniciBilgi("SpongeBed")
        if(veriler == undefined) {
          return console.log("Bu Hesap Adıyla İlişkili Bir Kullanıcı Bulunamadı!")
        }
        console.log(veriler.Coinler)
        }
        
        apiveri()
    

Yukarıdaki Kodda `Coinler`Adlı Veriyi Almasını İstedik Bunu Diğer Verilerde de Kullanabilirsiniz Ve Yukarıdaki Kod Bize Sonuç Olarak `8.692` Sonucunu Döndürecektir .


  Şimdi İse Belirtilen Kullanıcının Belirtilen Oyundaki İstatistiğini Alma Örneğine Bakalım

    var  api = require("craftrise-api")
    
    async  function  apiveri() {
    var  veriler = await api.OyunlarBilgisiniAl("SpongeBed", "bed wars")
    if(veriler == undefined) {
      return console.log("Kullanıcı Adı Veya Oyun Adı Bulunamadı!")
    }
    console.log(veriler)
    }
    
      
    
    apiveri()


Yukarıdaki Kodun Sonucu Aşağıdaki Gibi Olacaktır


    { Kazanma: '135', Puan: '3.431' }

Yukarıdaki Sonuçtan Kazanma Değerini Almak İstersek 

    console.log(veriler.Kazanma)
Kullanabiliriz.


Made With ❤ By SpongeBed
  
  

