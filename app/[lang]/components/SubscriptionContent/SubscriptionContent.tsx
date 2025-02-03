'use client';
import React from 'react';
import { useState } from 'react';
import { getStripe } from '../../../../lib/stripe-client';
import { Locale } from '../../../../get-dictionaries';
import { Database } from '../../utils/database.types';
import { X } from 'lucide-react';

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
  unsubscribe: string;
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
        unsubscribe: string;
      };
      premium: {
        name: string;
        description: string;
        features: string[];
        cta: string;
        unsubscribe: string;
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
    unsubscribe: dictionary.sub.tiers.basic.cta,
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
    unsubscribe: dictionary.sub.tiers.premium.unsubscribe,
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
  profileData,
}: {
  dictionary: Dictionary;
  language: Locale;
  profileData: Database['public']['Tables']['profiles']['Row'];
}) {
  const [frequency, setFrequency] = useState<SubTierFrequency>(
    getFrequencies(dictionary)[0]
  );
  const [loading, setLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(
    !!profileData.subscription_id
  );

  const tiers = getTiers(dictionary);

  const handleSubscription = async (tier: SubTier) => {
    try {
      setLoading(tier.id);

      if (tier.id === '0') return;

      const priceId =
        PRICE_IDS[tier.tierType as keyof PriceIds][
          frequency.value === '1' ? 'monthly' : 'annual'
        ][language];
      if (!profileData.subscription_id) {
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
        const { sessionId } = await response.json();
        const stripe = await getStripe();

        if (!stripe) {
          throw new Error('Failed to load Stripe');
        }

        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      } else {
        try {
          const response = await fetch('/api/cancel-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subscriptionId: profileData.subscription_id,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to unsubscribe');
          }
          setIsSubscribed(false);

          {
            language === 'en'
              ? setSuccessMessage(
                  'Your subscription will be canceled at the end of the billing period.'
                )
              : setSuccessMessage(
                  'თქვენი გამოწერა გაუქმდება გადახდის პერიოდის დასრულებისას'
                );
          }
        } catch (error) {
          console.error('Error while unsubscribing:', error);
          setErrorMessage(
            error instanceof Error
              ? error.message
              : (error as { message?: string })?.message ||
                  'An unknown error occurred'
          );
        }
      }
    } catch (error) {
      console.error('Detailed subscription error:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : (error as { message?: string })?.message ||
              'An unknown error occurred'
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="sub-main">
      {errorMessage && (
        <div className="flex fixed top-[90%] left-1/2 translateMid bg-[var(--error)] rounded-lg p-4 items-center justify-between max-w-[280px] w-full text-2xl font-semibold text-center gap-4 text-white">
          {errorMessage}
          <X className="cursor-pointer" onClick={() => setErrorMessage(null)} />
        </div>
      )}
      {successMessage && (
        <div className="flex fixed top-[90%] left-1/2 translateMid bg-[var(--success)] rounded-lg p-4 items-center justify-between max-w-[280px] w-full text-2xl font-semibold text-center gap-4 text-white">
          {successMessage}
          <X
            className="cursor-pointer"
            onClick={() => setSuccessMessage(null)}
          />
        </div>
      )}
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
                  : isSubscribed
                    ? tier.unsubscribe
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
