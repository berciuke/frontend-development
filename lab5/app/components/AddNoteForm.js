import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

const noteValidationSchema = Yup.object({
    tacticName: Yup.string()
      .required("Nazwa taktyki jest wymagana")
      .min(5, "Minimum 5 znaków")
      .max(50, "Maximum 50 znaków"),
    strategy: Yup.string()
      .required("Opis strategii jest wymagany")
      .min(10, "Minimum 10 znaków"),
    effectiveness: Yup.number()
      .required("Wybierz skuteczność")
      .min(1)
      .max(5),
    conditions: Yup.string()
      .min(10, "Minimum 10 znaków")
      .required("Warunki użycia są wymagane"),
    trainingDate: Yup.date()
      .required("Data treningu jest wymagana"),
    opponents: Yup.array()
      .of(Yup.string())
      .min(1, "Wybierz przynajmniej 1 przeciwnika")
      .required("Wybierz przynajmniej jednego przeciwnika")
  });

export default function AddNoteForm({ pokemonId, onNoteAdded }) {
  const initialValues = {
    tacticName: "",
    strategy: "",
    effectiveness: 3,     
    conditions: "",
    trainingDate: "",
    opponents: []         
  };

  const handleSubmit = (values, { resetForm }) => {
    const newNote = {
      id: uuidv4(),
      pokemonId: pokemonId,
      tacticName: values.tacticName,
      strategy: values.strategy,
      effectiveness: Number(values.effectiveness),
      conditions: values.conditions,
      trainingDate: values.trainingDate,
      opponents: values.opponents,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onNoteAdded(newNote);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={noteValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <div>
            <label>Nazwa taktyki</label>
            <Field name="tacticName" type="text" />
            <ErrorMessage name="tacticName" component="div" className="error" />
          </div>

          <div>
            <label>Opis strategii</label>
            <Field name="strategy" as="textarea" />
            <ErrorMessage name="strategy" component="div" className="error" />
          </div>

          <div>
            <label>Skuteczność (1-5)</label>
            <Field name="effectiveness" as="select">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Field>
            <ErrorMessage
              name="effectiveness"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label>Warunki użycia</label>
            <Field name="conditions" as="textarea" />
            <ErrorMessage name="conditions" component="div" className="error" />
          </div>

          <div>
            <label>Data treningu</label>
            <Field name="trainingDate" type="date" />
            <ErrorMessage
              name="trainingDate"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label>Przeciwnicy</label>
            <div className="form-types">
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="fire"
                />
                Fire
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="water"
                />
                Water
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="electric"
                />
                Electric
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="normal"
                />
                Normal
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="fighting"
                />
                Fighting
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="flying"
                />
                Flying
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="poison"
                />
                Poison
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="ground"
                />
                Ground
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="rock"
                />
                Rock
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="bug"
                />
                Bug
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="ghost"
                />
                Ghost
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="steel"
                />
                Steel
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="grass"
                />
                Grass
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="psychic"
                />
                Psychic
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="ice"
                />
                Ice
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="dragon"
                />
                Dragon
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="dark"
                />
                Dark
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="opponents"
                  value="fairy"
                />
                Fairy
              </label>
            </div>
            <ErrorMessage name="opponents" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Dodaj notatkę
          </button>
        </Form>
      )}
    </Formik>
  );
}
