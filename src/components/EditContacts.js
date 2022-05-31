import { useState } from "react";
import Swal from "sweetalert2";

const EditContacts = ({ onEdit }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const onEdit = (e) => {
    e.preventDefault();

    if (!text && !type) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill in your Name and Contact Type or close the form!",
      });
    } else if (!text && type) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill in your Name!",
      });
    } else if (text && !type) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill in your contactType!",
      });
    } else {
      onSave({ text, type });
    }

    setText("");
    setType("");
  };

  return (
    <form className="add-form" onEdit={onSubmit}>
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          placeholder="add contact"
          value={text}
          onChange={(e) => getText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Contact Type</label>
        <input
          type="text"
          placeholder="add contact type"
          value={type}
          onChange={(e) => getType(e.target.value)}
        />
      </div>

      <input type="submit" className="btn btn-block" value="Edit Contact" />
    </form>
  );
};

export default EditContacts;
