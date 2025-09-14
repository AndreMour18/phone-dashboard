import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchASR, listCalls } from "api";
import colors from "assets/colors/colors";

import {
  Container,
  KPIs,
  KPI,
  ChartWrapper,
  TableWrapper,
  Table,
  Th,
  Td,
} from "./styles";

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState({
    total: 0,
    atendidas: 0,
    asr: 0,
    acd: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [calls, setCalls] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const data = fetchASR(token).then((res) => {
      setKpis({
        total: res.total,
        atendidas: res.atendidas,
        asr: res.asr,
        acd: res.acd,
      });
      setChartData(res.series);
    });

    const dataCall = listCalls(token).then((res) => setCalls(res));
    console.log("DAata", data);
    console.log("Dtasgfsdgf", calls);
  }, [token]);

  return (
    <Container>
      <KPIs>
        <KPI>
          <h3>Total</h3>
          <p>{kpis.total}</p>
        </KPI>
        <KPI>
          <h3>Atendidas</h3>
          <p>{kpis.atendidas}</p>
        </KPI>
        <KPI>
          <h3>ASR</h3>
          <p>{kpis.asr}%</p>
        </KPI>
        <KPI>
          <h3>ACD</h3>
          <p>{kpis.acd}</p>
        </KPI>
      </KPIs>

      <ChartWrapper>
        <h2>Série temporal de chamadas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="chamadas"
              stroke={colors.buttonGradientStart}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <TableWrapper>
        <h2>Chamadas</h2>
        <Table>
          <thead>
            <tr>
              <Th>Período</Th>
              <Th>Destino</Th>
              <Th>SIP Code</Th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call, i) => (
              <tr key={i}>
                <Td>{call.periodo}</Td>
                <Td>{call.destino}</Td>
                <Td>{call.sip_code}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default Dashboard;
