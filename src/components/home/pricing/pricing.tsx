import { useState, useEffect } from 'react';
import { CircleCheck, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/shared/toggle/toggle';
import { PricingTier, Tier } from '@/constants/pricing-tier';
import { BillingFrequency, IBillingFrequency } from '@/constants/billing-frequency';
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { usePaddlePrices } from '@/hooks/usePaddlePrices';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Feature List Component
function FeaturesList({ tier }: { tier: Tier }) {
  return (
    <ul className="p-8 flex flex-col gap-4">
      {tier.features.map((feature: string) => (
        <li key={feature} className="flex gap-x-3">
          <CircleCheck className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
          <span className="text-base text-gray-700 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

// Price Amount Component
function PriceAmount({
  loading,
  error,
  priceMap,
  priceSuffix,
  tier,
  value,
}: {
  loading: boolean;
  error?: string;
  priceMap: Record<string, string>;
  priceSuffix: string;
  tier: Tier;
  value: string;
}) {
  // Handle case where price is not available
  const priceId = tier.priceId[value];
  const price = priceMap[priceId];

  return (
    <div className="mt-6 flex flex-col px-8">
      {loading ? (
        <Skeleton className="h-[96px] w-full bg-gray-200 dark:bg-gray-800" />
      ) : error ? (
        <div className="text-[24px] leading-[30px] text-red-500 font-medium">Price unavailable</div>
      ) : !price ? (
        <div className="text-[24px] leading-[30px] text-amber-500 font-medium">Price unavailable</div>
      ) : (
        <>
          <div
            className={cn('text-[80px] leading-[96px] tracking-[-1.6px] font-medium', 'text-gray-900 dark:text-white')}
          >
            {price.replace(/\.00$/, '')}
          </div>
          <div className={cn('font-medium leading-[12px] text-[12px]', 'text-gray-600 dark:text-gray-400')}>
            {priceSuffix}
          </div>
        </>
      )}
    </div>
  );
}

// Price Title Component
function PriceTitle({ tier }: { tier: Tier }) {
  return (
    <div className="flex justify-between items-center px-8 pt-8">
      <div className="flex items-center gap-[10px]">
        <Image src={tier.icon} height={40} width={40} alt={tier.name} />
        <p className="text-[20px] leading-[30px] font-semibold text-gray-900 dark:text-white">{tier.name}</p>
      </div>
      {tier.featured && (
        <div
          className={cn(
            'flex items-center px-3 py-1 rounded-xs border',
            'border-secondary-foreground/10 text-[14px] h-[29px] leading-[21px]',
            'bg-primary text-primary-foreground',
          )}
        >
          Most popular
        </div>
      )}
    </div>
  );
}

// Price Cards Component
function PriceCards({
  loading,
  error,
  frequency,
  priceMap,
}: {
  loading: boolean;
  error?: string;
  frequency: IBillingFrequency;
  priceMap: Record<string, string>;
}) {
  return (
    <div id="pricing" className="isolate mx-auto grid grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {PricingTier.map((tier) => (
        <div
          key={tier.id}
          className={cn(
            'rounded-lg bg-white/70 dark:bg-gray-900/70',
            'backdrop-blur-[6px] overflow-hidden',
            'border border-gray-200 dark:border-gray-800',
          )}
        >
          <div className="flex gap-5 flex-col rounded-lg rounded-b-none">
            <PriceTitle tier={tier} />
            <PriceAmount
              loading={loading}
              error={error}
              tier={tier}
              priceMap={priceMap}
              value={frequency.value}
              priceSuffix={frequency.priceSuffix}
            />
            <div className="px-8">
              <Separator className="bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="px-8 text-[16px] leading-[24px] text-gray-600 dark:text-gray-400">{tier.description}</div>
          </div>
          <div className="px-8 mt-8">
            <Button 
              className="w-full" 
              variant={tier.featured ? 'default' : 'secondary'} 
              asChild
              disabled={loading || !!error || !priceMap[tier.priceId[frequency.value]]}
            >
              <Link href={`/checkout/${tier.priceId[frequency.value]}`}>Get started</Link>
            </Button>
          </div>
          <FeaturesList tier={tier} />
        </div>
      ))}
    </div>
  );
}

// Main Pricing Component
export function Pricing({ country }: { country: string }) {
  const [frequency, setFrequency] = useState<IBillingFrequency>(BillingFrequency[0]);
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [configError, setConfigError] = useState<string | undefined>(undefined);

  const { prices, loading } = usePaddlePrices(paddle, country);
  const error = configError; // Handle only configError since priceError is not returned

  useEffect(() => {
    const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENV;
    
    // Check for missing configuration
    if (!clientToken) {
      console.error('Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN environment variable');
      setConfigError('Missing Paddle client token configuration');
      return;
    }
    
    if (!paddleEnv) {
      console.error('Missing NEXT_PUBLIC_PADDLE_ENV environment variable');
      setConfigError('Missing Paddle environment configuration');
      return;
    }

    // Initialize Paddle
    initializePaddle({
      token: clientToken,
      environment: paddleEnv as Environments,
    })
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
          setConfigError(undefined);
        } else {
          setConfigError('Failed to initialize Paddle');
        }
      })
      .catch((err) => {
        console.error('Error initializing Paddle:', err);
        setConfigError('Failed to initialize Paddle payment system');
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl relative px-[32px] flex flex-col items-center justify-between">
      {error && (
        <Alert variant="destructive" className="mb-6 w-full">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error}. Please check your Paddle configuration.
          </AlertDescription>
        </Alert>
      )}
      
      <Toggle frequency={frequency} setFrequency={setFrequency} />
      <PriceCards frequency={frequency} loading={loading} error={error} priceMap={prices} />
    </div>
  );
}
