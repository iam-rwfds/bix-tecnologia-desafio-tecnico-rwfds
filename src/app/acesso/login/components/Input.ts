import styled from "styled-components";

export const Input = styled.input`
  width: 100%; /* w-full */
  padding: 0.75rem 1rem; /* px-4 py-3 */
  background-color: #f3f4f6; /* bg-gray-100 */
  border: 1px solid #d1d5db; /* border border-gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: all 0.3s ease; /* transition duration-300 */
  outline: none; /* focus:outline-none */

  &:focus {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5); /* focus:ring-4 focus:ring-blue-500/50 */
  }

  background-color: #374151; /* dark:bg-gray-700 */
    border-color: #4b5563; /* dark:border-gray-600 */

    &:focus {
      box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.5); /* dark:focus:ring-blue-400/50 */
    }


  /* Dark mode styles */

`;
