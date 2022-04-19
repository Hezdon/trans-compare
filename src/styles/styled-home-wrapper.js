import styled from "styled-components";

// export style wrapper for home page
export const StyledHomeWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 2em auto;
  padding: 2em;
  font-size: 85%;
  background-color: white;

  form {
    & > * + * {
      margin-top: 2em;
    }
  }
`;
