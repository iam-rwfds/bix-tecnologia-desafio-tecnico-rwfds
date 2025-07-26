"use client";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import type { CardTransacaoProps } from "../dashboard/components/CardTransacao";
import Filtro from "./components/Filtro";

const styles = {
  Layout: styled(Layout)`
    min-height: 100vh;
  `,
};

const SIDEBAR_ITEMS = {
  INICIO: "Início",
  GRAFICOS: "Gráficos",
  SAIR: "Sair",
};

const Page: React.FC = () => {
  const [transactions, setTransactions] = useState<CardTransacaoProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions.json").then((resp) => {
      resp.json().then((data) => {
        setTransactions(
          data.map((transaction: any) => {
            const dataEmDate = new Date(transaction.date);

            const dia = dataEmDate.getDate().toString().padStart(2, "0");
            const mes = (dataEmDate.getMonth() + 1).toString().padStart(2, "0");
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
  }, []);

  const years = useMemo(() => {
    const years = new Set<number>();
    transactions.forEach(({ dataEPOCH: date = 0 }) => {
      years.add(new Date(date).getFullYear());
    });
    return Array.from(years).sort();
  }, [transactions]);

  const monthNames = useMemo(() => {
    return [
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
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    setSelectedYear(years.toSorted().at(-1) ?? null);
  }, [years]);

  const data = useMemo(() => {
    const map = {} as Record<string, any>;

    transactions.forEach(
      ({ dataEPOCH: date = 0, valor: amount, tipo: transaction_type }) => {
        const day = new Date(date).toISOString().slice(0, 10);

        const value = parseInt(amount, 10) / 100;

        const transactionDate = new Date(date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = (transactionDate.getMonth() + 1)
          .toString()
          .padStart(2, "0");

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

    return Object.values(map).sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
  }, [transactions, selectedMonth, selectedYear]);

  return (
    <styles.Layout>
      <Layout.Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={[SIDEBAR_ITEMS.GRAFICOS]}
          mode="inline"
        >
          <Menu.Item key={SIDEBAR_ITEMS.INICIO}>
            <Link href={"/dashboard"}>{SIDEBAR_ITEMS.INICIO}</Link>
          </Menu.Item>
          <Menu.Item key={SIDEBAR_ITEMS.GRAFICOS}>
            <Link href={"/graficos"}>{SIDEBAR_ITEMS.GRAFICOS}</Link>
          </Menu.Item>
          <Menu.Item key={SIDEBAR_ITEMS.SAIR}>
            <Link href={"/login"}>{SIDEBAR_ITEMS.SAIR}</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Content
          style={{ margin: "1rem 1rem 0", maxHeight: "90vh", overflow: "auto" }}
        >
          <Filtro
            monthNames={monthNames}
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
              {/* <Brush
                dataKey="date"
                height={30}
                stroke="#8884d8"
                travellerWidth={12}
              /> */}
            </BarChart>
          </ResponsiveContainer>
        </Layout.Content>
      </Layout>
    </styles.Layout>
  );
};

export default Page;
