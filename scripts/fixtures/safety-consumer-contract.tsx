import { EvidenceSourceBlock } from "@/registry/purple-rain/safety/evidence-source-block"
import { ShareQrPanel } from "@/registry/purple-rain/safety/share-qr-panel"
import { VisibilityPublicationControl } from "@/registry/purple-rain/safety/visibility-publication-control"

export function SafetyConsumerContract() {
  return (
    <>
      <VisibilityPublicationControl value="unlisted" locallyOverridden saveState="saving" onValueChange={() => undefined} />
      <EvidenceSourceBlock status="conflicting" state="error" reviewedAt="2026-08-17" />
      <ShareQrPanel
        url="https://example.com/item"
        state="ready"
        qrState="error"
        onCopyLink={(url: string) => { void url }}
        onRetryQr={() => undefined}
      />
    </>
  )
}
