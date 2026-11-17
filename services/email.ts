import * as nodemailer from "nodemailer";

export interface ContactEmailInput {
  name: string;
  email: string;
  message: string;
}

export class ContactEmailValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactEmailValidationError";
  }
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 4000;
const RECIPIENT_EMAIL = "atsiilaarya14@gmail.com";

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeSingleLine = (input: string): string =>
  input.replace(/[\r\n]+/g, " ").trim();

export const validateContactEmailInput = (
  raw: unknown,
): ContactEmailInput => {
  if (!raw || typeof raw !== "object") {
    throw new ContactEmailValidationError("Invalid request body.");
  }

  const candidate = raw as Record<string, unknown>;
  const rawName = typeof candidate.name === "string" ? candidate.name : "";
  const rawEmail = typeof candidate.email === "string" ? candidate.email : "";
  const rawMessage =
    typeof candidate.message === "string" ? candidate.message : "";

  const name = sanitizeSingleLine(rawName);
  const email = sanitizeSingleLine(rawEmail);
  const message = rawMessage.trim();

  if (!name || !email || !message) {
    throw new ContactEmailValidationError(
      "Please fill out all required fields.",
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    throw new ContactEmailValidationError(
      "One or more fields exceed the allowed character limit.",
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ContactEmailValidationError("Please provide a valid email.");
  }

  return { name, email, message };
};

export const sendContactEmail = async (
  input: ContactEmailInput,
): Promise<void> => {
  const smtpUser = process.env.NODEMAILER_EMAIL?.trim();
  const smtpPass = process.env.NODEMAILER_PW?.trim();

  if (!smtpUser || !smtpPass) {
    throw new Error("Email transport is not configured.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const escapedMessage = escapeHtml(input.message).replace(/\r?\n/g, "<br />");
  const escapedEmail = escapeHtml(input.email);
  const escapedName = escapeHtml(input.name);

  await transporter.sendMail({
    from: smtpUser,
    replyTo: input.email,
    to: RECIPIENT_EMAIL,
    subject: `Portfolio Contact from ${input.name}`,
    text: `${input.message}\n\n---\nSender: ${input.name} <${input.email}>`,
    html: `<div><p><strong>From:</strong> ${escapedName} (${escapedEmail})</p><hr /><div>${escapedMessage}</div></div>`,
  });
};
