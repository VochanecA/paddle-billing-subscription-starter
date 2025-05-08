import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Instagram, Twitter } from 'lucide-react';

export function PoweredByPaddle() {
  return (
    <>
      <Separator className={'footer-border'} />
      <div
        className={
          'flex flex-col justify-center items-center gap-4 text-muted-foreground text-sm leading-[14px] py-[24px] md:px-4'
        }
      >
        <div className={'flex justify-center items-center gap-2'}>
          <span className={'text-sm leading-[14px]'}>A Next.js EasyStack boilerplate by BoreasMN using</span>
          <Image src={'/assets/icons/logo/paddle-white-logo.svg'} alt={'Paddle logo'} width={54} height={14} />
        </div>
        <div className={'flex flex-wrap justify-center gap-4'}>
          {/* Bluesky Link */}
          <Link
            className={'flex items-center gap-2 text-sm leading-[14px]'}
            href={'https://bsky.app'}
            target={'_blank'}
          >
            <Image src={'/Bluesky_Logo.svg.png'} alt={'Bluesky icon'} width={20} height={20} />
            Bluesky
          </Link>

          {/* Instagram Link */}
          <Link
            className={'flex items-center gap-2 text-sm leading-[14px]'}
            href={'https://www.instagram.com'}
            target={'_blank'}
          >
            <Instagram className="h-5 w-5" />
            Instagram
          </Link>

          {/* X Link */}
          <Link
            className={'flex items-center gap-2 text-sm leading-[14px]'}
            href={'https://twitter.com'}
            target={'_blank'}
          >
            <Twitter className="h-5 w-5" />X (Twitter)
          </Link>
        </div>
        <div className={'flex flex-wrap justify-center gap-2 md:justify-start md:gap-4'}>
          {/* Additional links */}
          <Link
            className={'flex items-center gap-1 text-sm leading-[14px]'}
            href={'https://paddle.com'}
            target={'_blank'}
          >
            Explore Paddle
            <ArrowUpRight className={'h-4 w-4'} />
          </Link>
          <Link
            className={'flex items-center gap-1 text-sm leading-[14px]'}
            href={'https://www.paddle.com/legal/terms'}
            target={'_blank'}
          >
            Terms of use
            <ArrowUpRight className={'h-4 w-4'} />
          </Link>
          <Link
            className={'flex items-center gap-1 text-sm leading-[14px]'}
            href={'https://www.paddle.com/legal/privacy'}
            target={'_blank'}
          >
            Privacy
            <ArrowUpRight className={'h-4 w-4'} />
          </Link>
        </div>
      </div>
    </>
  );
}
