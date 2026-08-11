import { permanentRedirect } from "next/navigation"

// Studio and Build are one place now, called Build. The resource libraries
// (/studio/icons, /studio/fonts, /studio/swap) keep their own routes.
export default function StudioPage() {
  permanentRedirect("/build")
}
