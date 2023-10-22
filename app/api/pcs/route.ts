import { apiAuth } from "@/app/api/middlewares/apiAuth";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  const auth = await apiAuth(req);
  if (!auth) {
    return new NextResponse(JSON.stringify({ error: "No acavacabacacbac" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const pcs = await prismadb.pc.findMany({
      include: {
        laboratory: true,
      },
    });

    if (!pcs) {
      return NextResponse.json({ status: 404 }, { headers: corsHeaders });
    }

    return NextResponse.json(pcs);
  } catch (error) {
    console.error("Error al autenticar:", error);
    return NextResponse.json({ error: 500 }, { headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  const auth = await apiAuth(req);
  if (!auth) {
    return new NextResponse(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const { name, model, brand, status, laboratory_id } = body;

  try {
    const pc = await prismadb.pc.create({
      data: {
        name,
        model,
        brand,
        status,
        laboratory: {
          connect: {
            id: laboratory_id,
          },
        },
      },
    });
    if (!pc) {
      return NextResponse.json({ status: 404 }, { headers: corsHeaders });
    }

    return NextResponse.json({ status: 201 }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error al autenticar:", error);
    return NextResponse.json({ error: 500 }, { headers: corsHeaders });
  }
}
