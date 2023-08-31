import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import verifyRoles from "../utils/verifyRoles";
import { roles } from "../utils/roles";
import { Btn, Input, Label, Select } from "./Employees";
import { useMutation, useQuery } from "react-query";
import {
  addDeduction,
  createSalary,
  fetchAllEmployee,
  generatepayslip,
} from "../utils/api";
import ErrorFlash from "../components/flash_message/ErrorFlash";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import FormValidationError from "../components/FormValidationError";
import SuccessFlash from "../components/flash_message/SuccessFlash";
const Container = styled.div`
  width: 90%;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;
const Form = styled.form`
  flex: 31%;
  height: fit-content;
  padding: 20px;
  border: 1px solid #ddd;
  flex-grow: 0;
`;
const FormHeader = styled.h4`
  margin-bottom: 10px;
  color: #00684a;
`;
function AdminPage() {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const {
    register: payslipRegister,
    handleSubmit: handlePayslip,
    formState: { errors: payslipErrors },
  } = useForm();

  const {
    register: salaryRegister,
    handleSubmit: handleSalary,
    formState: { errors: salaryErrors },
  } = useForm();

  const {
    register: deductionRegister,
    handleSubmit: handleDeduction,
    formState: { errors: deductionErrors },
  } = useForm();

  const salary = useMutation(
    (variables) =>
      createSalary(variables, sessionStorage.getItem("accessToken")),
    {
      onSuccess: (data, variables, context) => {
        console.log(data);
        setResponse(data.data.message);
      },
      onError: (err) => {
        if (err.code !== "ERR_NETWORK") {
          setResponse("Salary already set for employee");
        } else {
          setResponse("NETWORK ERROR");
        }
      },
    }
  );
  const deduction = useMutation(
    (variables) =>
      addDeduction(variables, sessionStorage.getItem("accessToken")),
    {
      onSuccess: (data, variables, context) => {
        console.log(data);
        setResponse(data.data.message);
      },
      onError: (err) => {
        if (err.code !== "ERR_NETWORK") {
          setResponse("Deduction not set for employee try again");
        } else {
          setResponse("NETWORK ERROR");
        }
      },
    }
  );
  const payslip = useMutation(
    (variables) =>
      generatepayslip(variables, sessionStorage.getItem("accessToken")),
    {
      onSuccess: (data, variables, context) => {
        console.log(data);
        setResponse(data.data.message);
      },
      onError: (err) => {
        if (err.code !== "ERR_NETWORK") {
          setResponse("Deduction not set for employee try again");
        } else {
          setResponse("NETWORK ERROR");
        }
      },
    }
  );

  const employees = useQuery("employees", () => {
    return fetchAllEmployee(sessionStorage.getItem("accessToken"));
  });
  useEffect(() => {
    !verifyRoles(roles.adminRole) && navigate("/page/unauthorized_page");
  }, []);
  const submitSalary = (data) => {
    console.log(data);
    salary.mutate(data);
  };
  const submitDeduction = (data) => {
    console.log(data);
    deduction.mutate(data);
  };
  const submitpayslip = (data) => {
    console.log(data);
    payslip.mutate(data);
  };
  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSalary(submitSalary)}>
          <SuccessFlash display={salary.isSuccess}>{response}</SuccessFlash>
          <ErrorFlash display={salary.isError}>{response}</ErrorFlash>
          <FormHeader>Add Salary</FormHeader>
          <Select {...salaryRegister("employeeId", { required: true })}>
            <option selected disabled value={""}>
              Please select an employee
            </option>
            {employees.isSuccess &&
              employees.data?.data?.data.map((employee, index) => {
                return (
                  <option key={index} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                );
              })}
          </Select>
          {salaryErrors?.employeeId?.type === "required" && (
            <FormValidationError text={"Field is required"} />
          )}
          <br />
          <br />

          <Label>Salary</Label>
          <Input
            placeholder="Please input a value"
            type="number"
            {...salaryRegister("salary", { required: true })}
          />
          {salaryErrors?.salary?.type === "required" && (
            <FormValidationError text={"Field is required"} />
          )}

          <br />
          <br />
          <Btn>
            {salary.isLoading ? (
              <ClipLoader size={23} color="white" />
            ) : (
              <span>Submit</span>
            )}
          </Btn>
        </Form>
        <Form onSubmit={handleDeduction(submitDeduction)}>
          <SuccessFlash display={deduction.isSuccess}>{response}</SuccessFlash>
          <ErrorFlash display={deduction.isError}>{response}</ErrorFlash>
          <FormHeader>Deduction</FormHeader>
          <Select {...deductionRegister("employeeId", { required: true })}>
            <option selected disabled value={""}>
              Please select an employee
            </option>
            {employees.isSuccess &&
              employees.data?.data?.data.map((employee, index) => {
                return (
                  <option key={index} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                );
              })}
          </Select>
          {deductionErrors?.employeeId?.type === "required" && (
            <FormValidationError text={"Field is required"} />
          )}
          <br />
          <br />
          <Select {...deductionRegister("deduction", { required: true })}>
            <option selected disabled value={""}>
              Please select deduction type
            </option>
            <option value={"TAX"}>TAX</option>
            <option value={"PENSION CONTRIBUTION"}>PENSION CONTRIBUTION</option>
          </Select>
          {deductionErrors?.deduction?.type === "required" && (
            <FormValidationError text={"Field is required"} />
          )}
          <br />
          <br />

          <Label>Percentage value</Label>
          <Input
            placeholder="Please input a value"
            {...deductionRegister("percentage", { required: true })}
          />
          {deductionErrors?.percentage?.type === "required" && (
            <FormValidationError text={"Field is required"} />
          )}
          <br />
          <br />
          <Btn>
            {deduction.isLoading ? (
              <ClipLoader size={23} color="white" />
            ) : (
              <span>Submit</span>
            )}
          </Btn>
        </Form>
        <Form>
          <FormHeader>Give bonus</FormHeader>
          <Select>
            <option selected disabled value={""}>
              Please select an employee
            </option>
            {employees.isSuccess &&
              employees.data?.data?.data.map((employee, index) => {
                return (
                  <option key={index}>
                    {employee.firstName} {employee.lastName}
                  </option>
                );
              })}
          </Select>
          <br />
          <br />
          <Label>Bonus</Label>
          <Input placeholder="Please  give bonus description" />
          <br />
          <br />

          <Label>Amount</Label>
          <Input placeholder="Please input a value" />

          <br />
          <br />
          <Btn>Submit</Btn>
        </Form>
        <Form onSubmit={handlePayslip(submitpayslip)}>
          <SuccessFlash display={payslip.isSuccess}>{response}</SuccessFlash>
          <ErrorFlash display={payslip.isError}>{response}</ErrorFlash>
          <FormHeader>Generate payslip</FormHeader>
          <Select {...payslipRegister("employeeId", { required: true })}>
            <option selected disabled value={""}>
              Please select an employee
            </option>
            {employees.isSuccess &&
              employees.data?.data?.data.map((employee, index) => {
                return (
                  <option key={index} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                );
              })}
          </Select>
          {payslipErrors?.employeeId?.type === "required" && (
            <FormValidationError text={"Field is required"} />
          )}
          <br />
          <br />
          <Btn>Submit</Btn>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default AdminPage;
