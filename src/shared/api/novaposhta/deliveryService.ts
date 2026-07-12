// API client service for Nova Poshta delivery integration
const API_URL = "https://api.novaposhta.ua/v2.0/json/";
const API_KEY = process.env.NEXT_PUBLIC_NOVAPOSHTA_API_KEY || "";

export interface NPCity {
  Ref: string;
  Description: string;
}

export interface NPWarehouse {
  Ref: string;
  Description: string;
}

// Fetch cities matching the query string from Nova Poshta database
export async function fetchNPCities(query: string): Promise<NPCity[]> {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: query,
          Limit: "10",
        },
      }),
    });

    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data.map((city: { Ref: string; Description: string }) => ({
        Ref: city.Ref,
        Description: city.Description,
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch cities from Nova Poshta API:", error);
    return [];
  }
}

// Fetch list of warehouses for a specific city reference token
export async function fetchNPWarehouses(cityRef: string): Promise<NPWarehouse[]> {
  if (!cityRef) return [];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: cityRef,
          Limit: "250",
        },
      }),
    });

    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data.map((wh: { Ref: string; Description: string }) => ({
        Ref: wh.Ref,
        Description: wh.Description,
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch warehouses from Nova Poshta API:", error);
    return [];
  }
}