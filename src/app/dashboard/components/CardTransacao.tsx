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
        {props.tipo === "deposit" ? "+ " : "- "}
        {(parseInt(props.valor, 10) / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </styles.CardText.Title>

      <styles.CardText.Common>
        Empresa: <strong>{props.nomeEmpresa}</strong>
      </styles.CardText.Common>
      <styles.CardText.Common>
        Indústria: <strong>{props.categoriaEmpresa}</strong>
      </styles.CardText.Common>
      <styles.CardText.Common>
        Estado: <strong>{props.estado}</strong>
      </styles.CardText.Common>
      <styles.CardText.Common>
        Data: <strong>{props.data}</strong>
      </styles.CardText.Common>
    </styles.Card>
  );
};

export default CardTransacao;
export type { Props as CardTransacaoProps };
