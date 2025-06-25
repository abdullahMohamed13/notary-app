import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
    AlertDialogDescription, AlertDialogCancel, AlertDialogAction} from "@/components/ui/alert-dialog"

type ConfirmDialogProps = {
  children: React.ReactNode
  title: string
  description?: string
  confirmText?: string
  onConfirm: () => void
}

export default function ConfirmDialog({
  children,
  title,
  description = "Are you sure?",
  confirmText = "Yes, delete",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
