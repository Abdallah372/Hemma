// aiService.js - Hemma V6: Neuro-Triage & Behavioral Engineering
// Focus: Brain Rot recovery, Dopamine regulation, and Islamic Willpower Anchors.

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

const getAvailableModel = async (apiKey) => {
    try {
        const response = await fetch(`${BASE_URL}/models?key=${apiKey}`);
        const data = await response.json();
        const model = data.models.find(m => m.supportedGenerationMethods.includes("generateContent") && m.name.includes("flash"));
        return model ? model.name : "models/gemini-1.5-flash";
    } catch (e) { return "models/gemini-1.5-flash"; }
};

export const analyzeStudyPlan = async (data, apiKey) => {
    if (apiKey === "DEMO") {
        await new Promise(r => setTimeout(r, 1500));
        return {
            "critical_mission": "تفكيك مفهوم واحد معقد في الكيمياء العضوية",
            "micro_steps": [
                "افتح الكتاب صفحة 112 وانظر للصورة التوضيحية فقط",
                "اقرأ أول سطرين في التعريف",
                "أغلق عينيك وتخيل شكل الجزيء لمدة 30 ثانية",
                "ارسم الجزيء عشوائياً في مسودة"
            ],
            "why_now": "دماغك يعاني من انخفاض الدوبامين الأساسي بسبب التشتت؛ هذه المهمة 'البصرية' تخفف الحمل الإدراكي وتصنع زخماً تصاعدياً.",
            "willpower_anchor": "أنت الآن في مقام (المرابطة الدراسية)، وكل ثانية تقاوم فيها رغبة الهروب هي جهاد لنفسك.",
            "reset_tool": "تنفس 4-7-8 (شهيق 4، حبس 7، زفير 8) لخمس دورات لإعادة ضبط الجهاز العصبي.",
            "focus_protocol": "بروتوكول الـ 20 دقيقة (Interleaving): بدل بين هذه المهمة ومهمة يسيرة لتجنب الملل العصبي."
        };
    }

    try {
        const activeModelName = await getAvailableModel(apiKey);
        const endpoint = `${BASE_URL}/${activeModelName}:generateContent?key=${apiKey}`;
        
        const prompt = `أنت خبير في هندسة السلوك وعلوم الأعصاب الإدراكية.
        المهمة: بناء "بروتوكول فرز عصبي" لطالب يعاني من (Brain Rot) وضبابية دماغية.
        
        المدخلات:
        - قائمة المهام: ${JSON.stringify(data.subjects)}
        - الوقت المتاح: ${data.dailyTime} ساعة
        - مستوى الطاقة الحالي: ${data.energyLevel}/10
        - الهدف: ${data.studyGoal}

        المبادئ المطلوبة (صارم):
        1. Micro-Step Protocol: حول المهمة لـ 4 خطوات مجهرية (أقل من دقيقتين للخطوة).
        2. Neuro-Logic: إذا كانت الطاقة منخفضة، ابدأ بمهمة (Immediate Reward). إذا كانت عالية، ابدأ بـ (Deep Work).
        3. Islamic Willpower: ادمج مفاهيم (علو الهمة، الإتقان، المرابطة، الاستعاذة من الكسل).
        4. Focus Strategy: اقترح تقنية علمية (Active Recall, Spaced Repetition, Interleaving).

        الرد JSON حصراً بالعربية:
        {
          "critical_mission": "المهمة الأهم الآن",
          "micro_steps": ["خطوة 1", "خطوة 2", "خطوة 3", "خطوة 4"],
          "why_now": "تحليل عصبي (لماذا هذه المهمة تناسب مستواه الدوباميني؟)",
          "willpower_anchor": "رسالة تنشيط الإرادة (تراثية/سلوكية)",
          "reset_tool": "تمرين سريع لإعادة التوازن (تنفس، حركة، دعاء الكسل)",
          "focus_protocol": "بروتوكول التركيز الزمني (Pomodoro أو Interleaving)"
        }`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
            }),
        });

        const result = await response.json();
        const outputText = result.candidates[0].content.parts[0].text;
        return JSON.parse(outputText.replace(/```json|```/g, "").trim());
    } catch (error) {
        throw new Error("فشل بروتوكول السيادة العصبية: " + error.message);
    }
};
