import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Manansh Shukla'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#06060F',
          backgroundImage:
            'radial-gradient(circle at 50% -20%, rgba(124, 108, 255, 0.35), transparent 60%), radial-gradient(circle at 20% -10%, rgba(96, 165, 250, 0.2), transparent 55%)',
          padding: '80px',
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            textAlign: 'center',
            color: '#F2F1F7',
            margin: 0,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            marginTop: 40,
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: '#8E8CA3',
          }}
        >
          MANANSH SHUKLA
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
