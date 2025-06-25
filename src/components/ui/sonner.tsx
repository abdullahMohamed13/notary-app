import { Toaster as Sonner } from "sonner"
import { useTheme } from "next-themes"

const Toaster = (props: React.ComponentProps<typeof Sonner>) => {
  const { theme = "system" } = useTheme()

  return (
    // I moved the styling of this component (bg-colors / txt-colors) to the App.tsx file
    <Sonner
      theme={theme as React.ComponentProps<typeof Sonner>["theme"]}
        toastOptions={{
          descriptionClassName: "foreground"
        }}
      className="toaster group"
      {...props}
    />
  )
}
export { Toaster }
