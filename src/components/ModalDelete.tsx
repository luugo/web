import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";

export interface ModalDeleteProps {
  show: boolean;
  modalTitle: string;
  modalDescription: string;
  onCloseModalDelete: () => void;
  handleConfirm: () => void;
}

const ModalDelete: FC<ModalDeleteProps> = ({ show, modalTitle, modalDescription, onCloseModalDelete, handleConfirm }) => {

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {modalTitle}
        </h3>
        <span className="text-sm">
          {modalDescription}
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleConfirm} type="submit">
            Deletar
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
            Cancelar
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDelete}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDelete;
