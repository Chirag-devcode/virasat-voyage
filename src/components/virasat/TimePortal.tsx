          <div className="relative">
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
              <img
                key={state}
                src={heroImage}
                alt={featured ? `${featured.name}, ${featured.place}, ${state}` : `${state} heritage`}
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              {featured && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl italic leading-none text-lamp-soft">{featured.name}</p>
                      <p className="mt-2 font-mono text-[10px] tracking-widest text-white/70">
                        {featured.place.toUpperCase()} · {featured.era} · {featured.duration}
                      </p>
                    </div>
                    <button
                      onClick={() => setPlayingId(playingId === featured.id ? null : featured.id)}
                      className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                    >
                      {playingId === featured.id ? "Pause" : "Play"}
                    </button>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">
                    {storyFor(featured)}
                  </p>
                  {playingId === featured.id && (
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-1/3 animate-pulse rounded-full bg-lamp" />
                    </div>
                  )}
                  <button
                    onClick={() => setOpenId(featured.id)}
                    className="mt-3 text-sm text-lamp hover:text-lamp-soft"
                  >
                    Read the full story →
                  </button>
                </div>
              )}
            </div>
          </div>