import React, { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
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

interface Call {
  id: number;
  call_id: string;
  timestamp: string;
  duration: number;
  destination: string;
  sip_code: number;
  answered: boolean;
  raw_payload: string;
  ingested_at: string;
}

interface KPIsInterface {
  total_calls: number;
  answered_calls: number;
  asr: number;
  acd: number;
}

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<KPIsInterface>({
    total_calls: 0,
    answered_calls: 0,
    asr: 0,
    acd: 0,
  });
  const [chartData, setChartData] = useState<
    { hora: number; chamadas: number }[]
  >([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const kpiRes = await fetchASR(token);
        setKpis(kpiRes);

        const callsRes: Call[] = await listCalls(token);
        setCalls(callsRes);

        const hourMap = new Map<number, number>();
        callsRes.forEach((call) => {
          const hour = new Date(call.timestamp).getHours();
          hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
        });

        const series = Array.from(hourMap, ([hora, chamadas]) => ({
          hora,
          chamadas,
        }));
        series.sort((a, b) => a.hora - b.hora);
        setChartData(series);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const renderCallsRows = (calls: Call[]) => {
    return calls.map((call) => (
      <tr key={call.id}>
        <Td>
          {new Date(call.timestamp).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Td>
        <Td>{call.destination}</Td>
        <Td>{call.sip_code}</Td>
        <Td>{call.answered ? "Sim" : "Não"}</Td>
        <Td>{call.duration ?? "-"}</Td>
      </tr>
    ));
  };

  const total = useMemo(() => kpis.total_calls, [kpis]);
  const atendidas = useMemo(() => kpis.answered_calls, [kpis]);
  const asr = useMemo(() => kpis.asr, [kpis]);
  const acd = useMemo(() => kpis.acd ?? "0.00", [kpis]);

  if (loading) {
    return (
      <div>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <Container>
      <KPIs>
        <KPI>
          <h3>Total</h3>
          <p>{total}</p>
        </KPI>
        <KPI>
          <h3>Atendidas</h3>
          <p>{atendidas}</p>
        </KPI>
        <KPI>
          <h3>ASR</h3>
          <p>{asr}%</p>
        </KPI>
        <KPI>
          <h3>ACD</h3>
          <p>{acd}</p>
        </KPI>
      </KPIs>

      <ChartWrapper>
        <h2>Distribuição de Chamadas por Hora</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" tickFormatter={(hora) => `${hora}h`} />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} chamadas`, ""]}
              labelFormatter={(label) => `Hora: ${label}h`}
            />
            <Bar dataKey="chamadas" fill={colors.buttonGradientStart} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <TableWrapper>
        <h2>Chamadas</h2>
        <Table>
          <thead>
            <tr>
              <Th>Data/Hora</Th>
              <Th>Destino</Th>
              <Th>SIP Code</Th>
              <Th>Atendida</Th>
              <Th>Duração</Th>
            </tr>
          </thead>
          <tbody>{renderCallsRows(calls)}</tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default Dashboard;
