-- Demo jobs for InWork testing. Replace/extend with reviewed sources before production.
insert into public.jobs (title, company, place, mode, income, currency, tags, description, external_url, international)
values
('مساعد افتراضي', 'شركة تجريبية', 'عن بُعد', 'Remote', '8,000–14,000', 'EGP', array['تنظيم','Excel','تواصل'], 'تنظيم الملفات والمهام ومتابعة البريد.', null, false),
('مدخل بيانات', 'شركة تجريبية', 'القاهرة', 'Part-time', '6,000–10,000', 'EGP', array['Data Entry','Excel','كتابة'], 'إدخال ومراجعة البيانات وفق إجراءات واضحة.', null, false),
('Customer Support', 'Global Demo', 'Remote', 'Remote', '500–800', 'USD', array['Customer Support','English','تواصل'], 'دعم عملاء عن بُعد باللغة الإنجليزية.', null, true),
('Bookkeeping Assistant', 'Global Demo', 'Remote', 'Freelance', '400–700', 'USD', array['Bookkeeping','Excel','حسابات'], 'مساعدة في تنظيم ومراجعة السجلات المالية.', null, true),
('مصمم محتوى سوشيال', 'استوديو تجريبي', 'عن بُعد', 'Freelance', '7,000–15,000', 'EGP', array['تصميم','محتوى','إبداع'], 'تصميم منشورات ومحتوى بصري بسيط.', null, false),
('خياطة وتطريز حسب الطلب', 'مشروع محلي تجريبي', 'حسب المنطقة', 'Project', 'حسب الاتفاق', 'EGP', array['خياطة','تطريز','يدوي'], 'طلبات صغيرة قابلة للتنفيذ من المنزل.', null, false),
('مساعد متجر إلكتروني', 'متجر تجريبي', 'عن بُعد', 'Part-time', '5,000–9,000', 'EGP', array['تواصل','مبيعات','تنظيم'], 'متابعة الطلبات والرد على استفسارات العملاء.', null, false),
('Virtual Assistant', 'Global Demo', 'Remote', 'Freelance', '450–900', 'USD', array['Virtual Assistant','English','تنظيم'], 'مساندة إدارية رقمية للعملاء الدوليين.', null, true)
;