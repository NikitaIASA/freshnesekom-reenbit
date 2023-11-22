import { FC, ReactNode } from "react";
import clsx from "clsx";

import { ButtonVariants, ButtonTypes, ButtonSizes } from "@appTypes/buttonTypes";

import "./CustomButton.scss";

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  size?: ButtonSizes,
  className?: string;
  onClick?: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled = false,
  className,
  variant = ButtonVariants.PRIMARY,
  size = ButtonSizes.MEDIUM,
  type = ButtonTypes.BUTTON,
  onClick,
}) => {
  const buttonClass = clsx("custom-button", {
    "custom-button--disabled": isDisabled,
    "custom-button--primary": variant === ButtonVariants.PRIMARY,
    "custom-button--secondary": variant === ButtonVariants.SECONDARY,
    "custom-button--small": size === ButtonSizes.SMALL,
    "custom-button--medium": size === ButtonSizes.MEDIUM,
    "custom-button--large": size === ButtonSizes.LARGE,
    [className!]: className,
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
    >
      {children}
    </button>
  );
};
