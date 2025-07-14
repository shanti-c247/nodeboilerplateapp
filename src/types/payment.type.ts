// Define 'Interval' type manually or use Stripe's predefined types
type Interval = 'day' | 'week' | 'month' | 'year';

// Define 'UsageType' type manually or use Stripe's predefined types
type UsageType = 'metered' | 'licensed';

export interface IProduct {
  productId: string;
  name: string;
  description?: string;
}

export interface IPlan {
  productId: string;
  currency: string;
  amount: number;
  recurring: {
    interval: Interval;
    usage_type: UsageType;
  };
  usageType: UsageType;
  interval: Interval;
}

export interface IPlanUpdate {
  description: string | undefined;
  email: string | undefined;
  customerId: string;
  priceId: string;
  orderId: string;
}
