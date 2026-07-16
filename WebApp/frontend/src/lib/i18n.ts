export type Lang = "en" | "tr" | "ar";

export const LANG_META: Record<Lang, { label: string; dir: "ltr" | "rtl"; native: string }> = {
  en: { label: "English", dir: "ltr", native: "English" },
  tr: { label: "Turkish", dir: "ltr", native: "Türkçe" },
  ar: { label: "Arabic", dir: "rtl", native: "العربية" },
};

const dict = {
  nav: {
    home: { en: "Home", tr: "Ana Sayfa", ar: "الرئيسية" },
    diagnose: { en: "Diagnose", tr: "Analiz Et", ar: "التشخيص" },
    classes: { en: "Classes", tr: "Sınıflar", ar: "الفئات" },
    model: { en: "Model", tr: "Model", ar: "النموذج" },
    results: { en: "Results", tr: "Sonuçlar", ar: "النتائج" },
    history: { en: "History", tr: "Geçmiş", ar: "السجل" },
  },
  hero: {
    eyebrow: { en: "AI-Assisted Histopathology", tr: "Yapay Zekâ Destekli Histopatoloji", ar: "الفحص النسيجي بمساعدة الذكاء الاصطناعي" },
    title1: { en: "Read the tissue.", tr: "Dokuyu oku.", ar: "اقرأ النسيج." },
    title2: { en: "Trust the signal.", tr: "Sinyale güven.", ar: "ثق بالإشارة." },
    subtitle: {
      en: "A MobileNetV2 deep learning system trained on 25,000 LC25000 histopathological images, classifying lung and colon tissue into five diagnostic classes in real time.",
      tr: "25.000 LC25000 histopatolojik görüntüsü üzerinde eğitilmiş MobileNetV2 derin öğrenme sistemi, akciğer ve kolon dokusunu gerçek zamanlı olarak beş tanısal sınıfa ayırır.",
      ar: "نظام تعلم عميق MobileNetV2 مدرَّب على 25,000 صورة نسيجية من LC25000، يصنّف أنسجة الرئة والقولون إلى خمس فئات تشخيصية في الوقت الفعلي.",
    },
    ctaPrimary: { en: "Analyze an image", tr: "Görüntü Analiz Et", ar: "حلّل صورة" },
    ctaSecondary: { en: "View model metrics", tr: "Model Metriklerini Gör", ar: "عرض مقاييس النموذج" },
    statAccuracy: { en: "Test Accuracy", tr: "Test Doğruluğu", ar: "دقة الاختبار" },
    statAuc: { en: "ROC-AUC", tr: "ROC-AUC", ar: "ROC-AUC" },
    statClasses: { en: "Diagnostic Classes", tr: "Tanısal Sınıf", ar: "فئات تشخيصية" },
  },
  upload: {
    eyebrow: { en: "Diagnostic Console", tr: "Tanı Konsolu", ar: "لوحة التشخيص" },
    title: { en: "Upload a histopathological slide", tr: "Histopatolojik Görüntü Yükle", ar: "ارفع صورة نسيجية" },
    subtitle: {
      en: "Drop a PNG or JPEG tissue image below. The model resizes it to 128×128 and returns a classification in milliseconds.",
      tr: "Aşağıya bir PNG veya JPEG doku görüntüsü bırakın. Model görüntüyü 128×128 boyutuna getirir ve milisaniyeler içinde sınıflandırma sonucu döndürür.",
      ar: "أسقط صورة نسيجية بصيغة PNG أو JPEG أدناه. يقوم النموذج بتغيير حجمها إلى 128×128 ويعيد التصنيف خلال أجزاء من الثانية.",
    },
    dropzoneTitle: { en: "Drag & drop your image here", tr: "Görüntünüzü buraya sürükleyip bırakın", ar: "اسحب صورتك وأفلتها هنا" },
    dropzoneSubtitle: { en: "or click to browse — PNG, JPG, JPEG", tr: "veya göz atmak için tıklayın — PNG, JPG, JPEG", ar: "أو انقر للتصفح — PNG, JPG, JPEG" },
    remove: { en: "Remove", tr: "Kaldır", ar: "إزالة" },
    zoom: { en: "View fullscreen", tr: "Tam Ekran Görüntüle", ar: "عرض بملء الشاشة" },
    analyze: { en: "Analyze Image", tr: "Görüntüyü Analiz Et", ar: "حلّل الصورة" },
    analyzing: { en: "Analyzing tissue sample…", tr: "Doku örneği analiz ediliyor…", ar: "جارٍ تحليل العينة النسيجية…" },
    chooseFirst: { en: "Please choose an image first.", tr: "Lütfen önce bir görüntü seçin.", ar: "يرجى اختيار صورة أولاً." },
    resultTitle: { en: "Diagnostic Result", tr: "Tanı Sonucu", ar: "نتيجة التشخيص" },
    predictedClass: { en: "Predicted Class", tr: "Tahmin Edilen Sınıf", ar: "الفئة المتوقعة" },
    confidence: { en: "Confidence", tr: "Güven Skoru", ar: "نسبة الثقة" },
    predictionTime: { en: "Prediction Time", tr: "Tahmin Süresi", ar: "زمن التنبؤ" },
    riskLevel: { en: "Risk Level", tr: "Risk Seviyesi", ar: "مستوى الخطورة" },
    probabilities: { en: "Class Probabilities", tr: "Sınıf Olasılıkları", ar: "احتمالات الفئات" },
    downloadPdf: { en: "Download PDF Report", tr: "PDF Rapor İndir", ar: "تنزيل تقرير PDF" },
    newAnalysis: { en: "Analyze another image", tr: "Başka bir görüntü analiz et", ar: "تحليل صورة أخرى" },
    disclaimer: {
      en: "Research prototype — not a certified diagnostic device. Always confirm with a licensed pathologist.",
      tr: "Bu bir araştırma prototipidir — sertifikalı bir tanı cihazı değildir. Her zaman uzman bir patologla doğrulayın.",
      ar: "هذا نموذج بحثي — وليس جهاز تشخيص معتمد. يُرجى دائمًا التأكد من قبل أخصائي علم الأمراض.",
    },
  },
  risk: {
    none: { en: "No risk detected", tr: "Risk tespit edilmedi", ar: "لا يوجد خطر" },
    low: { en: "Low risk", tr: "Düşük risk", ar: "خطر منخفض" },
    moderate: { en: "Moderate risk", tr: "Orta düzey risk", ar: "خطر متوسط" },
    high: { en: "High risk", tr: "Yüksek risk", ar: "خطر مرتفع" },
  },
  classes: {
    eyebrow: { en: "Recognized Tissue Types", tr: "Tanınan Doku Tipleri", ar: "أنواع الأنسجة المعتمدة" },
    title: { en: "Five diagnostic classes", tr: "Beş Tanısal Sınıf", ar: "خمس فئات تشخيصية" },
    subtitle: {
      en: "Trained on the LC25000 dataset — 25,000 balanced images across colon and lung tissue types.",
      tr: "LC25000 veri kümesi üzerinde eğitildi — kolon ve akciğer doku tipleri için 25.000 dengeli görüntü.",
      ar: "تم التدريب على مجموعة بيانات LC25000 — 25,000 صورة متوازنة لأنواع أنسجة القولون والرئة.",
    },
    malignant: { en: "Malignant", tr: "Malign", ar: "خبيث" },
    benign: { en: "Benign", tr: "Benign", ar: "حميد" },
  },
  model: {
    eyebrow: { en: "Under the Hood", tr: "Motor Kaputun Altında", ar: "خلف الكواليس" },
    title: { en: "Model architecture", tr: "Model Mimarisi", ar: "بنية النموذج" },
    subtitle: {
      en: "MobileNetV2 transfer learning, fine-tuned for five-class histopathological classification.",
      tr: "Beş sınıflı histopatolojik sınıflandırma için ince ayarlanmış MobileNetV2 transfer öğrenimi.",
      ar: "تعلم انتقالي باستخدام MobileNetV2، مُهيّأ لتصنيف خماسي الفئات للصور النسيجية.",
    },
    expand: { en: "View architecture details", tr: "Mimari Detaylarını Gör", ar: "عرض تفاصيل البنية" },
    collapse: { en: "Hide details", tr: "Detayları Gizle", ar: "إخفاء التفاصيل" },
    trainingConfig: { en: "Training Configuration", tr: "Eğitim Yapılandırması", ar: "إعدادات التدريب" },
    datasetInfo: { en: "Dataset", tr: "Veri Kümesi", ar: "مجموعة البيانات" },
  },
  results: {
    eyebrow: { en: "Validated Performance", tr: "Doğrulanmış Performans", ar: "أداء مُتحقَّق منه" },
    title: { en: "Project achievements", tr: "Proje Başarıları", ar: "إنجازات المشروع" },
    subtitle: {
      en: "MobileNetV2 outperformed nine other architectures on the LC25000 benchmark.",
      tr: "MobileNetV2, LC25000 karşılaştırmasında diğer dokuz mimariden daha iyi performans gösterdi.",
      ar: "تفوّق MobileNetV2 على تسع بنى أخرى في اختبار LC25000 المرجعي.",
    },
    testAccuracy: { en: "Test Accuracy", tr: "Test Doğruluğu", ar: "دقة الاختبار" },
    rocAuc: { en: "ROC-AUC", tr: "ROC-AUC", ar: "ROC-AUC" },
    crossValidation: { en: "5-Fold Cross Validation", tr: "5 Katlı Çapraz Doğrulama", ar: "التحقق المتقاطع 5 طيات" },
    kappa: { en: "Cohen's Kappa", tr: "Cohen Kappa", ar: "معامل كابا لكوهين" },
  },
  charts: {
    eyebrow: { en: "Benchmark Visualizations", tr: "Karşılaştırma Görselleştirmeleri", ar: "التصورات المرجعية" },
    title: { en: "Ten architectures, one winner", tr: "On Mimari, Bir Kazanan", ar: "عشر بنى، فائز واحد" },
    accuracyComparison: { en: "Test Accuracy by Architecture", tr: "Mimariye Göre Test Doğruluğu", ar: "دقة الاختبار حسب البنية" },
    trainingCurves: { en: "Training vs Validation Accuracy", tr: "Eğitim ve Doğrulama Doğruluğu", ar: "دقة التدريب مقابل التحقق" },
    lossCurves: { en: "Training vs Validation Loss", tr: "Eğitim ve Doğrulama Kaybı", ar: "خسارة التدريب مقابل التحقق" },
    rocCurve: { en: "ROC Curve (per class)", tr: "ROC Eğrisi (sınıf başına)", ar: "منحنى ROC (لكل فئة)" },
    confusionMatrix: { en: "Confusion Matrix — MobileNetV2", tr: "Karışıklık Matrisi — MobileNetV2", ar: "مصفوفة الالتباس — MobileNetV2" },
    perClassMetrics: { en: "Precision · Recall · F1 · AUC", tr: "Kesinlik · Duyarlılık · F1 · AUC", ar: "الدقة · الاستدعاء · F1 · AUC" },
    epoch: { en: "Epoch", tr: "Epoch", ar: "الحقبة" },
  },
  history: {
    title: { en: "Prediction history", tr: "Tahmin Geçmişi", ar: "سجل التنبؤات" },
    empty: { en: "No predictions yet in this session.", tr: "Bu oturumda henüz tahmin yok.", ar: "لا توجد تنبؤات في هذه الجلسة بعد." },
    clear: { en: "Clear history", tr: "Geçmişi Temizle", ar: "مسح السجل" },
  },
  toast: {
    predictionSuccess: { en: "Analysis complete", tr: "Analiz tamamlandı", ar: "اكتمل التحليل" },
    predictionError: { en: "Server not reachable — is the Flask API running?", tr: "Sunucuya ulaşılamıyor — Flask API çalışıyor mu?", ar: "تعذر الوصول إلى الخادم — هل واجهة Flask تعمل؟" },
    pdfReady: { en: "PDF report downloaded", tr: "PDF rapor indirildi", ar: "تم تنزيل تقرير PDF" },
    historyCleared: { en: "History cleared", tr: "Geçmiş temizlendi", ar: "تم مسح السجل" },
  },
  footer: {
    tagline: {
      en: "Built for computer-aided histopathological diagnosis research.",
      tr: "Bilgisayar destekli histopatolojik tanı araştırmaları için geliştirilmiştir.",
      ar: "صُمم لأبحاث التشخيص النسيجي بمساعدة الحاسوب.",
    },
    disclaimer: {
      en: "This tool is a research prototype and is not intended for clinical use without professional validation.",
      tr: "Bu araç bir araştırma prototipidir ve profesyonel doğrulama olmadan klinik kullanım için tasarlanmamıştır.",
      ar: "هذه الأداة نموذج بحثي وليست مخصصة للاستخدام السريري دون تحقق مهني.",
    },
  },
} as const;

export type DictKey = keyof typeof dict;

export function translate(lang: Lang, section: DictKey, key: string): string {
  const sectionDict = dict[section] as Record<string, Record<Lang, string>>;
  const entry = sectionDict?.[key];
  if (!entry) return `${section}.${key}`;
  return entry[lang] ?? entry.en;
}

export default dict;
