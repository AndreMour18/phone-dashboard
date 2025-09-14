import styled from "styled-components";
import colors from "assets/colors/colors";

export const Container = styled.div`
  background: ${colors.backgroundPrimary};
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const KPIs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

export const KPI = styled.div`
  background: linear-gradient(
    135deg,
    ${colors.buttonGradientStart},
    ${colors.buttonGradientEnd}
  );
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: ${colors.buttonText};
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.buttonText};
  }
`;

export const ChartWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 40px;
  color: black;
`;

export const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  color: black;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 2px solid ${colors.backgroundPrimary};
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;
