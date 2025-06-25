export default function EmptyState({ icon, title, description, cta }: {
  icon: string
  title: string
  description?: string | React.ReactNode
  cta?: React.ReactNode
}) {
  return (
    <div className="text-center text-muted-foreground flex flex-col items-center gap-2 mt-6">
      <span className="text-4xl">{icon}</span>
      <p className="text-base font-medium">{title}</p>
      {description && <p className="text-sm">{description}</p>}
      {cta}
    </div>
  );
}
