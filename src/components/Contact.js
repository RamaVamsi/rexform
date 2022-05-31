import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "../index.css";

const Contact = ({ contact, onDelete, onEdit }) => {
  return (
    <div>
      <div className="task">
        <div>
          <p className="taskName">
            <span className="textBold">Contact Name:</span> {contact.text}
          </p>
          <p className="taskDate">
            <span className="textBold">Type of Contact:</span> {contact.type}
          </p>
        </div>
        <div>
          <p>
            <FaTimes onClick={() => onDelete(contact.id)} className="delIcon" />
          </p>
          <p>
            <FaPencilAlt
              onClick={() => onEdit(contact.id)}
              className="editIcon"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
