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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      content_cards: {
        Row: {
          body_copy: string | null
          category: string | null
          code: string | null
          created_at: string
          cta: string | null
          id: string
          image_search_query: string | null
          module: string | null
          priority: number | null
          source: string | null
          state_region: string | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          body_copy?: string | null
          category?: string | null
          code?: string | null
          created_at?: string
          cta?: string | null
          id?: string
          image_search_query?: string | null
          module?: string | null
          priority?: number | null
          source?: string | null
          state_region?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          body_copy?: string | null
          category?: string | null
          code?: string | null
          created_at?: string
          cta?: string | null
          id?: string
          image_search_query?: string | null
          module?: string | null
          priority?: number | null
          source?: string | null
          state_region?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      crafts: {
        Row: {
          challenges: string | null
          code: string | null
          community_context: string | null
          created_at: string
          cultural_significance: string | null
          gi_recognition: string | null
          how_website_helps: string | null
          id: string
          material: string | null
          name: string | null
          product_examples: string[] | null
          source: string | null
          state_region: string | null
          technique: string | null
        }
        Insert: {
          challenges?: string | null
          code?: string | null
          community_context?: string | null
          created_at?: string
          cultural_significance?: string | null
          gi_recognition?: string | null
          how_website_helps?: string | null
          id?: string
          material?: string | null
          name?: string | null
          product_examples?: string[] | null
          source?: string | null
          state_region?: string | null
          technique?: string | null
        }
        Update: {
          challenges?: string | null
          code?: string | null
          community_context?: string | null
          created_at?: string
          cultural_significance?: string | null
          gi_recognition?: string | null
          how_website_helps?: string | null
          id?: string
          material?: string | null
          name?: string | null
          product_examples?: string[] | null
          source?: string | null
          state_region?: string | null
          technique?: string | null
        }
        Relationships: []
      }
      cultural_trails: {
        Row: {
          best_season: string | null
          code: string | null
          created_at: string
          highlights: string | null
          id: string
          ideal_duration: string | null
          livelihood_angle: string | null
          name: string | null
          source: string | null
          state_region: string | null
          stops: string[] | null
          theme: string | null
          travel_notes: string | null
        }
        Insert: {
          best_season?: string | null
          code?: string | null
          created_at?: string
          highlights?: string | null
          id?: string
          ideal_duration?: string | null
          livelihood_angle?: string | null
          name?: string | null
          source?: string | null
          state_region?: string | null
          stops?: string[] | null
          theme?: string | null
          travel_notes?: string | null
        }
        Update: {
          best_season?: string | null
          code?: string | null
          created_at?: string
          highlights?: string | null
          id?: string
          ideal_duration?: string | null
          livelihood_angle?: string | null
          name?: string | null
          source?: string | null
          state_region?: string | null
          stops?: string[] | null
          theme?: string | null
          travel_notes?: string | null
        }
        Relationships: []
      }
      dances_music: {
        Row: {
          code: string | null
          created_at: string
          cultural_meaning: string | null
          id: string
          instruments_costume: string | null
          key_features: string | null
          module: string | null
          name: string | null
          performance_context: string | null
          source: string | null
          state_region: string | null
          type: string | null
          unesco_status: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          cultural_meaning?: string | null
          id?: string
          instruments_costume?: string | null
          key_features?: string | null
          module?: string | null
          name?: string | null
          performance_context?: string | null
          source?: string | null
          state_region?: string | null
          type?: string | null
          unesco_status?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          cultural_meaning?: string | null
          id?: string
          instruments_costume?: string | null
          key_features?: string | null
          module?: string | null
          name?: string | null
          performance_context?: string | null
          source?: string | null
          state_region?: string | null
          type?: string | null
          unesco_status?: string | null
        }
        Relationships: []
      }
      did_you_know: {
        Row: {
          code: string | null
          created_at: string
          fact: string | null
          id: string
          source: string | null
          topic: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          fact?: string | null
          id?: string
          source?: string | null
          topic?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          fact?: string | null
          id?: string
          source?: string | null
          topic?: string | null
        }
        Relationships: []
      }
      festivals: {
        Row: {
          code: string | null
          community_context: string | null
          created_at: string
          foods: string[] | null
          id: string
          key_practices: string[] | null
          music_dance: string[] | null
          name: string | null
          season: string | null
          source: string | null
          state_region: string | null
          sustainability_note: string | null
          visitor_experience: string | null
          why_it_matters: string | null
        }
        Insert: {
          code?: string | null
          community_context?: string | null
          created_at?: string
          foods?: string[] | null
          id?: string
          key_practices?: string[] | null
          music_dance?: string[] | null
          name?: string | null
          season?: string | null
          source?: string | null
          state_region?: string | null
          sustainability_note?: string | null
          visitor_experience?: string | null
          why_it_matters?: string | null
        }
        Update: {
          code?: string | null
          community_context?: string | null
          created_at?: string
          foods?: string[] | null
          id?: string
          key_practices?: string[] | null
          music_dance?: string[] | null
          name?: string | null
          season?: string | null
          source?: string | null
          state_region?: string | null
          sustainability_note?: string | null
          visitor_experience?: string | null
          why_it_matters?: string | null
        }
        Relationships: []
      }
      guru_shishya: {
        Row: {
          art_craft: string | null
          code: string | null
          created_at: string
          digital_features: string | null
          guru_role: string | null
          id: string
          safeguarding_need: string | null
          shishya_path: string | null
          skills_passed_down: string[] | null
          source: string | null
          state_region: string | null
          tradition: string | null
        }
        Insert: {
          art_craft?: string | null
          code?: string | null
          created_at?: string
          digital_features?: string | null
          guru_role?: string | null
          id?: string
          safeguarding_need?: string | null
          shishya_path?: string | null
          skills_passed_down?: string[] | null
          source?: string | null
          state_region?: string | null
          tradition?: string | null
        }
        Update: {
          art_craft?: string | null
          code?: string | null
          created_at?: string
          digital_features?: string | null
          guru_role?: string | null
          id?: string
          safeguarding_need?: string | null
          shishya_path?: string | null
          skills_passed_down?: string[] | null
          source?: string | null
          state_region?: string | null
          tradition?: string | null
        }
        Relationships: []
      }
      heritage_master: {
        Row: {
          best_for_module: string[] | null
          category: string | null
          code: string | null
          created_at: string
          cultural_significance: string | null
          era_period: string | null
          id: string
          languages: string[] | null
          name: string | null
          region: string | null
          short_description: string | null
          source: string | null
          state_ut: string | null
          subcategory: string | null
          tags: string[] | null
          unesco_status: string | null
        }
        Insert: {
          best_for_module?: string[] | null
          category?: string | null
          code?: string | null
          created_at?: string
          cultural_significance?: string | null
          era_period?: string | null
          id?: string
          languages?: string[] | null
          name?: string | null
          region?: string | null
          short_description?: string | null
          source?: string | null
          state_ut?: string | null
          subcategory?: string | null
          tags?: string[] | null
          unesco_status?: string | null
        }
        Update: {
          best_for_module?: string[] | null
          category?: string | null
          code?: string | null
          created_at?: string
          cultural_significance?: string | null
          era_period?: string | null
          id?: string
          languages?: string[] | null
          name?: string | null
          region?: string | null
          short_description?: string | null
          source?: string | null
          state_ut?: string | null
          subcategory?: string | null
          tags?: string[] | null
          unesco_status?: string | null
        }
        Relationships: []
      }
      monuments: {
        Row: {
          approx_period: string | null
          architecture_style: string | null
          city_district: string | null
          code: string | null
          created_at: string
          cultural_value: string | null
          historical_context: string | null
          id: string
          name: string | null
          narration_seed: string | null
          source: string | null
          state_ut: string | null
          story_hook: string | null
        }
        Insert: {
          approx_period?: string | null
          architecture_style?: string | null
          city_district?: string | null
          code?: string | null
          created_at?: string
          cultural_value?: string | null
          historical_context?: string | null
          id?: string
          name?: string | null
          narration_seed?: string | null
          source?: string | null
          state_ut?: string | null
          story_hook?: string | null
        }
        Update: {
          approx_period?: string | null
          architecture_style?: string | null
          city_district?: string | null
          code?: string | null
          created_at?: string
          cultural_value?: string | null
          historical_context?: string | null
          id?: string
          name?: string | null
          narration_seed?: string | null
          source?: string | null
          state_ut?: string | null
          story_hook?: string | null
        }
        Relationships: []
      }
      oral_vault: {
        Row: {
          audio_guidelines: string | null
          code: string | null
          core_theme: string | null
          created_at: string
          genre: string | null
          id: string
          language: string | null
          sensitivity_note: string | null
          source: string | null
          state_region: string | null
          summary: string | null
          tradition: string | null
          transmission_method: string | null
        }
        Insert: {
          audio_guidelines?: string | null
          code?: string | null
          core_theme?: string | null
          created_at?: string
          genre?: string | null
          id?: string
          language?: string | null
          sensitivity_note?: string | null
          source?: string | null
          state_region?: string | null
          summary?: string | null
          tradition?: string | null
          transmission_method?: string | null
        }
        Update: {
          audio_guidelines?: string | null
          code?: string | null
          core_theme?: string | null
          created_at?: string
          genre?: string | null
          id?: string
          language?: string | null
          sensitivity_note?: string | null
          source?: string | null
          state_region?: string | null
          summary?: string | null
          tradition?: string | null
          transmission_method?: string | null
        }
        Relationships: []
      }
      states_uts: {
        Row: {
          capital: string | null
          created_at: string
          cuisine_highlights: string[] | null
          heritage_tourism_anchors: string[] | null
          id: string
          major_festivals: string[] | null
          major_languages: string[] | null
          region: string | null
          signature_crafts: string[] | null
          signature_heritage: string | null
          signature_performing_arts: string[] | null
          source: string | null
          state_ut: string | null
        }
        Insert: {
          capital?: string | null
          created_at?: string
          cuisine_highlights?: string[] | null
          heritage_tourism_anchors?: string[] | null
          id?: string
          major_festivals?: string[] | null
          major_languages?: string[] | null
          region?: string | null
          signature_crafts?: string[] | null
          signature_heritage?: string | null
          signature_performing_arts?: string[] | null
          source?: string | null
          state_ut?: string | null
        }
        Update: {
          capital?: string | null
          created_at?: string
          cuisine_highlights?: string[] | null
          heritage_tourism_anchors?: string[] | null
          id?: string
          major_festivals?: string[] | null
          major_languages?: string[] | null
          region?: string | null
          signature_crafts?: string[] | null
          signature_heritage?: string | null
          signature_performing_arts?: string[] | null
          source?: string | null
          state_ut?: string | null
        }
        Relationships: []
      }
      unesco_ich: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          element: string | null
          id: string
          inscription_note: string | null
          source: string | null
          state_region: string | null
          year: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          element?: string | null
          id?: string
          inscription_note?: string | null
          source?: string | null
          state_region?: string | null
          year?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          element?: string | null
          id?: string
          inscription_note?: string | null
          source?: string | null
          state_region?: string | null
          year?: number | null
        }
        Relationships: []
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
