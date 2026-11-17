"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  Clock3,
  Handshake,
  HeartHandshake,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import {
  filterProviders,
  type ProviderSearchRecord,
} from "@/lib/marketplace.mjs";

type Category = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

type Provider = ProviderSearchRecord & {
  description: string;
  tags: string[];
  area: string;
  rating: number;
  reviews: number;
  completed: number;
  startingPrice: string;
  responseTime: string;
  verified: boolean;
  available: boolean;
  initials: string;
};

type ServiceRequest = {
  categoryId: string;
  title: string;
  description: string;
  area: string;
  budget: string;
};

const categories: Category[] = [
  { id: "all", label: "كل الخدمات", description: "اكتشف ما تحتاجه", icon: "✦" },
  { id: "home", label: "المنزل والصيانة", description: "صيانة وإصلاح وتجهيز", icon: "⌂" },
  { id: "cleaning", label: "النظافة والعناية", description: "خدمات منزلية وشخصية", icon: "◈" },
  { id: "digital", label: "الخدمات الرقمية", description: "تصميم وتقنية ومحتوى", icon: "⌘" },
  { id: "education", label: "التعليم والتدريب", description: "تعلم ومهارات واستشارات", icon: "▤" },
  { id: "business", label: "الأعمال والمشروعات", description: "دعم وتشغيل وتطوير", icon: "▦" },
  { id: "events", label: "المناسبات والفعاليات", description: "تنظيم وتجهيز", icon: "✧" },
  { id: "personal", label: "الخدمات الشخصية", description: "خدمات فردية متنوعة", icon: "◇" },
];

const providers: Provider[] = [
  {
    id: "p-01",
    name: "أحمد محمود",
    profession: "فني صيانة منزلية",
    categoryId: "home",
    description: "صيانة كهرباء وسباكة وأعمال إصلاح منزلية مع توضيح التكلفة قبل بدء التنفيذ.",
    tags: ["كهرباء", "سباكة", "صيانة"],
    area: "الإسماعيلية",
    rating: 4.9,
    reviews: 128,
    completed: 214,
    startingPrice: "يبدأ من 150 ج.م",
    responseTime: "يرد خلال 10 دقائق",
    verified: true,
    available: true,
    initials: "أم",
  },
  {
    id: "p-02",
    name: "سارة علي",
    profession: "مصممة هوية بصرية",
    categoryId: "digital",
    description: "تصميم هويات بصرية وشعارات ومواد تسويقية للمشروعات الناشئة والشركات.",
    tags: ["تصميم", "هوية بصرية", "شعارات"],
    area: "عن بُعد",
    rating: 5.0,
    reviews: 86,
    completed: 143,
    startingPrice: "يبدأ من 500 ج.م",
    responseTime: "ترد خلال ساعة",
    verified: true,
    available: true,
    initials: "سع",
  },
  {
    id: "p-03",
    name: "محمود إبراهيم",
    profession: "متخصص تنظيف عميق",
    categoryId: "cleaning",
    description: "تنظيف عميق للمنازل والمكاتب باستخدام خطة واضحة حسب المساحة والاحتياج.",
    tags: ["تنظيف", "منازل", "مكاتب"],
    area: "الإسماعيلية",
    rating: 4.8,
    reviews: 74,
    completed: 119,
    startingPrice: "يبدأ من 300 ج.م",
    responseTime: "يرد خلال 20 دقيقة",
    verified: true,
    available: true,
    initials: "مإ",
  },
  {
    id: "p-04",
    name: "نور حسن",
    profession: "مدرسة رياضيات",
    categoryId: "education",
    description: "دروس تأسيس ومراجعات ومتابعة تعليمية بخطة تناسب مستوى المتعلم.",
    tags: ["رياضيات", "تأسيس", "متابعة"],
    area: "الإسماعيلية / أونلاين",
    rating: 4.9,
    reviews: 63,
    completed: 97,
    startingPrice: "يبدأ من 120 ج.م للحصة",
    responseTime: "ترد خلال 30 دقيقة",
    verified: true,
    available: false,
    initials: "نح",
  },
  {
    id: "p-05",
    name: "كريم يوسف",
    profession: "مطور مواقع ومتاجر",
    categoryId: "digital",
    description: "تطوير مواقع تعريفية ومتاجر إلكترونية وتحسين تجربة المستخدم والأداء.",
    tags: ["تطوير مواقع", "متاجر", "برمجة"],
    area: "عن بُعد",
    rating: 4.9,
    reviews: 51,
    completed: 72,
    startingPrice: "حسب نطاق المشروع",
    responseTime: "يرد خلال ساعتين",
    verified: true,
    available: true,
    initials: "كي",
  },
  {
    id: "p-06",
    name: "منى سمير",
    profession: "منسقة فعاليات",
    categoryId: "events",
    description: "تنسيق المناسبات والاجتماعات وتجهيز قوائم الموردين والميزانيات.",
    tags: ["تنظيم", "فعاليات", "تجهيز"],
    area: "الإسماعيلية",
    rating: 4.7,
    reviews: 39,
    completed: 58,
    startingPrice: "حسب تفاصيل المناسبة",
    responseTime: "ترد خلال ساعة",
    verified: false,
    available: true,
    initials: "مس",
  },
  {
    id: "p-07",
    name: "ليلى جمال",
    profession: "منسقة خدمات شخصية",
    categoryId: "personal",
    description: "تنسيق خدمات العناية والمظهر وفق احتياج العميل وموعده ونطاق الخدمة.",
    tags: ["تنسيق", "عناية", "خدمات شخصية"],
    area: "الإسماعيلية",
    rating: 4.8,
    reviews: 42,
    completed: 67,
    startingPrice: "حسب تفاصيل الخدمة",
    responseTime: "ترد خلال ساعة",
    verified: true,
    available: true,
    initials: "لج",
  },
];

const initialRequest: ServiceRequest = {
  categoryId: "home",
  title: "",
  description: "",
  area: "",
  budget: "",
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [request, setRequest] = useState<ServiceRequest>(initialRequest);
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<string>("");
  const [notice, setNotice] = useState("");
  const [providerName, setProviderName] = useState("");
  const [providerSkill, setProviderSkill] = useState("");
  const [providerArea, setProviderArea] = useState("");

  const visibleProviders = useMemo(
    () =>
      filterProviders(providers, {
        query,
        categoryId: activeCategory,
      }) as Provider[],
    [query, activeCategory],
  );

  const previewOffers = useMemo(
    () => submittedRequest
      ? (filterProviders(providers, { categoryId: submittedRequest.categoryId }) as Provider[]).slice(0, 3)
      : [],
    [submittedRequest],
  );

  function openRequest(provider?: Provider) {
    setSelectedProvider(null);
    setRequest({
      ...initialRequest,
      ...(provider
        ? {
            categoryId: provider.categoryId,
            title: provider.profession,
            area: provider.area === "عن بُعد" ? "" : provider.area,
          }
        : {}),
    });
    setRequestOpen(true);
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedRequest(request);
    setSelectedOfferId("");
    setRequestOpen(false);
    setNotice(
      "تم تجهيز طلبك في المعاينة. لن يُرسل إلى مقدمي الخدمة قبل ربط المنصة بالخدمات الخلفية.",
    );
  }

  function submitProviderProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProviderOpen(false);
    setNotice(
      "تم تجهيز بيانات الانضمام في المعاينة. تفعيل حساب مقدم الخدمة يتطلب ربط التسجيل والتحقق.",
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex shrink-0 items-center gap-2.5" aria-label="InWork الرئيسية">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0F172A] text-lg font-black text-[#F59E0B]">
              I
            </span>
            <span className="text-xl font-black tracking-tight">InWork</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-[#0F172A]">اكتشف الخدمات</a>
            <a href="#how-it-works" className="transition hover:text-[#0F172A]">كيف تعمل المنصة؟</a>
            <a href="#trust" className="transition hover:text-[#0F172A]">الثقة والأمان</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setProviderOpen(true)}
              className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#0F172A] transition hover:bg-slate-100 sm:inline-flex"
            >
              أقدم خدمة
            </button>
            <button
              onClick={() => openRequest()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#F59E0B] px-4 py-2.5 text-sm font-black text-[#0F172A] shadow-sm transition hover:bg-amber-400"
            >
              اطلب خدمة <ArrowLeft size={16} />
            </button>
          </div>
        </div>
      </header>

      {notice && (
        <div className="mx-auto mt-4 flex max-w-7xl items-start justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 sm:mx-6">
          <div className="flex items-start gap-2">
            <Check size={18} className="mt-1 shrink-0" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice("")} aria-label="إغلاق التنبيه">
            <X size={18} />
          </button>
        </div>
      )}

      <section className="relative isolate overflow-hidden bg-[#0F172A] text-white">
        <div className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-[#F59E0B]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-amber-200">
              <Sparkles size={16} />
              مجتمع واحد… خدمات وإمكانات متعددة
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.35] sm:text-5xl lg:text-6xl">
              احتياجك يلتقي
              <span className="block text-[#F59E0B]">بالشخص المناسب.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              InWork منصة خدمات تشاركية ذكية تجمع طالبي الخدمات بمقدميها،
              وتمنح الطرفين مساحة واضحة للتواصل ومقارنة العروض والاتفاق على
              تفاصيل الخدمة بالطريقة المناسبة.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => openRequest()}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#F59E0B] px-7 py-4 font-black text-[#0F172A] transition hover:bg-amber-400"
              >
                ابدأ طلب خدمة <ArrowLeft size={19} />
              </button>
              <button
                onClick={() => setProviderOpen(true)}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                انضم كمقدم خدمة <ArrowUpLeft size={18} />
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-amber-300" /> ملفات واضحة وتقييمات</span>
              <span className="inline-flex items-center gap-2"><Handshake size={16} className="text-amber-300" /> اتفاق مباشر ومرن</span>
              <span className="inline-flex items-center gap-2"><HeartHandshake size={16} className="text-amber-300" /> فرص للطرفين</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur sm:p-6">
              <div className="flex items-center justify-between gap-3 px-1 pb-5">
                <div>
                  <div className="text-sm font-bold text-amber-200">طريقة أكثر مرونة</div>
                  <div className="mt-1 text-xl font-black">أنت تختار الأنسب</div>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-bold text-emerald-200">تجربة تشاركية</span>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl bg-white p-4 text-[#0F172A]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-xl">⌂</span>
                      <div>
                        <div className="font-black">صيانة منزلية</div>
                        <div className="mt-1 text-xs text-slate-500">طلب واحد… واختيارات متعددة</div>
                      </div>
                    </div>
                    <BadgeCheck className="text-emerald-600" size={21} />
                  </div>
                </div>
                <div className="mr-5 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold">عرض مقدم خدمة</span>
                    <span className="font-black text-amber-200">150 ج.م</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                    <Star size={13} className="fill-amber-300 text-amber-300" /> 4.9
                    <span>·</span><span>موثّق</span><span>·</span><span>متاح الآن</span>
                  </div>
                </div>
                <div className="ml-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold">عرض آخر للمقارنة</span>
                    <span className="font-black text-amber-200">180 ج.م</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-300">قارن التفاصيل والتقييم ووقت الاستجابة قبل الاتفاق</div>
                </div>
                <div className="flex items-center gap-2 px-2 pt-1 text-xs text-slate-400">
                  <ShieldCheck size={15} /> لا يتم اختيار مقدم الخدمة نيابةً عنك
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {submittedRequest && (
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
          <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm font-black text-amber-700">طلبك جاهز للمقارنة</div>
                <h2 className="mt-1 text-2xl font-black">{submittedRequest.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{submittedRequest.description}</p>
                <div className="mt-2 text-xs text-slate-500">
                  {submittedRequest.area || "لم يتم تحديد موقع"}{submittedRequest.budget ? " · الميزانية الاسترشادية: " + submittedRequest.budget : ""}
                </div>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-black text-amber-800 ring-1 ring-amber-200">معاينة عروض توضيحية</span>
            </div>
            {previewOffers.length > 0 ? (
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {previewOffers.map((provider) => (
                  <article key={provider.id} className={selectedOfferId === provider.id ? "rounded-2xl border border-[#F59E0B] bg-white p-4 ring-2 ring-amber-200" : "rounded-2xl border border-amber-100 bg-white p-4"}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-black">{provider.name}</div>
                      {provider.verified && <BadgeCheck size={16} className="text-sky-600" aria-label="حساب موثّق" />}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{provider.profession}</div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-black">{provider.startingPrice}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold"><Star size={13} className="fill-amber-400 text-amber-400" />{provider.rating}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-500"><Clock3 size={13} />{provider.responseTime}</div>
                    <button
                      onClick={() => {
                        setSelectedOfferId(provider.id);
                        setNotice("تم اختيار هذا العرض مبدئيًا في المعاينة فقط. لا يوجد اتفاق أو حجز فعلي قبل تفعيل النظام.");
                      }}
                      className={selectedOfferId === provider.id ? "mt-4 w-full rounded-xl bg-amber-100 py-2.5 text-sm font-black text-amber-900" : "mt-4 w-full rounded-xl bg-[#0F172A] py-2.5 text-sm font-black text-white transition hover:bg-slate-800"}
                    >
                      {selectedOfferId === provider.id ? "تم التحديد مبدئيًا" : "اختر هذا العرض"}
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-white p-4 text-sm text-slate-500">لا توجد نماذج عروض لهذا المجال في المعاينة الحالية.</p>
            )}
            <p className="mt-4 text-xs leading-6 text-slate-500">العروض المعروضة بيانات توضيحية ثابتة لشرح المقارنة، وليست عروضًا واردة من مقدمي خدمة فعليين. إرسال الطلب واستقبال عروض حقيقية يتطلبان تفعيل الخادم والحسابات.</p>
          </div>
        </section>
      )}

      <section id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-black text-amber-600">اكتشف إمكانات المجتمع</div>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">ما الخدمة التي تبحث عنها؟</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-500">مجالات متنوعة قابلة للتوسع، من الخدمات اليومية إلى الخبرات المهنية والرقمية.</p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن خدمة أو مقدم..."
              aria-label="ابحث عن خدمة أو مقدم"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-11 pl-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-2xl border p-4 text-right transition ${activeCategory === category.id ? "border-[#0F172A] bg-[#0F172A] text-white shadow-lg shadow-slate-900/10" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"}`}
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl text-xl ${activeCategory === category.id ? "bg-white/10 text-amber-300" : "bg-amber-50 text-amber-700"}`}>{category.icon}</span>
              <span className="mt-4 block text-sm font-black">{category.label}</span>
              <span className={`mt-1 block text-xs leading-5 ${activeCategory === category.id ? "text-slate-300" : "text-slate-500"}`}>{category.description}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black">مقدمو خدمات مقترحون</h3>
            <p className="mt-1 text-sm text-slate-500">اكتشف الملفات وقارن الخبرات قبل إرسال طلبك. الأسماء والتقييمات والأسعار هنا أمثلة توضيحية وليست بيانات فعلية.</p>
          </div>
          <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200 sm:inline-flex">{visibleProviders.length} نتائج</span>
        </div>

        {visibleProviders.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleProviders.map((provider) => (
              <article key={provider.id} className="group rounded-3xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-slate-900/5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#0F172A] text-lg font-black text-[#F59E0B]">{provider.initials}</span>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h4 className="font-black">{provider.name}</h4>
                        {provider.verified && <BadgeCheck size={16} className="text-sky-600" aria-label="حساب موثّق" />}
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{provider.profession}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProvider(provider)}
                    aria-label={`عرض ملف ${provider.name}`}
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#0F172A]"
                  >
                    <ChevronLeft size={19} />
                  </button>
                </div>

                <p className="mt-5 min-h-12 text-sm leading-6 text-slate-600">{provider.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {provider.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{tag}</span>)}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 text-sm">
                  <div>
                    <div className="flex items-center gap-1.5 font-black"><Star size={15} className="fill-amber-400 text-amber-400" /> {provider.rating} <span className="text-xs font-medium text-slate-400">({provider.reviews})</span></div>
                    <div className="mt-1 text-xs text-slate-500">تقييم العملاء</div>
                  </div>
                  <div>
                    <div className="font-black">{provider.completed}</div>
                    <div className="mt-1 text-xs text-slate-500">خدمة مكتملة</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-black text-[#0F172A]">{provider.startingPrice}</div>
                    <div className="mt-1 text-xs text-slate-500">{provider.area}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${provider.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {provider.available ? "متاح الآن" : "غير متاح حاليًا"}
                  </span>
                </div>
                <button
                  onClick={() => openRequest(provider)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  اطلب هذه الخدمة <ArrowLeft size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <Search className="mx-auto text-slate-300" size={30} />
            <h4 className="mt-3 font-black">لا توجد نتائج مطابقة</h4>
            <p className="mt-1 text-sm text-slate-500">جرّب كلمة بحث أخرى أو اختر مجالًا مختلفًا.</p>
            <button onClick={() => { setQuery(""); setActiveCategory("all"); }} className="mt-4 text-sm font-black text-amber-700">إعادة ضبط البحث</button>
          </div>
        )}
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-black text-amber-600">رحلة واضحة للطرفين</div>
            <h2 className="mt-2 text-3xl font-black">من الاحتياج إلى الاتفاق</h2>
            <p className="mt-3 leading-7 text-slate-500">نستفيد من بساطة تدفق الطلب ووضوح العروض، مع تكييف التجربة لتناسب كل أنواع الخدمات.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { number: "01", title: "صف احتياجك", text: "حدد المجال واكتب تفاصيل الخدمة والموقع والميزانية الاسترشادية إن وجدت.", icon: <MessageCircle size={22} /> },
              { number: "02", title: "استقبل وقارن", text: "راجع ملفات مقدمي الخدمة وخبراتهم وتقييماتهم والعروض المتاحة.", icon: <BriefcaseBusiness size={22} /> },
              { number: "03", title: "اتفق بثقة", text: "ناقش التفاصيل واختر العرض الأنسب، ثم تابع حالة الخدمة بوضوح.", icon: <Handshake size={22} /> },
            ].map((step) => (
              <div key={step.number} className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0F172A] text-amber-300">{step.icon}</span>
                  <span className="text-3xl font-black text-slate-200">{step.number}</span>
                </div>
                <h3 className="mt-6 text-xl font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-16">
        <div>
          <div className="text-sm font-black text-amber-600">الثقة جزء من التجربة</div>
          <h2 className="mt-2 text-3xl font-black">قرارك مبني على معلومات، لا تخمين.</h2>
          <p className="mt-4 leading-8 text-slate-500">نعرض عناصر تساعدك على تقييم مقدم الخدمة ومقارنة البدائل. التوثيق والتقييمات ومتابعة الطلبات يجب أن تكون مدعومة ببيانات فعلية وسياسات واضحة عند تشغيل الخدمات الخلفية.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["ملفات مقدمي الخدمة", "الخبرات والمهارات ونطاق الخدمة"],
            ["التقييمات والإنجازات", "مؤشرات واضحة لمراجعة الأداء"],
            ["عروض قابلة للمقارنة", "السعر والتفاصيل ووقت الاستجابة"],
            ["متابعة الطلب", "حالة واضحة وسجل للتواصل والاتفاق"],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <ShieldCheck className="text-amber-600" size={21} />
              <div className="mt-3 font-black">{title}</div>
              <p className="mt-1 text-xs leading-6 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0F172A] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black">هل لديك مهارة تقدم بها قيمة؟</h2>
            <p className="mt-2 text-sm text-slate-300">انضم إلى مجتمع InWork وعرّف الآخرين بخدماتك وخبراتك.</p>
          </div>
          <button onClick={() => setProviderOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-6 py-3.5 font-black text-[#0F172A] transition hover:bg-amber-400">
            ابدأ كمقدم خدمة <ArrowLeft size={17} />
          </button>
        </div>
      </section>

      <footer className="bg-white px-4 py-6 text-center text-xs text-slate-400">
        <span className="font-black text-[#0F172A]">InWork</span> — منصة خدمات تشاركية ذكية
      </footer>

      {requestOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setRequestOpen(false); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="request-title" className="my-6 w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-black text-amber-600">طلب جديد</div>
                <h2 id="request-title" className="mt-1 text-2xl font-black">ما الذي تحتاجه؟</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">اكتب التفاصيل التي تساعد مقدمي الخدمة على فهم احتياجك وتقديم عرض مناسب.</p>
              </div>
              <button onClick={() => setRequestOpen(false)} aria-label="إغلاق" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X /></button>
            </div>
            <form onSubmit={submitRequest} className="mt-6 space-y-4">
              <label className="block text-sm font-bold">مجال الخدمة
                <select value={request.categoryId} onChange={(event) => setRequest({ ...request, categoryId: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-amber-400">
                  {categories.filter((category) => category.id !== "all").map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
                </select>
              </label>
              <label className="block text-sm font-bold">عنوان الطلب
                <input required value={request.title} onChange={(event) => setRequest({ ...request, title: event.target.value })} placeholder="مثال: إصلاح عطل أو تصميم متجر إلكتروني" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-400" />
              </label>
              <label className="block text-sm font-bold">تفاصيل الخدمة
                <textarea required minLength={10} value={request.description} onChange={(event) => setRequest({ ...request, description: event.target.value })} placeholder="اشرح المطلوب والنتيجة التي تتوقعها..." className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-400" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-bold">المدينة أو نطاق الخدمة
                  <input value={request.area} onChange={(event) => setRequest({ ...request, area: event.target.value })} placeholder="مثال: الإسماعيلية أو عن بُعد" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-400" />
                </label>
                <label className="block text-sm font-bold">ميزانية استرشادية (اختياري)
                  <input value={request.budget} onChange={(event) => setRequest({ ...request, budget: event.target.value })} placeholder="مثال: 500 جنيه" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-400" />
                </label>
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-950">هذه معاينة تفاعلية للواجهة. حفظ الطلب وإرساله فعليًا يتطلب تفعيل قاعدة البيانات ونظام الحسابات والإشعارات.</div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-4 font-black text-white transition hover:bg-slate-800">متابعة الطلب <ArrowLeft size={17} /></button>
            </form>
          </div>
        </div>
      )}

      {selectedProvider && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProvider(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="provider-title" className="my-6 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0F172A] text-lg font-black text-[#F59E0B]">{selectedProvider.initials}</span>
                <div>
                  <h2 id="provider-title" className="text-xl font-black">{selectedProvider.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedProvider.profession}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProvider(null)} aria-label="إغلاق" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X /></button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-50 p-3 text-center"><div className="font-black">{selectedProvider.rating} ★</div><div className="mt-1 text-[11px] text-slate-500">التقييم</div></div>
              <div className="rounded-xl bg-slate-50 p-3 text-center"><div className="font-black">{selectedProvider.completed}</div><div className="mt-1 text-[11px] text-slate-500">خدمة مكتملة</div></div>
              <div className="rounded-xl bg-slate-50 p-3 text-center"><div className="font-black">{selectedProvider.reviews}</div><div className="mt-1 text-[11px] text-slate-500">مراجعة</div></div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">{selectedProvider.description}</p>
            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div><div className="text-xs text-slate-500">السعر الاسترشادي</div><div className="mt-1 font-black">{selectedProvider.startingPrice}</div></div>
              <div className="text-left"><div className="text-xs text-slate-500">وقت الاستجابة</div><div className="mt-1 flex items-center gap-1 text-xs font-bold"><Clock3 size={14} />{selectedProvider.responseTime}</div></div>
            </div>
            <button onClick={() => openRequest(selectedProvider)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F59E0B] py-4 font-black text-[#0F172A] transition hover:bg-amber-400">اطلب الخدمة من هذا المقدم <ArrowLeft size={17} /></button>
          </div>
        </div>
      )}

      {providerOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setProviderOpen(false); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="join-title" className="my-6 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-black text-amber-600">مجتمع مقدمي الخدمة</div>
                <h2 id="join-title" className="mt-1 text-2xl font-black">عرّفنا بخبرتك</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">ابدأ بتجهيز ملفك المهني، ثم استكمل التحقق والتفعيل عند إطلاق التسجيل.</p>
              </div>
              <button onClick={() => setProviderOpen(false)} aria-label="إغلاق" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X /></button>
            </div>
            <form onSubmit={submitProviderProfile} className="mt-6 space-y-4">
              <label className="block text-sm font-bold">الاسم
                <input required value={providerName} onChange={(event) => setProviderName(event.target.value)} placeholder="اسم مقدم الخدمة" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-400" />
              </label>
              <label className="block text-sm font-bold">الخدمة أو التخصص
                <input required value={providerSkill} onChange={(event) => setProviderSkill(event.target.value)} placeholder="ما الخدمة التي تقدمها؟" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-400" />
              </label>
              <label className="block text-sm font-bold">نطاق تقديم الخدمة
                <input required value={providerArea} onChange={(event) => setProviderArea(event.target.value)} placeholder="المدينة أو عن بُعد" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-amber-400" />
              </label>
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500">سيتم ربط هذا النموذج لاحقًا بإنشاء الحساب ورفع بيانات الخبرة والتحقق من مقدم الخدمة.</div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-4 font-black text-white transition hover:bg-slate-800">تجهيز ملف الانضمام <ArrowLeft size={17} /></button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
