import { NextResponse } from "next/server";

import {
  ContactEmailValidationError,
  sendContactEmail,
  validateContactEmailInput,
} from "@/services/email";

export const POST = async (request: Request) => {
  try {
    const body: unknown = await request.json();
    const validatedInput = validateContactEmailInput(body);
    await sendContactEmail(validatedInput);

    return NextResponse.json({ message: "Message sent!" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ContactEmailValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
};
