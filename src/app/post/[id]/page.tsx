import Image from 'next/image';
import Link from 'next/link';

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Post/[id]/page.tsx</h1>
      <p>id : {params.id}</p>
      <Image
        src='https://source.unsplash.com/Qe3kgY98OXs'
        placeholder='blur'
        blurDataURL={rgbDataURL(0, 0, 144)}
        width={500}
        height={500}
        alt='Picture of the author'
        // style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Link passHref href={'/'}>
        Go to Home
      </Link>
    </div>
  );
}
