export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      about_page: {
        Row: {
          content: Json
          created_at: string | null
          id: number
          image_url: string | null
          section_key: string
          subtitle: string | null
          title: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: never
          image_url?: string | null
          section_key: string
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: never
          image_url?: string | null
          section_key?: string
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          created_at: string | null
          id: number
          image_url: string
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          image_url: string
          title: string
        }
        Update: {
          created_at?: string | null
          id?: never
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: number
          image: string
          menu_columns: Json | null
          parent_id: number | null
          slug: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          menu_columns?: Json | null
          parent_id?: number | null
          slug?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          menu_columns?: Json | null
          parent_id?: number | null
          slug?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      colors: {
        Row: {
          base_group: string
          created_at: string | null
          hex: string
          name_uk: string
          slug: string
          tailwind_class: string
        }
        Insert: {
          base_group: string
          created_at?: string | null
          hex: string
          name_uk: string
          slug: string
          tailwind_class: string
        }
        Update: {
          base_group?: string
          created_at?: string | null
          hex?: string
          name_uk?: string
          slug?: string
          tailwind_class?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          button_text: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: number
          image_url: string | null
          link: string | null
          mobile_image_url: string | null
          title: string | null
        }
        Insert: {
          button_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: number
          image_url?: string | null
          link?: string | null
          mobile_image_url?: string | null
          title?: string | null
        }
        Update: {
          button_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: number
          image_url?: string | null
          link?: string | null
          mobile_image_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          color: string
          id: string
          image: string
          order_id: string
          price: number
          quantity: number
          size: string
          title: string
          variant_id: string
        }
        Insert: {
          color: string
          id?: string
          image: string
          order_id: string
          price: number
          quantity: number
          size: string
          title: string
          variant_id: string
        }
        Update: {
          color?: string
          id?: string
          image?: string
          order_id?: string
          price?: number
          quantity?: number
          size?: string
          title?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          city: string
          created_at: string
          delivery_warehouse: string
          first_name: string
          grand_total: number
          id: string
          last_name: string
          payment_method: string
          phone: string
          shipping_cost: number
          status: string
          total_price: number
        }
        Insert: {
          city: string
          created_at?: string
          delivery_warehouse: string
          first_name: string
          grand_total: number
          id?: string
          last_name: string
          payment_method: string
          phone: string
          shipping_cost: number
          status?: string
          total_price: number
        }
        Update: {
          city?: string
          created_at?: string
          delivery_warehouse?: string
          first_name?: string
          grand_total?: number
          id?: string
          last_name?: string
          payment_method?: string
          phone?: string
          shipping_cost?: number
          status?: string
          total_price?: number
        }
        Relationships: []
      }
      product_color_groups: {
        Row: {
          color_slug: string
          created_at: string | null
          id: number
          is_main: boolean | null
          product_id: number
        }
        Insert: {
          color_slug: string
          created_at?: string | null
          id?: number
          is_main?: boolean | null
          product_id: number
        }
        Update: {
          color_slug?: string
          created_at?: string | null
          id?: number
          is_main?: boolean | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_color_groups_colors"
            columns: ["color_slug"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "product_color_groups_color_slug_fkey"
            columns: ["color_slug"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "product_color_groups_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          color: string | null
          color_group_id: number | null
          created_at: string
          id: number
          is_main: boolean | null
          product_id: number | null
          sort_order: number | null
          url: string
        }
        Insert: {
          color?: string | null
          color_group_id?: number | null
          created_at?: string
          id?: number
          is_main?: boolean | null
          product_id?: number | null
          sort_order?: number | null
          url: string
        }
        Update: {
          color?: string | null
          color_group_id?: number | null
          created_at?: string
          id?: number
          is_main?: boolean | null
          product_id?: number | null
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_color_group_id_fkey"
            columns: ["color_group_id"]
            isOneToOne: false
            referencedRelation: "product_color_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          color: string
          color_group_id: number | null
          created_at: string
          id: number
          old_price: number | null
          price: number
          product_id: number | null
          size: string
          sku: string
          stock: number | null
        }
        Insert: {
          color: string
          color_group_id?: number | null
          created_at?: string
          id?: number
          old_price?: number | null
          price: number
          product_id?: number | null
          size: string
          sku: string
          stock?: number | null
        }
        Update: {
          color?: string
          color_group_id?: number | null
          created_at?: string
          id?: number
          old_price?: number | null
          price?: number
          product_id?: number | null
          size?: string
          sku?: string
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_color_group_id_fkey"
            columns: ["color_group_id"]
            isOneToOne: false
            referencedRelation: "product_color_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          slug: string | null
          title: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          slug?: string | null
          title: string
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          slug?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
