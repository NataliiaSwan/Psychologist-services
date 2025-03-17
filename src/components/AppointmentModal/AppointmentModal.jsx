import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import css from "./AppointmentModal.module.css";

const availableTimes = ["10 : 00", "11 : 00", "12 : 00", "13 : 00"];

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  time: Yup.string().required("Please select a time"),
  comment: Yup.string(),
});

const AppointmentModal = ({ isOpen, onClose, name, avatar_url }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={css.title}>Make an appointment with a psychologist</h1>
        <p className={css.description}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
        <div className={css.avatarContainer}>
          <img src={avatar_url} alt={name} className={css.avatar} />
          <div className={css.titleNamebox}>
            <h3 className={css.infoTitle}>Your psychologists</h3>
            <p className={css.psychologistName}>{name}</p>
          </div>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            time: "",
            comment: "",
            showDropdown: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Appointment booked:", values);
            resetForm();
            onClose();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={css.form}>
              <div className={css.fullWidth}>
                <Field
                  name="name"
                  placeholder="Your Name"
                  className={css.inputField}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.row}>
                <div className={css.halfWidth}>
                  <Field
                    name="phoneNumber"
                    placeholder="Your Phone Number"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>

                <div className={css.halfWidth}>
                  <div className={css.timeInputWrapper}>
                    <input
                      type="text"
                      name="time"
                      placeholder="00:00"
                      readOnly
                      value={values.time}
                      onClick={() => setShowDropdown(!showDropdown)}
                      className={css.inputField}
                    />
                    <span
                      className={css.clockIcon}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      🕒
                    </span>
                  </div>

                  {showDropdown && (
                    <div className={css.dropdown}>
                      <div className={css.dropdownTitle}>Meeting time</div>
                      {availableTimes.map((t, index) => (
                        <div
                          key={index}
                          className={css.dropdownItem}
                          onClick={() => {
                            setFieldValue("time", t);
                            setShowDropdown(false);
                          }}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                  <ErrorMessage
                    name="time"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
              </div>

              <div className={css.fullWidth}>
                <Field
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className={css.inputField}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.fullWidth}>
                <Field
                  name="comment"
                  as="textarea"
                  placeholder="Your Comment"
                  className={css.textArea}
                />
              </div>
              <button type="submit" className={css.submitButton}>
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AppointmentModal;
