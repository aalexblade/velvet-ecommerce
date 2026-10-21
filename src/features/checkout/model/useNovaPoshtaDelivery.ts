"use client";

import { useEffect, useState } from "react";
import {
  fetchNPCities,
  fetchNPWarehouses,
  type NPCity,
  type NPWarehouse,
} from "@/shared/api/novaposhta/deliveryService";

interface UseNovaPoshtaDeliveryParams {
  cityRef: string;
  selectedCity: string;
}

export function useNovaPoshtaDelivery({
  cityRef,
  selectedCity,
}: UseNovaPoshtaDeliveryParams) {
  const [cityInput, setCityInput] = useState("");
  const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [isSearchingWarehouses, setIsSearchingWarehouses] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Стан для міст і відділень
  const [citiesList, setCitiesList] = useState<NPCity[]>([]);
  const [warehousesList, setWarehousesList] = useState<NPWarehouse[]>([]);

  // Ефект для завантаження міст з урахуванням дебаунсу
  useEffect(() => {
    if (cityInput.length < 2 || cityInput === selectedCity) {
      return;
    }

    let cancelled = false;

    const timeoutId = setTimeout(async () => {
      setIsSearchingCities(true);

      try {
        const data = await fetchNPCities(cityInput);

        if (!cancelled) {
          setCitiesList(data);
          setShowCityDropdown(data.length > 0);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching cities:", error);
        }
      } finally {
        if (!cancelled) {
          setIsSearchingCities(false);
        }
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [cityInput, selectedCity]);

  // Ефект для завантаження відділень Нової Пошти за cityRef
  useEffect(() => {
    if (!cityRef) {
      return;
    }

    let cancelled = false;

    const loadWarehouses = async () => {
      setIsSearchingWarehouses(true);

      try {
        const data = await fetchNPWarehouses(cityRef);

        if (!cancelled) {
          setWarehousesList(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching warehouses:", error);
        }
      } finally {
        if (!cancelled) {
          setIsSearchingWarehouses(false);
        }
      }
    };

    void loadWarehouses();

    return () => {
      cancelled = true;
    };
  }, [cityRef]);

  const handleCityInputChange = (value: string) => {
    setCityInput(value);

    if (value.length < 2) {
      setCitiesList([]);
      setShowCityDropdown(false);
    }
  };

  const handleSelectCity = (city: NPCity) => {
    setCityInput(city.Description);
    setCitiesList([]);
    setShowCityDropdown(false);

    return city;
  };

  // Автоматичне очищення списку відділень, якщо cityRef порожній
  const activeWarehousesList = cityRef ? warehousesList : [];

  return {
    cityInput,
    setCityInput,
    citiesList:
      cityInput.length < 2 || cityInput === selectedCity ? [] : citiesList,
    warehousesList: activeWarehousesList,
    isSearchingCities,
    isSearchingWarehouses,
    showCityDropdown:
      cityInput.length < 2 || cityInput === selectedCity
        ? false
        : showCityDropdown,
    setShowCityDropdown,
    handleCityInputChange,
    handleSelectCity,
  };
}
