import React, { useState } from "react";
import Modal from "antd/lib/modal";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

const { Option } = Select;

function WorkoutModal({ children, workout, action }) {
  const dispatch = useDispatch();

  const workouts = useSelector((state) => state.workouts);

  const [isVisible, setIsVisible] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    form.resetFields();
    setIsVisible(false);
  };

  const formik = useFormik({
    initialValues: workout || {
      distance: null,
      date: new Date().toISOString().substring(0, 10),
      type: null,
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
      try {
        dispatch(action(values));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSubmitWorkout = () => {
    formik
      .validateForm()
      .then((values) => {
        if (!isEmpty(values)) {
          form.validateFields();
          throw values;
        }

        formik.handleSubmit();
        form.resetFields();
        closeModal();
      })
      .catch((info) => {
        console.log(info);
      });
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        visible={isVisible}
        onCancel={closeModal}
        onOk={handleSubmitWorkout}
        confirmLoading={workouts.isFetching}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Дистанция"
            rules={[{ required: true, message: formik.errors.distance }]}
            required={true}
          >
            <Input
              type="number"
              name="distance"
              value={formik.values.distance}
              onChange={formik.handleChange}
              placeholder="Введите дистанцию в километрах"
            />
          </Form.Item>

          <Form.Item
            label="Дата"
            rules={[{ required: true, message: formik.errors.date }]}
            required={true}
          >
            <Input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Тип тренировки"
            rules={[{ required: true, message: formik.errors.type }]}
            required={true}
          >
            <Select
              value={formik.values.type}
              onChange={(e) =>
                formik.handleChange({ target: { name: "type", value: e } })
              }
              name="type"
              placeholder="Выберите тип тренировки"
            >
              <Option value="run">Бег</Option>
              <Option value="cycling">Велосипед</Option>
              <Option value="skiing">Лыжи</Option>
              <Option value="jogging">Ходьба</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Комментарий">
            <Input.TextArea
              type="text"
              placeholder="Впишите комментарий"
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default WorkoutModal;
