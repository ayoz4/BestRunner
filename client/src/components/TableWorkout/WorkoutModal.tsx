import React, { useState } from "react";
import Modal from "antd/lib/modal";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Select from "antd/es/select";
import message from "antd/es/message";
import { useFormik } from "formik";
import * as Yup from "yup";
import isEmpty from "lodash/isEmpty";

import { workoutTypes } from "./consts";
import { Workout, WorkoutTypes } from "../../redux/types";
import { UseMutationResult } from "react-query";

const { Option } = Select;

type WorkoutModalProps = {
  children: React.ReactNode;
  workout?: Workout;
  action: UseMutationResult;
};

function WorkoutModal({ children, workout, action }: WorkoutModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [postStatus, setPostStatus] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    form.resetFields();
    formik.resetForm();
    setIsVisible(false);
  };

  const formik = useFormik({
    initialValues: workout || {
      distance: 0,
      date: new Date().toISOString().substring(0, 10),
      type: "",
      comment: "",
    },

    validationSchema: Yup.object().shape({
      distance: Yup.number()
        .min(0)
        .max(300)
        .required("Необходимо внести дистанцию в км"),
      date: Yup.date().required().nullable(),
      type: Yup.mixed()
        .oneOf(workoutTypes)
        .required("Необходимо указать тип активности"),
      comment: Yup.string(),
    }),

    onSubmit: async (values) => {
      try {
        await action.mutateAsync(values);

        message.success({ content: "Успешно!" });
        setPostStatus(false);
        closeModal();
      } catch (error) {
        setPostStatus(false);
        message.error({ content: error });
      }
    },
  });

  const handleSubmitWorkout = async () => {
    try {
      setPostStatus(true);

      const values = await formik.validateForm();

      if (!isEmpty(values)) {
        console.log("validating");
        form.validateFields();
        throw values;
      }

      await formik.handleSubmit();
    } catch (error) {
      setPostStatus(false);
      message.error("Ошибка добавления тренировки");
    }
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        visible={isVisible}
        onCancel={closeModal}
        onOk={handleSubmitWorkout}
        confirmLoading={postStatus}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Дистанция"
            required={true}
            validateStatus={formik.errors.distance ? "error" : "success"}
            help={formik.errors.distance}
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
            required={true}
            validateStatus={formik.errors.date ? "error" : "success"}
            help={formik.errors.date}
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
            required={true}
            validateStatus={formik.errors.type ? "error" : "success"}
            help={formik.errors.type}
          >
            <Select
              value={formik.values.type}
              onChange={(e) =>
                formik.handleChange({ target: { name: "type", value: e } })
              }
              placeholder="Выберите тип тренировки"
            >
              <Option value={WorkoutTypes.RUN}>Бег</Option>
              <Option value={WorkoutTypes.CYCLING}>Велосипед</Option>
              <Option value={WorkoutTypes.SKIING}>Лыжи</Option>
              <Option value={WorkoutTypes.JOGGING}>Ходьба</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Комментарий" name="comment">
            <Input.TextArea
              placeholder="Впишите комментарий"
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
