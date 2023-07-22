// Semantic UI components
import { Button, Header, Label, Segment } from "semantic-ui-react";

// Components
import MyTextInput from "../../app/common/form/MyTextInput";

// library
import React from "react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// helpers
import { updateUserPassword } from "../../app/firestore/firebaseService";
import { RootState } from "../../app/store/configureStore";

function AccountPage() {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    newPassword: "",
    newPasswordConfirm: "",
    auth: "",
  };

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {currentUser?.providerId === "password" && (
        <>
          <Header
            sub
            color="teal"
            content={t("account.header.changePassword")}
          />
          <p>{t("account.message.changePassword")}</p>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              newPassword: Yup.string().required(
                t("form.message.passwordRequired")
              ),
              newPasswordConfirm: Yup.string().oneOf(
                [Yup.ref("newPassword"), ""],
                t("form.message.inconsistentPasswords")
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
              } catch (error: any) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, dirty, isValid, errors }) => (
              <Form className="ui form">
                <MyTextInput
                  name="newPassword"
                  type="password"
                  placeholder={t("form.field.newPassword")}
                />
                <MyTextInput
                  name="newPasswordConfirm"
                  type="password"
                  placeholder={t("form.field.confirmPassword")}
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
                  style={{ display: "block" }}
                  loading={isSubmitting}
                  positive
                  type="submit"
                  size="large"
                  disabled={!isValid || isSubmitting || !dirty}
                  content={t("form.button.updatePassword")}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser?.providerId === "facebook.com" && (
        <>
          <Header
            sub
            color="teal"
            content={t("account.header.facebookAccount")}
          />
          <p>{t("account.message.visitFacebook")}</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://facebook.com"
            content={t("account.button.toFacebook")}
          />
        </>
      )}
      {currentUser?.providerId === "google.com" && (
        <>
          <Header
            sub
            color="teal"
            content={t("account.header.googleAccount")}
          />
          <p>{t("account.message.visitGoogle")}</p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://google.com"
            content={t("account.button.toGoogle")}
          />
        </>
      )}
    </Segment>
  );
}

export default AccountPage;
