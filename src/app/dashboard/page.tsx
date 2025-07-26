"use client";

import { Layout, List, Menu, Pagination } from "antd";
import type { Dayjs } from "dayjs";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import CardTransacao, {
  type CardTransacaoProps,
} from "./components/CardTransacao";
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

  const [dateRange, setDateRange] = useState<
    null | [Dayjs | null, Dayjs | null]
  >(null);
  const [transactionType, setTransactionType] = useState<
    "deposit" | "withdraw"
  >();
  const [amountRange, setAmountRange] = useState([null, null] as [
    number | null,
    number | null,
  ]);
  const [province, setProvince] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(10);

  const transacoesFiltradas = useMemo(
    () =>
      transactions
        .filter(({ tipo }) => {
          return !transactionType || tipo === transactionType;
        })
        .filter(({ estado }) => {
          if (!province || province === estado) {
            return true;
          }

          return false;
        })
        .filter(({ nomeEmpresa }) => {
          return !companyName || nomeEmpresa.includes(companyName);
        })
        .filter(
          ({ categoriaEmpresa }) => !industry || categoriaEmpresa === industry,
        )
        .filter(({ valor }) => {
          if (!amountRange[0] && !amountRange[1]) {
            return true;
          }

          if (amountRange[0] && !amountRange[1]) {
            return +valor >= amountRange[0];
          }

          if (!amountRange[0] && amountRange[1]) {
            return +valor >= amountRange[1];
          }
        })
        .filter(({ dataEPOCH = 0 }) => {
          if (!dateRange || !dateRange[0] || !dateRange[1]) {
            return true;
          }

          if (dateRange[0] && dateRange[1]) {
            const startEpoch = dateRange[0].startOf("day").valueOf(); // Start of day epoch
            const endEpoch = dateRange[1].endOf("day").valueOf(); // End of day epoch

            if (startEpoch <= dataEPOCH && dataEPOCH <= endEpoch) {
              return true;
            }
          }
        }),
    [
      transactions,
      transactionType,
      province,
      companyName,
      industry,
      amountRange,
      dateRange,
    ],
  );

  const cardsDaPaginaAtual = useMemo(() => {
    const indiceInicial = (paginaAtual - 1) * tamanhoPagina;
    const indiceFinal = indiceInicial + tamanhoPagina;

    return transacoesFiltradas.slice(indiceInicial, indiceFinal);
  }, [paginaAtual, tamanhoPagina, transacoesFiltradas]);

  const totalPages = useMemo(() => {
    return Math.ceil(transactions.length / tamanhoPagina);
  }, [transactions, tamanhoPagina]);

  return (
    <styles.Layout>
      <Layout.Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={[SIDEBAR_ITEMS.INICIO]}
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
            amountRange={amountRange}
            companyName={companyName}
            dateRange={dateRange}
            industry={industry}
            province={province}
            setAmountRange={setAmountRange}
            setCompanyName={setCompanyName}
            setDateRange={setDateRange}
            setIndustry={setIndustry}
            setProvince={setProvince}
            setTransactionType={setTransactionType}
            transactionType={transactionType}
          />
          <List
            style={{}}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={cardsDaPaginaAtual}
            renderItem={(item) => (
              <List.Item>
                <CardTransacao key={item.chave} {...item} />
              </List.Item>
            )}
          />
        </Layout.Content>
        <Pagination
          align="center"
          defaultCurrent={1}
          current={paginaAtual}
          onChange={(page, pageSize) => {
            setPaginaAtual(page);
            setTamanhoPagina(pageSize);
          }}
          total={totalPages}
          style={{ marginTop: "1rem" }}
        />
      </Layout>
    </styles.Layout>
  );
};

export default Page;
