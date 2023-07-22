// Semantic UI components
import { Button, Divider, Label } from "semantic-ui-react";

// Components
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import MyTextInput from "../../app/common/form/MyTextInput";
import SocialLogin from "./SocialLogin";

// library
import React from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// helpers
import { closeModal } from "../../app/common/modals/modalReducer";
import { registerInFirebase } from "../../app/firestore/firebaseService";
import { useAppDispatch } from "../../app/store/configureStore";

function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ModalWrapper size="mini" header={t("modal.message.registerInApp")}>
      <Formik
        initialValues={{ displayName: "", email: "", password: "", auth: "" }}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error: any) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className="ui form">
            <MyTextInput
              name="displayName"
              placeholder={t("form.field.displayName")}
            />
            <MyTextInput name="email" placeholder={t("form.field.email")} />
            <MyTextInput
              name="password"
              type="password"
              placeholder={t("form.field.password")}
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              fluid
              loading={isSubmitting}
              disabled={isSubmitting || !dirty || !isValid}
              type="submit"
              size="large"
              color="teal"
              content={t("form.button.register")}
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default RegisterForm;
