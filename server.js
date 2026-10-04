import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "OfflineSmartAssistant.html")
  );
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "OfflineSmartAssistant AI",
    ai_configured: Boolean(client)
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "OfflineSmartAssistant AI",
    ai_configured: Boolean(client)
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();

    if (!message) {
      return res.status(400).json({
        error: "الرسالة فارغة."
      });
    }

    if (!client) {
      return res.status(503).json({
        error: "مفتاح الذكاء الاصطناعي غير مهيأ على الخادم."
      });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      instructions:
        "أنت OfflineSmartAssistant AI. أجب بوضوح ودقة وباللغة العربية ما لم يطلب المستخدم لغة أخرى.",
      input: message
    });

    res.json({
      answer: response.output_text || "لم يتم إنشاء إجابة."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "حدث خطأ أثناء الاتصال بنموذج الذكاء الاصطناعي."
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`OfflineSmartAssistant AI running on port ${PORT}`);
});