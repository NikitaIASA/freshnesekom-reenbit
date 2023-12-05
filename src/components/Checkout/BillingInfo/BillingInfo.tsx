import { FC, useState, useEffect, useRef, ChangeEvent } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import {
  getCountries,
  getCitiesByCountry,
} from "@store/services/locationAutoCompleteServices";
import { LocationSuggestion } from "../LocationSuggestion/LocationSuggestion";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { selectAutoCompleteCities, selectAutoCompleteCountries } from "@store/selectors/locationAutoCompleteSelectors";
import { updateField } from "@store/reducers/cartSlice";
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
    watch
  } = useFormContext();

  const [isCountryListOpened, setIsCountryListOpened] =
    useState<boolean>(false);
  const [isCityListOpened, setIsCityListOpened] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const watchedCountry = watch("country"); 
  const watchedCity = watch("city");
  
  // Filtering countries and cities for dropdown based on entered data
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(watchedCountry?.toLowerCase() || "")
  );
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(watchedCity?.toLowerCase() || "")
  );

  // Check for disabled input for city selection
  const isCityInputDisabled =
    !!selectedCountry === false || !countries.includes(watchedCountry);

  // Cleaning the city with an incorrectly given country
  // If isCityInputDisabled, then clear the city field
  useEffect(() => {
    if (isCityInputDisabled) {
      setValue("city", "");
    }
  }, [isCityInputDisabled]);

  // Country input processing
  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsCountryListOpened(!!value);
    setValue("country", value);
    trigger("country");
    if (countries.includes(value)) {
      setSelectedCountry(value);
    }
  };

  // Handlings country selection from a drop-down list
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setValue("country", country);
    trigger("country");
    setIsCountryListOpened(false);
  };

  // Handlings city selection from a drop-down list
  const handleCitySelect = (city: string) => {
    setValue("city", city);
    trigger("city");
    setIsCityListOpened(false);
  };

  // Country input processing
  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsCityListOpened(!!value);
    setValue("city", value);
    trigger("city");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateField({ field: name, value }));
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
        <div className="billing-info__input-group">
          <label className="billing-info__label" htmlFor="firstName">
            First name
          </label>

          <input
            className="billing-info__input"
            id="firstName"
            {...register("firstName")}
            placeholder="First name"
            onChange={handleChange}
          />

          {errors.firstName && (
            <p className="billing-info__error">{`${errors.firstName.message}`}</p>
          )}
        </div>

        <div className="billing-info__input-group">
          <label className="billing-info__label" htmlFor="lastName">
            Last name
          </label>

          <input
            className="billing-info__input"
            id="lastName"
            {...register("lastName")}
            placeholder="Last name"
            onChange={handleChange}
          />

          {errors.lastName && (
            <p className="billing-info__error">{`${errors.lastName.message}`}</p>
          )}
        </div>

        <div className="billing-info__input-group">
          <label className="billing-info__label" htmlFor="email">
            Email address
          </label>
          <input
            className="billing-info__input"
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email address"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="billing-info__error">{`${errors.email.message}`}</p>
          )}
        </div>

        <div className="billing-info__input-group">
          <label className="billing-info__label" htmlFor="phone">
            Phone number
          </label>
          <input
            className="billing-info__input"
            id="phone"
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Phone number"
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="billing-info__error">{`${errors.phone.message}`}</p>
          )}
        </div>

        <div className="billing-info__input-group" ref={countriesRef}>
          <label className="billing-info__label" htmlFor="country">
            Country
          </label>

          <input
            className="billing-info__input"
            placeholder="Choose a state or Country"
            id="country"
            // value={searchedCountry}
            autoComplete="off"
            {...register("country")}
            onChange={handleCountryChange}
          ></input>

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
          {errors.country && (
            <p className="billing-info__error">{`${errors.country.message}`}</p>
          )}
        </div>

        <div className="billing-info__input-group" ref={citiesRef}>
          <label className="billing-info__label" htmlFor="city">
            Town / City
          </label>
          <input
            className={clsx("billing-info__input", {
              "billing-info__input_disabled": isCityInputDisabled,
            })}
            id="city"
            disabled={isCityInputDisabled}
            autoComplete="off"
            {...register("city")}
            placeholder="Town or city"
            onChange={handleCityChange}
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

          {errors.city && (
            <p className="billing-info__error">{`${errors.city.message}`}</p>
          )}
        </div>

        <div className="billing-info__input-group">
          <label className="billing-info__label" htmlFor="address">
            Address
          </label>
          <input
            className="billing-info__input"
            id="address"
            {...register("address")}
            placeholder="Address"
            onChange={handleChange}
          />
          {errors.address && (
            <p className="billing-info__error">{`${errors.address.message}`}</p>
          )}
        </div>

        <div className="billing-info__input-group">
          <label className="billing-info__label" htmlFor="zip">
            ZIP/Postal code
          </label>
          <input
            className="billing-info__input"
            id="zip"
            {...register("zip")}
            placeholder="Postal code or ZIP"
            onChange={handleChange}
          />
          {errors.zip && (
            <p className="billing-info__error">{`${errors.zip.message}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};
