import React, { useState } from "react";
import { ButtonLoader } from "../";
import { toast } from "react-toastify";
import "../../shared/modal.scss";

interface DeleteResource {
  onDelete?: () => void;
  onDone?: () => void;
  id?: string | number;
  isDeleting?: boolean;
}

export const DeletewebResource: React.FC<DeleteResource> = (props) => {
  const [isDeletingResource, setIsDeletingResource] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (props.onDelete !== undefined) {
      props.onDelete();
      return;
    }
    setIsDeletingResource(true);

    Promise.resolve()
      .then(() => {
        if (props.onDone !== undefined) props.onDone();
        toast.success("Successfully Deleted Web Resource...");
      })
      .finally(() => {
        setIsDeletingResource(false);
      });
  };

  return (
    <div className="modal delete-webr">
      <form>
        <div className="form-buttons">
          <button
            type="button"
            disabled={isDeletingResource}
            className="log-inputs btn-cancel codefend_secondary_ac"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isDeletingResource}
            className="log-inputs btn-add codefend_main_ac"
          >
            {(props.isDeleting || isDeletingResource) && <ButtonLoader />}
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
