interface ProgressProps {
  progress: number
}

export function Progress({ progress }: ProgressProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progress de hábitos completados nesse dia"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}
