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
  CardText: {
    Common: styled.p`
      color: #374151;
    `,
    Title: styled.p<{
      $type: "deposit" | "withdraw";
    }>`
      ${(props) =>
        props.$type === "deposit" ? "color: #059669;" : "color: #dc2626;"}

      font-weight: 600;
      font-size: 2rem;
    `,
  },
};

const CardTransacao: React.FC<Props> = (props) => {
  return (
    <styles.Card>
      <styles.CardText.Title $type={props.tipo as "deposit" | "withdraw"}>
        {props.tipo === "deposit" ? "+" : "-"} R$ {props.valor}
      </styles.CardText.Title>

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
