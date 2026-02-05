/**
 * Google Apps Script لحفظ نتائج اختبار الساعات النسائية الفاخرة
 * 
 * خطوات التفعيل:
 * 1. افتح Google Sheets وأنشئ ملف جديد باسم "Watch Finder Results"
 * 2. اذهب إلى Extensions > Apps Script
 * 3. احذف المحتوى الافتراضي والصق هذا الكود
 * 4. احفظ المشروع (Ctrl+S)
 * 5. انقر على Deploy > New deployment
 * 6. اختر "Web app"
 * 7. في "Execute as": اختر "Me"
 * 8. في "Who has access": اختر "Anyone"
 * 9. انقر Deploy وانسخ الـ Web App URL
 * 10. استخدم هذا الـ URL في الموقع
 */

// دالة لمعالجة طلبات POST من الموقع
function doPost(e) {
  try {
    // الحصول على البيانات المرسلة
    const data = JSON.parse(e.postData.contents);
    
    // الحصول على الـ Sheet النشط
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // إذا كان الـ Sheet فارغاً، أضف العناوين
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'التاريخ والوقت',
        'الساعة الفائزة',
        'العلامة التجارية',
        'السؤال 1: الطابع',
        'السؤال 2: اللون',
        'السؤال 3: نوع الحزام',
        'نوع الجهاز',
        'نظام التشغيل',
        'المتصفح',
        'المدينة',
        'الدولة',
        'عنوان IP'
      ]);
      
      // تنسيق صف العناوين
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground('#C9A961');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // إضافة البيانات الجديدة
    sheet.appendRow([
      data.timestamp || '',
      data.watchName || '',
      data.brand || '',
      data.question1 || '',
      data.question2 || '',
      data.question3 || '',
      data.deviceType || '',
      data.os || '',
      data.browser || '',
      data.city || '',
      data.country || '',
      data.ip || ''
    ]);
    
    // تنسيق تلقائي للأعمدة
    sheet.autoResizeColumns(1, 12);
    
    // إرجاع استجابة نجاح
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully',
        'row': sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // إرجاع استجابة خطأ
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// دالة لمعالجة طلبات GET (للاختبار)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'active',
      'message': 'Watch Finder Google Apps Script is running',
      'version': '1.0'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// دالة مساعدة لحذف جميع البيانات (للصيانة)
function clearAllData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  
  // إعادة إضافة العناوين
  sheet.appendRow([
    'التاريخ والوقت',
    'الساعة الفائزة',
    'العلامة التجارية',
    'السؤال 1: الطابع',
    'السؤال 2: اللون',
    'السؤال 3: نوع الحزام',
    'نوع الجهاز',
    'نظام التشغيل',
    'المتصفح',
    'المدينة',
    'الدولة',
    'عنوان IP'
  ]);
  
  // تنسيق صف العناوين
  const headerRange = sheet.getRange(1, 1, 1, 12);
  headerRange.setBackground('#C9A961');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  Logger.log('All data cleared and headers reset');
}

// دالة مساعدة لعرض إحصائيات
function getStatistics() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log('No data available');
    return;
  }
  
  // عدد السجلات
  const totalRecords = lastRow - 1;
  
  // أكثر ساعة اختياراً
  const watchColumn = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  const watchCounts = {};
  watchColumn.forEach(row => {
    const watch = row[0];
    watchCounts[watch] = (watchCounts[watch] || 0) + 1;
  });
  
  const mostPopularWatch = Object.keys(watchCounts).reduce((a, b) => 
    watchCounts[a] > watchCounts[b] ? a : b
  );
  
  Logger.log('=== إحصائيات ===');
  Logger.log('إجمالي السجلات: ' + totalRecords);
  Logger.log('الساعة الأكثر اختياراً: ' + mostPopularWatch + ' (' + watchCounts[mostPopularWatch] + ' مرات)');
  Logger.log('================');
}
