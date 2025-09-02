import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/layout/Layout";
import axios from "axios";
import Spinner from "../components/spinner";
import moment from "moment";
import Analitics from "../components/Analitics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [temp, setTemp] = useState(false);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",

      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },

    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModel(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
              setTemp(!temp);
            }}
          />
        </div>
      ),
    },
  ];

  //getall transect

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transections/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        message.error("somthing went wrong");
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type, editable, temp]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transections/delete-transection", {
        transectionId: record._id,
      });
      setLoading(false);
      message.success("Transection Deleted Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  const submitHandler = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      setLoading(true);

      if (editable) {
        await axios.post("/transections/edit-transection", {
          payload: {
            ...values,
            userid: user._id,
          },
          transectionId: editable._id,
        });
        setLoading(false);
        message.success("Transection updated Successfully");
      } else {
        await axios.post("/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transection Added Successfully");
      }

      setShowModel(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("somthing went wrong");
    }
  };

  return (
    <>
      <Layout>
        {loading && <Spinner />}
        <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => {
                setFrequency(values);
              }}
            >
              <Select.Option value="7">Weekly</Select.Option>
              <Select.Option value="30">Monthly</Select.Option>
              <Select.Option value="365">Yearly</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedate(values)}
              />
            )}
          </div>
          <div className="filter-tab ">
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expence">EXPENSE</Select.Option>
            </Select>
          </div>
          <div>
            <div className="switch-icons">
              <UnorderedListOutlined
                className={`mx-2 ${
                  viewData === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewData("table")}
              />
              <AreaChartOutlined
                className={`mx-2 ${
                  viewData === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewData("analytics")}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModel(true)}
          >
            Add New
          </button>
        </div>
        <div className="content">
          {viewData === "table" ? (
            <Table dataSource={allTransection} columns={columns} />
          ) : (
            <Analitics allTransection={allTransection} />
          )}
        </div>
        <Modal
          title={editable ? "Edit Transection" : "Add New Transection"}
          open={showModel}
          onCancel={() => setShowModel(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={submitHandler}
            initialValues={editable}
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>

            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expence">Expence</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="bonus">Bonus</Select.Option>
                <Select.Option value="freelance">Freelance</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
                <Select.Option value="others">Others</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default HomePage;
