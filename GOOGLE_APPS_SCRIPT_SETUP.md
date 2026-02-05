# دليل تفعيل Google Apps Script للحفظ التلقائي

## 📋 الخطوات التفصيلية

### المرحلة 1: إنشاء Google Sheet

1. افتح [Google Sheets](https://sheets.google.com)
2. انقر على **+ Blank** لإنشاء ملف جديد
3. سمّ الملف: **"Watch Finder Results"**
4. احفظ الملف (يُحفظ تلقائياً)

### المرحلة 2: فتح Apps Script Editor

1. في Google Sheet، اذهب إلى القائمة العلوية
2. انقر على **Extensions** (الإضافات)
3. اختر **Apps Script**
4. ستفتح نافذة جديدة بمحرر الأكواد

### المرحلة 3: نسخ الكود

1. في محرر Apps Script، ستجد كود افتراضي:
   ```javascript
   function myFunction() {
   
   }
   ```
2. **احذف** هذا الكود بالكامل
3. افتح ملف `google-apps-script.gs` من المشروع
4. **انسخ** جميع محتوياته
5. **الصق** في محرر Apps Script
6. احفظ المشروع بالنقر على أيقونة القرص 💾 أو **Ctrl+S**
7. سمّ المشروع: **"Watch Finder Backend"**

### المرحلة 4: نشر Web App

1. في محرر Apps Script، انقر على **Deploy** (نشر) في الأعلى
2. اختر **New deployment** (نشر جديد)
3. ستظهر نافذة منبثقة:
   - انقر على أيقونة الترس ⚙️ بجانب "Select type"
   - اختر **Web app**
4. املأ الإعدادات:
   - **Description**: "Watch Finder Data Collector v1.0"
   - **Execute as**: اختر **"Me (your-email@gmail.com)"**
   - **Who has access**: اختر **"Anyone"**
5. انقر على **Deploy** (نشر)
6. قد يُطلب منك منح الأذونات:
   - انقر على **Authorize access**
   - اختر حسابك في Google
   - انقر على **Advanced** (متقدم)
   - انقر على **Go to Watch Finder Backend (unsafe)** (هذا آمن، إنه مشروعك)
   - انقر على **Allow** (سماح)
7. بعد النشر، ستحصل على **Web App URL**
8. **انسخ** هذا الـ URL (سيكون بهذا الشكل):
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### المرحلة 5: تحديث الموقع

1. افتح ملف `index.html` في مشروع الموقع
2. ابحث عن الدالة `saveResultToGoogleSheets`
3. استبدل السطر:
   ```javascript
   // إرسال البيانات إلى Google Apps Script
   // ملاحظة: سيتم تفعيل هذا في المرحلة التالية
   console.log('Result data to be saved:', resultData);
   ```
   
   بـ:
   ```javascript
   // إرسال البيانات إلى Google Apps Script
   const SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE'; // ضع الـ URL هنا
   
   const response = await fetch(SCRIPT_URL, {
       method: 'POST',
       mode: 'no-cors',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(resultData)
   });
   
   console.log('Data sent successfully to Google Sheets');
   ```
4. استبدل `YOUR_WEB_APP_URL_HERE` بالـ URL الذي نسخته
5. احفظ الملف
6. ارفع التحديثات إلى GitHub

## 🧪 اختبار النظام

### اختبار 1: التحقق من Apps Script

1. افتح محرر Apps Script
2. في القائمة العلوية، اختر الدالة `doGet`
3. انقر على **Run** (تشغيل)
4. تحقق من السجلات (Logs) - يجب أن ترى:
   ```json
   {
     "status": "active",
     "message": "Watch Finder Google Apps Script is running"
   }
   ```

### اختبار 2: التحقق من Web App URL

1. افتح متصفحاً جديداً
2. الصق الـ Web App URL في شريط العنوان
3. اضغط Enter
4. يجب أن ترى رسالة JSON:
   ```json
   {
     "status": "active",
     "message": "Watch Finder Google Apps Script is running",
     "version": "1.0"
   }
   ```

### اختبار 3: اختبار الموقع

1. افتح الموقع: https://willo089.github.io/watch-finder-luxury/
2. أكمل الاختبار حتى النهاية
3. افتح Console في المتصفح (F12)
4. يجب أن ترى:
   ```
   Result data to be saved: {...}
   Data sent successfully to Google Sheets
   ```
5. افتح Google Sheet
6. يجب أن ترى سجلاً جديداً مع بياناتك

## 📊 مراقبة البيانات

### عرض البيانات

1. افتح Google Sheet: **Watch Finder Results**
2. ستجد جدولاً منسقاً مع:
   - صف العناوين بلون ذهبي (#C9A961)
   - البيانات مرتبة حسب التاريخ والوقت
   - أعمدة متناسقة تلقائياً

### عرض الإحصائيات

1. افتح محرر Apps Script
2. في القائمة العلوية، اختر الدالة `getStatistics`
3. انقر على **Run**
4. افتح **Execution log** لرؤية الإحصائيات:
   - إجمالي السجلات
   - الساعة الأكثر اختياراً

### حذف جميع البيانات (للصيانة)

1. افتح محرر Apps Script
2. في القائمة العلوية، اختر الدالة `clearAllData`
3. انقر على **Run**
4. سيتم حذف جميع البيانات وإعادة تعيين العناوين

## 🔧 استكشاف الأخطاء

### المشكلة: "Authorization required"

**الحل:**
1. افتح محرر Apps Script
2. انقر على **Run** لأي دالة
3. اتبع خطوات منح الأذونات أعلاه

### المشكلة: "Script function not found: doPost"

**الحل:**
1. تأكد من نسخ الكود بالكامل
2. تأكد من حفظ المشروع (Ctrl+S)
3. أعد نشر Web App

### المشكلة: البيانات لا تُحفظ في Sheet

**الحل:**
1. تحقق من Web App URL في الموقع
2. افتح Console في المتصفح (F12) للتحقق من الأخطاء
3. تأكد من أن "Who has access" مضبوط على "Anyone"
4. أعد نشر Web App

### المشكلة: "CORS error"

**الحل:**
- هذا طبيعي! استخدمنا `mode: 'no-cors'` لتجاوز هذه المشكلة
- البيانات ستُحفظ بنجاح رغم هذا الخطأ في Console

## 🎯 الخطوات النهائية

1. ✅ إنشاء Google Sheet
2. ✅ نسخ Apps Script
3. ✅ نشر Web App
4. ✅ تحديث الموقع بالـ URL
5. ✅ اختبار النظام
6. ✅ مراقبة البيانات

---

**الحالة:** 🟢 جاهز للتفعيل  
**التاريخ:** 5 فبراير 2026  
**الإصدار:** 1.0
