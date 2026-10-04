# OfflineSmartAssistant AI

مساعد ذكاء اصطناعي عربي يعمل عبر الإنترنت ويتصل بخادم مركزي لتوليد إجابات حقيقية باستخدام نموذج AI.

## البنية

OfflineSmartAssistant.html
        ↓ HTTPS
Central AI API
        ↓
OpenAI API
        ↓
AI Model
        ↓
الإجابة

## المزايا

- واجهة عربية RTL
- يعمل على الهاتف والكمبيوتر
- اتصال HTTPS
- نموذج AI حقيقي
- `/api/health` لفحص الخادم
- `/api/chat` لإرسال الأسئلة
- لا يتم وضع مفتاح OpenAI داخل HTML
- إعداد عنوان API من داخل التطبيق
- معالجة أخطاء الاتصال
- جاهز للنشر على Koyeb

## تشغيل الخادم

```bash
cd server
npm install
npm start
```
