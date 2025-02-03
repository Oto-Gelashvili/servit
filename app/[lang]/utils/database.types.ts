export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: number;
          image_urls: string[];
          title_en: string;
          categoryId: number;
          hyperlink: string;
          title_ka: string;
          description_en: string;
          description_ka: string;
          price: number;
          user_id: number;
          stripe_product_id: string;
          stripe_price_id: string;
          createdat: string;
          updatedat: string;
        };
        Insert: {
          id: number;
          image_urls: string[];
          title_en: string;
          categoryId: number;
          hyperlink: string;
          title_ka: string;
          description_en: string;
          description_ka: string;
          price: number;
          user_id: number;
          stripe_product_id: string;
          stripe_pride_id: string;
          createdat: string;
          updatedat: string;
        };
        Update: {
          id: number;
          image_urls: string[];
          title_en: string;
          categoryId: number;
          hyperlink: string;
          title_ka: string;
          description_en: string;
          description_ka: string;
          price: number;
          user_id: number;
          stripe_product_id: string;
          stripe_pride_id: string;
          createdat: string;
          updatedat: string;
        };
      };
      products_en: {
        Row: {
          id: number;
          title: string | null;
          description: string | null;
          category: string | null;
          price: number | null;
          discountPercentage: number | null;
          rating: number | null;
          stock: number | null;
          tags: string[] | null;
          brand: string | null;
          sku: string | null;
          weight: number | null;
          width: number | null;
          height: number | null;
          depth: number | null;
          warrantyInformation: string | null;
          shippingInformation: string | null;
          reviews: {
            ratings: number[] | null;
            comments: string[] | null;
            dates: string[] | null;
            names: string[] | null;
          } | null;
          returnPolicy: string | null;
          minimumOrderQuantity: number | null;
          thumbnail: string | null;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
          description?: string | null;
          category?: string | null;
          price?: number | null;
          discountPercentage?: number | null;
          rating?: number | null;
          stock?: number | null;
          tags?: string[] | null;
          brand?: string | null;
          sku?: string | null;
          weight?: number | null;
          width?: number | null;
          height?: number | null;
          depth?: number | null;
          warrantyInformation?: string | null;
          shippingInformation?: string | null;
          reviews?: {
            ratings?: number[] | null;
            comments?: string[] | null;
            dates?: string[] | null;
            names?: string[] | null;
          } | null;
          returnPolicy?: string | null;
          minimumOrderQuantity?: number | null;
          thumbnail?: string | null;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
          description?: string | null;
          category?: string | null;
          price?: number | null;
          discountPercentage?: number | null;
          rating?: number | null;
          stock?: number | null;
          tags?: string[] | null;
          brand?: string | null;
          sku?: string | null;
          weight?: number | null;
          width?: number | null;
          height?: number | null;
          depth?: number | null;
          warrantyInformation?: string | null;
          shippingInformation?: string | null;
          reviews?: {
            ratings?: number[] | null;
            comments?: string[] | null;
            dates?: string[] | null;
            names?: string[] | null;
          } | null;
          returnPolicy?: string | null;
          minimumOrderQuantity?: number | null;
          thumbnail?: string | null;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          user_id?: string | null;
        };
      };
      categories: {
        Row: {
          id: number;
          category_en: string;
          category_ka: string;
        };
        Insert: {
          id?: number;
          category_en?: string;
          category_ka?: string;
        };
        Update: {
          id?: number;
          category_en?: string;
          category_ka?: string;
        };
      };
      profiles: {
        Row: {
          id: number;
          username: string;
          email: string;
          avatar_url: string;
          rating: number;
          subscription_id: string;
        };
        Insert: {
          id: number;
          username: string;
          email: string;
          avatar_url: string;
          rating: number;
          subscription_id: string;
        };
        Update: {
          id: number;
          username: string;
          email: string;
          avatar_url: string;
          rating: number;
          subscription_id: string;
        };
      };
      products_ka: {
        Row: {
          id: number;
          title: string | null;
          description: string | null;
          category: string | null;
          price: number | null;
          discountPercentage: number | null;
          rating: number | null;
          stock: number | null;
          tags: string[] | null;
          brand: string | null;
          sku: string | null;
          weight: number | null;
          width: number | null;
          height: number | null;
          depth: number | null;
          warrantyInformation: string | null;
          shippingInformation: string | null;
          reviews: {
            ratings: number[] | null;
            comments: string[] | null;
            dates: string[] | null;
            names: string[] | null;
          } | null;
          returnPolicy: string | null;
          minimumOrderQuantity: number | null;
          thumbnail: string | null;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
          description?: string | null;
          category?: string | null;
          price?: number | null;
          discountPercentage?: number | null;
          rating?: number | null;
          stock?: number | null;
          tags?: string[] | null;
          brand?: string | null;
          sku?: string | null;
          weight?: number | null;
          width?: number | null;
          height?: number | null;
          depth?: number | null;
          warrantyInformation?: string | null;
          shippingInformation?: string | null;
          reviews?: {
            ratings?: number[] | null;
            comments?: string[] | null;
            dates?: string[] | null;
            names?: string[] | null;
          } | null;
          returnPolicy?: string | null;
          minimumOrderQuantity?: number | null;
          thumbnail?: string | null;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
          description?: string | null;
          category?: string | null;
          price?: number | null;
          discountPercentage?: number | null;
          rating?: number | null;
          stock?: number | null;
          tags?: string[] | null;
          brand?: string | null;
          sku?: string | null;
          weight?: number | null;
          width?: number | null;
          height?: number | null;
          depth?: number | null;
          warrantyInformation?: string | null;
          shippingInformation?: string | null;
          reviews?: {
            ratings?: number[] | null;
            comments?: string[] | null;
            dates?: string[] | null;
            names?: string[] | null;
          } | null;
          returnPolicy?: string | null;
          minimumOrderQuantity?: number | null;
          thumbnail?: string | null;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          user_id?: string | null;
        };
      };
    };
  };
}
