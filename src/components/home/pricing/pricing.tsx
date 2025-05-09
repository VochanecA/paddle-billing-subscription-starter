import { Paddle, PricePreviewParams, PricePreviewResponse } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { PricingTier } from '@/constants/pricing-tier';

export type PaddlePrices = Record<string, string>;

function getLineItems(): PricePreviewParams['items'] {
  const priceIds = PricingTier.map((tier) => [tier.priceId.month, tier.priceId.year]);
  
  // Debug logging to see what priceIds we're using
  console.log('Price IDs being requested:', priceIds.flat());
  
  return priceIds.flat().map((priceId) => ({ priceId, quantity: 1 }));
}

function getPriceAmounts(prices: PricePreviewResponse) {
  // Log the raw response to inspect its structure
  console.log('Raw Paddle price response:', JSON.stringify(prices, null, 2));
  
  try {
    // Check if the expected structure exists
    if (!prices?.data?.details?.lineItems) {
      console.error('Unexpected Paddle response structure:', prices);
      throw new Error('Invalid price response structure');
    }
    
    // Log the line items for debugging
    console.log('Line items count:', prices.data.details.lineItems.length);
    
    return prices.data.details.lineItems.reduce((acc, item) => {
      // Make sure the expected properties exist
      if (item?.price?.id && item?.formattedTotals?.total) {
        acc[item.price.id] = item.formattedTotals.total;
      } else {
        console.warn('Line item missing expected properties:', item);
      }
      return acc;
    }, {} as PaddlePrices);
  } catch (err) {
    console.error('Error in getPriceAmounts:', err);
    throw err;
  }
}

export function usePaddlePrices(
  paddle: Paddle | undefined,
  country: string,
): { prices: PaddlePrices; loading: boolean; error?: string } {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Reset state when dependencies change
    setLoading(true);
    setError(undefined);
    
    if (!paddle) {
      console.log('Paddle instance not available yet, waiting...');
      return;
    }

    // Validate country code if present
    const countryCode = country && country !== 'OTHERS' ? country : undefined;
    console.log('Using country code for pricing:', countryCode || 'None (using default)');

    // Build request with detailed logging
    const paddlePricePreviewRequest: Partial<PricePreviewParams> = {
      items: getLineItems(),
      ...(countryCode && { address: { countryCode } }),
    };
    
    console.log('Sending Paddle price preview request:', paddlePricePreviewRequest);

    // Fetch prices with more detailed error handling
    paddle.PricePreview(paddlePricePreviewRequest as PricePreviewParams)
      .then((priceResponse) => {
        try {
          console.log('Paddle price preview request successful');
          const formattedPrices = getPriceAmounts(priceResponse);
          console.log('Formatted prices:', formattedPrices);
          
          if (Object.keys(formattedPrices).length === 0) {
            console.warn('No prices were returned from Paddle');
            setError('No pricing data available');
          } else {
            setPrices(formattedPrices);
          }
        } catch (err: any) {
          console.error('Error processing price data:', err);
          setError(`Failed to process price data: ${err.message || 'Unknown error'}`);
        } finally {
          setLoading(false);
        }
      })
      .catch((err: any) => {
        // Enhanced error logging with request details
        console.error('Error fetching prices from Paddle:', {
          error: err,
          message: err.message,
          request: paddlePricePreviewRequest,
        });
        
        // More descriptive error message
        setError(`Failed to fetch prices: ${err.message || 'Unknown API error'}`);
        setLoading(false);
      });
  }, [country, paddle]);

  return { prices, loading, error };
}
