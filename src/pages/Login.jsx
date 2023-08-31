import styled from "styled-components";
import bgImg from "../images/Analytics-amico.png";
import { BiUser, BiLock } from "react-icons/bi";
import { useForm } from "react-hook-form";
import FormValidationError from "../components/FormValidationError";
import { ClipLoader } from "react-spinners";
import { useMutation } from "react-query";
import { login } from "../utils/api";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { roles } from "../utils/roles";
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 20px;
  justify-content: center;
`;
const Left = styled.div`
  flex: 60%;
  flex-grow: 0;
  display: flex;
  justify-content: end;
  @media screen and (max-width: 781px) {
    display: none;
  }
`;
const Right = styled.div`
  flex: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /*  */
`;
const Card = styled.div`
  height: auto;
  width: 90%;
  padding: 30px;
`;
// rgb(45, 168, 133);

const ImgContainer = styled.div`
  width: 700px;
  height: 500px;
`;
const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;
const InputContainer = styled.div`
  height: 45px;
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  border: 1px solid #dedddd;
  margin: 20px 0;
`;
const Input = styled.input`
  flex: 90%;
  width: 100%;
  height: 100%;
  border: none;
  padding: 2px 20px;
  &:focus {
    outline: none;
  }
`;
const Icon = styled.span`
  height: 100%;
  flex: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  height: 40px;
  width: 100%;
  margin: 20px 0px 10px 0px;
  background-color: #00684a;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  &:active {
    transform: scale(0.99);
  }
`;
const FormHeader = styled.h4`
  text-align: center;
  color: rgb(11, 105, 78);
`;
const FormFooter = styled.p`
  text-align: center;
  font-size: 11px;
  margin-top: 20px;
  letter-spacing: 2px;
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = (data) => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_API_UR);
    console.log(data);
    mutate(data);
  };
  const { isLoading, mutate } = useMutation((variables) => login(variables), {
    onSuccess(data, variables, context) {
      const userData = jwt_decode(data.data.data);
      const userInfo = userData.userInfo;
      const userRoles = userData.userInfo.roles;
      sessionStorage.setItem("accessToken", data.data.data);
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("userRoles", userRoles);
      sessionStorage.setItem("logIn", true);
    },
    onError(err) {
      console.error(err);
    },
  });
  return !sessionStorage.getItem("logIn") ? (
    <Container>
      <Wrapper>
        <Left>
          <ImgContainer>
            <Img src={bgImg} />
          </ImgContainer>
        </Left>
        <Right>
          <Card>
            <FormHeader>Payroll management system</FormHeader>
            <form onSubmit={handleSubmit(submitForm)}>
              <InputContainer>
                <Icon>
                  <BiUser />
                </Icon>
                <Input {...register("email", { required: true })} />
              </InputContainer>
              {errors?.email?.type === "required" && (
                <FormValidationError text={"Email is required"} />
              )}

              <InputContainer>
                <Icon>
                  <BiLock />
                </Icon>
                <Input {...register("password", { required: true })} />
              </InputContainer>
              {errors?.password?.type === "required" && (
                <FormValidationError text={"Password is required"} />
              )}
              <Btn>
                {isLoading ? (
                  <ClipLoader size={23} color="white" />
                ) : (
                  <span>Sign In</span>
                )}
              </Btn>
            </form>
          </Card>
          <FormFooter>Copyright {new Date().getFullYear()}</FormFooter>
        </Right>
      </Wrapper>
    </Container>
  ) : (
    <Navigate
      to={
        sessionStorage.getItem("userRoles").indexOf(roles.adminRole) > -1
          ? "/page"
          : "/page/employee/" +
            JSON.parse(sessionStorage.getItem("userInfo")).id
      }
    />
  );
}

export default Login;
