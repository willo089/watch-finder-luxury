# نظام حفظ البيانات - Google Drive Integration

## 📊 قاعدة البيانات

تم إنشاء ملف CSV على Google Drive لحفظ نتائج المستخدمين:

**الموقع:** `manus_google_drive:/watch-finder-data/watch_finder_results.csv`

### الأعمدة المحفوظة:

| العمود | الوصف | مثال |
|--------|-------|------|
| التاريخ والوقت | وقت إتمام الاختبار (بتوقيت الرياض) | 05/02/2026, 02:12:11 |
| الساعة الفائزة | اسم الساعة المختارة | Rolex Oyster Perpetual 28 |
| العلامة التجارية | اسم العلامة التجارية | Rolex |
| السؤال 1: الطابع | إجابة السؤال الأول | كلاسيكي |
| السؤال 2: اللون | إجابة السؤال الثاني | فضي |
| السؤال 3: نوع الحزام | إجابة السؤال الثالث | معدني |
| نوع الجهاز | Desktop / Mobile / Tablet | Mobile |
| نظام التشغيل | Windows / macOS / iOS / Android | iOS |
| المتصفح | Chrome / Safari / Firefox / Edge | Safari |
| المدينة | المدينة التقريبية | الرياض |
| الدولة | الدولة | Saudi Arabia |
| عنوان IP | عنوان IP للمستخدم | 185.xxx.xxx.xxx |

## 🔧 التنفيذ التقني

### 1. جمع البيانات من المتصفح

```javascript
// معلومات الجهاز
const deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height
};
```

### 2. تحديد نوع الجهاز ونظام التشغيل

```javascript
// نوع الجهاز
let deviceType = 'Desktop';
if (/Mobile|Android|iPhone/i.test(userAgent)) deviceType = 'Mobile';
else if (/iPad|Tablet/i.test(userAgent)) deviceType = 'Tablet';

// نظام التشغيل
let os = 'Unknown';
if (/Windows/i.test(userAgent)) os = 'Windows';
else if (/Mac/i.test(userAgent)) os = 'macOS';
// ... إلخ
```

### 3. جلب الموقع الجغرافي

```javascript
const geoResponse = await fetch('https://ipapi.co/json/');
const geoData = await geoResponse.json();
// يحتوي على: city, country_name, ip
```

## 📝 البيانات المحفوظة

### مثال على سجل محفوظ:

```csv
05/02/2026 02:15:30,Cartier Tank Must,Cartier,كلاسيكي,فضي,جلد,Mobile,iOS,Safari,الرياض,Saudi Arabia,185.107.56.123
```

## 🔐 الخصوصية والأمان

- ✅ **لا يتم جمع معلومات شخصية** (الاسم، البريد الإلكتروني، إلخ)
- ✅ **عنوان IP** يُستخدم فقط للتحليل الإحصائي
- ✅ **الموقع الجغرافي** تقريبي (المدينة فقط، وليس العنوان الدقيق)
- ✅ **البيانات مخزنة بشكل آمن** على Google Drive

## 📈 الاستخدام المستقبلي

يمكن استخدام هذه البيانات لـ:

1. **تحليل التفضيلات:** ما هي الساعات الأكثر اختياراً؟
2. **التحليل الجغرافي:** من أين يأتي المستخدمون؟
3. **تحليل الأجهزة:** ما هي الأجهزة الأكثر استخداماً؟
4. **تحسين التجربة:** تحسين الموقع بناءً على سلوك المستخدمين

## 🚀 الخطوات التالية (اختياري)

لتفعيل الحفظ التلقائي، يمكن:

1. إنشاء **Google Apps Script** لاستقبال البيانات
2. ربط الموقع بـ **Google Sheets API**
3. إضافة **Webhook** لإرسال البيانات تلقائياً

---

**الحالة الحالية:** ✅ نظام جمع البيانات جاهز ويعمل في وضع Console Log  
**التاريخ:** 5 فبراير 2026
