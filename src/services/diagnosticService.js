// diagnosticService.js - Diagnostic Dialogue System for Hemma
// Inspired by Google DeepMind's AMIE and Socratic Questioning.

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

/**
 * اكتشاف الموديل المتاح
 */
const getAvailableModel = async (apiKey) => {
    try {
        const response = await fetch(`${BASE_URL}/models?key=${apiKey}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "Model discovery failed");
        const model = data.models.find(m => m.supportedGenerationMethods.includes("generateContent") && m.name.includes("flash")) 
                     || data.models.find(m => m.supportedGenerationMethods.includes("generateContent"));
        return model ? model.name : "models/gemini-1.5-flash";
    } catch (e) { return "models/gemini-1.5-flash"; }
};

/**
 * تنظيف رد الـ JSON
 */
const cleanJSON = (text) => text.replace(/```json|```/g, "").trim();

export const diagnosticService = {
    /**
     * تحليل المدخل الأولي وتوليد السؤال الافتتاحي
     */
    async startDiagnostic(initialInput, apiKey) {
        const model = await getAvailableModel(apiKey);
        const endpoint = `${BASE_URL}/${model}:generateContent?key=${apiKey}`;

        const prompt = `
أنت نظام تشخيصي تعليمي ذكي (Diagnostic System) مستوحى من نظام AMIE. 
الطالب أدخل المهمة التالية: "${initialInput}"

مهمتك:
1. تحليل المدخل (هل هو غامض؟ ما المعلومات الأساسية المفقودة؟).
2. توليد سؤال "افتتاحي" ودود (Rapport Building) يبدأ في استكشاف التفاصيل.

يجب أن يكون الرد بصيغة JSON حصراً:
{
  "clarity": "vague" | "clear",
  "missingInfo": ["معلومة 1", "معلومة 2"],
  "openingQuestion": "السؤال الافتتاحي الودود"
}`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error?.message || "فشل بدء المحادثة");
        return JSON.parse(cleanJSON(result.candidates[0].content.parts[0].text));
    },

    /**
     * معالجة رد الطالب وتوليد السؤال التشخيصي التالي
     */
    async getNextQuestion(messages, extractedInfo, apiKey) {
        const model = await getAvailableModel(apiKey);
        const endpoint = `${BASE_URL}/${model}:generateContent?key=${apiKey}`;

        const prompt = `
أنت خبير محادثة تشخيصية وسقراطية. 
المحادثة حتى الآن:
${messages.map(m => `${m.role === 'ai' ? 'النظام' : 'الطالب'}: ${m.content}`).join('\n')}

المعلومات التي تم استخراجها وتحليلها حتى الآن:
${JSON.stringify(extractedInfo)}

مهمتك:
1. استخراج أي معلومات جديدة من آخر رد للطالب وتحديث الـ extractedInfo.
2. تحديد المرحلة التالية (exploration أو deep-dive).
3. طرح سؤال "واحد فقط" (Clarification, Evidence, or Metacognitive) للتعمق في التشخيص.
4. إذا شعرت أن المعلومات كافية (المادة، الصف، التحدي، أسلوب التعلم)، اضبط "readyForDiagnosis" على true.

يجب أن يكون الرد JSON حصراً:
{
  "extractedInfo": { ... },
  "nextQuestion": "السؤال التالي",
  "readyForDiagnosis": boolean,
  "stage": "exploration" | "deep-dive" | "diagnosis"
}`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error?.message || "فشل توليد السؤال");
        return JSON.parse(cleanJSON(result.candidates[0].content.parts[0].text));
    },

    /**
     * توليد التشخيص النهائي وخطة العمل المخصصة
     */
    async finalizeDiagnosis(messages, extractedInfo, apiKey) {
        const model = await getAvailableModel(apiKey);
        const endpoint = `${BASE_URL}/${model}:generateContent?key=${apiKey}`;

        const prompt = `
أنت خبير تعليمي وتربوي وهندسة سلوكية. بناءً على المحادثة التشخيصية الكاملة والمعلومات المستخرجة:
المعلومات: ${JSON.stringify(extractedInfo)}

قدم تشخيصاً شاملاً وخطة عمل "مخصصة 100%" تتضمن:
1. تحليل السبب الجذري للمشكلة.
2. التوصيات المخصصة لأسلوب التعلم.
3. 5-7 خطوات مجهرية (Micro-steps) دقيقة جداً للموضوع الذي ذكره الطالب.
4. رسالة "مرساة الإرادة" (علو الهمة).

يجب أن يكون الرد JSON حصراً بالعربية:
{
  "problem_analysis": "تحليل السبب الجذري",
  "critical_mission": "المهمة التي تكسر المقاومة",
  "why_now": "التفسير العلمي العصبي",
  "first_action": "أول خطوة في 30 ثانية",
  "micro_steps": ["خطوة 1", "خطوة 2", "خطوة 3", "خطوة 4", "خطوة 5"],
  "willpower_anchor": "رسالة تنشيط الإرادة",
  "focus_protocol": "25 دقيقة عمل + 5 استراحة",
  "reset_tool": "تنفس أو حركة أو دعاء"
}`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error?.message || "فشل توليد التشخيص");
        return JSON.parse(cleanJSON(result.candidates[0].content.parts[0].text));
    }
};
