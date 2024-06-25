import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses[0].emailAddress) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // Verify the request body
    const requestBody = await req.text();
    if (!requestBody) {
      return new NextResponse("Bad Request: Empty body", {
        status: 400,
      });
    }

    // Parse the request body
    let parsedBody;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (err) {
      console.log("Error parsing JSON body:", err);
      return new NextResponse("Bad Request: Invalid JSON", {
        status: 400,
      });
    }

    const { title } = parsedBody;
    if (!title) {
      return new NextResponse("Bad Request: Missing title", {
        status: 400,
      });
    }

    // Find the course
    const course = await db.course.findUnique({
      where: {
        id: params.id,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    // Prepare line items for Stripe checkout session
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    // Find or create a Stripe customer
    let stripeCustomer = await db.stripeCustomer.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer: stripeCustomer.stripeCustomerId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.log("Checkout Error:", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
};
