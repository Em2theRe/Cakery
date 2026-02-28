import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type OrderPayload = {
  items: {
    templateId: string;
    shape: string;
    sizeId: string;
    flavorId: string;
    fillingId: string;
    colorId: string;
    decorationIds: string[];
    message: string;
    totalPrice: number;
  };
  customer: {
    fullName: string;
    email: string;
    phone?: string;
    fulfillment: "pickup" | "delivery";
    date: string; // YYYY-MM-DD
    notes?: string;
  };
};

function makeOrderId() {
  return `CAK-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderPayload;

    if (!body?.customer?.fullName || !body?.customer?.email || !body?.customer?.date) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const orderId = makeOrderId();

    const insert = {
      order_id: orderId,

      customer_name: body.customer.fullName,
      customer_email: body.customer.email,
      customer_phone: body.customer.phone ?? null,
      fulfillment: body.customer.fulfillment,
      requested_date: body.customer.date,
      notes: body.customer.notes ?? null,

      template_id: body.items.templateId,
      shape: body.items.shape,
      size_id: body.items.sizeId,
      flavor_id: body.items.flavorId,
      filling_id: body.items.fillingId,
      color_id: body.items.colorId,
      decoration_id: (body.items.decorationIds?.length ? body.items.decorationIds.join(",") : "none"),
      message: body.items.message ?? null,
      total_price: Math.round(body.items.totalPrice),

      payload: body,
    };

    const { error } = await supabase.from("orders").insert(insert);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, orderId, receivedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
}