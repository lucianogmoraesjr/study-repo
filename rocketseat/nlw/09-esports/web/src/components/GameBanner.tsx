interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export function GameBanner({ adsCount, bannerUrl, title }: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt={title} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="text-md font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} {`${adsCount === 1 ? 'anúncio' : 'anúncios'}`}
        </span>
      </div>
    </a>
  )
}
