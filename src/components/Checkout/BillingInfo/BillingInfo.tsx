import { FC, useState, useEffect, useRef, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import {
  getCountries,
  getCitiesByCountry,
} from "@store/services/locationAutoCompleteServices";
import { LocationSuggestion } from "../LocationSuggestion/LocationSuggestion";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import {
  selectAutoCompleteCities,
  selectAutoCompleteCountries,
} from "@store/selectors/locationAutoCompleteSelectors";
import { ICartFormData } from "@appTypes/cartForm";
import { updateField } from "@store/reducers/cartSlice";
import CustomInput from "@components/UI/CustomInput";
import {
  CHECKOUT_NAMES,
  CHECKOUT_LABELS,
  CHECKOUT_PLACEHOLDERS,
} from "@constants/checkoutForm";
import { sortByQuery } from "@helpers/sortByQuery";
import arrows from "@assets/images/double-arrows.svg";

import "./BillingInfo.scss";

export const BillingInfo: FC = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAutoCompleteCountries);
  const cities = useAppSelector(selectAutoCompleteCities);
  
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useFormContext();

  const [isCountryListOpened, setIsCountryListOpened] =
    useState<boolean>(false);
  const [isCityListOpened, setIsCityListOpened] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const watchedCountry = watch(CHECKOUT_NAMES.country);
  const watchedCity = watch(CHECKOUT_NAMES.city);

  // Filtering countries and cities for dropdown based on entered data
  const filteredCountries = sortByQuery(countries, watchedCountry);
  const filteredCities = sortByQuery(cities, watchedCity);

  // Check for disabled input for city selection
  const isCityInputDisabled = !countries.includes(watchedCountry);

  useEffect(() => {
    if (countries.length > 0 && countries.includes(watchedCountry)) {
      setSelectedCountry(watchedCountry);
    }
  }, [watchedCountry, countries]);

  // Country input processing
  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsCountryListOpened(!!value);
    setValue(CHECKOUT_NAMES.country, value);
    trigger(CHECKOUT_NAMES.country);
    dispatch(
      updateField({
        field: CHECKOUT_NAMES.country as keyof ICartFormData,
        value,
      })
    );
  };

  // Handlings country selection from a drop-down list
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setValue(CHECKOUT_NAMES.country, country);
    trigger(CHECKOUT_NAMES.country);
    dispatch(
      updateField({
        field: CHECKOUT_NAMES.country as keyof ICartFormData,
        value: country,
      })
    );
    setIsCountryListOpened(false);
  };

  // Handlings city selection from a drop-down list
  const handleCitySelect = (city: string) => {
    setValue(CHECKOUT_NAMES.city, city);
    trigger(CHECKOUT_NAMES.city);
    dispatch(
      updateField({
        field: CHECKOUT_NAMES.city as keyof ICartFormData,
        value: city,
      })
    );
    setIsCityListOpened(false);
  };

  // Country input processing
  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsCityListOpened(!!value);
    setValue(CHECKOUT_NAMES.city, value);
    trigger(CHECKOUT_NAMES.city);
    dispatch(
      updateField({ field: CHECKOUT_NAMES.city as keyof ICartFormData, value })
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateField({ field: name as keyof ICartFormData, value }));
  };

  // Fetching cities if correct country is selected
  useEffect(() => {
    if (selectedCountry) {
      dispatch(getCitiesByCountry(selectedCountry));
    }
  }, [selectedCountry, dispatch]);

  // Fetching countries
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  // Logic for closing dropdown when clicking outside the block
  const countriesRef = useRef<HTMLInputElement | null>(null);
  const citiesRef = useRef<HTMLInputElement | null>(null);

  useOnClickOutside(countriesRef, () => {
    setIsCountryListOpened(false);
  });
  useOnClickOutside(citiesRef, () => {
    setIsCityListOpened(false);
  });

  return (
    <div className="billing-info">
      <div className="billing-info__title-block">
        <h2 className="billing-info__title">Billing info</h2>
        <p className="billing-info__details">Please enter your billing info</p>
      </div>
      <div className="billing-info__inputs">
        <CustomInput
          name={CHECKOUT_NAMES.firstName}
          label={CHECKOUT_LABELS.firstName}
          placeholder={CHECKOUT_PLACEHOLDERS.firstName}
          register={register}
          errors={errors}
          onChange={handleChange}
          isRequired={true}
        />
        <CustomInput
          name={CHECKOUT_NAMES.lastName}
          label={CHECKOUT_LABELS.lastName}
          placeholder={CHECKOUT_PLACEHOLDERS.lastName}
          register={register}
          errors={errors}
          onChange={handleChange}
          isRequired={true}
        />
        <CustomInput
          name={CHECKOUT_NAMES.email}
          label={CHECKOUT_LABELS.email}
          placeholder={CHECKOUT_PLACEHOLDERS.email}
          register={register}
          errors={errors}
          onChange={handleChange}
          isRequired={true}
        />
        <CustomInput
          name={CHECKOUT_NAMES.phone}
          label={CHECKOUT_LABELS.phone}
          placeholder={CHECKOUT_PLACEHOLDERS.phone}
          register={register}
          errors={errors}
          onChange={handleChange}
          isRequired={true}
        />

        <div className="input-container" ref={countriesRef}>
          <CustomInput
            name={CHECKOUT_NAMES.country}
            label={CHECKOUT_LABELS.country}
            placeholder={CHECKOUT_PLACEHOLDERS.country}
            register={register}
            errors={errors}
            onChange={handleCountryChange}
            isRequired={true}
          />
          <div
            className="billing-info__arrows"
            onClick={() => setIsCountryListOpened(!isCountryListOpened)}
          >
            <img src={arrows} alt="arrows for selection" />
          </div>
          {isCountryListOpened && (
            <LocationSuggestion
              items={filteredCountries}
              onSelect={handleCountrySelect}
            />
          )}
        </div>

        <div className="input-container" ref={citiesRef}>
          <CustomInput
            name={CHECKOUT_NAMES.city}
            label={CHECKOUT_LABELS.city}
            placeholder={CHECKOUT_PLACEHOLDERS.city}
            register={register}
            errors={errors}
            onChange={handleCityChange}
            disabled={!selectedCountry || !countries.includes(watchedCountry)}
            isRequired={true}
          />
          {!isCityInputDisabled && (
            <div
              className="billing-info__arrows"
              onClick={() => setIsCityListOpened(!isCityListOpened)}
            >
              <img src={arrows} alt="arrows for selection" />
            </div>
          )}

          {isCityListOpened && (
            <LocationSuggestion
              items={filteredCities}
              onSelect={handleCitySelect}
            />
          )}
        </div>

        <CustomInput
          name={CHECKOUT_NAMES.address}
          label={CHECKOUT_LABELS.address}
          placeholder={CHECKOUT_PLACEHOLDERS.address}
          register={register}
          errors={errors}
          isRequired={true}
          onChange={handleChange}
        />
        <CustomInput
          name={CHECKOUT_NAMES.zip}
          label={CHECKOUT_LABELS.zip}
          placeholder={CHECKOUT_PLACEHOLDERS.zip}
          register={register}
          errors={errors}
          isRequired={true}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
