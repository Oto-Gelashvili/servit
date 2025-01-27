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
      Services_en: {
        Row: {
          id: number;
          img: string | null;
          avatar: string | null;
          category: string | null;
          subCategory: string | null;
          hyperlink: string;
          title: string | null;
          desc: string | null;
          tier: string | null;
          price: string | null;
          name: string | null;
          number: string | null;
        };
        Insert: {
          id?: number;
          img?: string | null;
          avatar?: string | null;
          category?: string | null;
          subCategory?: string | null;
          hyperlink: string;
          title?: string | null;
          desc?: string | null;
          tier?: string | null;
          price?: string | null;
          name?: string | null;
          number?: string | null;
        };
        Update: {
          id?: number;
          img?: string | null;
          avatar?: string | null;
          category?: string | null;
          subCategory?: string | null;
          hyperlink: string;
          title?: string | null;
          desc?: string | null;
          tier?: string | null;
          price?: string | null;
          name?: string | null;
          number?: string | null;
        };
      };
      Services_ka: {
        Row: {
          id: number;
          img: string | null;
          avatar: string | null;
          category: string | null;
          subCategory: string | null;
          hyperlink: string;
          title: string | null;
          desc: string | null;
          tier: string | null;
          price: string | null;
          name: string | null;
          number: string | null;
        };
        Insert: {
          id?: number;
          img?: string | null;
          avatar?: string | null;
          category?: string | null;
          subCategory?: string | null;
          hyperlink: string;
          title?: string | null;
          desc?: string | null;
          tier?: string | null;
          price?: string | null;
          name?: string | null;
          number?: string | null;
        };
        Update: {
          id?: number;
          img?: string | null;
          avatar?: string | null;
          category?: string | null;
          subCategory?: string | null;
          hyperlink: string;
          title?: string | null;
          desc?: string | null;
          tier?: string | null;
          price?: string | null;
          name?: string | null;
          number?: string | null;
        };
      };
      posts: {
        Row: {
          id: string;
          created_at: string;
          title: string | null;
          content: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title?: string | null;
          content?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string | null;
          content?: string | null;
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
