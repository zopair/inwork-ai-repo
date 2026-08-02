# وثيقة البنية التحتية والخدمات - In Work 🏗️
> إعداد وتصميم: غرفة العمليات السيادية (ChatGPT Architecture Lead)

## أولاً: خريطة الأدوات والخدمات (0% تكلفة)
1. **الخرائط والموقع الجغرافي:**
   - تم اعتماد مكتبة `Leaflet.js` مع خرائط `OpenStreetMap` المجانية تماماً لتحديد مواقع الحرفيين في الإسماعيلية ورسم مسارات الطلبات بدقة عالية دون أي تكاليف تراخيص.
2. **بوابات الدفع بالجنيه المصري (EGP):**
   - **Instapay (إنستاباي):** ربط رقم الحساب أو اسم المستخدم (IPN) للتحويل اللحظي المباشر.
   - **المحافظ الإلكترونية (Mobile Wallets):** فودافون كاش، اتصالات كاش، وأورانج كاش لدفع قيمة الخدمات واستلام العمولات.
   - **نظام التحقق من الدفع:** نظام رفع إيصال التحويل (Screenshot Verification) مع مطابقة ذكية مؤقتة.
3. **الاستضافة والنشر (Hosting & Deployment):**
   - **Frontend:** Cloudflare Pages أو Vercel لاستضافة واجهة Next.js مجاناً وسرعة فائقة Global CDN.
   - **Backend & Database:** Supabase (قاعدة بيانات PostgreSQL مجانية مع المصادقة وحماية البيانات).
   - **Automation:** GitHub Actions + Google Colab للأتمتة وإدارة المستودع سيادياً.


# InWork AI Platform - Architecture Blueprint

## Storage Conflict Recovery
The storage engine uses optimistic concurrency control.
When concurrent writes produce a conflict:

1. Detect conflict (409)
2. Retry with exponential backoff and jitter
3. Abort after maximum retry attempts
4. Surface a controlled domain/storage error
