export type Lang = "en" | "ar";

export type Translation = {
  nav: ReadonlyArray<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    headingLines: string[];
    lede: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string[];
    pillars: Array<{ title: string; copy: string }>;
  };
  services: {
    eyebrow: string;
    heading: string;
    lede: string;
    items: Array<{ id: string; index: string; title: string; blurb: string }>;
  };
  process: {
    eyebrow: string;
    heading: string;
    lede: string;
    steps: Array<{ index: string; title: string; copy: string }>;
  };
  projects: {
    eyebrow: string;
    heading: string;
    lede: string;
    items: Array<{ title: string }>;
  };
  stats: {
    items: Array<{ value: number; suffix: string; label: string }>;
    trustedBy: string;
    logos: string[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    lede: string;
    labels: {
      studio: string;
      email: string;
      phone: string;
      whatsapp: string;
      hours: string;
    };
    form: {
      name: string;
      email: string;
      phone: string;
      phoneHint: string;
      service: string;
      serviceChoose: string;
      message: string;
      messagePlaceholder: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      submit: string;
      submitting: string;
      successToast: string;
      errorToast: string;
      legalNote: string;
    };
  };
  footer: {
    tagline: string;
    intro: string;
    columns: { company: string; services: string; elsewhere: string };
    rights: string;
    madeIn: string;
  };
  cta: {
    getQuote: string;
  };
  services_enum: Record<string, string>;
};

const TRANSLATIONS: Record<Lang, Translation> = {
  en: {
    nav: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "We design, you deserve.",
      headingLines: ["Surfaces built", "with precision."],
      lede: "A Dubai-based fit-out and flooring studio delivering clean, considered finishes for homes, offices and retail across the Emirates.",
      primaryCta: { label: "Start a project", href: "#contact" },
      secondaryCta: { label: "View our work", href: "#work" },
    },
    about: {
      eyebrow: "About",
      heading: "Built on detail,\nfinished with care.",
      body: [
        "For over a decade, Anay Technical Services has delivered end-to-end fit-out and flooring across the UAE — from private residences in Jumeirah to commercial floors in DIFC.",
        "We take a single-trade approach: our own crews handle flooring, gypsum, paint, plaster and MEP, so lines of responsibility stay clear and quality stays consistent.",
      ],
      pillars: [
        { title: "Precision", copy: "Site surveys, moisture tests, substrate prep. The finish is only as good as what's underneath." },
        { title: "Materials", copy: "Sourced from trusted regional and European suppliers. Verified lot numbers, full traceability." },
        { title: "Timelines", copy: "A planned programme with weekly milestones — no moving goalposts, no awkward surprises." },
        { title: "Aftercare", copy: "A 12-month workmanship warranty and a named contact for the life of the project." },
      ],
    },
    services: {
      eyebrow: "Services",
      heading: "Everything the\nspace needs.",
      lede: "A single, accountable team for civil, flooring, paint, electrical, plumbing and gypsum — every trade a complete fit-out needs, under one roof.",
      items: [
        { id: "civil", index: "01", title: "Civil", blurb: "Plastering, wall tiling, engraving and the wet-trade foundations — flat, square walls ready for any finish." },
        { id: "flooring", index: "02", title: "Flooring", blurb: "Carpet, tile, vinyl, LVT, raised floor and wood — tensioned, welded, levelled and detailed to specification." },
        { id: "paint", index: "03", title: "Paint", blurb: "Low-VOC emulsions, lacquers and specialist finishes — prep-led, cleanly cut and inspected at every coat." },
        { id: "electrical", index: "04", title: "Electrical", blurb: "DEWA-approved contractors for lighting, power and low-voltage — designed, installed, tested and handed over." },
        { id: "plumbing", index: "05", title: "Plumbing", blurb: "Hot and cold, drainage, pumps and fixtures — pressure-tested, concealed where it should be, serviceable where it counts." },
        { id: "gypsum", index: "06", title: "Gypsum", blurb: "False ceilings, light partitions and decorative bulkheads — single and double-layer with acoustic, fire and moisture options." },
      ],
    },
    process: {
      eyebrow: "Approach",
      heading: "How we work.",
      lede: "A clear, repeatable programme — small enough to stay personal, disciplined enough to run on schedule.",
      steps: [
        { index: "01", title: "Consult", copy: "Free site walk, measurements and a conversation about brief, budget and timeline. No obligation." },
        { index: "02", title: "Scope & Quote", copy: "A clear, itemised quotation — materials, labour, schedule and assumptions — in 3 to 5 working days." },
        { index: "03", title: "Execute", copy: "In-house crews, daily site logs, weekly progress photos. You always know where the project stands." },
        { index: "04", title: "Handover", copy: "Snag walk, care guide, and a 12-month workmanship warranty with a named contact for aftercare." },
      ],
    },
    projects: {
      eyebrow: "Selected work",
      heading: "A small, careful\nbody of work.",
      lede: "Residential, commercial, retail and hospitality across Dubai and Abu Dhabi. Select projects — a fuller portfolio available on request.",
      items: [
        { title: "Al Mahavi Camp, Abu Dhabi" },
        { title: "Police Headquarters, Abu Dhabi" },
        { title: "SO Hotel, Ras Al Khaimah" },
        { title: "UAE Olympic Committee, Dubai" },
        { title: "DIFC, Dubai" },
        { title: "Villa, Emirates Hills" },
        { title: "Villa, Jumeirah Bay" },
      ],
    },
    stats: {
      items: [
        { value: 10, suffix: "+", label: "Years of practice" },
        { value: 250, suffix: "+", label: "Projects delivered" },
        { value: 40, suffix: "+", label: "Corporate clients" },
        { value: 7, suffix: "", label: "Emirates served" },
      ],
      trustedBy: "Trusted by",
      logos: ["Emaar", "Meraas", "Nakheel", "Damac", "Aldar", "Majid Al Futtaim", "Dubai Holding", "RTA"],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Start a project.",
      lede: "Tell us a little about your space and we'll be back within one business day with next steps.",
      labels: {
        studio: "Studio",
        email: "Email",
        phone: "Phone",
        whatsapp: "WhatsApp",
        hours: "Hours",
      },
      form: {
        name: "Your name",
        email: "Email",
        phone: "Phone",
        phoneHint: "Optional",
        service: "Service",
        serviceChoose: "Choose a service",
        message: "Project details",
        messagePlaceholder: "Briefly: what, where, and roughly when.",
        namePlaceholder: "Full name",
        emailPlaceholder: "you@example.com",
        phonePlaceholder: "+971 …",
        submit: "Send enquiry",
        submitting: "Sending",
        successToast: "Thanks — we'll reply within one business day.",
        errorToast: "Could not send. Please email us directly.",
        legalNote: "By sending this form you agree we may contact you about your enquiry. We never share your details.",
      },
    },
    footer: {
      tagline: "We design, you deserve.",
      intro: "Cleanly finished, built to last. We design and deliver floors and fit-outs that stand up to real use.",
      columns: { company: "Company", services: "Services", elsewhere: "Elsewhere" },
      rights: "All rights reserved.",
      madeIn: "Made with care in Dubai.",
    },
    cta: { getQuote: "Get a quote" },
    services_enum: {
      Civil: "Civil",
      Flooring: "Flooring",
      Paint: "Paint",
      Electrical: "Electrical",
      Plumbing: "Plumbing",
      Gypsum: "Gypsum",
      Other: "Other",
    },
  },
  ar: {
    nav: [
      { label: "الأعمال", href: "#work" },
      { label: "الخدمات", href: "#services" },
      { label: "منهجنا", href: "#approach" },
      { label: "تواصل معنا", href: "#contact" },
    ],
    hero: {
      eyebrow: "نصمّم، وأنت تستحقّ.",
      headingLines: ["أسطحٌ مبنيّة", "بإتقان."],
      lede: "استوديو تشطيبات وأرضيات في دبي، يقدّم تنفيذاً متقناً ومدروساً للمنازل والمكاتب ومتاجر التجزئة في كل أنحاء الإمارات.",
      primaryCta: { label: "ابدأ مشروعاً", href: "#contact" },
      secondaryCta: { label: "اطّلع على أعمالنا", href: "#work" },
    },
    about: {
      eyebrow: "عن الشركة",
      heading: "مبنيّة على التفاصيل،\nمُنجزة بعناية.",
      body: [
        "لأكثر من عشر سنوات، تقدّم شركة أناي للخدمات الفنية أعمال تشطيبات وأرضيات متكاملة في جميع أنحاء الإمارات — من المنازل الخاصة في جميرا إلى الطوابق التجارية في مركز دبي المالي العالمي.",
        "نعتمد منهجاً بفرق متخصصة من طاقمنا الداخلي يغطي الأرضيات، الجبس، الطلاء، البلاستر والأعمال الكهربائية والميكانيكية، لتبقى المسؤولية واضحة والجودة متسقة.",
      ],
      pillars: [
        { title: "الدقّة", copy: "معاينات ميدانية، فحوصات رطوبة، وتحضير للأرضيات. التشطيب يعكس جودة ما تحته." },
        { title: "المواد", copy: "مصادر من موردين موثوقين إقليمياً وأوروبياً. أرقام دفعات موثّقة وتتبّع كامل." },
        { title: "الجدول الزمني", copy: "برنامج مخطّط بمعالم أسبوعية — دون تغييرات مربكة أو مفاجآت." },
        { title: "الخدمة بعد التسليم", copy: "ضمان عمل لمدة ١٢ شهراً وجهة اتصال مسمّاة طوال عمر المشروع." },
      ],
    },
    services: {
      eyebrow: "الخدمات",
      heading: "كل ما تحتاجه\nالمساحة.",
      lede: "فريق واحد ومسؤول واحد للأعمال المدنية، الأرضيات، الطلاء، الكهرباء، السباكة والجبس — كل ما يحتاجه التشطيب الكامل، تحت سقف واحد.",
      items: [
        { id: "civil", index: "٠١", title: "الأعمال المدنية", blurb: "بلاسترة، تبليط الجدران، نقوش، وأساسات الأعمال الرطبة — جدران مسوّاة جاهزة لأي تشطيب." },
        { id: "flooring", index: "٠٢", title: "الأرضيات", blurb: "سجاد، سيراميك، فينيل، LVT، أرضيات مرتفعة وأرضيات خشبية — مشدودة، ملحومة، مسوّاة ومنفذة حسب المواصفات." },
        { id: "paint", index: "٠٣", title: "الطلاء", blurb: "دهانات منخفضة المركبات العضوية، ورنيش وتشطيبات متخصصة — تحضير دقيق، تنفيذ نظيف، وتفتيش بعد كل طبقة." },
        { id: "electrical", index: "٠٤", title: "الكهرباء", blurb: "مقاولون معتمدون من هيئة كهرباء ومياه دبي للإنارة والطاقة والجهد المنخفض — تصميم، تركيب، اختبار وتسليم." },
        { id: "plumbing", index: "٠٥", title: "السباكة", blurb: "مياه ساخنة وباردة، صرف صحي، مضخات وتركيبات — مختبرة الضغط، مخفية حيث يجب، وقابلة للصيانة حيث يجب." },
        { id: "gypsum", index: "٠٦", title: "الجبس", blurb: "أسقف مستعارة، قواطع خفيفة ومقصورات زخرفية — بطبقة واحدة أو طبقتين مع خيارات صوتية وحرارية ومقاومة للرطوبة." },
      ],
    },
    process: {
      eyebrow: "منهجنا",
      heading: "كيف نعمل.",
      lede: "برنامج واضح وقابل للتكرار — صغير بما يكفي ليبقى شخصياً، منضبط بما يكفي ليسير في موعده.",
      steps: [
        { index: "٠١", title: "الاستشارة", copy: "زيارة ميدانية مجانية، قياسات، ومحادثة حول الملخّص والميزانية والجدول الزمني. دون أي التزام." },
        { index: "٠٢", title: "النطاق والعرض", copy: "عرض سعر واضح ومفصّل — مواد، عمالة، جدول زمني وافتراضات — خلال ٣ إلى ٥ أيام عمل." },
        { index: "٠٣", title: "التنفيذ", copy: "فرق داخلية، سجلات يومية في الموقع، وصور أسبوعية للتقدّم. ستعرف دائماً أين يقف المشروع." },
        { index: "٠٤", title: "التسليم", copy: "جولة ملاحظات، دليل عناية، وضمان عمل لمدة ١٢ شهراً مع جهة اتصال مسمّاة للخدمة بعد التسليم." },
      ],
    },
    projects: {
      eyebrow: "مختارات من أعمالنا",
      heading: "مجموعة صغيرة\nومدروسة من الأعمال.",
      lede: "مشاريع سكنية وتجارية ومتاجر تجزئة وفنادق في دبي وأبوظبي. عيّنة مختارة — المزيد من الأعمال متوفّر عند الطلب.",
      items: [
        { title: "معسكر المحاوي، أبوظبي" },
        { title: "المقر الرئيسي للشرطة، أبوظبي" },
        { title: "فندق SO، رأس الخيمة" },
        { title: "اللجنة الأولمبية الإماراتية، دبي" },
        { title: "مركز دبي المالي العالمي، دبي" },
        { title: "فيلا في تلال الإمارات" },
        { title: "فيلا في خليج جميرا" },
      ],
    },
    stats: {
      items: [
        { value: 10, suffix: "+", label: "سنوات من الخبرة" },
        { value: 250, suffix: "+", label: "مشروعاً منجزاً" },
        { value: 40, suffix: "+", label: "عميلاً من الشركات" },
        { value: 7, suffix: "", label: "إمارات نخدمها" },
      ],
      trustedBy: "يثق بنا",
      logos: ["إعمار", "مراس", "نخيل", "داماك", "الدار", "ماجد الفطيم", "دبي القابضة", "هيئة الطرق والمواصلات"],
    },
    contact: {
      eyebrow: "تواصل معنا",
      heading: "ابدأ مشروعاً.",
      lede: "أخبرنا قليلاً عن مساحتك وسنردّ عليك خلال يوم عمل واحد بالخطوات التالية.",
      labels: {
        studio: "الاستوديو",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        whatsapp: "واتساب",
        hours: "ساعات العمل",
      },
      form: {
        name: "اسمك",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        phoneHint: "اختياري",
        service: "الخدمة",
        serviceChoose: "اختر خدمة",
        message: "تفاصيل المشروع",
        messagePlaceholder: "باختصار: ماذا، أين، ومتى تقريباً.",
        namePlaceholder: "الاسم الكامل",
        emailPlaceholder: "you@example.com",
        phonePlaceholder: "٠٠٠ ٠٠٠ ٠٠ ٩٧١+",
        submit: "أرسل الاستفسار",
        submitting: "جاري الإرسال",
        successToast: "شكراً — سنردّ خلال يوم عمل واحد.",
        errorToast: "تعذّر الإرسال. يرجى مراسلتنا مباشرة.",
        legalNote: "بإرسال هذا النموذج، توافق على تواصلنا معك بشأن استفسارك. لن نشارك بياناتك أبداً.",
      },
    },
    footer: {
      tagline: "نصمّم، وأنت تستحقّ.",
      intro: "تشطيبات نظيفة، مصنوعة لتبقى. نصمّم وننفّذ الأرضيات والتشطيبات التي تصمد للاستخدام الحقيقي.",
      columns: { company: "الشركة", services: "الخدمات", elsewhere: "روابط أخرى" },
      rights: "جميع الحقوق محفوظة.",
      madeIn: "صُنع بعناية في دبي.",
    },
    cta: { getQuote: "احصل على عرض سعر" },
    services_enum: {
      Civil: "الأعمال المدنية",
      Flooring: "الأرضيات",
      Paint: "الطلاء",
      Electrical: "الكهرباء",
      Plumbing: "السباكة",
      Gypsum: "الجبس",
      Other: "أخرى",
    },
  },
};

export default TRANSLATIONS;
