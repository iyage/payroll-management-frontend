import React from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { enrollEmployee, fetchAllEmployee } from "../utils/api";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import FormValidationError from "../components/FormValidationError";
const Container = styled.div`
  width: 90%;
  color: grey;
  margin: auto;
  margin-top: 40px;
`;
const Top = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;
const FieldSet = styled.fieldset`
  border: 1px solid #ddd;
  padding: 10px 20px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const InputContainer = styled.div`
  width: 220px;
  padding: 5px;
  flex-grow: 0;
`;
export const Label = styled.label`
  width: 100%;
  padding: 5px 0;
`;
export const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 2px 10px;
`;

export const Select = styled.select`
  width: 100%;
  height: 35px;
  padding: 2px 10px;
`;
export const Btn = styled.button`
  height: 40px;
  width: 100%;
  background-color: #00684a;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  &:active {
    transform: scale(0.99);
  }
`;
function Employees() {
  const {
    data,
    isSuccess,
    isLoading: loading,
  } = useQuery("employees", () => {
    return fetchAllEmployee(sessionStorage.getItem("accessToken"));
  });
  const navigate = useNavigate();
  function handleEmployee(e, id) {
    e.preventDefault();
    navigate("/page/employee/" + id);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = (data) => {
    console.log(data);
    mutate(data);
  };

  const { isLoading, mutate } = useMutation(
    (variables) =>
      enrollEmployee(variables, sessionStorage.getItem("accessToken")),
    {
      onSuccess(data, variables, context) {
        console.log(data);
      },
      onError(err) {
        console.error(err);
      },
    }
  );

  return (
    <Container>
      <Top>
        <form onSubmit={handleSubmit(submitForm)}>
          <FieldSet>
            <h4>Enroll new employee</h4>
            <Wrapper>
              <InputContainer>
                <Label>First Name</Label>
                <Input {...register("firstName", { required: true })} />
                {errors?.firstName?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Label>Last Name</Label>
                <Input {...register("lastName", { required: true })} />
                {errors?.lastName?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Label>Email</Label>
                <Input {...register("email", { required: true })} />
                {errors?.email?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Label>Password</Label>
                <Input {...register("password", { required: true })} />
                {errors?.password?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Label>Job Title</Label>
                <Input {...register("jobTile", { required: true })} />
                {errors?.jobTile?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Label>Position</Label>
                <Input {...register("position", { required: true })} />
                {errors?.position?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Label>Report to</Label>
                <Select {...register("reportTo", { required: true })}>
                  <option selected value={""} disabled>
                    PLease select superior
                  </option>
                  {isSuccess &&
                    data?.data?.data.map((employee, index) => {
                      return <option>{employee.firstName}</option>;
                    })}
                </Select>
                {errors?.reportTo?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  {...register("startDate", { required: true })}
                />
                {errors?.startDate?.type === "required" && (
                  <FormValidationError text={"This field  is required"} />
                )}
              </InputContainer>
              <InputContainer>
                <Btn>
                  {isLoading ? (
                    <ClipLoader size={23} color="white" />
                  ) : (
                    <span>Submit</span>
                  )}
                </Btn>
              </InputContainer>
            </Wrapper>
          </FieldSet>
        </form>
      </Top>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Report To</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.data.data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee?.jobTile || "NA"}</td>
                  <td>{employee?.reportTo || "NA"}</td>
                  <td>{format(new Date(employee?.startDate), "dd-MM-yyyy")}</td>
                  <td>
                    <Link onClick={(e) => handleEmployee(e, employee._id)}>
                      Check details
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Container>
  );
}

export default Employees;
