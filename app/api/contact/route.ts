import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  email: z.string().email("Email manzil noto'g'ri"),
  subject: z
    .string()
    .min(3, "Mavzu kamida 3 ta belgidan iborat bo'lishi kerak"),
  message: z
    .string()
    .min(10, "Xabar kamida 10 ta belgidan iborat bo'lishi kerak"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Create transporter (configure with your email service)
    // You'll need to add these environment variables to .env.local
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00f0ff; border-bottom: 2px solid #00f0ff; padding-bottom: 10px;">
            Yangi Portfolio Xabari
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>Ism:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
            <p><strong>Mavzu:</strong> ${validatedData.subject}</p>
          </div>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Xabar:</h3>
            <p style="line-height: 1.6;">${validatedData.message.replace(/\n/g, "<br>")}</p>
          </div>
          <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Bu xabar portfolio Contact formasi orqali yuborilgan</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Xabaringiz muvaffaqiyatli yuborildi!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Ma'lumotlar noto'g'ri",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Xatolik yuz berdi. Keyinroq qayta urinib ko'ring.",
      },
      { status: 500 },
    );
  }
}
