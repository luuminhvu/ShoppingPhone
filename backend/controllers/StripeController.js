import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";
import Order from "../models/Order.js";
dotenv.config({ path: path.join(path.resolve(), ".env") });
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
    },
  });
  console.log("customer: ", customer);
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image.url],
          description: item.desc,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.cartQuantity,
    };
  });
  console.log("line_items: ", line_items[0].price_data.product_data);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });
};
const createOrder = async (customer, data, lineItems) => {
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.status,
  });
  try {
    const saveOrder = await newOrder.save();
    console.log("Order saved: ", saveOrder);
  } catch (err) {
    console.log("Order save error: ", err);
  }
};
export const webhook = async (req, res) => {
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  let data;
  let eventType;
  const endpointSecret =
    "whsec_2bb4f08a131d00a6ce9bc88f31362dca74b67b9fc002e79ac2fc155499a96592";
  if (endpointSecret) {
    let event;
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }
  // Handle the event
  switch (eventType) {
    case "checkout.session.completed":
      console.log("data: ", data);
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          stripe.checkout.sessions.listLineItems(
            data.id,
            {},
            function (err, lineItems) {
              console.log("lineItems: ", lineItems);
              createOrder(customer, data, lineItems);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
