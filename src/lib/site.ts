/** Verified clinic facts — do not invent. */
export const site = {
  name: "BBETTER Ayurveda",
  tagline: "Traditional Kerala Ayurveda for Modern Wellness",
  mission: "Authentic healing. Two clinics. One mission.",
  story: {
    title: "Our Story",
    body: "BBETTER Ayurveda is a trusted chain of Ayurvedic hospitals bringing ancient Ayurvedic wisdom to modern Hyderabad. Our team of experienced MD Ayurvedic doctors provides authentic treatments with a commitment to natural healing and personalized care. We help you achieve optimal health through time-tested Ayurvedic treatments and therapies.",
  },
  missionFull: {
    title: "Our Mission",
    body: "To provide authentic Ayurvedic treatments that restore balance, promote wellness, and enhance quality of life for every individual through our chain of well-equipped Ayurvedic hospitals.",
  },
  aboutStats: [
    { value: "10+", label: "Years Experience" },
    { value: "5000+", label: "Patients" },
    { value: "10+", label: "Treatments" },
    {
      value: "MD Doctors",
      label: "Certified Ayurvedic Experts",
    },
  ],
  phoneDisplay: "9247534449",
  phoneHref: "tel:9247534449",
  whatsapp: "919247534449",
  whatsappHref: "https://wa.me/919247534449",
  locations: [
    {
      name: "Kukatpally",
      address:
        "MIG 531-II, Rd Number 1, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072",
      timings: "9:00 AM – 8:00 PM",
      /** Set to "/images/locations/kukatpally.jpg" after dropping the photo. */
      image: "/images/locations/kukatpally.jpg",

  },
    {
      name: "Nallagandla",
      address: "2nd floor, Plot No. 4C, Huda Layout, Nallagandla, Hyderabad",
      timings: "9:00 AM – 8:00 PM",
      /** Set to "/images/locations/nallagandla.jpg" after dropping the photo. */
      image: "/images/locations/nallagandla.jpg",
    },
  ],
  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "5000+", label: "Patients" },
    { value: "10+", label: "Treatments" },
    { value: "MD Doctors", label: "Certified Experts" },
  ],
  /** Placeholder doctors — replace with final verified bios + photos. */
  doctors: [
    {
      name: "Dr. Madhuri",
      credential: "MD Ayurveda",
      study: "BAMS · MD (Ayurveda)",
      skills: [
        "Ayurvedic consultation",
        "Panchakarma guidance",
        "Personalised care plans",
      ],
      focus:
        "Focused on authentic diagnosis and personalised treatments for lasting wellness.",
      image: "",
    },
    {
      name: "Dr. Deepa",
      credential: "MD Ayurveda",
      study: "BAMS · MD (Ayurveda)",
      skills: [
        "Classical therapies",
        "Herbal medicine",
        "Holistic lifestyle advice",
      ],
      focus:
        "Specialises in classical Ayurvedic therapies and natural healing approaches.",
      image: "",
    },
  ],
  nav: [
    { href: "/#our-story", label: "About" },
    { href: "/#therapies", label: "Therapies" },
    { href: "/treatments", label: "Treatments" },
    { href: "/#doctors", label: "Doctors" },
    { href: "/blog", label: "Blog" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/#locations", label: "Locations" },
  ],
  why: [
    {
      title: "Authentic & classical Ayurveda",
      text: "We follow time-tested Ayurvedic principles based on classical texts, offering treatments that address the root cause of illness, not just the symptoms.",
    },
    {
      title: "Personalised treatment for every patient",
      text: "No two bodies are the same. We design customised treatment plans based on your Prakriti (body constitution), lifestyle, and health condition.",
    },
    {
      title: "Experienced Ayurvedic doctors",
      text: "Our practitioners are highly trained in Ayurvedic diagnosis, therapies, and herbal medicine, ensuring safe and effective care.",
    },
    {
      title: "Natural & herbal medicines",
      text: "We use high-quality herbal formulations that support the body’s natural healing process — carefully chosen for your care plan.",
    },
  ],
  careSteps: [
    {
      title: "Consult",
      text: "Share your concerns with an MD Ayurvedic doctor at either Hyderabad clinic.",
    },
    {
      title: "Assess",
      text: "History, lifestyle, and symptoms guide a personalised care direction.",
    },
    {
      title: "Treat",
      text: "Therapies and medicines matched to your condition — never one-size-fits-all.",
    },
    {
      title: "Follow through",
      text: "Progress checks and adjustments as your body responds.",
    },
  ],
  howItWorks: [
    {
      title: "Consult",
      text: "Meet an MD Ayurvedic doctor at Kukatpally or Nallagandla and share your concerns.",
      note: "Listen · Understand · Guide",
      image: "/images/hero/massage-therapy.jpg",
    },
    {
      title: "Personalised plan",
      text: "We assess your constitution and symptoms, then match therapies and herbal care to you.",
      note: "Assess · Analyse · Personalise",
      image: "/images/therapies/herbal.jpg",
    },
    {
      title: "Treat & follow up",
      text: "Begin treatment and stay supported with progress checks as your body responds.",
      note: "Heal · Balance · Thrive",
      image: "/images/therapies/shirodhara.jpg",
    },
  ],
  therapies: [
    {
      name: "Panchakarma",
      text: "Deep detoxification and rejuvenation to reset balance and restore vitality.",
      detail:
        "A structured cleansing protocol using classical therapies to remove accumulated toxins, support digestion, and rejuvenate body systems. Recommended after consultation with our MD Ayurvedic doctors.",
      image: "/images/therapies/panchakarma.jpg",
    },
    {
      name: "Abhyanga",
      text: "Traditional full-body oil massage that nourishes tissues and calms the nervous system.",
      detail:
        "Warm herbal oils are massaged in rhythmic strokes to improve circulation, ease stiffness, and settle Vata. Often paired with steam or rest for deeper effect.",
      image: "/images/therapies/abhyanga.jpg",
    },
    {
      name: "Shirodhara",
      text: "Warm herbal oil streamed gently on the forehead to quiet the mind and ease stress.",
      detail:
        "A continuous stream of warm oil over the forehead helps calm the nervous system, support sleep, and reduce mental fatigue. Ideal for stress-related concerns.",
      image: "/images/therapies/shirodhara.jpg",
    },
    {
      name: "Nasya",
      text: "Nasal therapy that supports sinus health, clarity, and easier breathing.",
      detail:
        "Medicated oils or herbal preparations administered through the nose to clear channels, support sinus comfort, and promote mental clarity.",
      image: "/images/therapies/nasya.jpg",
    },
    {
      name: "Kati Basti",
      text: "Localised warm oil therapy for the lower back to ease stiffness and discomfort.",
      detail:
        "A dough ring holds warm medicated oil over the lower back, delivering localised heat and nourishment for stiffness, strain, and chronic discomfort.",
      image: "/images/therapies/kati-basti.jpg",
    },
    {
      name: "Herbal Consultation",
      text: "Personalised Ayurvedic consultation with herbal guidance matched to your needs.",
      detail:
        "A one-to-one consult covering history, constitution, and lifestyle — followed by herbal recommendations and a care plan tailored to you.",
      image: "/images/therapies/herbal.jpg",
    },
  ],
  /** Matches live WP contact form “Problems” options. */
  bookingProblems: [
    "Arthritis",
    "Knee Pain",
    "Joint Pain",
    "Back Pain",
    "Sciatica",
    "Neck Pain",
    "Digestive",
    "Stress & Sleep",
    "Panchakarma",
    "Varicose Vein",
    "Paralysis",
    "Migraine",
    "Psoriasis",
    "Spondylitis",
  ],
  faqs: [
    {
      q: "Do I need an appointment before visiting?",
      a: "Yes — booking ahead helps us arrange the right doctor time at Kukatpally or Nallagandla. You can use the booking form on this site, WhatsApp, or call us.",
    },
    {
      q: "Are your doctors MD Ayurvedic qualified?",
      a: "Yes. Care is provided by MD Ayurvedic doctors with training in classical diagnosis, therapies, and herbal medicine.",
    },
    {
      q: "Which clinic should I choose?",
      a: "Both clinics follow the same standard of care. Pick Kukatpally or Nallagandla based on what is convenient for you.",
    },
    {
      q: "What should I bring for the first consultation?",
      a: "Bring any recent medical reports and a list of medicines you are currently taking. Wear comfortable clothing if a therapy may follow.",
    },
    {
      q: "Do you offer Panchakarma and other classical therapies?",
      a: "Yes. We offer Panchakarma, Abhyanga, Shirodhara, Nasya, Kati Basti, and personalised herbal consultations after assessment.",
    },
    {
      q: "How long is a consultation?",
      a: "First consultations usually take 30–45 minutes so the doctor can understand your history and constitution. Follow-ups are typically shorter.",
    },
    {
      q: "Are treatments covered by insurance?",
      a: "Coverage depends on your policy. We can provide invoices and treatment summaries — please check with your insurer for Ayurvedic care eligibility.",
    },
  ],
  footerNav: [
    { href: "/#our-story", label: "About" },
    { href: "/#therapies", label: "Therapies" },
    { href: "/treatments", label: "Treatments" },
    { href: "/#doctors", label: "Doctors" },
    { href: "/blog", label: "Blog" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/#locations", label: "Locations" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#book", label: "Book" },
  ],
} as const;
