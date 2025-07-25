import { Card } from "antd";
import styled from "styled-components";

type Props = {
  [key in
    | "estado"
    | "nomeEmpresa"
    | "data"
    | "valor"
    | "tipo"
    | "categoriaEmpresa"
    | "chave"]: string;
} & {
  [key in "dataEPOCH"]?: number;
};

const styles = {
  Card: styled(Card)`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  `,
};

const CardTransacao: React.FC<Props> = (props) => {
  return (
    <styles.Card>
      <p
        style={{
          color: props.tipo === "deposit" ? "#059669" : "#dc2626",
          fontWeight: 600,
          fontSize: "2rem",
        }}
      >
        {props.tipo === "deposit" ? "+" : "-"} R$ {props.valor}
      </p>

      <p
        style={{
          color: "#374151",
        }}
      >
        Empresa: <strong>{props.nomeEmpresa}</strong>
      </p>
      <p
        style={{
          color: "#374151",
        }}
      >
        Indústria: <strong>{props.categoriaEmpresa}</strong>
      </p>
      <p
        style={{
          color: "#374151",
        }}
      >
        Estado: <strong>{props.estado}</strong>
      </p>
      <p
        style={{
          color: "#374151",
        }}
      >
        Data: <strong>{props.data}</strong>
      </p>
    </styles.Card>
  );
};

export default CardTransacao;
export type { Props as CardTransacaoProps };
