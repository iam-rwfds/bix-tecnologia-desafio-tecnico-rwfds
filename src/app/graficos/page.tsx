"use client";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { useAuth } from "~/contexts/AuthContext";
import type { CardTransacaoProps } from "../dashboard/components/CardTransacao";
import Filtro from "./components/Filtro";
import {
  HomeOutlined,
  LogoutOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const styles = {
  Layout: styled(Layout)`
    min-height: 100vh;
  `,
  LayoutContent: styled(Layout.Content)`
   & { 
      margin: 1rem 1rem 0; 
      max-height: 90vh; 
      overflow: auto;
    }
  `,
  LayoutSider: styled(Layout.Sider)`
    & .ant-layout-sider-children { 
      display: flex;
      align-items: center;
    }
  `,
};

const SIDEBAR_ITEMS = {
  INICIO: "Início",
  GRAFICOS: "Gráficos",
  SAIR: "Sair",
};

const monthNames = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const Page: React.FC = () => {
  const [transactions, setTransactions] = useState<CardTransacaoProps[]>([]);
  const { validarSessao, logout } = useAuth();

  useEffect(() => {
    validarSessao().then((validarSessaoResp) => {
      validarSessaoResp &&
        fetch("/transactions.json").then((resp) => {
          resp.json().then((data) => {
            setTransactions(
              data.map((transaction: any) => {
                const dataEmDate = new Date(transaction.date);

                const dia = dataEmDate.getDate().toString().padStart(2, "0");
                const mes = (dataEmDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0");
                const ano = dataEmDate.getFullYear();

                const dataFormatada = `${dia}/${mes}/${ano}`;

                return {
                  categoriaEmpresa: transaction.industry,
                  data: dataFormatada,
                  dataEPOCH: transaction.date,
                  chave: `${transaction.date}${transaction.account}`,
                  estado: transaction.state,
                  nomeEmpresa: transaction.account,
                  tipo: transaction.transaction_type,
                  valor: transaction.amount,
                } as CardTransacaoProps;
              }),
            );
          });
        });
    });
  }, [validarSessao]);

  const years = useMemo(() => {
    const years = new Set<number>();
    transactions.forEach(({ dataEPOCH: date = 0 }) => {
      years.add(new Date(date).getFullYear());
    });
    return Array.from(years).sort();
  }, [transactions]);

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    setSelectedYear(years.toSorted().at(-1) ?? null);
  }, [years]);

  const availableMonthsInSelectedYear = useMemo(() => {
    if (selectedYear === null) {
      return [];
    }

    const monthsInYear = new Set<string>();
    transactions.forEach(({ dataEPOCH: date = 0 }) => {
      const transactionDate = new Date(date);
      if (transactionDate.getFullYear() === selectedYear) {
        const month = (transactionDate.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        monthsInYear.add(month);
      }
    });

    return monthNames.filter((month) => monthsInYear.has(month.value));
  }, [selectedYear, transactions]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ...
  useEffect(() => {
    const isSelectedMonthValid = availableMonthsInSelectedYear.some(
      (month) => month.value === selectedMonth,
    );

    // If the current month is invalid or not set, default to the first available.
    if (!isSelectedMonthValid) {
      setSelectedMonth(availableMonthsInSelectedYear[0]?.value ?? null);
    }
  }, [availableMonthsInSelectedYear]);

  const data = useMemo(() => {
    const map = {} as Record<string, any>;

    transactions.forEach(
      ({ dataEPOCH: date = 0, valor: amount, tipo: transaction_type }) => {
        const value = parseInt(amount, 10) / 100;

        const transactionDate = new Date(date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = (transactionDate.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const transactionDay = transactionDate
          .getDate()
          .toString()
          .padStart(2, "0");
        const day = `${transactionYear}-${transactionMonth}-${transactionDay}`;

        if (selectedYear && transactionYear !== selectedYear) {
          return;
        }

        if (selectedMonth && transactionMonth !== selectedMonth) {
          return;
        }

        if (!map[day]) map[day] = { date: day, deposit: 0, withdraw: 0 };

        map[day][transaction_type] += value;
      },
    );

    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions, selectedMonth, selectedYear]);

  return (
    <styles.Layout>
      <styles.LayoutSider>
        <Menu
          theme="dark"
          defaultSelectedKeys={[SIDEBAR_ITEMS.GRAFICOS]}
          mode="inline"
        >
          <Menu.Item key={SIDEBAR_ITEMS.INICIO} icon={<HomeOutlined />}>
            <Link href={"/dashboard"}>{SIDEBAR_ITEMS.INICIO}</Link>
          </Menu.Item>
          <Menu.Item key={SIDEBAR_ITEMS.GRAFICOS} icon={<PieChartOutlined />}>
            <Link href={"/graficos"}>{SIDEBAR_ITEMS.GRAFICOS}</Link>
          </Menu.Item>
          <Menu.Item
            key={SIDEBAR_ITEMS.SAIR}
            onClick={logout}
            icon={<LogoutOutlined />}
          >
            <Link href={"/acesso/login"}>{SIDEBAR_ITEMS.SAIR}</Link>
          </Menu.Item>
        </Menu>
      </styles.LayoutSider>

      <Layout>
        <styles.LayoutContent>
          <Filtro
            monthNames={availableMonthsInSelectedYear}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            uniqueYears={years}
          />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(val) =>
                  val.toLocaleString(undefined, {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <Legend />
              <Bar
                dataKey="deposit"
                stackId="a"
                fill="#4caf50"
                name="Depósitos"
              />
              <Bar
                dataKey="withdraw"
                stackId="a"
                fill="#f44336"
                name="Retiradas"
              />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(val) =>
                  val.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="deposit"
                stroke="#4caf50"
                name="Depósitos"
              />
              <Line
                type="monotone"
                dataKey="withdraw"
                stroke="#f44336"
                name="Retiradas"
              />
            </LineChart>
          </ResponsiveContainer>
        </styles.LayoutContent>
      </Layout>
    </styles.Layout>
  );
};

export default Page;
