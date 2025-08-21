"use client";
import React from "react";
import { useNovaPoshtaDelivery } from "@/shared/hooks/deliveryhooks";

interface Props {
  regionInput: string;
  cityInput: string;
  branchInput: string;
  setRegionInput: React.Dispatch<React.SetStateAction<string>>;
  setCityInput: React.Dispatch<React.SetStateAction<string>>;
  setBranchInput: React.Dispatch<React.SetStateAction<string>>;
}

export const NovaPoshtaForm: React.FC<Props> = ({
  regionInput,
  cityInput,
  branchInput,
  setRegionInput,
  setCityInput,
  setBranchInput,
}) => {
  const {
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
  } = useNovaPoshtaDelivery({
    onSelect: (r, c, b) => {},
  });

  const filteredRegions = regionFocused
    ? regionInput
      ? regions.filter((r) =>
          r.Description.toLowerCase().includes(regionInput.toLowerCase())
        )
      : regions.slice(0, 100)
    : [];

  const filteredCities = cityFocused
    ? cityInput
      ? cities.filter((c) =>
          c.Description.toLowerCase().includes(cityInput.toLowerCase())
        )
      : cities.slice(0, 1000)
    : [];

  const filteredBranches = branchFocused
    ? branchInput
      ? branches.filter((b) =>
          b.Description.toLowerCase().includes(branchInput.toLowerCase())
        )
      : branches.slice(0, 100)
    : [];

  return (
    <div className="flex flex-col gap-4  relative ">
      {/* Регион */}
      <div className="relative">
        <label className="block mb-1">Регион</label>
        <input
          type="text"
          value={regionInput}
          onChange={(e) => {
            setRegionInput(e.target.value);
            setSelectedRegion(null);
          }}
          onFocus={() => setRegionFocused(true)}
          onBlur={() => setTimeout(() => setRegionFocused(false), 150)}
          className="w-full border py-3 px-2 rounded"
          placeholder="Виберіть область"
        />
        {filteredRegions.length > 0 && (
          <ul className="z-10 bg-white border w-full max-h-48 overflow-auto mt-1 rounded shadow">
            {filteredRegions.map((r) => (
              <li
                key={r.Ref}
                className="p-2 hover:bg-gray-100  cursor-pointer"
                onClick={() => {
                  setSelectedRegion(r);
                  setRegionInput(`${r.Description} ${r.RegionType}`);
                  setRegionFocused(false);
                }}
              >
                {r.Description} {r.RegionType}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Город */}
      <div className="relative">
        <label className="block mb-1">Город</label>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => {
            setCityInput(e.target.value);
            setSelectedCity(null);
          }}
          onFocus={() => setCityFocused(true)}
          onBlur={() => setTimeout(() => setCityFocused(false), 150)}
          className="w-full border py-3 px-2 rounded"
          placeholder="Введите город"
          disabled={!selectedRegion}
        />
        {filteredCities.length > 0 && (
          <ul className="z-10 bg-white w-full max-h-48 overflow-auto mt-1 rounded shadow">
            {filteredCities.map((c) => (
              <li
                key={c.Ref}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCity(c);
                  setCityInput(c.Description);
                  setCityFocused(false);
                }}
              >
                {c.Description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Отделение */}
      <div className="relative ">
        <label className="block mb-1">Отделение</label>
        <input
          type="text"
          value={branchInput}
          onChange={(e) => {
            setBranchInput(e.target.value);
            setSelectedBranch(null);
          }}
          onFocus={() => setBranchFocused(true)}
          onBlur={() => setTimeout(() => setBranchFocused(false), 150)}
          className="w-full border py-3 px-2 rounded"
          placeholder="Введите отделение"
          disabled={!selectedCity}
        />
        {filteredBranches.length > 0 && (
          <ul className="z-10 bg-white w-full border max-h-48 overflow-auto mt-1 rounded shadow">
            {filteredBranches.map((b) => (
              <li
                key={b.Ref}
                className="p-3 hover:bg-gray-100 cursor-pointer whitespace-normal break-words"
                onClick={() => {
                  setSelectedBranch(b);
                  setBranchInput(b.Description);
                  setBranchFocused(false);
                }}
              >
                {b.Description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
