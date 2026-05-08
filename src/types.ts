/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Recipe {
  id: string;
  name: string;
  type: 'traditional' | 'modern';
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    sugar: number;
    sodium: number;
  };
  healthImpact: {
    benefits: string[];
    warnings: string[];
    relatedDiseases: string[];
  };
}

export interface UserPreferences {
  availableIngredients: string[];
  dietaryRestrictions: string[];
  healthGoals: string[];
  preferredCuisine?: string;
}
