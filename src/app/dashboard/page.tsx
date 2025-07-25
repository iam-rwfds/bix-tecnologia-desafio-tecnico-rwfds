"use client";

import styled from "styled-components";
import { Layout, List, Menu, Pagination, type MenuProps } from "antd";
import CardTransacao, {
  type CardTransacaoProps,
} from "./components/CardTransacao";
import { useEffect, useMemo, useState } from "react";

const styles = {
  Layout: styled(Layout)`
    min-height: 100vh;
  `,
};

type MenuItem = Required<MenuProps>["items"][number];

const SIDEBAR_ITEMS = {
  INICIO: "Início",
  GRAFICOS: "Gráficos",
  SAIR: "Sair",
};

const items: MenuItem[] = [
  {
    key: SIDEBAR_ITEMS.INICIO,
    label: SIDEBAR_ITEMS.INICIO,
  },
  {
    key: SIDEBAR_ITEMS.GRAFICOS,
    label: SIDEBAR_ITEMS.GRAFICOS,
  },
  {
    key: SIDEBAR_ITEMS.SAIR,
    label: SIDEBAR_ITEMS.SAIR,
  },
];

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

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(10);

  const cardsDaPaginaAtual = useMemo(() => {
    const indiceInicial = (paginaAtual - 1) * tamanhoPagina;
    const indiceFinal = indiceInicial + tamanhoPagina;

    return transactions.slice(indiceInicial, indiceFinal);
  }, [paginaAtual, transactions, tamanhoPagina]);

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
          items={items}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{ margin: "1rem 1rem 0" }}>
          <List
            style={{ maxHeight: "90vh", overflow: "auto" }}
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
        </Layout.Content>
      </Layout>
    </styles.Layout>
  );
};

export default Page;
