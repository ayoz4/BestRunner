import React, { useState } from "react";
import Modal from "antd/lib/modal";
import { Form, Input, Button, Dropdown, Menu, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout } from "../../redux/actions/workoutActions";

const { Option } = Select;

function WorkoutModal({ children, workout, action }) {
  const dispatch = useDispatch();

  const workouts = useSelector((state) => state.workouts);

  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const formik = useFormik({
    initialValues: workout || {
      distance: null,
      date: new Date().toISOString().substring(0, 10),
      type: "run",
      comment: "",
    },

    validationSchema: Yup.object().shape({
      distance: Yup.number().min(1).max(100).required(),
      date: Yup.date().required(),
      type: Yup.string()
        .oneOf(["run", "cycling", "skiing", "jogging"])
        .required(),
      comment: Yup.string(),
    }),

    onSubmit: (values) => {
      console.log(values);

      try {
        dispatch(action(values));

        closeModal();
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        visible={isVisible}
        onCancel={closeModal}
        onOk={formik.handleSubmit}
        confirmLoading={workouts.isFetching}
      >
        <Form layout="vertical">
          <Form.Item label="Дистанция" rules={[{ required: true }]}>
            <Input
              type="number"
              name="distance"
              value={formik.values.distance}
              onChange={formik.handleChange}
              placeholder="Введите дистанцию в километрах"
            />
          </Form.Item>

          <Form.Item label="Дата" rules={[{ required: true }]}>
            <Input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item label="Тип тренировки" rules={[{ required: true }]}>
            <Select
              value={formik.values.type}
              onChange={(e) =>
                formik.handleChange({ target: { name: "type", value: e } })
              }
              name="type"
              defaultValue="run"
            >
              <Option value="run">Бег</Option>
              <Option value="cycling">Велосипед</Option>
              <Option value="skiing">Лыжи</Option>
              <Option value="jogging">Ходьба</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Комментарий">
            <Input.TextArea type="text" placeholder="Впишите комментарий" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default WorkoutModal;
