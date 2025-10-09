"use client"
import { useEffect } from "react"

export default function EmbeddedForm() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://brand.monashwellness.com/js/form_embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <iframe
      src="https://brand.monashwellness.com/widget/form/La6p1He5RZmxFES5Kn0e"
      className="w-full"
      style={{
        height: "0%",
        width: "100%",
        border: "none",
        borderRadius: "3px",
      }}
      id="inline-La6p1He5RZmxFES5Kn0e"
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="Landing Page Form"
      data-height="481"
      data-layout-iframe-id="inline-La6p1He5RZmxFES5Kn0e"
      data-form-id="La6p1He5RZmxFES5Kn0e"
      title="Landing Page Form"
    ></iframe>
  )
}
