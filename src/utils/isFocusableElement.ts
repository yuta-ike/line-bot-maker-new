const focusableElements = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "details",
  "summary",
  "iframe",
  "object",
]

export const isFucosableElement = (elm: Element | null) => {
  if (elm == null) {
    return
  }
  const tagName = elm.tagName.toLowerCase()
  const isFocusable = focusableElements.includes(tagName)
  const isDisabled = elm.hasAttribute("disabled")
  const isHidden = elm.hasAttribute("hidden")
  const isAriaHidden = elm.getAttribute("aria-hidden") === "true"
  const isAriaDisabled = elm.getAttribute("aria-disabled") === "true"

  return (
    isFocusable && !isDisabled && !isHidden && !isAriaHidden && !isAriaDisabled
  )
}
