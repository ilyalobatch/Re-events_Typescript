/* global google */

// Semantic UI components
import { Segment, Header, Button, Confirm } from "semantic-ui-react";

// Components
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInputs";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// library
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// helpers
import { clearSelectedEvent, listenToSelectedEvent } from "../eventActions";
import { getCategoryData } from "../../../app/api/categoryOptions";
import {
  addEventToFirestore,
  listenToEventFromFirestore,
  updateEventInFirestore,
  cancelEventToggle,
  deleteEventInFirestore,
} from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { RootState, useAppDispatch } from "../../../app/store/configureStore";
import { IEvent } from "../eventReducer";

interface IEventFormProps {
  match: any;
  history: any;
  location: any;
}

const EventForm: React.VFC<IEventFormProps> = ({
  match,
  history,
  location,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const categories = getCategoryData();

  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [confirmToggleOpen, setConfirmToggleOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { selectedEvent } = useSelector((state: RootState) => state.event);
  const { loading, error } = useSelector((state: RootState) => state.async);
  const { prevLocation } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (location.pathname !== "/createEvent") return;
    dispatch(clearSelectedEvent());
  }, [dispatch, location.pathname]);

  const defaultValues: IEvent = selectedEvent || {
    id: "",
    hostUid: "",
    hostPhotoURL: "",
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: { lat: 0, lng: 0 },
    },
    venue: {
      address: "",
      latLng: { lat: 0, lng: 0 },
    },
    date: new Date(),
    hostedBy: "",
    isCancelled: false,
    attendees: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required("City is required"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Venue is required"),
    }),
    date: Yup.string().required(),
  });

  const handleCancelClick = () => {
    return history && prevLocation
      ? history.push(prevLocation.pathname)
      : history.goBack();
  };

  async function handleCancelToggle(event: IEvent) {
    setConfirmToggleOpen(false);
    setLoadingCancel(true);

    try {
      await cancelEventToggle(event);
      toast.success(
        event.isCancelled
          ? t("form.message.eventReactivated")
          : t("form.message.eventCancelled")
      );
      setLoadingCancel(false);
    } catch (error: any) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  async function handleDeleteEvent(event: IEvent) {
    setConfirmDeleteOpen(false);
    setLoadingDelete(true);

    try {
      await deleteEventInFirestore(event.id);
      toast.success(t("form.message.eventDeleted"));
      setLoadingDelete(false);
      history.push("/events");
    } catch (error: any) {
      setLoadingDelete(true);
      toast.error(error.message);
    }
  }

  async function handleFormSubmit(values: IEvent, { setSubmitting }: any) {
    try {
      if (selectedEvent) {
        await updateEventInFirestore(values);
        toast.success(t("form.message.eventUpdated"));
      } else {
        await addEventToFirestore(values);
        toast.success(t("form.message.eventCreated"));
      }
      setSubmitting(false);
      history.push("/events");
    } catch (error: any) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event: IEvent) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
    shouldExecute:
      match.params.id !== selectedEvent?.id &&
      location.pathname !== "/createEvent",
  });

  if (loading) return <LoadingComponent content={t("event.loading")} />;
  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content={t("event.header.details")} />
            <MyTextInput name="title" placeholder={t("event.field.title")} />
            <MySelectInput
              name="category"
              placeholder={t("event.field.category")}
              options={categories}
            />
            <MyTextArea
              name="description"
              placeholder={t("event.field.description")}
              rows={4}
            />
            <Header
              sub
              color="teal"
              content={t("event.header.locationDetails")}
            />
            <MyPlaceInput name="city" placeholder={t("event.field.city")} />
            <MyPlaceInput
              name="venue"
              placeholder={t("event.field.venue")}
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ["establishment"],
              }}
            />
            <MyDateInput
              name="date"
              placeholderText={t("event.field.date")}
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
              autoComplete="off"
            />
            {selectedEvent && (
              <>
                <Button
                  loading={loadingCancel}
                  type="button"
                  floated="left"
                  color={selectedEvent.isCancelled ? "green" : "red"}
                  content={
                    selectedEvent.isCancelled
                      ? t("form.button.reactivateEvent")
                      : t("form.button.cancelEvent")
                  }
                  onClick={() => setConfirmToggleOpen(true)}
                />
                <Button
                  loading={loadingDelete}
                  type="button"
                  floated="left"
                  color="red"
                  content={t("form.button.deleteEvent")}
                  onClick={() => setConfirmDeleteOpen(true)}
                />
              </>
            )}
            <Button
              positive
              type="submit"
              floated="right"
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              content={
                selectedEvent
                  ? t("form.button.update")
                  : t("form.button.create")
              }
            />
            <Button
              type="submit"
              floated="right"
              disabled={isSubmitting}
              content={t("form.button.cancel")}
              onClick={handleCancelClick}
            />
          </Form>
        )}
      </Formik>
      {selectedEvent && (
        <>
          <Confirm
            open={confirmToggleOpen}
            onCancel={() => setConfirmToggleOpen(false)}
            onConfirm={() => handleCancelToggle(selectedEvent)}
            content={
              selectedEvent?.isCancelled
                ? t("event.message.reactivateEvent")
                : t("event.message.cancelEvent")
            }
          />
          <Confirm
            open={confirmDeleteOpen}
            onCancel={() => setConfirmDeleteOpen(false)}
            onConfirm={() => handleDeleteEvent(selectedEvent)}
            content={t("event.message.deleteEvent")}
          />
        </>
      )}
    </Segment>
  );
};

export default EventForm;
