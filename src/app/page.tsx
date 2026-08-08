"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, ChevronDown, Filter, Heart, Mic, Search, ShieldCheck, Sparkles, X } from "lucide-react";

type Job = { title:string; company:string; place:string; mode:string; income:string; tags:string[]; level:string; intl?:boolean };

const jobs: Job[] = [
  {title:"مساعد افتراضي", company:"شركة خدمات رقمية", place:"عن بُعد", mode:"Remote", income:"8,000–14,000 جنيه", tags:["تنظيم","Excel","عربي"], level:"مناسبة ليك جدًا"},
  {title:"إدخال بيانات", company:"مشروعات إلكترونية", place:"من البيت", mode:"من البيت", income:"6,000–10,000 جنيه", tags:["دقة","Word","Excel"], level:"مناسبة ليك"},
  {title:"خدمة عملاء عربي", company:"منصة تجارة إلكترونية", place:"القاهرة / هجين", mode:"دوام كامل", income:"9,000–15,000 جنيه", tags:["تواصل","عربي","خدمة عملاء"], level:"مناسبة ليك"},
  {title:"Virtual Assistant", company:"Remote team", place:"Worldwide", mode:"Remote", income:"$500–900 / شهر", tags:["English","Notion","Email"], level:"ممكن تناسبك", intl:true},
  {title:"Bookkeeping Assistant", company:"Small Business Network", place:"Worldwide", mode:"Freelance", income:"$8–15 / ساعة", tags:["Excel","Accounting","English"], level:"ممكن تناسبك", intl:true},
  {title:"مصمم محتوى سوشيال", company:"استوديو إبداعي", place:"عن بُعد", mode:"Freelance", income:"7,000–18,000 جنيه", tags:["Canva","تصميم","محتوى"], level:"فرصة ممكن متكنش فكرت فيها"},
];

const skills = ["Excel", "Word", "التواصل", "خدمة العملاء", "Canva", "المحاسبة", "الكتابة", "التنظيم"];

export default function Home(){
  const [screen,setScreen]=useState(0);
  const [agreed,setAgreed]=useState(false);
  const [profile,setProfile]=useState({name:"",city:"",age:"",contact:"",experience:"",skills:[] as string[],english:false,work:""});
  const [filter,setFilter]=useState("الكل");
  const [fav,setFav]=useState<string[]>([]);
  const [selected,setSelected]=useState<Job|null>(null);
  const [query,setQuery]=useState("");
  const visible=useMemo(()=>jobs.filter(j=>{
    const q=(j.title+j.company+j.tags.join(" ")).toLowerCase();
    const match=!query || q.includes(query.toLowerCase());
    const f=filter==="الكل" || j.mode===filter || (filter==="بالدولار"&&j.income.includes("$")) || (filter==="بالجنيه"&&j.income.includes("جنيه"));
    return match&&f;
  }).filter(j=>profile.english||!j.intl),[filter,query,profile.english]);

  const next=()=>setScreen(s=>Math.min(s+1,5));
  const back=()=>setScreen(s=>Math.max(s-1,0));

  return <main dir="rtl" className="min-h-screen bg-[#f7f9fc] text-slate-900">
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button onClick={()=>setScreen(0)} className="flex items-center gap-2 font-black text-xl"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">I</span> InWork</button>
        <div className="hidden sm:block text-sm text-slate-500">خلّي فرص الشغل تيجي لحد عندك</div>
        <button onClick={()=>setScreen(5)} className="rounded-full px-3 py-2 text-sm font-bold hover:bg-slate-100">تجربة سريعة</button>
      </div>
    </header>

    {screen===0 && <section className="mx-auto flex min-h-[calc(100vh-65px)] max-w-6xl items-center px-4 py-12">
      <div className="grid w-full gap-10 md:grid-cols-[1.2fr_.8fr] md:items-center">
        <div><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700"><Sparkles size={16}/> فرص على مقاسك، مش قائمة عشوائية</div>
          <h1 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">مش لازم تدور على الشغل.<br/><span className="text-indigo-600">خلّيه ييجي لك.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">عرّفنا بخبرتك ومهاراتك بسرعة، وإحنا نرتّب لك فرص مناسبة وتعلّمات تفتح لك أبواب جديدة.</p>
          <button onClick={next} className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">يلا نبدأ <ArrowLeft size={19}/></button>
          <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-500"><span>✓ بدون أسئلة مالهاش لازمة</span><span>✓ عربي وبسيط</span><span>✓ مفيش نسب وهمية</span></div>
        </div>
        <div className="rounded-[2rem] bg-slate-900 p-5 text-white shadow-2xl"><div className="mb-4 flex items-center justify-between"><span className="font-bold">مثال لنتيجة مناسبة</span><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">مناسبة ليك جدًا</span></div><div className="rounded-2xl bg-white p-5 text-slate-900"><div className="text-2xl font-black">مساعد افتراضي</div><div className="mt-1 text-slate-500">شركة خدمات رقمية · عن بُعد</div><div className="mt-5 font-bold">8,000–14,000 جنيه</div><div className="mt-4 flex flex-wrap gap-2">{["تنظيم","Excel","عربي"].map(x=><span key={x} className="rounded-full bg-slate-100 px-3 py-1 text-xs">{x}</span>)}</div></div></div>
      </div>
    </section>}

    {screen===1 && <Wizard title="قبل ما نبدأ" step="1 من 4"><div className="rounded-3xl border bg-amber-50 p-5 text-sm leading-7 text-amber-950"><div className="mb-2 flex items-center gap-2 font-black"><ShieldCheck/> إخلاء مسؤولية واستخدام مسؤول</div>الفرص والمعلومات المعروضة تجريبية في هذه النسخة وقد تتغير أو لا تكون مناسبة لكل شخص. التقديم النهائي وشروط أي جهة عمل مسؤولية المستخدم. لا نعتمد على أي نتيجة آلية كضمان للتوظيف.</div><label className="mt-5 flex cursor-pointer gap-3 rounded-2xl border bg-white p-4"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="mt-1 h-5 w-5"/><span className="font-bold">أوافق على إخلاء المسؤولية وشروط الاستخدام التجريبية.</span></label><button disabled={!agreed} onClick={next} className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">موافق ونكمل</button></Wizard>}

    {screen===2 && <Wizard title="قول لنا الأساسيات" step="2 من 4"><div className="grid gap-4 sm:grid-cols-2">{[["name","اسمك"],["city","المحافظة"],["age","الفئة العمرية"],["contact","واتساب أو إيميل"]].map(([k,l])=><input key={k} value={(profile as any)[k]} onChange={e=>setProfile({...profile,[k]:e.target.value})} placeholder={l} className="rounded-2xl border bg-white px-4 py-4 outline-none focus:border-indigo-500"/> )}</div><button onClick={next} className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white">نكمل للملف الشخصي</button></Wizard>}

    {screen===3 && <Wizard title="خلّينا نفهمك بسرعة" step="3 من 4"><div><p className="mb-3 font-bold">خبرتك أقرب لإيه؟</p><div className="grid gap-3 sm:grid-cols-2">{["لسه ببدأ","أقل من سنة","1–3 سنين","أكتر من 3 سنين"].map(x=><button key={x} onClick={()=>setProfile({...profile,experience:x})} className={`rounded-2xl border p-4 text-right ${profile.experience===x?"border-indigo-600 bg-indigo-50":"bg-white"}`}>{x}</button>)}</div></div><div className="mt-6"><p className="mb-3 font-bold">مهاراتك</p><div className="flex flex-wrap gap-2">{skills.map(x=><button key={x} onClick={()=>setProfile({...profile,skills:profile.skills.includes(x)?profile.skills.filter(s=>s!==x):[...profile.skills,x]})} className={`rounded-full border px-4 py-2 text-sm ${profile.skills.includes(x)?"border-indigo-600 bg-indigo-600 text-white":"bg-white"}`}>{x}</button>)}</div></div><label className="mt-6 flex items-center gap-3 rounded-2xl border bg-white p-4"><input type="checkbox" checked={profile.english} onChange={e=>setProfile({...profile,english:e.target.checked})} className="h-5 w-5"/> بعرف إنجليزي وعايز أشوف فرص دولية</label><button onClick={next} className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white">ورّيني الفرص</button></Wizard>}

    {screen===4 && <section className="mx-auto max-w-6xl px-4 py-8"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><div className="text-sm font-bold text-indigo-600">لقينا فرص ممكن تناسبك</div><h2 className="mt-1 text-3xl font-black">يا {profile.name||"صاحبي"}، نبدأ من هنا 👋</h2></div><div className="flex gap-2"><div className="flex items-center gap-2 rounded-2xl border bg-white px-4"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="دور في الفرص" className="w-32 py-3 outline-none"/></div><button onClick={()=>setFilter(filter==="الكل"?"Remote":"الكل")} className="rounded-2xl border bg-white px-4"><Filter size={18}/></button></div></div><div className="mt-5 flex gap-2 overflow-auto pb-2">{["الكل","Remote","من البيت","Freelance","بالجنيه","بالدولار"].map(x=><button key={x} onClick={()=>setFilter(x)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${filter===x?"bg-slate-900 text-white":"border bg-white"}`}>{x}</button>)}</div><div className="mt-6 grid gap-4 md:grid-cols-2">{visible.map(j=><article key={j.title} className="rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex justify-between gap-4"><div><div className="text-xl font-black">{j.title}</div><div className="mt-1 text-sm text-slate-500">{j.company} · {j.place}</div></div><button onClick={()=>setFav(fav.includes(j.title)?fav.filter(x=>x!==j.title):[...fav,j.title])} className="text-slate-400">{fav.includes(j.title)?<Heart fill="currentColor" className="text-rose-500"/>:<Heart/>}</button></div><div className="mt-5 flex items-center justify-between"><span className="font-black">{j.income}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{j.level}</span></div><div className="mt-4 flex flex-wrap gap-2">{j.tags.map(t=><span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs">{t}</span>)}</div><button onClick={()=>setSelected(j)} className="mt-5 w-full rounded-2xl bg-slate-900 py-3 font-bold text-white">شوف التفاصيل</button></article>)}</div><div className="mt-8 rounded-3xl bg-indigo-50 p-6"><div className="flex items-center gap-2 font-black"><Sparkles size={18} className="text-indigo-600"/> مهارات هتفتح لك فرص أكتر</div><div className="mt-3 grid gap-3 sm:grid-cols-4">{["Excel عملي","English لخدمة العملاء","أساسيات Frontend","Freelancing من الصفر"].map(x=><div key={x} className="rounded-2xl bg-white p-4 font-bold">{x}<div className="mt-1 text-xs text-slate-500">محتوى مجاني</div></div>)}</div></div></section>}

    {screen===5 && <section className="mx-auto max-w-4xl px-4 py-10"><div className="rounded-[2rem] bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-700"><Mic/></div><div><h2 className="text-2xl font-black">اكتب أو قول</h2><p className="text-sm text-slate-500">احكي خبرتك بطريقتك، والنسخة التجريبية تحوّلها لبيانات.</p></div></div><textarea value={profile.work} onChange={e=>setProfile({...profile,work:e.target.value})} placeholder="مثال: اشتغلت في محل موبايلات وبعرف أتعامل مع العملاء وExcel..." className="mt-5 min-h-40 w-full rounded-2xl border p-4 outline-none focus:border-indigo-500"/><button onClick={()=>setScreen(4)} className="mt-4 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white">حلّل وورّيني الفرص</button></div></section>}

    {selected && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" onClick={()=>setSelected(null)}><div onClick={e=>e.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-white p-6"><div className="flex justify-between"><div><h3 className="text-2xl font-black">{selected.title}</h3><p className="mt-1 text-slate-500">{selected.company} · {selected.place}</p></div><button onClick={()=>setSelected(null)}><X/></button></div><div className="mt-6 rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">دخل معلن / متوقع</div><div className="mt-1 text-xl font-black">{selected.income}</div></div><p className="mt-5 leading-7 text-slate-600">هذه فرصة تجريبية لعرض تجربة InWork. التقديم النهائي يتم لدى الجهة الخارجية، ويجب مراجعة الشروط والتفاصيل قبل أي التزام.</p><button className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white">معرفة طريقة التقديم</button></div></div>}
  </main>
}

function Wizard({children,title,step}:{children:React.ReactNode;title:string;step:string}){return <section className="mx-auto max-w-2xl px-4 py-10"><button onClick={()=>history.back()} className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500"><ArrowRight size={16}/> رجوع</button><div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8"><div className="text-sm font-bold text-indigo-600">{step}</div><h1 className="mt-2 text-3xl font-black">{title}</h1><div className="mt-7">{children}</div></div></section>}
