import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AppointmentModal.modal.css";

const availableTimes = ["10.00", "12.00", "16.00", "18.00"];

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  time: Yup.string().required("Please, select a time"),
  comment: Yup.string(),
});

const AppointmentModal = ({ isOpen, onClose }) => {
  return (
    <div className={isOpen ? "modal open" : "modal"}>
      <div>
        <h1>Make an appointment with a psychologists</h1>
        <p>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
        <div>
          <img />
          <p></p>
          <h1></h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              time: "",
              comment: "",
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
                <div>
                  <Field
                    name="name"
                    placeholder="Your Name"
                    className={css.inputField}
                    value={values.name}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
                <div>
                  <Field
                    name="phoneNumber"
                    placeholder="Your PhoneNumber"
                    className={css.inputField}
                    value={values.phoneNumber}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
                <div>
                  <div>
                    <label className={css.meetingTime}>Meeting Time</label>
                    <div className={css.boxTime}>
                      {availableTimes.map((t, index) => (
                        <button
                          type="button"
                          key={index}
                          className={css.timeButton}
                          onClick={() => setFieldValue("time", t)}
                          aria-label={`Select meeting time: ${t}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <ErrorMessage
                      name="time"
                      component="div"
                      className={css.errorMessage}
                    />
                  </div>
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className={css.inputField}
                    value={values.email}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
                <Field
                  name="comment"
                  placeholder="Your Comment"
                  className={css.textArea}
                  value={values.comment}
                />

                <button type="submit" className={css.button}>
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default AppointmentModal;
