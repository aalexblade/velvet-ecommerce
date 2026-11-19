export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      about_page: {
        Row: {
          id: number;
          section_key: string;
          title: string | null;
          subtitle: string | null;
          content: Json;
          image_url: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          section_key: string;
          title?: string | null;
          subtitle?: string | null;
          content: Json;
          image_url?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          section_key?: string;
          title?: string | null;
          subtitle?: string | null;
          content?: Json;
          image_url?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: number;
          title: string;
          image_url: string;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          image_url: string;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          image_url?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: number;
          created_at: string;
          title: string | null;
          slug: string | null;
          image: string;
          parent_id: number | null;
          menu_columns: Json | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title?: string | null;
          slug?: string | null;
          image: string;
          parent_id?: number | null;
          menu_columns?: Json | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string | null;
          slug?: string | null;
          image?: string;
          parent_id?: number | null;
          menu_columns?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      colors: {
        Row: {
          slug: string;
          name_uk: string;
          hex: string;
          base_group: string;
          tailwind_class: string;
          created_at: string | null;
        };
        Insert: {
          slug: string;
          name_uk: string;
          hex: string;
          base_group: string;
          tailwind_class: string;
          created_at?: string | null;
        };
        Update: {
          slug?: string;
          name_uk?: string;
          hex?: string;
          base_group?: string;
          tailwind_class?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      hero_slides: {
        Row: {
          id: number;
          created_at: string;
          title: string | null;
          description: string | null;
          button_text: string | null;
          link: string | null;
          image_url: string | null;
          display_order: number | null;
          mobile_image_url: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title?: string | null;
          description?: string | null;
          button_text?: string | null;
          link?: string | null;
          image_url?: string | null;
          display_order?: number | null;
          mobile_image_url?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string | null;
          description?: string | null;
          button_text?: string | null;
          link?: string | null;
          image_url?: string | null;
          display_order?: number | null;
          mobile_image_url?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          variant_id: string;
          title: string;
          color: string;
          size: string;
          price: number;
          quantity: number;
          image: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          variant_id: string;
          title: string;
          color: string;
          size: string;
          price: number;
          quantity: number;
          image: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          variant_id?: string;
          title?: string;
          color?: string;
          size?: string;
          price?: number;
          quantity?: number;
          image?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          first_name: string;
          last_name: string;
          phone: string;
          city: string;
          delivery_warehouse: string;
          payment_method: string;
          total_price: number;
          shipping_cost: number;
          grand_total: number;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          first_name: string;
          last_name: string;
          phone: string;
          city: string;
          delivery_warehouse: string;
          payment_method: string;
          total_price: number;
          shipping_cost: number;
          grand_total: number;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          first_name?: string;
          last_name?: string;
          phone?: string;
          city?: string;
          delivery_warehouse?: string;
          payment_method?: string;
          total_price?: number;
          shipping_cost?: number;
          grand_total?: number;
          status?: string;
        };
        Relationships: [];
      };
      product_color_groups: {
        Row: {
          id: number;
          product_id: number;
          color_slug: string;
          is_main: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          product_id: number;
          color_slug: string;
          is_main?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          product_id?: number;
          color_slug?: string;
          is_main?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_color_groups_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          id: number;
          created_at: string;
          product_id: number | null;
          url: string;
          is_main: boolean | null;
          sort_order: number | null;
          color: string | null;
          color_group_id: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          product_id?: number | null;
          url: string;
          is_main?: boolean | null;
          sort_order?: number | null;
          color?: string | null;
          color_group_id?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          product_id?: number | null;
          url?: string;
          is_main?: boolean | null;
          sort_order?: number | null;
          color?: string | null;
          color_group_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_images_color_group_id_fkey";
            columns: ["color_group_id"];
            isOneToOne: false;
            referencedRelation: "product_color_groups";
            referencedColumns: ["id"];
          },
        ];
      };
      product_variants: {
        Row: {
          id: number;
          created_at: string;
          product_id: number | null;
          sku: string;
          color: string;
          size: string;
          price: number;
          old_price: number | null;
          stock: number | null;
          color_group_id: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          product_id?: number | null;
          sku: string;
          color: string;
          size: string;
          price: number;
          old_price?: number | null;
          stock?: number | null;
          color_group_id?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          product_id?: number | null;
          sku?: string;
          color?: string;
          size?: string;
          price?: number;
          old_price?: number | null;
          stock?: number | null;
          color_group_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_variants_color_group_id_fkey";
            columns: ["color_group_id"];
            isOneToOne: false;
            referencedRelation: "product_color_groups";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          id: number;
          created_at: string;
          title: string;
          slug: string | null;
          description: string | null;
          is_active: boolean;
          category_id: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title: string;
          slug?: string | null;
          description?: string | null;
          is_active: boolean;
          category_id?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string;
          slug?: string | null;
          description?: string | null;
          is_active?: boolean;
          category_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};