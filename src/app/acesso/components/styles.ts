import { Input as InputBase } from "antd";
import LinkBase from "next/link";
import styled from "styled-components";

export const FormContainer = styled.div`
  background-color: oklch(27.8% 0.033 256.848);
  padding: 2rem;
  border-radius: 1rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
`;

export const LabelContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block; /* block */
  margin-bottom: 0.5rem; /* mb-2 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #d1d5db; /* text-gray-600 */
`;

export const Input = styled(InputBase)`
  width: 100%; /* w-full */
  padding: 0.75rem 1rem; /* px-4 py-3 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: all 0.3s ease; /* transition duration-300 */
  outline: none; /* focus:outline-none */

  &:focus {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5); /* focus:ring-4 focus:ring-blue-500/50 */
  }

  /* background-color: #374151;
  border-color: #4b5563; */

  &:focus {
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.5); /* dark:focus:ring-blue-400/50 */
  }
`;

export const Button = styled.button`
width: 100%;

background-color: oklch(54.6% 0.245 262.881);

border: none;

padding: 0.75rem 1rem;

border-radius: 0.5rem;
`;

export const Link = styled(LinkBase)`
  margin-top: 1rem;
  display: block;
`;
