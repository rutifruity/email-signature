import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/generate", async (req: Request, res: Response): Promise<any> => {
  try {
    const { templateName, userInfo } = req.body;

    if (!templateName || !userInfo) {
      return res
        .status(400)
        .json({ error: "Template name and user info are required." });
    }

    const templatePath = path.join(
      __dirname,
      "../templates",
      `${templateName}.html`
    );
    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({ error: "Template not found." });
    }

    const template = fs.readFileSync(templatePath, "utf-8");
    const filledTemplate = template
      .replace("{{fullName}}", userInfo.fullName || "")
      .replace("{{email}}", userInfo.email || "")
      .replace("{{phone}}", userInfo.phone || "")
      .replace("{{logoUrl}}", userInfo.logoUrl || "");

    return res.json({
      html: filledTemplate,
      plainText: filledTemplate.replace(/<\/?[^>]+(>|$)/g, ""), // Strip HTML tags for plain text
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    return res.status(500).json({ error: "Error generating signature." });
  }
});

export default router;
