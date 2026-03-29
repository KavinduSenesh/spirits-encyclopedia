import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'The Spirits Encyclopedia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: { locale: string } }) {
  const isEn = params.locale === 'en';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Amber glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,149,108,0.15) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Diamond icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #c8956c, #a07540)',
            transform: 'rotate(45deg)',
            borderRadius: '8px',
            marginBottom: '40px',
          }}
        />

        {/* Title */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            fontSize: '52px',
            fontWeight: 300,
            letterSpacing: '-1px',
          }}
        >
          <span style={{ color: '#c8956c', fontWeight: 500 }}>The</span>
          <span style={{ color: '#f0f6fc' }}>Spirits Encyclopedia</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            color: '#8b949e',
            marginTop: '16px',
            fontWeight: 300,
          }}
        >
          {isEn
            ? 'An encyclopedic guide to the world\u2019s spirits'
            : '\u0DBD\u0DDD\u0D9A\u0DBA\u0DD9 \u0DB8\u0DB0\u0DCA\u200D\u0DBA\u0DC3\u0DCF\u0DBB \u0DB4\u0DCF\u0DB1 \u0DC0\u0DBB\u0DCA\u0D9C \u0DB4\u0DD2\u0DC5\u0DD2\u0DB6\u0DB3 \u0DC0\u0DD2\u0DC1\u0DCA\u0DC0\u0D9A\u0DDD\u0DC2\u0DB8\u0DBA \u0DB8\u0DCF\u0DBB\u0DCA\u0D9C\u0DDD\u0DB4\u0DAF\u0DD9\u0DC1\u0DBA'}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #c8956c, transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
