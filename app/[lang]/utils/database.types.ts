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
      tasks: {
        Row: {
          id: number;
          title_en: string;
          categoryId: number;
          hyperlink: string;
          title_ka: string;
          description_en: string;
          description_ka: string;
          user_id: number;
          createdat: string;
          updatedat: string;
        };
        Insert: {
          id: number;
          title_en: string;
          categoryId: number;
          hyperlink: string;
          title_ka: string;
          description_en: string;
          description_ka: string;
          user_id: number;
          createdat: string;
          updatedat: string;
        };
        Update: {
          id: number;
          title_en: string;
          categoryId: number;
          hyperlink: string;
          title_ka: string;
          description_en: string;
          description_ka: string;
          user_id: number;
          createdat: string;
          updatedat: string;
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
          user_slug: string;
          bio: string;
          phone: string;
        };
        Insert: {
          id: number;
          username: string;
          email: string;
          avatar_url: string;
          rating: number;
          subscription_id: string;
          user_slug: string;
          bio: string;
          phone: string;
        };
        Update: {
          id: number;
          username: string;
          email: string;
          avatar_url: string;
          rating: number;
          subscription_id: string;
          user_slug: string;
          bio: string;
          phone: string;
        };
      };
    };
  };
}
