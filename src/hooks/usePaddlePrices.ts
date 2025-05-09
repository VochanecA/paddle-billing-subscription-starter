import { Paddle, PricePreviewParams, PricePreviewResponse } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { PricingTier } from '@/constants/pricing-tier';

export type PaddlePrices = Record<string, string>;

function getLineItems(): PricePreviewParams['items'] {
  const priceId = PricingTier.map((tier) => [tier.priceId.month, tier.priceId.year]);
  return priceId.flat().map((priceId) => ({ priceId, quantity: 1 }));
}

function getPriceAmounts(prices: PricePreviewResponse) {
  return prices.data.details.lineItems.reduce((acc, item) => {
    acc[item.price.id] = item.formattedTotals.total;
    return acc;
  }, {} as PaddlePrices);
}

export function usePaddlePrices(
  paddle: Paddle | undefined,
  country: string,
): { prices: PaddlePrices; loading: boolean; error?: string } {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!paddle) {
      // Don't try to fetch prices if paddle isn't initialized
      return;
    }

    const paddlePricePreviewRequest: Partial<PricePreviewParams> = {
      items: getLineItems(),
      ...(country && country !== 'OTHERS' && { address: { countryCode: country } }),
    };

    setLoading(true);
    setError(undefined);

    paddle.PricePreview(paddlePricePreviewRequest as PricePreviewParams)
      .then((prices) => {
        try {
          const formattedPrices = getPriceAmounts(prices);
          setPrices(formattedPrices);
          setLoading(false);
        } catch (err) {
          console.error('Error processing price data:', err);
          setError('Failed to process price data');
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching prices from Paddle:', err);
        setError('Failed to fetch prices');
        setLoading(false);
      });
  }, [country, paddle]);

  return { prices, loading, error };
}
