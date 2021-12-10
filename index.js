const hooman = require("hooman");
const cheerio = require("cheerio");

module.exports = {
    KullaniciBilgi: async function (kullaniciadi) {
        if (!kullaniciadi)
            throw new Error("Kullanıcı Verisinin Çekilebilmesi İçin Bir Kullanıcı Adı Girilmelidir!");
        const response = await hooman.get(`https://www.craftrise.com.tr/oyuncu/${kullaniciadi}`);
        const source = await response.body;
        const $ = cheerio.load(source);
        let status = $("body > div.profile-title > div.buttons.align-items-parent > div > a > p").text();
        const rank = $("body > div.profile-title > div.profile-title-generalInformation > div:nth-child(3) > p").text();
        const name = $("body > div.profile-title > div.profile-title-generalInformation > p").text();
        const exp = $("body > div.profile-title > div.profile-title-generalInformation > div:nth-child(3)").attr("title").replaceAll("<b>", "").replaceAll("</b>", "").replaceAll("<br>", "").slice(8 + rank.length).trim()
        const exp2 = exp.indexOf("TP")
        const exp3 = exp.substring(0, exp2).replace("Tecrübe puanı: ", "")
        const expfornextlevel = exp.slice(exp2 + 2).replace("Sonraki seviye: ", "").replace("TP", "")
        const tag = $("body > div.profile-title > div.profile-title-generalInformation > div:nth-child(2) > p").text()
        const pfp = $("body > div.profile-title > img").attr("src")
        const gameStats = $(".gameStats").text();
        const registered = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(1) > td:nth-child(2)").text();
        const last_seen = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(2) > td:nth-child(2)").text();
        const friends = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(4) > td:nth-child(2)").text();
        const coins = $("#sidebar > div.rise-table.generalInformations > table > tbody > tr:nth-child(3) > td:nth-child(2)").text().trim()
        let gameplaying = $("body > div.profileTitle > div.buttons.align-items-parent > div").attr("title")
        let game = null;
        if (gameplaying === undefined) {
            game = "Oyun Oynamıyor"
        } else {
            game = gameplaying.slice(10).replace("</b>", "")
        }

        if (status == "")
            status = "Unknown";
        else
            status = status.trim();

        const returnobject = {
            "Ad": name,
            "ProfilResmi": pfp,
            "Tag": tag,
            "Seviye": rank,
            "TP": exp3,
            "SonrakiSeviyeIcinTp": expfornextlevel,
            "AktifMi": status,
            "OynadigiOyun": game,
            "KayitTarihi": registered,
            "SonGiris": last_seen,
            "Coinler": coins,
            "ArkadasSayisi": friends
        };
        return returnobject;
    },
    OyunlarBilgisiniAl: async function(kullaniciadi, oyunadi) {
        if(!kullaniciadi) throw new TypeError("Kullanıcı Verisinin Çekilebilmesi İçin Bir Kullanıcı Adı Girilmelidir!")
        if(!oyunadi) throw new TypeError("Kişinin Oyun Hakkındaki İstatistiklerini Öğrenmek İçin Geçerli Bir Oyun Adı Girmelisin!")
        const response = await hooman.get(`https://www.craftrise.com.tr/oyuncu/${kullaniciadi}`)
        const source = await response.body
        let $ = cheerio.load(source)
        const games = $(".gameStats").text()
        let games2 = games.split('\n');
       let res = []
        games2.forEach(el => {
            if(el !== " ") {
                res.push(el)
            }
        })
        res = res.filter(item => item);
       const getindex = res.indexOf(oyunadi.toUpperCase())
       const getpoints = res[getindex+4]
       const getwins = res[getindex+2]
       return {"Kazanma": getwins, "Puan": getpoints}
      }
}
