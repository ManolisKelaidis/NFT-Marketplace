import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ProfileSocialMediaForm from "./ProfileSocialMediaForm";
import FormikForm from "./../../components/form/FormikForm";
import { retrieveUser } from "../../store/UserSlice";
import LoadingOverlay from "react-loading-overlay";
import { useLoader } from "../../providers/loader";
import * as Yup from "yup";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { updateUser } from "../../store/UserSlice";
import { useNotify } from "../../providers/notify";
const initialFormModel = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  description: "",
  mysiteId: "",
  instagramId: "",
  facebookId: "",
  twitterId: "",
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// const validationSchema = Yup.object().shape({
//   username: Yup.string().required("validation.required.username"),
//   email: Yup.string()
//     .email("validation.invalid.email")
//     .required("validation.required.email"),
//   firstName: Yup.string().required("validation.required.first-name"),
//   lastName: Yup.string().required("validation.required.last-name"),
// });

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotify();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, setLoading } = useLoader();
  const [formModel, setFormModel] = useState(initialFormModel);

  const fetchUser = () => {
    dispatch(retrieveUser(currentUser && currentUser._id))
      .unwrap()
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const onSubmit = (values) => {
    setLoading(true);

    const info = { ...currentUser, ...values };
    setTimeout(() => {
      dispatch(updateUser({ userId: info._id, info }))
        .unwrap()
        .then(() => {
          fetchUser();
          showNotification({
            type: "success",
            message: "Information Updated",
          });
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 3000);
  };

  useEffect(() => {
    setFormModel({
      username: currentUser.username,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      description: currentUser.description,
      mysiteId: currentUser.mysiteId,
      instagramId: currentUser.instagramId,
      facebookId: currentUser.facebookId,
      twitterId: currentUser.twitterId,
    });
  }, [currentUser]);
  return (
    <div className="row row--grid">
      <div className="col-12 col-lg-6">
        <FormikForm
          initialValues={formModel}
          formClasses="sign__form--profile"
          enableReinitialize
          onSubmit={onSubmit}
        >
          <ProfileDetailsForm />

          <ProfileSocialMediaForm user={currentUser} onUserUpdate={fetchUser} />
          <Button className="sign__btn" variant="primary" type="submit">
            Save
          </Button>
        </FormikForm>
      </div>
    </div>
  );
};

export default ProfileSettings;
