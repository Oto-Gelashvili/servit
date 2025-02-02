'use client';
import React from 'react';
import { useState } from 'react';
import { getStripe } from '../../../../lib/stripe-client';
import { Locale } from '../../../../get-dictionaries';

export const TierType = {
  BASIC: 'basic',
  PREMIUM: 'premium',
} as const;

export interface SubTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface SubTier {
  name: string;
  id: string;
  href: string;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  soldOut?: boolean;
  cta: string;
  tierType: string;
}

interface PriceIds {
  [key: string]: {
    monthly: {
      en: string;
      ka: string;
    };
    annual: {
      en: string;
      ka: string;
    };
  };
}

interface Dictionary {
  sub: {
    title: string;
    subtitle: string;
    frequencies: {
      monthly: string;
      annually: string;
    };
    priceSuffix: {
      monthly: string;
      annually: string;
    };
    tiers: {
      basic: {
        name: string;
        description: string;
        features: string[];
        cta: string;
      };
      premium: {
        name: string;
        description: string;
        features: string[];
        cta: string;
      };
    };
  };
}

const PRICE_IDS: PriceIds = {
  [TierType.PREMIUM]: {
    monthly: {
      en: 'price_1QYm0EKYelKYEeeebEwxK4yQ',
      ka: 'price_1QZCtMKYelKYEeee1dc6io1k',
    },
    annual: {
      en: 'price_1QYm0VKYelKYEeeeJdB6mQGY',
      ka: 'price_1QZCtbKYelKYEeee94dmvxrP',
    },
  },
};

const getFrequencies = (dictionary: Dictionary): SubTierFrequency[] => [
  {
    id: '1',
    value: '1',
    label: dictionary.sub.frequencies.monthly,
    priceSuffix: dictionary.sub.priceSuffix.monthly,
  },
  {
    id: '2',
    value: '2',
    label: dictionary.sub.frequencies.annually,
    priceSuffix: dictionary.sub.priceSuffix.annually,
  },
];

const getTiers = (dictionary: Dictionary): SubTier[] => [
  {
    name: dictionary.sub.tiers.basic.name,
    id: '0',
    href: '/',
    price: { '1': '$0', '2': '$0' },
    description: dictionary.sub.tiers.basic.description,
    features: dictionary.sub.tiers.basic.features,
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: dictionary.sub.tiers.basic.cta,
    tierType: TierType.BASIC,
  },
  {
    name: dictionary.sub.tiers.premium.name,
    id: '1',
    href: '/subscribe',
    price: { '1': '$14.99', '2': '$139.99' },
    description: dictionary.sub.tiers.premium.description,
    features: dictionary.sub.tiers.premium.features,
    featured: true,
    highlighted: false,
    soldOut: false,
    cta: dictionary.sub.tiers.premium.cta,
    tierType: TierType.PREMIUM,
  },
];

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const cn = (...args: (string | boolean | undefined | null)[]) =>
  args.filter(Boolean).join(' ');

export default function SubscriptionContent({
  dictionary,
  language,
}: {
  dictionary: Dictionary;
  language: Locale;
}) {
  const [frequency, setFrequency] = useState<SubTierFrequency>(
    getFrequencies(dictionary)[0]
  );
  const [loading, setLoading] = useState<string | null>(null);
  const tiers = getTiers(dictionary);

  const handleSubscription = async (tier: SubTier) => {
    try {
      setLoading(tier.id);

      if (tier.id === '0') return; // Skip basic tier

      const priceId =
        PRICE_IDS[tier.tierType as keyof PriceIds][
          frequency.value === '1' ? 'monthly' : 'annual'
        ][language];

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          frequency: frequency.value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            errorData
          )}`
        );
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Detailed subscription error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="sub-main">
      <div className="titles">
        <h1>{dictionary.sub.title}</h1>
        <p>{dictionary.sub.subtitle}</p>
      </div>

      <div className="toggle">
        <div
          role="radiogroup"
          className="radiogroup"
          style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
        >
          {getFrequencies(dictionary).map((option) => (
            <label
              className={cn(
                frequency.value === option.value ? 'active ' : 'nonActive',
                'cursor-pointer rounded-full px-2.5 py-2 '
              )}
              key={option.value}
              htmlFor={option.value}
            >
              {option.label}
              <button
                value={option.value}
                id={option.value}
                className="hidden"
                role="radio"
                aria-checked={frequency.value === option.value}
                onClick={() => setFrequency(option)}
              >
                {option.label}
              </button>
            </label>
          ))}
        </div>
      </div>

      <div className="sub-cont">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn('sub-type', tier.featured ? 'featured' : '')}
          >
            <h3>{tier.name}</h3>
            <p className="desc">{tier.description}</p>
            <p>
              <span className="price">
                {typeof tier.price === 'string'
                  ? tier.price
                  : tier.price[frequency.value]}
              </span>
              {typeof tier.price !== 'string' && (
                <span className="suffix">{frequency.priceSuffix}</span>
              )}
            </p>
            <button
              onClick={() => handleSubscription(tier)}
              disabled={tier.soldOut || loading === tier.id}
              className="btn"
            >
              {loading === tier.id
                ? 'Loading...'
                : tier.soldOut
                  ? 'Sold out'
                  : tier.cta}
            </button>

            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon className="checkIcon" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
