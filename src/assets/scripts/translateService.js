let currentLang = "en";

let langs = {
  en: {
    tr: "Turkish",
    en: "English",
    flagCode: "en.svg",
    Error: "Error",
    "Account Error": "Account Error. Please check your account.",
    Welcome: "Welcome",
    "Pick a language": "Pick a language",
    "Photo by": "Photo by",
    "Discover Turkey": "Discover Turkey",
    "Start Exploring": "Start Exploring",
    "Plan My Day": "Plan My Day",
    planMyDayDescription:
      "With the 'Plan My Day' feature on our website, you can now spend your days more efficiently and enjoyably. With this feature, you can easily explore various activities in your selected region and create your daily schedule according to your preferences. Planning a full day has never been easier with just a few clicks!",
    "Start Your Plan": "Start Your Plan",
    "Your Plan is Empty": "Your Plan is Empty",
    "Let AI plan": "Let AI Plan",
    Loading: "Loading",
    errorOnPlanAI:
      "An error occurred while planning your day. Please try again.",
    aiPlanDayChatGPTInfo:
      "Prepared with Chat-GPT developed by Open AI. Chat-GPT can make mistakes.",
    Info: "Info",
    oldPlansLoaddedInfo: "Loaded Old Plans from history",
    sendMessageError:
      "There was a problem sending your message, please try again.",
    ArifInfo:
      "Arif is an artificial intelligence bot that assists you with historical sites, local cuisines, and various topics during your travels.",
    "Ask Something": "Ask Something",
    "[Arif is thinking]": "Arif is thinking",
    "Clear Chat": "Clear Chat",
    "Message Arif": "Message Arif",
    Login: "Login",
    "Create Account": "Create Account",
    Email: "User Name",
    Password: "Password",
    "Not Have an Account": "Not Have an Account",
    "Already Have an Account": "Already Have an Account",
    "There is an Error on Login Prosess. Error:":
      "There is an Error on Login Prosess. Error:",
    "There is an Error on Register Prosess. Error:":"There is an Error on Register Prosess. Error:",
    "User Already Exist":"User Already Exist",
    email: "User Name",
    password: "Password",
    authority: "Authority",
    tokens: "Remaining Tokens",
    maxTokens: "Maximum Tokens",
    tokenUpdate: "Last Token Update Date",
    nextTokenUpdateDays: "Days until the tokens are renewed",
    sessionKey: "Exit From All Devices",
    Reset: "Reset",
    "Are You Sure": "Are You Sure",
    resetSessionKeyInfo:
      "Exiting From All Devices will disconnect all open accounts from your account.",
    Yes: "Yes",
    No: "No",
    sessionKeyResetError:
      "An Error Occurred While Exiting From All Devices. Error:",
    "Password (Again)": "Password (Again)",
    "Passwords do not match": "Passwords do not match",
    resetPasswordInfo:
      "Resetting the password will disconnect all open accounts from your account.",
    passwordResetError:
      "An Error Occurred While Resetting the Password. Error:",
    "Password(s) are not valid": "Password(s) are not valid",
    "New Password": "New Password",
    "New Password (Again)": "New Password (Again)",
    Logout: "Logout",
    SureLogout: "Are You Sure You Want to Sign Out?",
    "Create Place": "Create Place",
    "Create New One": "Create New One",
    "Place Type": "Place Type",
    city: "City",
    "city-place": "Place",
    City: "City",
    "City Area": "City Area",
    Exit: "Exit",
    "Place Name": "Place Name",
    "Create New Place": "Create New Place",
    Continue: "Continue",
    "See on Live": "See on Live",
    placeisActive:
      "If place is active that means everyone can see this place. But if not it will be visible for only admins.",
    Active: "Active",
    google: "Google",
    bootstrap: "BootStrap",
    text: "Text",
    "image-list": "Image List",
    "plan-my-day": "Plan My Day",
    Title: "Title",
    Subtitle: "Subtitle",
    "Icon Content": "Icon Content",
    "Icon Type": "Icon Type",
    "": "Empty",
    "left-img": "Left Image",
    "right-img": "Right Image",
    "w-25-lpc": "25% on Giant Display",
    "w-40-lpc": "40% on Giant Display",
    "w-50-lpc": "50% on Giant Display",
    "w-100-lpc": "100% on Huge Display",
    "w-25-pc": "25% on PC",
    "w-40-pc": "40% on PC",
    "w-50-pc": "50% on PC",
    "w-100-pc": "100% on PC",
    "w-25-mobile": "25% on phone",
    "w-40-mobile": "40% on phone",
    "w-50-mobile": "50% on phone",
    "w-100-mobile": "100% on phone",
    Class: "Class",
    "Selected Classes": "Selected Classes",
    "image-list-horizontal": "Horizontal",
    "image-list-vertical": "Vertical",
    "horizonal-on-mobile": "Horizontal on Phone",
    "horizontal-on-pc": "Horizontal on PC",
    "vertical-on-pc": "Vertical on PC",
    Header: "Header",
    Content: "Content",
    "Nothing to do": "Nothing to do",
    ErrorOnSavingPlace: "Error On Saving Place. Please Try Again.",
    SuccessOnSavingPlace: "Place Successfuly Saved.",
    Success: "Success",
    SuccessOnLoadingFile:
      "File Uploaded Successfuly. File URL Copied to Your Clipboard.",
    ErrorOnLoadingFile: "Error On File Upload. Please Try Again.",
    "Delete Place": "Delete Place",
    "Load File": "Load File",
    Save: "Save",
    "Place Image": "Place Image",
    "Place Text": "Place Text",
    CreatePlaceError:
      "An error occurred while creating the place. Please check the values ​​you entered.",
    "Image Title": "Image Title",
    "Image Text": "Image Text",
    "Photographer Link": "Photographer Link",
    "Photographer Name": "Photographer Name",
    deleteCurrentPlaceSure:
      "Are you sure you want to delete this field? If you delete this area, you can contact the page creator to bring it back.",
    SuccessOnCretingPlace: "New place successfuly created",
    "Remaining Points": "Remaining Points",
    ErrorOnGetTokenC: "An error accurred while getting point count",
    infinite: "sonsuz",
    errorOnGettingPlace:
      "There was a problem fetching the place data, please try again.",
      tokensAreOverError:"You've run out of tokens. Please wait until the next token renewal date.",
      "Password length cannot be bigger than 25":"Password length cannot be bigger than 25",
      "Email length cannot be bigger than 50":"User Name length cannot be bigger than 50"
  },
  tr: {
    tr: "Türkçe",
    en: "İngilizce",
    flagCode: "tr.svg",
    Error: "Hata",
    "Account Error": "Hesap Hatası. Lütfen hesabınızı kontrol ediniz.",
    Welcome: "Hoşgeldiniz",
    "Pick a language": "Bir dil seçin",
    "Photo by": "Fotoğraf:",
    "Discover Turkey": "Türkiyeyi Keşfedin",
    "Start Exploring": "Keşfetmeye Başla",
    "Plan My Day": "Günümü Planla",
    planMyDayDescription:
      "'Günümü Planla' özelliğiyle artık günlerinizi daha verimli ve eğlenceli bir şekilde geçirebilirsiniz. Bu özellik sayesinde seçtiğiniz bölgedeki çeşitli etkinlikleri kolayca keşfedebilir ve tercihlerinize göre günlük programınızı oluşturabilirsiniz. Sadece birkaç tıkla, dolu dolu bir gün planlamak hiç bu kadar kolay olmamıştı!",
    "Start Your Plan": "Planınızı Başlatın",
    "Your Plan is Empty": "Planınız Boş",
    "Let AI plan": "Yapay Zeka Planlasın",
    Loading: "Yükleniyor",
    errorOnPlanAI:
      "Gününüz planlanırken bir hata oluştu. Lütfen tekrar deneyiniz.",
    aiPlanDayChatGPTInfo:
      "Open AI tarafından geliştirilen Chat-GPT ile hazırlanmıştır. Chat-GPT hatalar yapabilir.",
    Info: "Bilgilendirme",
    oldPlansLoaddedInfo: "Eski planlar geçmişinziden yüklendi",
    sendMessageError:
      "Mesajınız gönderilirken bir sorun oluştu lütfen tekrar deneyiniz.",
    ArifInfo:
      "Arif, gezilerinizde size tarihi bölgeleri, yerel yemekleri ve çeşitli konularda yardımcı olan bir yapay zeka botudur.",
    "Ask Something": "Bir şey sorun",
    "[Arif is thinking]": "Arif düşünüyor",
    "Clear Chat": "Sohbeti Temizle",
    "Message Arif": "Arif'e mesaj",
    Login: "Giriş Yap",
    "Create Account": "Hesap Oluştur",
    Email: "Kullanıcı Adı",
    Password: "Şifre",
    "Not Have an Account": "Hesabınız Yok mu",
    "Already Have an Account": "Zaten Hesabınız Var mı",
    "There is an Error on Login Prosess. Error:":
      "Giriş İşlemi Sırasında Bir Hata Oluştu. Hata:",
    "There is an Error on Register Prosess. Error:":"Hesap Oluşturma İşlemi sırasında bir hata oluştu. Hata:",
    "User Already Exist":"Kullanıcı Zaten Var",
    email: "Kullanıcı Adı",
    password: "Şifre",
    authority: "Yetki",
    tokens: "Kalan Puanlar",
    maxTokens: "Maksimum Puan",
    tokenUpdate: "En Son Puan Yenilenme Tarihi",
    nextTokenUpdateDays: "Sonraki Puan Yenilenme Tarihine Kalan Gün",
    sessionKey: "Tüm Hesaplardan Çık",
    Reset: "Sıfırla",
    "Are You Sure": "Emin Misiniz",
    resetSessionKeyInfo:
      "Tüm Hesaplardan Çıkmak, tüm açık hesapların hesabınıza olan bağlantısını kesecektir.",
    Yes: "Evet",
    No: "Hayır",
    sessionKeyResetError: "Tüm Hesaplardan Çıkarken Bir Hata Oluştu. Hata:",
    "Password (Again)": "Şifre (Tekrar)",
    "Passwords do not match": "Şifreler Eşleşmiyor",
    resetPasswordInfo:
      "Şifreyi sıfırlamak, tüm açık hesapların hesabınıza olan bağlantısını kesecektir.",
    passwordResetError: "Şifre Sıfırlanırken Bir Hata Oluştu. Hata:",
    "Password(s) are not valid": "Şifre(ler) geçerli değil",
    "New Password": "Yeni Şifre",
    "New Password (Again)": "Yeni Şifre (Tekrar)",
    Logout: "Çıkış Yap",
    SureLogout: "Çıkış Yapmak istediğinizden Emin misiniz?",
    "Create Place": "Alan Oluştur",
    "Create New One": "Yeni Bir Tane Oluştur",
    "Place Type": "Alan Tipi",
    city: "Şehir",
    "city-place": "Şehir Alanı",
    City: "Şehir",
    "City Area": "Şehir Alanı",
    Exit: "Çık",
    "Place Name": "Alan İsmi",
    "Create New Place": "Yeni Alan Oluştur",
    Continue: "Devam Et",
    "See on Live": "Canlı olarak gör",
    placeisActive:
      "Eğer mekan aktifse bu, burayı herkesin görebileceği anlamına gelir. Ancak değilse yalnızca yöneticiler tarafından görülebilecektir.",
    Active: "Aktif",
    google: "Google",
    bootstrap: "BootStrap",
    text: "Metin",
    "image-list": "Resim Listesi",
    "plan-my-day": "Günümü Planla",
    Title: "Başlık",
    Subtitle: "Alt Başlık",
    "Icon Content": "İkon İçeriği",
    "Icon Type": "İkon Tipi",
    "": "Boş",
    "left-img": "Sol Resim",
    "right-img": "Sağ Resim",
    "w-25-lpc": "Devasa Ekranda %25",
    "w-40-lpc": "Devasa Ekranda %40",
    "w-50-lpc": "Devasa Ekranda %50",
    "w-100-lpc": "Devasa Ekranda %100",
    "w-25-pc": "Bilgisayarda %25",
    "w-40-pc": "Bilgisayarda %40",
    "w-50-pc": "Bilgisayarda %50",
    "w-100-pc": "Bilgisayarda %100",
    "w-25-mobile": "Telefonda %25",
    "w-40-mobile": "Telefonda %40",
    "w-50-mobile": "Telefonda %50",
    "w-100-mobile": "Telefonda %100",
    Class: "Sınıf",
    "Selected Classes": "Seçilmiş Sınıflar",
    "image-list-horizontal": "Yatay",
    "image-list-vertical": "Dikey",
    "horizonal-on-mobile": "Telefonda Yatay",
    "horizontal-on-pc": "Bilgisayarda Yatay",
    "vertical-on-pc": "Bilgisayarda Dikey",
    Header: "Başlık",
    Content: "İçerik",
    "Nothing to do": "Yapılacak Birşey Yok",
    ErrorOnSavingPlace:
      "Alanı Kaydederken Hata ile Karşılaşıldı. Lütfen Tekrar Deneyiniz.",
    SuccessOnSavingPlace: "Alan Başarılı Bir Şekilde Kaydedildi",
    Success: "Başarı",
    SuccessOnLoadingFile:
      "Dosya Başarılı Bir Şekilde Yüklendi. Dosya URL' si Panonuza Kopyalandı.",
    ErrorOnLoadingFile:
      "Dosya Yüklenirken Bir Hata ile Karşılaşıldı. Lütfen Tekrar Deneyiniz.",
    "Delete Place": "Alanı Sil",
    "Load File": "Dosya Yükle",
    Save: "Kaydet",
    "Place Image": "Alan Resmi",
    "Place Text": "Alan Metni",
    CreatePlaceError:
      "Alan oluşturulurken bir hata oluştu. Lütfen girdiğiniz değerleri kontrol ediniz.",
    "Image Title": "Resim Başlığı",
    "Image Text": "Resim Metni",
    "Photographer Link": "Fotoğrafçı Linki",
    "Photographer Name": "Fotoğrafçı İsmi",
    deleteCurrentPlaceSure:
      "Bu alanı silmek istediğinizden emin misiniz? Eğer bu alanı silerseniz geri getirmek için sayfa yapımcısı ile görüşebilirsiniz.",
    SuccessOnCretingPlace: "Yeni alan başarıyla oluşturuldu",
    "Remaining Points": "Kalan Puanlar",
    ErrorOnGetTokenC: "Puan sayısı alınırken bir hata oluştu",
    infinite: "sonsuz",
    errorOnGettingPlace:
      "Place verisi getirilirken bir sorun oluştu lütfen tekrar deneyiniz.",
      tokensAreOverError:"Puanlarınız bitmiştir. Lütfen bir sonraki puan yenileme tarihine kadar bekleyiniz.",
      "Password length cannot be bigger than 25":"Şifre uzunluğu 25'ten büyük olamaz",
      "Email length cannot be bigger than 50":"Kullanıcı Adı uzunluğu 50'den büyük olamaz"
  },
};
Object.entries(langs).forEach(([lang, tra]) => {
  var stLang = localStorage.getItem("language");
  if (navigator.language.split("-")[0] == lang && !stLang) {
    currentLang = lang;
  } else if (stLang) {
    currentLang = stLang;
  }
  const href = window.location.origin;
  langs[lang]["flag"] = href + "/assets/imgs/" + langs[lang]["flagCode"];
});
localStorage.setItem("language", currentLang);

function getTranslate(text, lang) {
  if (lang == null) {
    lang = currentLang;
  }
  var translate = langs[lang][text];
  if (translate) {
    return translate;
  }
  return text;
}
function getCurrentLang() {
  return currentLang;
}

function setCurrentLang(lang) {
  currentLang = lang;
  localStorage.setItem("language", currentLang);
}

function getAllTranslates() {
  return langs;
}
