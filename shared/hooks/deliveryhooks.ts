import { useState, useEffect } from "react";
import axios from "axios";

export interface Region {
  Description: string;
  Ref: string;
  AreasCenter: string;
  RegionType: string;
}
export interface City {
  Description: string;
  Ref: string;
}
export interface Branch {
  Description: string;
  Ref: string;
}

interface Props {
  onSelect: (
    region: Region | null,
    city: City | null,
    branch: Branch | null
  ) => void;
}

const API_KEY = "e657cd00572f37d47b7ea5ce55999ca6";

export const useNovaPoshtaDelivery = ({ onSelect }: Props) => {


  const [regionFocused, setRegionFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [branchFocused, setBranchFocused] = useState(false);

  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // Завантаження областей
  useEffect(() => {
    axios
      .post("https://api.novaposhta.ua/v2.0/json/", {
        apiKey: API_KEY,
        modelName: "AddressGeneral",
        calledMethod: "getSettlementAreas",
        methodProperties: { Ref: "" },
      })
      .then((res) => setRegions(res.data.data || []))
      .catch(console.error);
  }, []);

  // Завантаження міст вибраної області
  useEffect(() => {
    if (!selectedRegion) {
      setCities([]);
      setSelectedCity(null);
      return;
    }

    axios
      .post("https://api.novaposhta.ua/v2.0/json/", {
        apiKey: API_KEY,
        modelName: "AddressGeneral",
        calledMethod: "getSettlements",
        methodProperties: {
          AreaRef: selectedRegion.Ref,
          Warehouse: "1", // тільки міста з відділеннями
          Page: "1",
          Limit: "300",
          FindByString: "",
        },
      })
      .then((res) => {
        const settlements = res.data.data || [];
        const cityList: City[] = settlements.map((item: any) => ({
          Ref: item.Ref,
          Description: item.Description,
        }));
        setCities(cityList);
      })
      .catch(console.error);
  }, [selectedRegion]);

  // Завантаження відділень вибраного міста
  // Завантаження відділень вибраного міста
  useEffect(() => {
    if (!selectedCity) {
      setBranches([]);
      setSelectedBranch(null);
      return;
    }

    axios
      .post("https://api.novaposhta.ua/v2.0/json/", {
        apiKey: API_KEY,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          SettlementRef: selectedCity.Ref, // використовуємо SettlementRef
          FindByString: "",
          Page: "1",
          Limit: "50",
          Language: "UA",
        },
      })
      .then((res) => setBranches(res.data.data || []))
      .catch(console.error);
  }, [selectedCity]);

  // Виклик колбека при зміні вибору
  useEffect(() => {
    onSelect(selectedRegion, selectedCity, selectedBranch);
  }, [selectedRegion, selectedCity, selectedBranch, onSelect]);

  return {
    regions,
    selectedRegion,
    setSelectedRegion,
    cities,
    selectedCity,
    setSelectedCity,
    branches,
    selectedBranch,
    setSelectedBranch,
   
    regionFocused,
    setRegionFocused,
    cityFocused,
    setCityFocused,
    branchFocused,
    setBranchFocused,
  };
};
