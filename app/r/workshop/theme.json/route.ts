import { NextResponse } from "next/server"

import { parseThemeVariant, workshopRegistryItem } from "@/lib/theme-workshop"

export function GET(request: Request) {
  const url = new URL(request.url)
  const variant = parseThemeVariant(url.searchParams.get("theme"))
  return NextResponse.json(workshopRegistryItem(variant), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": variant ? "public, max-age=300, stale-while-revalidate=3600" : "public, max-age=3600",
    },
  })
}
