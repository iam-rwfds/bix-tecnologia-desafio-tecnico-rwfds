/** biome-ignore-all lint/a11y/noLabelWithoutControl: ... */
"use client";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

type Props = {
  transactionType?: "deposit" | "withdraw";
  setTransactionType: Dispatch<
    SetStateAction<"deposit" | "withdraw" | undefined>
  >;
  amountRange: [number | null, number | null];
  setAmountRange: Dispatch<SetStateAction<[number | null, number | null]>>;
  province: string | null;
  setProvince: Dispatch<SetStateAction<string | null>>;
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
  industry: string | null;
  setIndustry: Dispatch<SetStateAction<string | null>>;
  dateRange: null | [Dayjs | null, Dayjs | null];
  setDateRange: Dispatch<SetStateAction<null | [Dayjs | null, Dayjs | null]>>;
};

const uniqueProvinces = [
  "TX",
  "MN",
  "NV",
  "IL",
  "NJ",
  "PA",
  "NY",
  "FL",
  "MD",
  "OK",
  "CA",
  "NC",
  "OR",
  "WA",
  "MI",
  "TN",
  "NE",
  "UT",
  "GA",
  "OH",
  "VA",
  "HI",
  "AZ",
  "CT",
  "CO",
  "MO",
];

const uniqueIndustries = [
  "Oil and Gas Equipment",
  "Food Consumer Products",
  "Hotels",
  "Computer Software",
  "Automotive Retailing",
  "Diversified Financials",
  "Entertainment",
  "Health Care Providers",
  "Apparel Retail",
  "Packaged Foods",
  "Restaurants",
  "Biotechnology",
  "Homebuilding",
  "Internet Software and Services",
  "Oil and Gas Exploration and Production",
  "Wireless Telecommunication Services",
  "Leisure Products",
  "Building Products",
  "Application Software",
  "Footwear",
  "Agricultural Chemicals",
  "Casinos and Gaming",
  "Specialty Stores",
  "IT Consulting and Other Services",
  "Electric Utilities",
  "Aerospace and Defense",
  "Airlines",
  "Brewers",
  "Auto Parts and Equipment",
  "Household Appliances",
  "Property and Casualty Insurance",
  "Investment Banking and Brokerage",
  "Industrial Machinery",
  "Department Stores",
  "Semiconductors",
  "Multi-line Insurance",
  "Data Processing and Outsourced Services",
  "Trucking",
  "Distillers and Vintners",
  "Personal Products",
  "Household Products",
  "Human Resource and Employment Services",
  "Research and Consulting Services",
  "Integrated Telecommunication Services",
  "Drug Retail",
  "Home Improvement Retail",
  "Broadcasting",
  "Internet Retail",
  "Fertilizers and Agricultural Chemicals",
  "Apparel, Accessories and Luxury Goods",
  "Food Distributors",
  "Movies and Entertainment",
  "Recreational Vehicles",
  "Leisure Facilities",
  "General Merchandise Stores",
  "Life and Health Insurance",
  "Specialty Chemicals",
  "Hypermarkets and Super Centers",
  "Pharmaceuticals",
  "Consumer Electronics",
  "Health Care Technology",
  "Apparel, Accessories & Luxury Goods",
];

const Filtro: React.FC<Props> = ({
  setTransactionType,
  transactionType,
  setAmountRange,
  setCompanyName,
  setProvince,
  amountRange,
  province,
  companyName,
  industry,
  setIndustry,
  setDateRange,
  dateRange,
}) => {
  const handleResetFilters = () => {
    setDateRange(null);
    setTransactionType(undefined);
    setAmountRange([null, null]);
    setProvince(null);
    setCompanyName("");
    setIndustry(null);
  };

  return (
    <Card
      title={
        <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>
          Filtros de Transações
        </span>
      }
      style={{
        marginBottom: "1.5rem", // mb-6
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // shadow-lg
        borderRadius: "0.75rem", // rounded-xl
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Date Filter */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} md={6}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
            >
              Datas:
            </label>
            <DatePicker.RangePicker
              placeholder={["Data Inicial", "Data Final"]}
              format="DD-MM-YYYY"
              value={dateRange}
              onChange={(data) => setDateRange(data)}
              style={{ width: "100%", borderRadius: "0.5rem" }}
            />
          </Col>

          {/* Type Filter */}
          <Col xs={24} sm={8} md={6}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
            >
              Tipo de transação:
            </label>
            <Radio.Group
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              style={{ width: "100%" }}
            >
              <Radio.Button value="deposit">Receita</Radio.Button>
              <Radio.Button value="withdraw">Depósito</Radio.Button>
              <Radio.Button value={undefined}>Todos</Radio.Button>
            </Radio.Group>
          </Col>

          {/* Amount Filter */}
          <Col xs={24} sm={8} md={6}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
            >
              Intervalo de quantias:
            </label>
            <Space.Compact style={{ width: "100%" }}>
              <InputNumber
                placeholder="Mínimo"
                value={amountRange[0]}
                onChange={(value) => setAmountRange([value, amountRange[1]])}
                style={{
                  width: "50%",
                  borderTopLeftRadius: "0.5rem",
                  borderBottomLeftRadius: "0.5rem",
                }}
                min={0}
                step={0.01}
              />
              <InputNumber
                placeholder="Máximo"
                value={amountRange[1]}
                onChange={(value) => setAmountRange([amountRange[0], value])}
                style={{
                  width: "50%",
                  borderTopRightRadius: "0.5rem",
                  borderBottomRightRadius: "0.5rem",
                }}
                min={0}
                step={0.01}
              />
            </Space.Compact>
          </Col>
        </Row>

        <Row gutter={[16, 16]} align="middle">
          {/* Province/State Filter */}
          <Col xs={24} sm={8} md={6}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
            >
              Estado:
            </label>
            <Select
              placeholder="Selecione o Estado"
              allowClear
              value={province}
              onChange={setProvince}
              style={{ width: "100%", borderRadius: "0.5rem" }}
            >
              {uniqueProvinces.map((p) => (
                <Select.Option key={p} value={p}>
                  {p}
                </Select.Option>
              ))}
            </Select>
          </Col>

          {/* Company Name Filter */}
          <Col xs={24} sm={8} md={6}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
            >
              Nome da empresa:
            </label>
            <Input
              placeholder="Digite o nome da empresa"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={{ width: "100%", borderRadius: "0.5rem" }}
            />
          </Col>

          {/* Company Industry Type Filter */}
          <Col xs={24} sm={8} md={6}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
            >
              Tipo de indústria:
            </label>
            <Select
              placeholder="Selecione o tipo de indústria"
              allowClear
              value={industry}
              onChange={setIndustry}
              style={{ width: "100%", borderRadius: "0.5rem" }}
            >
              {uniqueIndustries.map((i) => (
                <Select.Option key={i} value={i}>
                  {i}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Reset Filters Button */}
        <Row justify="end" style={{ width: "100%", marginTop: "1rem" }}>
          <Col>
            <Button
              onClick={handleResetFilters}
              className="reset-button" // Apply custom CSS class
            >
              Zerar filtros
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default Filtro;
