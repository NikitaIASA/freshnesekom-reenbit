import { FC } from "react";

import CustomButton from "@components/UI/CustomButton";
import { ButtonVariants } from "@appTypes/buttonTypes";

import "./ConfirmationModal.scss";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__buttons">
          <CustomButton variant={ButtonVariants.PRIMARY} onClick={onConfirm}>
            Confirm
          </CustomButton>
          <CustomButton variant={ButtonVariants.SECONDARY} onClick={onClose}>
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
