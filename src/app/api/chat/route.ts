import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 },
      );
    }

    // Convert the messages format to Gemini format
    const contents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: "أنت مساعد ذكي لمتجر إلكتروني. مهمتك مساعدة العميل وتوجيهه. إذا طلب الذهاب لصفحة معينة، استخدم أداة navigate_to_page لتوجيهه. الصفحات المتاحة: '/cart' (السلة), '/checkout' (الدفع), '/brands' (الماركات), '/categories' (الأقسام), '/products' (كل المنتجات), '/search' (البحث عن منتج - يمكنك إضافة ?q=اسم المنتج للبحث), '/wishlist' (المفضلة), '/signin' (تسجيل الدخول), '/signup' (إنشاء حساب), '/allorders' (طلباتي), '/settings' (الإعدادات), '/contact' (خدمة العملاء). افهم نية المستخدم جيداً ووجهه للمسار الصحيح.",
        tools: [
          {
            functionDeclarations: [
              {
                name: "navigate_to_page",
                description: "Navigates user to a page. Valid paths: /cart, /checkout, /brands, /categories, /products, /search?q=X, /wishlist, /signin, /signup, /allorders, /settings, /contact",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    pagePath: {
                      type: Type.STRING,
                      description: "The path to navigate to (e.g. '/cart', '/brands', '/search?q=laptop').",
                    },
                  },
                  required: ["pagePath"],
                },
              },
            ],
          },
        ],
      }
    });

    let navigateTo = null;
    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      if (call.name === "navigate_to_page" && call.args) {
        navigateTo = (call.args as any).pagePath;
      }
    }

    let text = "";
    try {
      if (response.text) {
        text = response.text;
      }
    } catch (e) {
      // It throws an error if the response only contains function calls
    }

    if (!text && navigateTo) {
      text = `جاري توجيهك إلى ${navigateTo}...`;
    }

    return NextResponse.json({ result: text, navigateTo });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 },
    );
  }
}
