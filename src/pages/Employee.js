import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchUserById } from "../utils/api";
import { format } from "date-fns";
import avatar from "../images/man-303792_1280.png";
const Container = styled.div`
  width: 100%;
  color: grey;
  width: 90%;
  margin: auto;
  margin-top: 40px;
`;
const Top = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const TopLeft = styled.div`
  flex: 15%;
  text-align: start;
`;
const TopCenter = styled.div`
  flex: 25%;
`;
const TopRight = styled.div`
  flex: 55%;
`;

const ProfileImgContainer = styled.div`
  height: 150px;
  width: 150px;
  border: 1px solid #dddd;
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;

function Employee() {
  const handlePayslipDetails = (e, id) => {
    e.preventDefault();
    console.log(id);
  };
  const pathVariable = useParams();
  const { data, isSuccess } = useQuery("employee", () => {
    return fetchUserById(
      { employeeId: pathVariable.id },
      sessionStorage.getItem("accessToken")
    );
  });

  return (
    <Container>
      <Top>
        <TopLeft>
          <ProfileImgContainer>
            <Img src={avatar} />
          </ProfileImgContainer>
        </TopLeft>
        <TopCenter>
          {isSuccess && (
            <ul>
              <li>First Name : {data.data.data.firstName}</li>
              <li>Last Name : {data.data.data.lastName}</li>
              <li>Email : {data.data.data.email}</li>
              <li>Job Tile : {data.data.data?.jobTile || "NA"} </li>
              <li>Position : {data.data.data?.position || "NA"}</li>
              <li>Report to : {data.data.data?.reportTo || "NA"}</li>
              <li>Start date : {data.data.data?.startDate || "NA"}</li>
              <li>End date : {data.data.data?.endDate || "Current"}</li>
              <li>
                Reason for leaving : {data.data.data?.reasonForLeaving || "NA"}
              </li>
            </ul>
          )}
        </TopCenter>
        <TopRight>
          <h4>Bonuses</h4>
          <table style={{ width: "100%", margin: "5px 0 20px 0" }}>
            <thead>
              <tr>
                <th>Bonus</th>
                <th>Amount</th>
                <th>Date Received</th>
              </tr>
            </thead>
            <tbody>
              {isSuccess && data.data.data?.bonuses.length > 0 ? (
                data.data.data?.bonuses.map((bonus, index) => {
                  return (
                    <tr key={index}>
                      <td>{bonus.bonus}</td>
                      <td>{bonus.amount}</td>

                      <td>{format(new Date(bonus.date), "dd-MM-yyyy")}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3}>
                    <h1 style={{ textAlign: "center" }}>NO DATA</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h4>Promotions</h4>

          <table style={{ width: "100%", margin: "5px 0 20px 0" }}>
            <thead>
              <tr>
                <th>Promotion</th>
                <th>New Position</th>
                <th>Old Position</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {isSuccess && data.data.data?.promotions.length > 0 ? (
                data.data.data?.promotions.map((promotion, index) => {
                  return (
                    <tr key={index}>
                      <td>{promotion.promotion}</td>
                      <td>{promotion.newPositio}</td>
                      <td>{promotion.oldPositio}</td>
                      <td>{format(new Date(promotion.date), "dd-MM-yyyy")}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>
                    <h1 style={{ textAlign: "center" }}>NO DATA</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TopRight>
      </Top>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Deductions</th>

            <th>Gross</th>
            <th>Net</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.data.data.payslips.map((payslip, index) => {
              return (
                <tr key={index}>
                  <td>{format(new Date(payslip.date), "dd-MM-yyyy")}</td>
                  <td>
                    {payslip.deductions.reduce((a, b) => {
                      return a + b.value;
                    }, 0)}
                  </td>
                  <td>{payslip.gross}</td>
                  <td>{payslip.net}</td>
                  <td>
                    <Link onClick={(e) => handlePayslipDetails(e, payslip._id)}>
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

export default Employee;
