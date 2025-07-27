/** biome-ignore-all lint/a11y/noLabelWithoutControl: ... */
"use client";

import { Card, Col, Row, Select } from "antd";

type Props = {
  selectedMonth: string | null;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string | null>>;
  selectedYear: number | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
  uniqueYears: number[];
  monthNames: { value: string; label: string }[];
};

const Filtro: React.FC<Props> = ({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  monthNames,
  uniqueYears,
}) => {
  return (
    <Card
      title={
        <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>Filtros</span>
      }
      style={{
        marginTop: "1.5rem", // Added margin-top to separate from previous card
        marginBottom: "1.5rem",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        borderRadius: "0.75rem",
      }}
    >
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
            Filtrar por ano:
          </label>
          <Select
            placeholder="Select Year"
            allowClear
            value={selectedYear}
            onChange={setSelectedYear}
            style={{ width: "100%", borderRadius: "0.5rem" }}
          >
            {uniqueYears.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </Col>

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
            Filtrar por mês:
          </label>
          <Select
            placeholder="Select Month"
            allowClear
            value={selectedMonth}
            onChange={setSelectedMonth}
            style={{ width: "100%", borderRadius: "0.5rem" }}
          >
            {monthNames.map((month) => (
              <Select.Option key={month.value} value={month.value}>
                {month.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

export default Filtro;
