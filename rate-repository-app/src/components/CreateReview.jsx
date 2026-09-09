// src/components/CreateReview.jsx
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { CREATE_REVIEW } from "../graphql/mutations";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 15,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const CreateReviewForm = ({ onSubmit, error, loading }) => {
  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
      />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Creating review..." : "Create a review"}
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [mutate, { error, loading }] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.error("Create review error:", e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <CreateReviewForm
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      )}
    </Formik>
  );
};

export default CreateReview;
