// Semantic UI components
import { Button, Divider, Label } from "semantic-ui-react";

// Components
import SocialLogin from "./SocialLogin";
import MyTextInput from "../../app/common/form/MyTextInput";
import ModalWrapper from "../../app/common/modals/ModalWrapper";

// library
import React from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// helpers
import { closeModal } from "../../app/common/modals/modalReducer";
import { signInWithEmail } from "../../app/firestore/firebaseService";
import { useAppDispatch } from "../../app/store/configureStore";

function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ModalWrapper size="mini" header={t("modal.login.header")}>
      <Formik
        initialValues={{ email: "", password: "", auth: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setSubmitting(false);
            setErrors({
              auth: t("errors.invalidUsernameOrPass"),
            });
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className="ui form">
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
              content={t("form.button.login")}
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default LoginForm;
