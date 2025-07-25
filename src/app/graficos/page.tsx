"use client";

import { Layout, Menu } from "antd";
import Link from "next/link";
import styled from "styled-components";

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
        ></Layout.Content>
      </Layout>
    </styles.Layout>
  );
};

export default Page;
